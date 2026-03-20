"use client";

import { useState } from "react";
import { CityKey, ProfileKey, getCosts } from "@/lib/costData";

type Locale = "pt" | "es" | "en";

const cityLabels: Record<Locale, Record<CityKey, string>> = {
  pt: { madrid: "Madrid", barcelona: "Barcelona", valencia: "Valência", sevilla: "Sevilha", granada: "Granada", malaga: "Málaga", bilbao: "Bilbao" },
  es: { madrid: "Madrid", barcelona: "Barcelona", valencia: "Valencia", sevilla: "Sevilla", granada: "Granada", malaga: "Málaga", bilbao: "Bilbao" },
  en: { madrid: "Madrid", barcelona: "Barcelona", valencia: "Valencia", sevilla: "Seville", granada: "Granada", malaga: "Malaga", bilbao: "Bilbao" },
};

const profileLabels: Record<Locale, Record<ProfileKey, { label: string; icon: string }>> = {
  pt: { solo: { label: "Sozinho(a)", icon: "🧑" }, couple: { label: "Casal", icon: "👫" }, family: { label: "Família", icon: "👨‍👩‍👧" } },
  es: { solo: { label: "Solo/a", icon: "🧑" }, couple: { label: "Pareja", icon: "👫" }, family: { label: "Familia", icon: "👨‍👩‍👧" } },
  en: { solo: { label: "Solo", icon: "🧑" }, couple: { label: "Couple", icon: "👫" }, family: { label: "Family", icon: "👨‍👩‍👧" } },
};

const catLabels: Record<Locale, Record<string, string>> = {
  pt: { rent: "Aluguel", groceries: "Supermercado", transport: "Transporte", health: "Saúde", leisure: "Lazer", total: "Total estimado" },
  es: { rent: "Alquiler", groceries: "Supermercado", transport: "Transporte", health: "Salud", leisure: "Ocio", total: "Total estimado" },
  en: { rent: "Rent", groceries: "Groceries", transport: "Transport", health: "Health", leisure: "Leisure", total: "Estimated total" },
};

const uiLabels: Record<Locale, { step1: string; step2: string; step3: string; resultCta: string; placeholder: string; send: string; month: string; back: string; next: string; success: string }> = {
  pt: { step1: "Escolha a cidade", step2: "Seu perfil", step3: "Resultado", resultCta: "Receber relatório completo por email", placeholder: "seu@email.com", send: "Enviar", month: "/mês", back: "Voltar", next: "Continuar", success: "Enviado! Verifique seu email." },
  es: { step1: "Elige la ciudad", step2: "Tu perfil", step3: "Resultado", resultCta: "Recibir informe completo por email", placeholder: "tu@email.com", send: "Enviar", month: "/mes", back: "Volver", next: "Continuar", success: "¡Enviado! Revisa tu email." },
  en: { step1: "Choose the city", step2: "Your profile", step3: "Result", resultCta: "Get full report by email", placeholder: "your@email.com", send: "Send", month: "/month", back: "Back", next: "Continue", success: "Sent! Check your email." },
};

const cities: CityKey[] = ["madrid", "barcelona", "valencia", "sevilla", "granada", "malaga", "bilbao"];
const profiles: ProfileKey[] = ["solo", "couple", "family"];

