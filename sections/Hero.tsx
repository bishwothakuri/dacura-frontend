import Link from "next/link";
import { MoveRight, UploadCloud, FileText, Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden">
      {/* BACKGROUND DECORATION
          A subtle gradient mesh to make the white background feel "premium"
      */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto max-w-6xl text-center">
        {/* 1. THE BADGE */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/5 bg-white/50 text-xs font-medium text-[var(--muted)] mb-8 shadow-sm backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
          <span>Dacura 1.0 is now live</span>
        </div>

        {/* 2. THE HEADLINE */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black mb-6 max-w-4xl mx-auto">
          Chat with your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-black to-black/60">
            entire knowledge base.
          </span>
        </h1>

        {/* 3. THE SUBTITLE */}
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop searching through folders. Dacura analyzes multiple PDFs
          simultaneously, finding connections and citations across your entire
          library in seconds.
        </p>

        {/* 4. THE ACTIONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="h-12 px-8 rounded-full bg-black text-white font-medium hover:bg-black/80 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
            <UploadCloud className="w-4 h-4" />
            Upload PDFs
          </button>
          <button className="h-12 px-8 rounded-full border border-[var(--border)] text-black bg-white hover:bg-gray-50 transition-colors shadow-sm font-medium">
            View Demo
          </button>
        </div>

        {/* 5. THE PRODUCT VISUAL (The "Mockup")
            This represents your app interface. We use a "glass" container style.
        */}
        <div className="relative max-w-4xl mx-auto rounded-xl border border-[var(--border)] bg-white/50 shadow-2xl backdrop-blur-sm p-2">
          <div className="rounded-lg border border-[var(--border)] bg-white overflow-hidden aspect-[16/9] flex items-center justify-center relative">
            {/* Mock UI Elements to represent "Cross Analysis" */}
            <div className="absolute inset-0 bg-gray-50/50 flex items-center justify-center">
              <div className="text-center">
                <div className="flex justify-center -space-x-4 mb-4">
                  {/* Floating File Icons */}
                  <div className="w-12 h-16 bg-white rounded shadow-md border border-gray-100 flex items-center justify-center z-10 rotate-[-6deg]">
                    <FileText className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="w-12 h-16 bg-white rounded shadow-md border border-gray-100 flex items-center justify-center z-20">
                    <FileText className="w-6 h-6 text-purple-500" />
                  </div>
                  <div className="w-12 h-16 bg-white rounded shadow-md border border-gray-100 flex items-center justify-center z-10 rotate-[6deg]">
                    <FileText className="w-6 h-6 text-green-500" />
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-500">
                  Analyzing 3 documents...
                </p>
              </div>
            </div>

            {/* Floating Search Bar Mockup */}
            <div className="absolute bottom-8 left-8 right-8 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center px-4 gap-3">
              <Search className="w-4 h-4 text-gray-400" />
              <div className="h-2 w-32 bg-gray-100 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
