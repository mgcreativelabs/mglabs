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
              ? "bg-gradient-to-b from-brand-blue/20 via-surface-1 to-brand-purple/10 border-2 border-brand-blue/50 shadow-2xl shadow-brand-blue/20"
              : "glass border border-white/[0.07] hover:border-white/15"
          }`}
        >
          {service.featured && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent" />
          )}

          <div className="flex items-center gap-2.5 mb-4">
            <div className={`p-2 rounded-lg ${service.featured ? "bg-brand-blue/20" : "bg-white/5"}`}>
              <service.Icon className={`h-4 w-4 ${service.featured ? "text-brand-blue" : "text-gray-400"}`} />
            </div>
            <span className="font-bold text-white text-lg leading-tight">{service.name}</span>
          </div>

          {service.price && (
            <div className="mb-4">
              <span className={`text-2xl font-black ${service.featured ? "text-white" : "text-gray-200"}`}>
                {service.price}
              </span>
            </div>
          )}

          <p className={`text-sm leading-relaxed mb-5 ${service.featured ? "text-gray-300" : "text-gray-400"}`}>
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
                <span className="text-sm text-gray-300 leading-snug">{item}</span>
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
