import type { Metadata } from "next";
import Link from "next/link";
import { Palette, Image, Layers, Wand2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Design Academy",
  description: "Master Midjourney, DALL-E, Stable Diffusion and Figma AI without a design degree.",
};

const modules = [
  { icon: Image, title: "AI Image Generation", description: "Master Midjourney v6, DALL-E 3 and Stable Diffusion for photorealistic and artistic visuals.", tools: ["Midjourney", "DALL-E 3", "Stable Diffusion"] },
  { icon: Layers, title: "Brand Identity with AI", description: "Create complete brand identities — logos, color palettes, typography and brand guidelines.", tools: ["Adobe Firefly", "Canva AI", "Looka"] },
  { icon: Wand2, title: "UI/UX with AI", description: "Design interfaces 10x faster using Figma AI, Galileo and other AI-native design tools.", tools: ["Figma AI", "Galileo", "Framer AI"] },
  { icon: Palette, title: "AI Video & Motion", description: "Create professional videos and animations using Runway, Pika and Kling AI.", tools: ["Runway", "Pika", "Kling"] },
];

export default function AIDesignAcademyPage() {
  return (
    <div className="pt-16 min-h-screen">
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center mesh-bg">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-sm font-medium mb-5">
          <Palette className="h-3.5 w-3.5" /> Creative AI
        </span>
        <h1 className="text-5xl font-bold text-white mb-5">AI Design <span className="text-gradient">Academy</span></h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">No design degree needed. Create stunning visuals, brands and interfaces with AI.</p>
      </section>

      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto pb-20">
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {modules.map((mod) => (
            <div key={mod.title} className="rounded-2xl bg-surface-1 border border-brand-purple/20 p-6 hover:border-brand-purple/40 transition-all">
              <div className="p-2.5 rounded-xl bg-brand-purple/10 w-fit mb-4"><mod.icon className="h-5 w-5 text-brand-purple" /></div>
              <h3 className="font-semibold text-white text-lg mb-2">{mod.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{mod.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {mod.tools.map((tool) => (
                  <span key={tool} className="text-xs text-brand-purple bg-brand-purple/10 px-2 py-0.5 rounded-md border border-brand-purple/20">{tool}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-brand text-white font-semibold shadow-lg shadow-brand-blue/20 hover:scale-[1.02] transition-all">
            Start creating with AI <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}