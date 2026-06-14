export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-slate-950 to-purple-950/40" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8">
          <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-sm text-gray-300">AI Education Platform · 2025</span>
        </div>

        {/* Main heading */}
        <h1 className="text-6xl md:text-8xl font-bold text-center mb-6 tracking-tight">
          <span className="block text-white mb-2">Master AI.</span>
          <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
            Build the future.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-xl md:text-2xl text-center max-w-3xl mx-auto mb-12 leading-relaxed">
          The #1 platform to learn prompt engineering, AI coding, AI design, and automation.
          Go from beginner to AI-powered creator — for free.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button className="group px-8 py-4 bg-white text-slate-950 rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-2xl shadow-blue-500/20">
            Start learning free
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <button className="px-8 py-4 rounded-full font-medium text-white border border-white/20 hover:bg-white/5 transition-all duration-300">
            Browse prompts
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-12 text-sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">50K+</div>
            <div className="text-gray-500">Learners</div>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">1,200+</div>
            <div className="text-gray-500">AI Prompts</div>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">80+</div>
            <div className="text-gray-500">Tutorials</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              One platform. Every AI skill.
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Whether you want to write better, code faster, design smarter, or automate everything.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Learning Hub</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Structured courses on AI fundamentals, GPT-4, Claude, Gemini, and the latest models.</p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Prompt Library</h3>
              <p className="text-gray-400 text-sm leading-relaxed">1,200+ hand-crafted prompts for writing, coding, business, and creativity.</p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Coding Academy</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Build real apps with AI. Learn Cursor, Copilot, v0, Bolt, and pair-programming.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}