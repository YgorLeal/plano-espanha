"use client";

import { useState } from "react";
import { Locale } from "@/lib/i18n";
import { evaluateVisaProfile, getOfficialSources, getVisaCopy, type VisaFamilyTie, type VisaIncome, type VisaInputs, type VisaLocation, type VisaObjective, type VisaOfferLevel, type VisaProjectType, type VisaStatus, type VisaStudyStatus, type VisaWorkMode, type VisaMonthsInSpain } from "@/lib/visaRules";
import { getVisaSimulatorWidgetContent, type VisaSimulatorContent } from "@/lib/siteCopy";

type Choice<Value extends string> = {
  value: Value;
  label: string;
  hint?: string;
};

function ChoiceGroup<Value extends string>({
  label,
  value,
  options,
  onChange,
  columns = 2,
}: {
  label: string;
  value: Value | null;
  options: Choice<Value>[];
  onChange: (value: Value) => void;
  columns?: 1 | 2 | 3;
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-gray-500">{label}</p>
      <div className={`grid gap-3 grid-cols-1 ${columns === 2 ? "sm:grid-cols-2" : columns === 3 ? "sm:grid-cols-3" : ""}`}>
        {options.map((option) => {
          const active = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                active
                  ? "border-brand-600 bg-brand-50 shadow-md shadow-brand-100"
                  : "border-gray-200 bg-white hover:border-brand-300 hover:shadow-sm"
              }`}
            >
              <span className="block text-sm font-black uppercase tracking-tight text-gray-900">{option.label}</span>
              {option.hint ? <span className="mt-1 block text-xs leading-relaxed text-gray-500">{option.hint}</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResultCard({
  title,
  summary,
  score,
  confidence,
  reasons,
  checks,
  caution,
  sources,
  labels,
  highlight = false,
}: {
  title: string;
  summary: string;
  score: number;
  confidence: string;
  reasons: string[];
  checks: string[];
  caution: string[];
  sources: { label: string; href: string }[];
  labels: VisaSimulatorContent["resultLabels"];
  highlight?: boolean;
}) {
  return (
    <article className={`rounded-3xl border p-6 shadow-sm ${highlight ? "border-brand-600 bg-brand-50/60 shadow-brand-100" : "border-gray-200 bg-white"}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.28em] text-brand-600">
            {highlight ? labels.topMatch : labels.alternative}
          </div>
          <h3 className="mt-2 text-2xl font-black uppercase tracking-tight text-gray-900">{title}</h3>
        </div>
        <div className="rounded-full bg-gray-900 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white">
          {confidence} · {score}
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-gray-600">{summary}</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-400">{labels.reasons}</div>
          <ul className="mt-2 space-y-2 text-sm text-gray-700">
            {reasons.map((reason) => (
              <li key={reason} className="rounded-xl bg-white px-3 py-2">
                {reason}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-400">{labels.checks}</div>
          <ul className="mt-2 space-y-2 text-sm text-gray-700">
            {checks.map((check) => (
              <li key={check} className="rounded-xl bg-white px-3 py-2">
                {check}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
        <div className="mb-2 text-[10px] font-black uppercase tracking-[0.22em]">{labels.warning}</div>
        <ul className="space-y-1">
          {caution.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {sources.map((source) => (
          <a
            key={source.href}
            href={source.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-gray-200 px-3 py-1 text-xs font-bold text-gray-700 transition hover:border-brand-600 hover:text-brand-600"
          >
            {labels.open}: {source.label}
          </a>
        ))}
      </div>
    </article>
  );
}

function buildChoices(content: VisaSimulatorContent) {
  return {
    location: content.options.location,
    objective: content.options.objective,
    work: content.options.work,
    income: content.options.income,
    offer: content.options.offer,
    study: content.options.study,
    family: content.options.family,
    months: content.options.months,
    status: content.options.status,
    project: content.options.project,
  };
}

export default function VisaSimulator({ lang }: { lang: Locale }) {
  const content = getVisaSimulatorWidgetContent(lang);
  const rulesCopy = getVisaCopy(lang);
  const choices = buildChoices(content);
  const sources = getOfficialSources(lang);

  const [answers, setAnswers] = useState<VisaInputs>({
    location: null,
    objective: null,
    workMode: null,
    income: null,
    offerLevel: null,
    studyStatus: null,
    familyTie: null,
    monthsInSpain: null,
    status: null,
    projectType: null,
  });
  const [submitted, setSubmitted] = useState(false);

  const assessment = submitted ? evaluateVisaProfile(lang, answers) : null;

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-2xl shadow-gray-100/70">
          <div className="mb-8">
            <div className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] text-brand-700">
              {content.title}
            </div>
            <h1 className="mt-4 font-heading text-4xl font-black uppercase tracking-tighter text-gray-900 md:text-5xl">
              {content.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">{content.subtitle}</p>
          </div>

          <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            <div className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-brand-600">
              {content.noteTitle}
            </div>
            <p>{content.noteBody}</p>
          </div>

          <div className="grid gap-5">
            <ChoiceGroup label={content.labels.location} value={answers.location} options={choices.location} onChange={(location) => setAnswers((prev) => ({ ...prev, location }))} columns={2} />
            <ChoiceGroup label={content.labels.objective} value={answers.objective} options={choices.objective} onChange={(objective) => setAnswers((prev) => ({ ...prev, objective }))} columns={2} />
            <ChoiceGroup label={content.labels.work} value={answers.workMode} options={choices.work} onChange={(workMode) => setAnswers((prev) => ({ ...prev, workMode }))} columns={2} />
            <ChoiceGroup label={content.labels.income} value={answers.income} options={choices.income} onChange={(income) => setAnswers((prev) => ({ ...prev, income }))} columns={2} />
            <ChoiceGroup label={content.labels.offer} value={answers.offerLevel} options={choices.offer} onChange={(offerLevel) => setAnswers((prev) => ({ ...prev, offerLevel }))} columns={3} />
            <ChoiceGroup label={content.labels.study} value={answers.studyStatus} options={choices.study} onChange={(studyStatus) => setAnswers((prev) => ({ ...prev, studyStatus }))} columns={2} />
            <ChoiceGroup label={content.labels.family} value={answers.familyTie} options={choices.family} onChange={(familyTie) => setAnswers((prev) => ({ ...prev, familyTie }))} columns={2} />
            <ChoiceGroup label={content.labels.months} value={answers.monthsInSpain} options={choices.months} onChange={(monthsInSpain) => setAnswers((prev) => ({ ...prev, monthsInSpain }))} columns={3} />
            <ChoiceGroup label={content.labels.status} value={answers.status} options={choices.status} onChange={(status) => setAnswers((prev) => ({ ...prev, status }))} columns={2} />
            <ChoiceGroup label={content.labels.project} value={answers.projectType} options={choices.project} onChange={(projectType) => setAnswers((prev) => ({ ...prev, projectType }))} columns={3} />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="rounded-full bg-brand-600 px-6 py-4 text-sm font-black uppercase tracking-[0.22em] text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!answers.location || !answers.objective}
            >
              {content.cta}
            </button>
            <button
              type="button"
              onClick={() => {
                setAnswers({
                  location: null,
                  objective: null,
                  workMode: null,
                  income: null,
                  offerLevel: null,
                  studyStatus: null,
                  familyTie: null,
                  monthsInSpain: null,
                  status: null,
                  projectType: null,
                });
                setSubmitted(false);
              }}
              className="rounded-full border border-gray-200 px-6 py-4 text-sm font-black uppercase tracking-[0.22em] text-gray-700 transition hover:border-brand-600 hover:text-brand-600"
            >
              {content.reset}
            </button>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-gray-500">{content.disclaimer}</p>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-gray-200 bg-gray-950 p-6 text-white shadow-2xl shadow-gray-900/30">
            <div className="text-[10px] font-black uppercase tracking-[0.28em] text-brand-300">{content.resultsTitle}</div>
            {!assessment ? (
              <p className="mt-4 text-sm leading-relaxed text-gray-300">{content.resultsEmpty}</p>
            ) : (
              <div className="mt-5 space-y-4">
                <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200">{assessment.disclaimer}</p>
                {assessment.results.length === 0 ? (
                  <div className="rounded-2xl bg-white p-5 text-gray-900">
                    <p className="font-black uppercase tracking-tight">{rulesCopy.noClearRoute}</p>
                    <p className="mt-2 text-sm text-gray-600">
                      {lang === "pt"
                        ? "Revise os campos ou fale com a equipe para validar o caso antes de avançar."
                        : lang === "es"
                        ? "Revisa los campos o habla con el equipo para validar el caso antes de seguir."
                        : "Review the fields or talk to the team to validate the case before moving ahead."}
                    </p>
                  </div>
                ) : (
                  assessment.results.map((result, index) => {
                    const { key, ...card } = result;
                    return <ResultCard key={key} highlight={index === 0} labels={content.resultLabels} {...card} />;
                  })
                )}
              </div>
            )}
          </div>

          <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-xl">
            <div className="text-[10px] font-black uppercase tracking-[0.28em] text-brand-600">{content.sourcesTitle}</div>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">{content.sourceIntro}</p>
            <div className="mt-5 space-y-3">
              {sources.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-3 transition hover:border-brand-600 hover:bg-brand-50"
                >
                  <span className="text-sm font-bold text-gray-900">{source.label}</span>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-600">{content.resultLabels.open}</span>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
