"use client";

import Link from "next/link";

import {
  ArrowRight,
  BrainCircuit,
  FileText,
  BarChart3,
  Mic,
} from "lucide-react";

export default function HomePage() {

  return (

    <main className="min-h-screen bg-[#050816] text-white overflow-hidden">

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 blur-[140px]" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[140px]" />

      <header className="relative z-10 flex items-center justify-between px-10 py-8 border-b border-white/10">

        <h1 className="text-3xl font-bold">
          HireFlow AI
        </h1>

        <div className="flex gap-4">

          <Link
            href="/sign-in"
            className="px-6 py-3 rounded-2xl border border-white/10 hover:bg-white/5 transition-all"
          >
            Login
          </Link>

          <Link
            href="/sign-up"
            className="px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition-all"
          >
            Start Free
          </Link>

        </div>

      </header>

      <section className="relative z-10 max-w-7xl mx-auto px-10 pt-28 pb-24">

        <div className="max-w-4xl">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 mb-8">

            <BrainCircuit size={18} />

            AI-Powered Career Copilot

          </div>

          <h1 className="text-7xl leading-[1.1] font-black mb-8">

            Crack Interviews
            <br />

            With Realistic
            <br />

            AI Simulations

          </h1>

          <p className="text-xl text-zinc-400 leading-relaxed mb-10 max-w-2xl">

            Practice adaptive AI interviews, analyze resumes,
            track performance, and improve communication
            confidence — all in one intelligent platform.

          </p>

          <div className="flex flex-wrap gap-5">

            <Link
              href="/sign-up"
              className="bg-white text-black px-8 py-5 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-all"
            >
              Start Free
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/dashboard"
              className="border border-white/10 px-8 py-5 rounded-2xl font-semibold hover:bg-white/5 transition-all"
            >
              Live Demo
            </Link>

          </div>

        </div>

      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-10 pb-28">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:-translate-y-2 transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">

              <BrainCircuit size={28} />

            </div>

            <h3 className="text-2xl font-bold mb-4">
              Adaptive AI Interviews
            </h3>

            <p className="text-zinc-400 leading-relaxed">

              AI asks realistic follow-up questions based on your answers.

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:-translate-y-2 transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">

              <Mic size={28} />

            </div>

            <h3 className="text-2xl font-bold mb-4">
              Voice Simulation
            </h3>

            <p className="text-zinc-400 leading-relaxed">

              Practice interviews naturally using voice interaction.

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:-translate-y-2 transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6">

              <FileText size={28} />

            </div>

            <h3 className="text-2xl font-bold mb-4">
              Resume Intelligence
            </h3>

            <p className="text-zinc-400 leading-relaxed">

              Get ATS analysis, keyword optimization,
              and AI resume feedback.

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:-translate-y-2 transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6">

              <BarChart3 size={28} />

            </div>

            <h3 className="text-2xl font-bold mb-4">
              Career Analytics
            </h3>

            <p className="text-zinc-400 leading-relaxed">

              Track interview growth and performance with smart analytics.

            </p>

          </div>

        </div>

      </section>

    </main>

  );

}