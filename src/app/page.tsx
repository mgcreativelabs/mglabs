import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/20 to-purple-950/20">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm text-white/70">AI Education Platform · 2025</span>
          </div>

          {/* Main heading - BIGGER TEXT */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            <span className="block text-white mb-2">Master AI.</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
              Build the future.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-white/60 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            The #1 platform to learn prompt engineering, AI coding, AI design, and automation.
            Go from beginner to AI-powered creator — for free.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button className="group px-8 py-4 bg-white text-slate-950 rounded-full font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2">
              Start learning free
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button className="px-8 py-4 rounded-full font-medium text-white border border-white/20 hover:bg-white/5 transition-colors duration-300">
              Browse prompts
            </button>
          </div>

          {/* Stats */}
          <div className="pt-12 flex items-center justify-center gap-8 text-sm text-white/40">
            <div className="text-center">
              <div className="text-2xl font-semibold text-white">50K+</div>
              <div>Learners</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-semibold text-white">1,200+</div>
              <div>AI Prompts</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-semibold text-white">80+</div>
              <div>Tutorials</div>
            </div>
          </div>
        </div>
      </section>

      {/* GRID SECTION */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-6 py-20 max-w-7xl mx-auto">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
          <h3 className="text-lg font-semibold text-white mb-2">AI Courses</h3>
          <p className="text-white/60 text-sm">Learn structured AI workflows.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
          <h3 className="text-lg font-semibold text-white mb-2">Prompt Engineering</h3>
          <p className="text-white/60 text-sm">Master high-performance prompting.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
          <h3 className="text-lg font-semibold text-white mb-2">Automation</h3>
          <p className="text-white/60 text-sm">Build systems that run themselves.</p>
        </div>
      </section>
    </main>
  );
}