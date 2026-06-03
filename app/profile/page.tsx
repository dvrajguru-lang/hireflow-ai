"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const { user } = useUser();

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSave() {
    try {
      if (!user) {
        alert("No Clerk user found");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .upsert(
          {
            clerk_id: user.id,
            user_email:
              user.primaryEmailAddress?.emailAddress || "",

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
        )
        .select();

      console.log("DATA:", data);

      if (error) {
        console.error(error);
        alert(`Failed to save profile: ${error.message}`);
        return;
      }

      alert("Profile Saved Successfully!");
    } catch (err) {
      console.error(err);
      alert("Unexpected Error");
    }
  }

  return (
    <div className="p-10 max-w-4xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-8">
        Creator Profile
      </h1>

      <div className="space-y-5">
        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
        />

        <input
          name="title"
          placeholder="Professional Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
        />

        <textarea
          name="bio"
          placeholder="Tell people about yourself..."
          rows={5}
          value={form.bio}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
        />

        <input
          name="experience"
          placeholder="Years of Experience"
          value={form.experience}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
        />

        <input
          name="skills"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
        />

        <input
          name="portfolio_link"
          placeholder="Portfolio URL"
          value={form.portfolio_link}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
        />

        <input
          name="linkedin_link"
          placeholder="LinkedIn URL"
          value={form.linkedin_link}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
        />

        <input
          name="youtube_link"
          placeholder="YouTube Channel URL"
          value={form.youtube_link}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
        />

        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-xl bg-white text-black font-semibold"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}