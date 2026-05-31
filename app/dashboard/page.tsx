"use client";

import { useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";

import { supabase } from "@/lib/supabase";

import Sidebar from "@/components/Sidebar";

export default function DashboardPage() {

  const { user } = useUser();

  const [interviews, setInterviews] = useState<any[]>([]);

  useEffect(() => {

    async function fetchData() {

      if (!user?.primaryEmailAddress?.emailAddress) return;

      const { data } = await supabase
        .from("interviews")
        .select("*")
        .eq(
          "user_email",
          user.primaryEmailAddress.emailAddress
        )
        .order("id", { ascending: false });

      setInterviews(data || []);

    }

    fetchData();

  }, [user]);

  return (

    <main className="min-h-screen bg-[#050816] text-white flex">

      <Sidebar />

      <section className="flex-1 p-10">

        <h1 className="text-5xl font-bold mb-4">
          Interview Dashboard
        </h1>

        <p className="text-zinc-400 mb-10">
          Track your interview performance and progress.
        </p>

        <div className="grid gap-6">

          {interviews.map((item) => (

            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-3xl p-8"
            >

              <div className="flex items-center justify-between mb-6">

                <div>

                  <p className="text-zinc-400 mb-2">
                    {item.mode} Interview
                  </p>

                  <h2 className="text-2xl font-bold">
                    Score: {item.score}/10
                  </h2>

                </div>

              </div>

              <div className="space-y-6">

                <div>

                  <p className="text-zinc-400 mb-2">
                    Question
                  </p>

                  <p>
                    {item.question}
                  </p>

                </div>

                <div>

                  <p className="text-zinc-400 mb-2">
                    Your Answer
                  </p>

                  <p>
                    {item.answer}
                  </p>

                </div>

                <div>

                  <p className="text-zinc-400 mb-2">
                    AI Feedback
                  </p>

                  <div className="whitespace-pre-wrap">
                    {item.feedback}
                  </div>

                </div>

              </div>

            </div>

          ))}

          {interviews.length === 0 && (

            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center text-zinc-400">

              No interviews found yet.

            </div>

          )}

        </div>

      </section>

    </main>

  );

}