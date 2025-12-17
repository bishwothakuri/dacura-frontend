import { Card } from "@/components/ui/Card";
import { Network, FileSearch, Scale, Zap } from "lucide-react";

export default function Features() {
  return (
    <section className="py-24 px-6 bg-[var(--muted-light)]">
      {" "}
      {/* Light grey background for contrast */}
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black tracking-tight">
            Connect the dots across documents.
          </h2>
          <p className="text-lg text-[var(--muted)]">
            Most AI tools only chat with one file. Dacura builds a knowledge
            graph across your entire folder to find answers that span multiple
            sources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FEATURE 1: Cross-Reference (Large) */}
          <Card className="md:col-span-2 min-h-[300px] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <Network className="text-blue-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-black">
                Cross-Document Reasoning
              </h3>
              <p className="text-[var(--muted)] max-w-md">
                Ask a question like "Compare the revenue growth between Q1 and
                Q3 reports." Dacura pulls data from both files and synthesizes
                the answer.
              </p>
            </div>
            {/* Visual decoration */}
            <div className="mt-8 h-32 w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100/50" />
          </Card>

          {/* FEATURE 2: Citations */}
          <Card className="min-h-[300px]">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-6">
              <FileSearch className="text-orange-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-black">
              Perfect Citations
            </h3>
            <p className="text-[var(--muted)]">
              Never hallucinate. Every answer includes clickable citations
              linking directly to the exact page and paragraph.
            </p>
          </Card>

          {/* FEATURE 3: Scale */}
          <Card className="min-h-[300px]">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <Scale className="text-green-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-black">
              Legal Grade Accuracy
            </h3>
            <p className="text-[var(--muted)]">
              Designed for contracts and research papers. We handle complex
              tables and two-column layouts with ease.
            </p>
          </Card>

          {/* FEATURE 4: Speed (Wide) */}
          <Card className="md:col-span-2 min-h-[250px] flex items-center gap-8">
            <div className="hidden md:block w-1/3 h-full bg-gray-50 rounded-xl border border-gray-100"></div>
            <div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                <Zap className="text-purple-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-black">
                Instant Analysis
              </h3>
              <p className="text-[var(--muted)]">
                Process 100+ pages in seconds using our optimized vector engine.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
