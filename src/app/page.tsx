export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Enhanced gradient background with higher opacity */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-slate-950 to-purple-900/60" />
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* HERO SECTION */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl mb-8">
          <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-sm text-gray-200 font-medium">AI Education Platform · 2025</span>
        </div>

        {/* Main heading - PERFECTLY CENTERED */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-center mb-6 tracking-tight leading-none">
          <span className="block text-white mb-2">Master AI.</span>
          <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
            Build the future.
          </span>
        </h1>

        {/* Subheading - CENTERED */}
        <p className="text-gray-300 text-xl md:text-2xl text-center max-w-3xl mx-auto mb-12 leading-relaxed">
          The #1 platform to learn prompt engineering, AI coding, AI design, and automation.
          Go from beginner to AI-powered creator — for free.
        </p>

        {/* CTA Buttons - PROPERLY CENTERED WITH PADDING */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button className="group px-10 py-5 bg-white text-slate-950 rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-3 shadow-2xl shadow-blue-500/30 min-w-[220px] justify-center">
            <span>Start learning free</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <button className="px-10 py-5 rounded-full font-medium text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 min-w-[200px]">
            Browse prompts
          </button>
        </div>

        {/* Stats - CENTERED */}
        <div className="flex items-center justify-center gap-16 text-sm">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-1">50K+</div>
            <div className="text-gray-400 font-medium">Learners</div>
          </div>
          <div className="w-px h-16 bg-white/20" />
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-1">1,200+</div>
            <div className="text-gray-400 font-medium">AI Prompts</div>
          </div>
          <div className="w-px h-16 bg-white/20" />
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-1">80+</div>
            <div className="text-gray-400 font-medium">Tutorials</div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION - PERFECTLY CENTERED */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section header - CENTERED */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              One platform. Every AI skill.
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
              Whether you want to write better, code faster, design smarter, or automate everything — we have the resources.
            </p>
          </div>

          {/* Feature cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/30 to-blue-600/30 flex items-center justify-center mb-6 border border-blue-500/20">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI Learning Hub</h3>
              <p className="text-gray-400 leading-relaxed mb-6">Structured courses on AI fundamentals, GPT-4, Claude, Gemini, and the latest models. No PhD required.</p>
              <div className="flex items-center gap-2 text-blue-400 font-medium group-hover:gap-3 transition-all">
                <span>Explore</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/30 to-purple-600/30 flex items-center justify-center mb-6 border border-purple-500/20">
                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Prompt Library</h3>
              <p className="text-gray-400 leading-relaxed mb-6">1,200+ hand-crafted prompts for writing, coding, business, and creativity. Copy, customize, and deploy.</p>
              <div className="flex items-center gap-2 text-purple-400 font-medium group-hover:gap-3 transition-all">
                <span>Explore</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-cyan-600/30 flex items-center justify-center mb-6 border border-cyan-500/20">
                <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI Coding Academy</h3>
              <p className="text-gray-400 leading-relaxed mb-6">Build real apps with AI. Learn Cursor, Copilot, v0, Bolt, and how to pair-program with LLMs.</p>
              <div className="flex items-center gap-2 text-cyan-400 font-medium group-hover:gap-3 transition-all">
                <span>Explore</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/30 to-pink-600/30 flex items-center justify-center mb-6 border border-pink-500/20">
                <svg className="w-7 h-7 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI Design Academy</h3>
              <p className="text-gray-400 leading-relaxed mb-6">Master Midjourney, DALL-E, Stable Diffusion, and Figma AI. Create stunning visuals without a design degree.</p>
              <div className="flex items-center gap-2 text-pink-400 font-medium group-hover:gap-3 transition-all">
                <span>Explore</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Card 5 */}
            <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500/30 to-orange-600/30 flex items-center justify-center mb-6 border border-yellow-500/20">
                <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Automation</h3>
              <p className="text-gray-400 leading-relaxed mb-6">Build n8n, Zapier, and Make workflows. Automate your business and reclaim hours every week.</p>
              <div className="flex items-center gap-2 text-yellow-400 font-medium group-hover:gap-3 transition-all">
                <span>Explore</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Card 6 */}
            <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/30 to-teal-600/30 flex items-center justify-center mb-6 border border-green-500/20">
                <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Community</h3>
              <p className="text-gray-400 leading-relaxed mb-6">Connect with 50K+ AI creators. Share projects, get feedback, find collaborators, and grow together.</p>
              <div className="flex items-center gap-2 text-green-400 font-medium group-hover:gap-3 transition-all">
                <span>Explore</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}