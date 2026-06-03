"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [form, setForm] = useState({
    full_name: "",
    title: "",
    bio: "",
    skills: "",
    portfolio_link: "",
    linkedin_link: "",
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
    alert("Profile save coming next step 🚀");
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        Creator Profile
      </h1>

      <div className="space-y-5">
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
          placeholder="Tell people about yourself..."
          value={form.bio}
          onChange={handleChange}
          rows={5}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <input
          name="skills"
          placeholder="Skills (comma separated)"
          value={form.skills}
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
          name="linkedin_link"
          placeholder="LinkedIn URL"
          value={form.linkedin_link}
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