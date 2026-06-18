import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center mesh-bg px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-gradient mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-gray-500 mb-8">This page doesn&apos;t exist or was moved.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-brand text-white font-semibold hover:scale-[1.02] transition-all">
          Go home
        </Link>
      </div>
    </div>
  );
}