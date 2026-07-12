// =============================================
// SERVICES GRID — src/components/sections/ServicesGrid.tsx
// Shared service-card grid used on /services and /pricing.
// =============================================
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/data/services";

export function ServicesGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6 items-start">
      {SERVICES.map((service) => (
        <div
          key={service.id}
          className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 ${
            service.featured
              ? "bg-white border-2 border-brand-blue/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
              : "glass border border-border hover:border-border-strong"
          }`}
        >
          {service.featured && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-brand-blue/40" />
          )}

          <div className="flex items-center gap-2.5 mb-4">
            <div className={`p-2 rounded-lg ${service.featured ? "bg-brand-blue/20" : "bg-surface-2"}`}>
              <service.Icon className={`h-4 w-4 ${service.featured ? "text-brand-blue" : "text-ink-2"}`} />
            </div>
            <span className="font-bold text-ink text-lg leading-tight">{service.name}</span>
          </div>

          {service.price && (
            <div className="mb-4">
              <span className={`text-2xl font-black ${service.featured ? "text-ink" : "text-ink"}`}>
                {service.price}
              </span>
            </div>
          )}

          <p className={`text-sm leading-relaxed mb-5 ${service.featured ? "text-ink-2" : "text-ink-2"}`}>
            {service.description}
          </p>

          <ul className="space-y-2.5 flex-1 mb-6">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check
                  className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                    service.featured ? "text-brand-blue" : "text-green-400"
                  }`}
                />
                <span className="text-sm text-ink-2 leading-snug">{item}</span>
              </li>
            ))}
          </ul>

          <Link href={service.cta.href}>
            <Button
              variant={service.featured ? "primary" : "secondary"}
              className="w-full"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              {service.cta.label}
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
