"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() 
{
  const { user, isLoaded, isSignedIn } = useUser();

console.log({
  isLoaded,
  isSignedIn,
  user,
});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    title: "",
    bio: "",
    location: "",
    experience: "",
    skills: "",
    software: "",
    portfolio_link: "",
    linkedin_link: "",
    youtube_link: "",
    demo_reel_url: "",
    availability: "",
    profile_image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function loadProfile() {
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("clerk_id", user.id)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      setForm({
        full_name: data.full_name || "",
        title: data.title || "",
        bio: data.bio || "",
        location: data.location || "",
        experience: data.experience || "",
        skills: data.skills || "",
        software: data.software || "",
        portfolio_link: data.portfolio_link || "",
        linkedin_link: data.linkedin_link || "",
        youtube_link: data.youtube_link || "",
        demo_reel_url: data.demo_reel_url || "",
        availability: data.availability || "",
        profile_image: data.profile_image || "",
      });
    }
  }

  useEffect(() => {
    loadProfile();
  }, [user]);

  async function uploadImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    console.log("FILE SELECTED", file);

    if (!file || !user) return;

    try {
      setUploading(true);

      const fileName =
        user.id + "-" + Date.now() + "-" + file.name;

      const { error } = await supabase.storage
        .from("creator-images")
        .upload(fileName, file);

      if (error) {
        alert(error.message);
        return;
      }

      const { data } = supabase.storage
        .from("creator-images")
        .getPublicUrl(fileName);

      setForm((prev) => ({
        ...prev,
        profile_image: data.publicUrl,
      }));

      alert("Image uploaded successfully!");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    console.log("SAVE BUTTON CLICKED");
  
    if (!user) {
      console.log("NO USER FOUND");
      return;
    }
  
    console.log("USER FOUND", user.id);

    const { error } = await supabase
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
          software: form.software,
          portfolio_link: form.portfolio_link,
          linkedin_link: form.linkedin_link,
          youtube_link: form.youtube_link,
          demo_reel_url: form.demo_reel_url,
          availability: form.availability,
          profile_image: form.profile_image,
        },
        {
          onConflict: "clerk_id",
        }
      );

    if (error) {
      alert(error.message);
      return;
    }

    alert("Profile Saved Successfully!");
    loadProfile();
  }

  return (
    <div className="p-10 max-w-4xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-8">
        Creator Profile
      </h1>

      <div className="space-y-5">
        <div className="flex flex-col items-center gap-4">
          {form.profile_image ? (
            <img
              src={form.profile_image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border border-zinc-700"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-zinc-800 flex items-center justify-center">
              No Photo
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={uploadImage}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-600 rounded-lg"
          >
            Upload Profile Photo
          </button>

          {uploading && <p>Uploading...</p>}
        </div>

        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <input
          name="title"
          placeholder="Professional Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <textarea
          name="bio"
          rows={5}
          placeholder="Tell people about yourself..."
          value={form.bio}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <input
          name="experience"
          placeholder="Years of Experience"
          value={form.experience}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <input
          name="skills"
          placeholder="Skills"
          value={form.skills}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <input
          name="software"
          placeholder="Software (Premiere Pro, After Effects, DaVinci Resolve)"
          value={form.software}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <input
          name="portfolio_link"
          placeholder="Portfolio URL"
          value={form.portfolio_link}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <input
          name="demo_reel_url"
          placeholder="Demo Reel URL"
          value={form.demo_reel_url}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <input
          name="linkedin_link"
          placeholder="LinkedIn URL"
          value={form.linkedin_link}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <input
          name="youtube_link"
          placeholder="YouTube Channel URL"
          value={form.youtube_link}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <input
          name="availability"
          placeholder="Availability (Available / Part-Time / Booked)"
          value={form.availability}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
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