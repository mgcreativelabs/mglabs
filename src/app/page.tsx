export default function Home() {
  return (
    <div className="space-y-20">
      
      {/* HERO */}
      <section className="text-center space-y-6 py-20">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
          Build AI-Driven Creative Systems
        </h1>

        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Learn AI, prompt engineering, and modern automation with a clean, focused experience.
        </p>
      </section>

      {/* GRID SECTION */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold">AI Courses</h3>
          <p className="text-white/60 mt-2 text-sm">
            Learn structured AI workflows.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold">Prompt Engineering</h3>
          <p className="text-white/60 mt-2 text-sm">
            Master high-performance prompting.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold">Automation</h3>
          <p className="text-white/60 mt-2 text-sm">
            Build systems that run themselves.
          </p>
        </div>

      </section>

    </div>
  )
}