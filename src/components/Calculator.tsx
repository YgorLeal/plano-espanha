"use client";

import { useState } from "react";
import { CityKey, ProfileKey, HousingKey, getCosts, costCategories } from "@/lib/costData";
import { Locale } from "@/lib/i18n";
import { getCalculatorWidgetContent } from "@/lib/siteCopy";
import ContentFeedback from "@/components/ContentFeedback";

const cityOrder: CityKey[] = ["madrid", "barcelona", "valencia", "sevilla", "granada", "malaga", "bilbao"];
const profileOrder: ProfileKey[] = ["solo", "couple", "family"];
const housingOptions: HousingKey[] = ["apartment", "room"];

export default function Calculator({ lang }: { lang: Locale }) {
  const content = getCalculatorWidgetContent(lang);
  const [step, setStep] = useState(1);
  const [city, setCity] = useState<CityKey | null>(null);
  const [profile, setProfile] = useState<ProfileKey | null>(null);
  const [housing, setHousing] = useState<HousingKey>("apartment");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "error">("idle");

  const hasHousingStep = profile !== null && profile !== "family";
  const resultStep = hasHousingStep ? 4 : 3;
  const costs = city && profile ? getCosts(city, profile, housing) : null;
  const barMax = costs ? costs.total : 1;
  const breakdown = costs
    ? [
        { key: "rent" as const, label: content.categoryLabels.rent, value: costs.rent },
        { key: "groceries" as const, label: content.categoryLabels.groceries, value: costs.groceries },
        { key: "transport" as const, label: content.categoryLabels.transport, value: costs.transport },
      ]
    : [];
  const steps = hasHousingStep
    ? [content.ui.step1, content.ui.step2, content.ui.stepHousing, content.ui.stepResult]
    : [content.ui.step1, content.ui.step2, content.ui.stepResult];

  const handleProfileSelect = (nextProfile: ProfileKey) => {
    setProfile(nextProfile);
    setHousing("apartment");
    setStep(3);
  };

  const reset = () => {
    setStep(1);
    setCity(null);
    setProfile(null);
    setHousing("apartment");
    setSubmitted(false);
    setEmail("");
    setShareStatus("idle");
  };

  const shareResult = async () => {
    if (!city || !profile || !costs) return;

    const summary = [
      `${content.cityLabels[city]} / ${content.profileLabels[profile].label}`,
      `${content.categoryLabels.total}: €${costs.total}${content.ui.month}`,
      `${content.categoryLabels.rent}: €${costs.rent}`,
      `${content.categoryLabels.groceries}: €${costs.groceries}`,
      `${content.categoryLabels.transport}: €${costs.transport}`,
    ].join("\n");

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${content.cityLabels[city]} / ${content.profileLabels[profile].label}`,
          text: summary,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(summary);
        setShareStatus("copied");
        return;
      }
      setShareStatus("copied");
    } catch {
      setShareStatus("error");
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-10 flex items-center justify-center gap-2">
        {steps.map((label, index) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                step > index + 1 ? "bg-brand-600 text-white" : step === index + 1 ? "bg-brand-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {step > index + 1 ? "✓" : index + 1}
            </div>
            <span className={`hidden text-sm sm:inline ${step === index + 1 ? "font-semibold text-gray-900" : "text-gray-400"}`}>{label}</span>
            {index < steps.length - 1 && <div className="h-px w-8 bg-gray-300" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-3">
          <h3 className="mb-8 text-center font-heading text-2xl font-black uppercase tracking-tight text-gray-900">
            {content.ui.step1}
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {cityOrder.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setCity(item);
                  setStep(2);
                }}
                className={`rounded-lg border-2 p-6 text-left transition-all hover:shadow-xl ${
                  city === item ? "border-brand-600 bg-brand-50 shadow-md" : "border-gray-100 hover:border-brand-200"
                }`}
              >
                <span className="text-lg font-black uppercase tracking-tighter text-gray-900">
                  {content.cityLabels[item]}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <h3 className="mb-8 text-center font-heading text-2xl font-black uppercase tracking-tight text-gray-900">
            {content.ui.step2}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {profileOrder.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleProfileSelect(item)}
                className={`rounded-lg border-2 p-8 text-center transition-all hover:shadow-xl ${
                  profile === item ? "border-brand-600 bg-brand-50 shadow-md" : "border-gray-100 hover:border-brand-200"
                }`}
              >
                <div className="mb-4 text-4xl">{content.profileLabels[item].icon}</div>
                <span className="text-lg font-black uppercase tracking-tighter text-gray-900">
                  {content.profileLabels[item].label}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="mx-auto mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 transition-colors hover:text-brand-600"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            {content.ui.back}
          </button>
        </div>
      )}

      {step === 3 && hasHousingStep && (
        <div className="space-y-3">
          <h3 className="mb-8 text-center font-heading text-2xl font-black uppercase tracking-tight text-gray-900">
            {content.ui.stepHousing}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {housingOptions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setHousing(item);
                  setStep(4);
                }}
                className={`rounded-lg border-2 p-8 text-center transition-all hover:shadow-xl ${
                  housing === item ? "border-brand-600 bg-brand-50 shadow-md" : "border-gray-100 hover:border-brand-200"
                }`}
              >
                <div className="mb-4 text-4xl">{content.housingLabels[item].icon}</div>
                <span className="block text-lg font-black uppercase tracking-tighter text-gray-900">
                  {content.housingLabels[item].label}
                </span>
                <span className="mt-2 block text-sm text-gray-400">{content.housingLabels[item].desc}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="mx-auto mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 transition-colors hover:text-brand-600"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            {content.ui.back}
          </button>
        </div>
      )}

      {step === resultStep && costs && city && profile && (
        <div>
          <div className="mb-10 text-center">
            <h3 className="font-heading text-3xl font-black uppercase tracking-tighter text-gray-900">
              {content.cityLabels[city]} <span className="text-brand-600">/</span> {content.profileLabels[profile].label}
            </h3>
            {hasHousingStep && (
              <p className="mt-2 text-sm font-bold uppercase tracking-widest text-gray-400">
                {content.housingLabels[housing].icon} {content.housingLabels[housing].label}
              </p>
            )}
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-2xl">
            {costCategories.map((category) => (
              <div key={category} className="flex items-center justify-between border-b border-gray-50 px-8 py-6">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  {content.categoryLabels[category]}
                </span>
                <div className="flex items-center gap-6">
                  <div className="hidden h-1.5 w-32 rounded-full bg-gray-50 sm:block">
                    <div className="h-1.5 rounded-full bg-brand-600 transition-all" style={{ width: `${(costs[category] / barMax) * 100}%` }} />
                  </div>
                  <span className="w-24 text-right text-xl font-black tracking-tighter text-gray-900">€{costs[category]}</span>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between bg-brand-600 px-8 py-8 text-white">
              <span className="text-xl font-black uppercase tracking-tighter">{content.categoryLabels.total}</span>
              <div className="text-right">
                <span className="block text-4xl font-black tracking-tighter leading-none">€{costs.total}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">{content.ui.month}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-gray-200 bg-gray-50 p-6">
            <div className="text-[10px] font-black uppercase tracking-[0.28em] text-brand-600">
              {content.ui.breakdownTitle}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{content.ui.breakdownIntro}</p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {breakdown.map((item) => {
                const share = Math.round((item.value / costs.total) * 100);

                return (
                  <div key={item.key} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-400">
                          {item.label}
                        </div>
                        <div className="mt-2 text-2xl font-black tracking-tighter text-gray-900">€{item.value}</div>
                      </div>
                      <div className="rounded-full bg-brand-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-brand-700">
                        {share}
                        {content.ui.shareOfTotal}
                      </div>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-brand-600" style={{ width: `${share}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative mt-12 overflow-hidden rounded-lg bg-gray-900 p-10 text-white shadow-xl">
            <div className="absolute -mr-16 -mt-16 right-0 top-0 h-32 w-32 rounded-full bg-brand-600/20 blur-3xl" />
            <p className="relative z-10 mb-6 text-center text-lg font-black uppercase tracking-tighter">
              {content.ui.resultCta}
            </p>
            {!submitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Lead captured:", { email, city, profile, housing });
                  setSubmitted(true);
                }}
                className="relative z-10 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={content.ui.placeholder}
                  className="flex-1 rounded border-none bg-white/10 px-6 py-4 font-medium text-white outline-none transition placeholder:text-gray-500 focus:ring-2 focus:ring-brand-600"
                />
                <button
                  type="submit"
                  className="rounded bg-brand-600 px-8 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-brand-600/20 transition active:scale-95 hover:bg-brand-700"
                >
                  {content.ui.send}
                </button>
              </form>
            ) : (
              <p className="relative z-10 text-center text-sm font-black uppercase tracking-widest text-accent-yellow">
                {content.ui.success}
              </p>
            )}
          </div>

          <div className="mt-5 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={shareResult}
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-4 text-xs font-black uppercase tracking-[0.24em] text-gray-700 transition hover:border-brand-600 hover:text-brand-600"
            >
              {content.ui.share}
            </button>
            {shareStatus === "copied" ? (
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-600">{content.ui.shareSuccess}</p>
            ) : null}
          </div>

          <ContentFeedback slug={`calculator:${city}:${profile}`} lang={lang} />

          <button
            type="button"
            onClick={reset}
            className="mx-auto mt-10 block text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 transition-colors hover:text-brand-600"
          >
            {content.ui.back}
          </button>
        </div>
      )}
    </div>
  );
}