export default function Calculator({ lang }: { lang: Locale }) {
  const [step, setStep] = useState(1);
  const [city, setCity] = useState<CityKey | null>(null);
  const [profile, setProfile] = useState<ProfileKey | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const ui = uiLabels[lang];
  const costs = city && profile ? getCosts(city, profile) : null;

  const barMax = costs ? costs.total : 1;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {[ui.step1, ui.step2, ui.step3].map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step > i + 1 ? "bg-brand-600 text-white" : step === i + 1 ? "bg-brand-600 text-white" : "bg-gray-200 text-gray-500"
            }`}>
              {step > i + 1 ? "✓" : i + 1}
            </div>
            <span className={`text-sm hidden sm:inline ${step === i + 1 ? "font-semibold text-gray-900" : "text-gray-400"}`}>
              {label}
            </span>
            {i < 2 && <div className="w-8 h-px bg-gray-300" />}
          </div>
        ))}
      </div>

      {/* Step 1: City selection */}
      {step === 1 && (
        <div className="space-y-3">
          <h3 className="text-2xl font-black text-gray-900 text-center mb-8 uppercase tracking-tight font-heading">{ui.step1}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {cities.map((c) => (
              <button
                key={c}
                onClick={() => { setCity(c); setStep(2); }}
                className={`p-6 rounded-lg border-2 text-left transition-all hover:shadow-xl ${
                  city === c ? "border-brand-600 bg-brand-50 shadow-md" : "border-gray-100 hover:border-brand-200"
                }`}
              >
                <span className="text-lg font-black text-gray-900 uppercase tracking-tighter">{cityLabels[lang][c]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Profile selection */}
      {step === 2 && (
        <div className="space-y-3">
          <h3 className="text-2xl font-black text-gray-900 text-center mb-8 uppercase tracking-tight font-heading">{ui.step2}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {profiles.map((p) => (
              <button
                key={p}
                onClick={() => { setProfile(p); setStep(3); }}
                className={`p-8 rounded-lg border-2 text-center transition-all hover:shadow-xl ${
                  profile === p ? "border-brand-600 bg-brand-50 shadow-md" : "border-gray-100 hover:border-brand-200"
                }`}
              >
                <div className="text-4xl mb-4">{profileLabels[lang][p].icon}</div>
                <span className="text-lg font-black text-gray-900 uppercase tracking-tighter">{profileLabels[lang][p].label}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="text-xs font-bold text-gray-400 hover:text-brand-600 mt-8 uppercase tracking-widest transition-colors flex items-center gap-2 mx-auto">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
            {ui.back}
          </button>
        </div>
      )}

      {/* Step 3: Results */}
      {step === 3 && costs && city && profile && (
        <div>
          <div className="text-center mb-10">
            <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter font-heading">
              {cityLabels[lang][city]} <span className="text-brand-600">/</span> {profileLabels[lang][profile].label}
            </h3>
          </div>

          <div className="bg-white rounded-lg border border-gray-100 shadow-2xl overflow-hidden">
            {(["rent", "groceries", "transport", "health", "leisure"] as const).map((cat) => (
              <div key={cat} className="flex items-center justify-between px-8 py-6 border-b border-gray-50">
                <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">{catLabels[lang][cat]}</span>
                <div className="flex items-center gap-6">
                  <div className="w-32 bg-gray-50 rounded-full h-1.5 hidden sm:block">
                    <div
                      className="bg-brand-600 h-1.5 rounded-full transition-all"
                      style={{ width: `${(costs[cat] / barMax) * 100}%` }}
                    />
                  </div>
                  <span className="font-black text-gray-900 w-24 text-right text-xl tracking-tighter">
                    €{costs[cat]}
                  </span>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between px-8 py-8 bg-brand-600 text-white">
              <span className="font-black text-xl uppercase tracking-tighter">{catLabels[lang]["total"]}</span>
              <div className="text-right">
                <span className="font-black text-4xl tracking-tighter block leading-none">
                  €{costs.total}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">{ui.month}</span>
              </div>
            </div>
          </div>

          {/* Lead capture */}
          <div className="mt-12 bg-gray-900 rounded-lg p-10 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-600/20 rounded-full blur-3xl -mr-16 -mt-16" />
            <p className="font-black text-lg mb-6 text-center uppercase tracking-tighter relative z-10">{ui.resultCta}</p>
            {!submitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Lead captured:", { email, city, profile });
                  setSubmitted(true);
                }}
                className="flex flex-col sm:flex-row gap-3 relative z-10"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={ui.placeholder}
                  className="flex-1 px-6 py-4 rounded bg-white/10 border-none text-white placeholder:text-gray-500 focus:ring-2 focus:ring-brand-600 outline-none transition font-medium"
                />
                <button
                  type="submit"
                  className="bg-brand-600 text-white font-black px-8 py-4 rounded hover:bg-brand-700 transition uppercase tracking-widest text-xs active:scale-95 shadow-lg shadow-brand-600/20"
                >
                  {ui.send}
                </button>
              </form>
            ) : (
              <p className="text-center text-accent-yellow font-black uppercase tracking-widest text-sm relative z-10">{ui.success}</p>
            )}
          </div>

          <button onClick={() => { setStep(1); setCity(null); setProfile(null); setSubmitted(false); setEmail(""); }} className="text-[10px] font-black text-gray-400 hover:text-brand-600 mt-10 block mx-auto uppercase tracking-[0.3em] transition-colors">
             {ui.back}
          </button>
        </div>
      )}
    </div>
  );
}
