import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowRight, Palette, Image, Layers, Wand2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Design Academy",
  description: "Master AI design tools — Midjourney, DALL-E, Stable Diffusion, Figma AI. Create stunning visuals without a design degree.",
};

const modules = [
  { icon: Image, title: "AI Image Generation", description: "Master Midjourney v6, DALL-E 3, and Stable Diffusion. Learn prompt techniques for photorealistic, artistic, and branded visuals.", tools: ["Midjourney", "DALL-E 3", "Stable Diffusion"] },
  { icon: Layers, title: "Brand Identity with AI", description: "Create complete brand identities — logos, color palettes, typography, and brand guidelines — using AI design tools.", tools: ["Adobe Firefly", "Canva AI", "Looka"] },
  { icon: Wand2, title: "UI/UX with AI", description: "Design interfaces and prototypes 10x faster using Figma AI, Galileo, and other AI-native design tools.", tools: ["Figma AI", "Galileo", "Framer AI"] },
  { icon: Palette, title: "AI Video & Motion", description: "Create professional videos, animations, and motion graphics using Runway, Pika, and Kling AI.", tools: ["Runway", "Pika", "Kling"] },
];

export default function AIDesignAcademyPage() {
  return (
    <div className="pt-16 min-h-screen">
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center mesh-bg">
        <Badge variant="purple" className="mb-5"><Palette className="h-3 w-3" /> Creative AI</Badge>
        <h1 className="text-5xl sm:text-6xl font-display font-bold text-white mb-5 leading-tight">
          AI Design <span className="text-gradient">Academy</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
          No design degree needed. Learn to create stunning visuals, brands, and interfaces with the power of AI.
        </p>
      </section>

      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-5">
          {modules.map((mod) => (
      <Card key={mod.title} className="glass border border-white/[0.06] card-hover p-6">
  <div className="p-2.5 rounded-xl bg-surface-3 w-fit mb-4">
    <mod.icon className="h-5 w-5 text-brand-purple" />
  </div>

  <h3 className="font-semibold text-white text-lg mb-2">
    {mod.title}
  </h3>
</Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/signup">
            <Button size="xl" variant="primary" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Start creating with AI
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
