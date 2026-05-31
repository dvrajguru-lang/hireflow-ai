"use client";

import { SignUp } from "@clerk/nextjs";

export default function Page() {

  return (

    <main className="min-h-screen bg-[#050816] flex items-center justify-center">

      <SignUp routing="hash" />

    </main>

  );

}