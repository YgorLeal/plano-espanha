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
          <h3 className="text-xl font-bold text-gray-900 text-center mb-6">{ui.step1}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {cities.map((c) => (
              <button
                key={c}
                onClick={() => { setCity(c); setStep(2); }}
                className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                  city === c ? "border-brand-500 bg-brand-50" : "border-gray-200 hover:border-brand-300"
                }`}
              >
                <span className="text-lg font-semibold text-gray-900">{cityLabels[lang][c]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Profile selection */}
      {step === 2 && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-6">{ui.step2}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {profiles.map((p) => (
              <button
                key={p}
                onClick={() => { setProfile(p); setStep(3); }}
                className={`p-6 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                  profile === p ? "border-brand-500 bg-brand-50" : "border-gray-200 hover:border-brand-300"
                }`}
              >
                <div className="text-3xl mb-2">{profileLabels[lang][p].icon}</div>
                <span className="text-lg font-semibold text-gray-900">{profileLabels[lang][p].label}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-brand-600 mt-4">
            ← {ui.back}
          </button>
        </div>
      )}

      {/* Step 3: Results */}
      {step === 3 && costs && city && profile && (
        <div>
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900">
              {cityLabels[lang][city]} — {profileLabels[lang][profile].label}
            </h3>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {(["rent", "groceries", "transport", "health", "leisure"] as const).map((cat) => (
              <div key={cat} className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <span className="text-gray-700 font-medium">{catLabels[lang][cat]}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-100 rounded-full h-2.5 hidden sm:block">
                    <div
                      className="bg-brand-500 h-2.5 rounded-full transition-all"
                      style={{ width: `${(costs[cat] / barMax) * 100}%` }}
                    />
                  </div>
                  <span className="font-bold text-gray-900 w-20 text-right">
                    €{costs[cat]}
                  </span>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between px-6 py-5 bg-brand-50">
              <span className="text-brand-800 font-bold text-lg">{catLabels[lang]["total"]}</span>
              <span className="text-brand-700 font-extrabold text-2xl">
                €{costs.total}<span className="text-sm font-normal">{ui.month}</span>
              </span>
            </div>
          </div>

          {/* Lead capture */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <p className="text-gray-700 font-medium mb-4 text-center">{ui.resultCta}</p>
            {!submitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: integrate with MailerLite/Brevo API
                  console.log("Lead captured:", { email, city, profile });
                  setSubmitted(true);
                }}
                className="flex gap-3"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={ui.placeholder}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition"
                />
                <button
                  type="submit"
                  className="bg-brand-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-700 transition"
                >
                  {ui.send}
                </button>
              </form>
            ) : (
              <p className="text-center text-green-600 font-semibold">{ui.success}</p>
            )}
          </div>

          <button onClick={() => { setStep(1); setCity(null); setProfile(null); setSubmitted(false); setEmail(""); }} className="text-sm text-gray-500 hover:text-brand-600 mt-6 block mx-auto">
            ← {ui.back}
          </button>
        </div>
      )}
    </div>
  );
}
