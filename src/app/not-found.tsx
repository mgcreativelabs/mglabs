import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center mesh-bg px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-display font-bold text-gradient mb-4">404</div>
        <h1 className="text-2xl font-display font-bold text-ink mb-3">Page not found</h1>
        <p className="text-ink-muted mb-8 leading-relaxed">
          This page doesn&apos;t exist or was moved. Let&apos;s get you back on track.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/"><Button variant="primary" leftIcon={<Home className="h-4 w-4" />}>Go home</Button></Link>
          <Link href="/ai-learning-hub"><Button variant="secondary">Explore courses</Button></Link>
        </div>
      </div>
    </div>
  );
}
