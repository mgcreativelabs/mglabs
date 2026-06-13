export function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-white/60 mt-2 text-sm">{description}</p>
    </div>
  );
}