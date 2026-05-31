"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";

import { supabase } from "@/lib/supabase";

import { useUser } from "@clerk/nextjs";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AnalyticsPage() {

  const { user } = useUser();

  const [data, setData] = useState<any[]>([]);

  const [average, setAverage] = useState(0);

  useEffect(() => {

    async function fetchAnalytics() {

      if (!user?.primaryEmailAddress?.emailAddress) return;

      const { data } = await supabase
        .from("interviews")
        .select("*")
        .eq(
          "user_email",
          user.primaryEmailAddress.emailAddress
        )
        .order("id", { ascending: true });

      if (!data) return;

      setData(data);

      const total = data.reduce(
        (acc, item) => acc + item.score,
        0
      );

      setAverage(
        data.length
          ? Number((total / data.length).toFixed(1))
          : 0
      );

    }

    fetchAnalytics();

  }, [user]);

  return (

    <main className="min-h-screen bg-[#050816] text-white flex">

      <Sidebar />

      <section className="flex-1 p-10">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-5xl font-bold mb-4">
            Career Analytics
          </h1>

          <p className="text-zinc-400 mb-10">
            Visualize your interview performance growth.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

              <p className="text-zinc-400 mb-2">
                Total Interviews
              </p>

              <h2 className="text-5xl font-bold">
                {data.length}
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
                Readiness
              </p>

              <h2 className="text-5xl font-bold">

                {average >= 8
                  ? "Excellent"
                  : average >= 6
                  ? "Good"
                  : "Improving"}

              </h2>

            </div>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              Interview Score Progress
            </h2>

            <div className="w-full h-[400px]">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={data}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="id"
                    stroke="#888"
                  />

                  <YAxis
                    domain={[0, 10]}
                    stroke="#888"
                  />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#8b5cf6"
                    strokeWidth={4}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}