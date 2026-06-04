```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const { user } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

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
    profile_image: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function loadProfile() {
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("clerk_id", user.id)
      .single();

    if (error) {
      console.log("LOAD PROFILE ERROR:", error);
      return;
    }

    console.log("PROFILE DATA:", data);

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
        profile_image: data.profile_image || "",
      });
    }
  }

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  async function uploadImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    try {
      const file = e.target.files?.[0];

      if (!file) {
        alert("No file selected");
        return;
      }

      if (!user) {
        alert("No user found");
        return;
      }

      setUploading(true);

      const fileName = `${user.id}-${Date.now()}-${file.name}`;

      const result = await supabase.storage
        .from("creator-images")
        .upload(fileName, file);

      console.log("UPLOAD RESULT:", result);

      if (result.error) {
        alert(result.error.message);
        console.error(result.error);
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
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!user) {
      alert("No user found");
      return;
    }

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
          portfolio_link: form.portfolio_link,
          linkedin_link: form.linkedin_link,
          youtube_link: form.youtube_link,
          profile_image: form.profile_image,
        },
        {
          onConflict: "clerk_id",
        }
      );

    if (error) {
      alert(error.message);
      console.error(error);
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

          {uploading && (
            <p>Uploading...</p>
          )}
        </div>

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
          rows={5}
          placeholder="Tell people about yourself..."
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
```
