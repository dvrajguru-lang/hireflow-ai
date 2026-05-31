"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  BrainCircuit,
  BarChart3,
  Settings,
  LogOut,
  FileText,
  ClipboardList,
} from "lucide-react";

import {
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Sidebar() {
  const { user } = useUser();

  return (
    <aside className="w-[280px] min-h-screen border-r border-white/10 bg-black/20 backdrop-blur-xl p-6 flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-white mb-10">
          HireFlow AI
        </h1>

        <nav className="space-y-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 p-4 rounded-2xl hover:bg-white/5 transition-all"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            href="/interview"
            className="flex items-center gap-3 p-4 rounded-2xl hover:bg-white/5 transition-all"
          >
            <BrainCircuit size={20} />
            Interviews
          </Link>

          <Link
            href="/resume"
            className="flex items-center gap-3 p-4 rounded-2xl hover:bg-white/5 transition-all"
          >
            <FileText size={20} />
            Resume AI
          </Link>

          <Link
            href="/report"
            className="flex items-center gap-3 p-4 rounded-2xl hover:bg-white/5 transition-all"
          >
            <ClipboardList size={20} />
            Reports
          </Link>

          <Link
            href="/analytics"
            className="flex items-center gap-3 p-4 rounded-2xl hover:bg-white/5 transition-all"
          >
            <BarChart3 size={20} />
            Analytics
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-3 p-4 rounded-2xl hover:bg-white/5 transition-all"
          >
            <Settings size={20} />
            Settings
          </Link>
        </nav>
      </div>

      <div className="mt-auto border-t border-white/10 pt-6">
        <div className="flex items-center gap-4">
          <UserButton />

          <div>
            <p className="font-semibold">
              {user?.fullName || "User"}
            </p>

            <p className="text-zinc-400 text-sm">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3 text-zinc-400">
          <LogOut size={18} />

          <span className="text-sm">
            Secure Session Active
          </span>
        </div>
      </div>
    </aside>
  );
}