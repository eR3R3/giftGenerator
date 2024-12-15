'use client'

import Image from "next/image";
import Hero from "@/components/Hero";
import SideBar from "@/components/SideBar";

export default function Home() {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      <Hero />
    </div>
  );
}
