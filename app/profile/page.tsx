"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    title: "",
    bio: "",
    location: "",
    experience: "",
    skills: "",
    portfolio_link: "",
    linkedin_link: "",
    youtube_link: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    loadProfile();
  }, [user]);

  async function loadProfile() {
    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("clerk_id", user.id)
      .single();

    if (data) {
      setForm({
        full_name: data.full_name || "",
        title: data.title || "",
        bio: data.bio || "",
        location: data.location || "",
        experience: data.experience || "",
        skills: data.skills || "",
        portfolio_link: data.portfolio_link || "",
        linkedin_link: data.linkedin_link || "",
        youtube_link: data.youtube_link || "",
      });
    }
  }

  async function handleSave() {
    if (!user) return;

    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          clerk_id: user.id,
          user_email:
            user.primaryEmailAddress?.emailAddress,

          full_name: form.full_name,
          title: form.title,
          bio: form.bio,
          location: form.location,
          experience: form.experience,
          skills: form.skills,
          portfolio_link: form.portfolio_link,
          linkedin_link: form.linkedin_link,
          youtube_link: form.youtube_link,
        },
        {
          onConflict: "clerk_id",
        }
      );

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Failed to save profile");
      return;
    }

    alert("Profile saved successfully");
  }

  return (
    <div className="p-10 max-w-4xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-8 text-white">
        Creator Profile
      </h1>

      <div className="space-y-5">
        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-400"
        />

        <input
          name="title"
          placeholder="Professional Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-400"
        />

        <textarea
          name="bio"
          placeholder="Tell people about yourself..."
          rows={5}
          value={form.bio}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-400"
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-400"
        />

        <input
          name="experience"
          placeholder="Years of Experience"
          value={form.experience}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-400"
        />

        <input
          name="skills"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-400"
        />

        <input
          name="portfolio_link"
          placeholder="Portfolio URL"
          value={form.portfolio_link}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-400"
        />

        <input
          name="linkedin_link"
          placeholder="LinkedIn URL"
          value={form.linkedin_link}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-400"
        />

        <input
          name="youtube_link"
          placeholder="YouTube Channel URL"
          value={form.youtube_link}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-400"
        />

        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}