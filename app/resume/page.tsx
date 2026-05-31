"use client";

import { useState } from "react";

import Sidebar from "@/components/Sidebar";

export default function ResumePage() {

  const [resume, setResume] = useState("");

  const [jobRole, setJobRole] = useState("");

  const [feedback, setFeedback] = useState("");

  const [loading, setLoading] = useState(false);

  async function analyzeResume() {

    try {

      setLoading(true);

      const response = await fetch("/api/resume", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          resume,
          jobRole,
        }),

      });

      const data = await response.json();

      setFeedback(data.feedback);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  return (

    <main className="min-h-screen bg-[#050816] text-white flex">

      <Sidebar />

      <section className="flex-1 p-10">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-5xl font-bold mb-4">
            AI Resume Analyzer
          </h1>

          <p className="text-zinc-400 mb-10">
            Analyze resume quality, ATS strength,
            and job-role compatibility.
          </p>

          <div className="space-y-6">

            <input
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="Target Job Role"
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none"
            />

            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your resume here..."
              className="w-full h-[300px] bg-white/5 border border-white/10 rounded-2xl p-5 outline-none resize-none"
            />

            <button
              onClick={analyzeResume}
              className="bg-white text-black px-8 py-4 rounded-2xl font-semibold"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>

          </div>

          {feedback && (

            <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-6">
                AI Resume Feedback
              </h2>

              <div className="whitespace-pre-wrap leading-relaxed">
                {feedback}
              </div>

            </div>

          )}

        </div>

      </section>

    </main>

  );

}