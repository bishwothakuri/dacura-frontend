import { APP_PATHS } from "@/constants/api";
import Link from "next/link";
import Hero from "@/sections/Hero";
import Features from "@/sections/Feature";

export default function Home() {
  return (
    <main className="bg-white">
      {" "}
      {/* Ensure background is white */}
      <Hero />
      <Features />
      {/* Footer will go here */}
    </main>
  );
}
