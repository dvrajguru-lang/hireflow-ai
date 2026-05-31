"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";

import { supabase } from "@/lib/supabase";

import { useUser } from "@clerk/nextjs";

export default function ReportPage() {

  const { user } = useUser();

  const [interviews, setInterviews] = useState<any[]>([]);

  const [average, setAverage] = useState(0);

  useEffect(() => {

    async function fetchReports() {

      if (!user?.primaryEmailAddress?.emailAddress) return;

      const { data } = await supabase
        .from("interviews")
        .select("*")
        .eq(
          "user_email",
          user.primaryEmailAddress.emailAddress
        );

      setInterviews(data || []);

      if (data && data.length > 0) {

        const total = data.reduce(
          (acc, item) => acc + item.score,
          0
        );

        setAverage(
          Number((total / data.length).toFixed(1))
        );

      }

    }

    fetchReports();

  }, [user]);

  return (

    <main className="min-h-screen bg-[#050816] text-white flex">

      <Sidebar />

      <section className="flex-1 p-10">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-5xl font-bold mb-4">
            AI Performance Report
          </h1>

          <p className="text-zinc-400 mb-10">
            Track your interview readiness and growth.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

              <p className="text-zinc-400 mb-2">
                Total Interviews
              </p>

              <h2 className="text-5xl font-bold">
                {interviews.length}
              </h2>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

              <p className="text-zinc-400 mb-2">
                Average Score
              </p>

              <h2 className="text-5xl font-bold">
                {average}/10
              </h2>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

              <p className="text-zinc-400 mb-2">
                Interview Readiness
              </p>

              <h2 className="text-5xl font-bold">

                {average >= 8
                  ? "Excellent"
                  : average >= 6
                  ? "Good"
                  : "Needs Work"}

              </h2>

            </div>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              Recent Interviews
            </h2>

            <div className="space-y-6">

              {interviews.map((item) => (

                <div
                  key={item.id}
                  className="border border-white/10 rounded-2xl p-6"
                >

                  <div className="flex justify-between items-center mb-4">

                    <p className="text-zinc-400">
                      {item.mode}
                    </p>

                    <p className="text-2xl font-bold">
                      {item.score}/10
                    </p>

                  </div>

                  <p className="line-clamp-2">
                    {item.question}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}