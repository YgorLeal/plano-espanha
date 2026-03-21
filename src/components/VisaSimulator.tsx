"use client";

import { useState } from "react";
import { Locale } from "@/lib/i18n";
import {
  evaluateVisaProfile,
  getOfficialSources,
  getVisaCopy,
  type VisaFamilyTie,
  type VisaIncome,
  type VisaInputs,
  type VisaLocation,
  type VisaObjective,
  type VisaOfferLevel,
  type VisaProjectType,
  type VisaStatus,
  type VisaStudyStatus,
  type VisaWorkMode,
  type VisaMonthsInSpain,
} from "@/lib/visaRules";

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
              <span className="block text-sm font-black uppercase tracking-tight text-gray-900">
                {option.label}
              </span>
              {option.hint ? (
                <span className="mt-1 block text-xs leading-relaxed text-gray-500">{option.hint}</span>
              ) : null}
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
  labels: { topMatch: string; alternative: string; reasons: string; checks: string; warning: string; open: string };
  highlight?: boolean;
}) {
  return (
    <article
      className={`rounded-3xl border p-6 shadow-sm ${
        highlight ? "border-brand-600 bg-brand-50/60 shadow-brand-100" : "border-gray-200 bg-white"
      }`}
    >
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
        <div className="font-black uppercase tracking-[0.22em] text-[10px] mb-2">{labels.warning}</div>
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

const ui = {
  pt: {
    title: "Simulador de visto para a Espanha",
    subtitle:
      "Triagem orientativa baseada em fontes oficiais. O simulador entrega as 3 rotas com maior aderência ao seu perfil.",
    disclaimer:
      "Não é parecer jurídico. Casos limítrofes precisam de confirmação no consulado, na UGE ou com assessoria especializada.",
    cta: "Analisar perfil",
    reset: "Limpar respostas",
    resultsTitle: "Resultado da triagem",
    resultsEmpty: "Responda o questionário e clique em Analisar perfil.",
    noteTitle: "Base legal",
    noteBody:
      "A leitura prioriza páginas e instruções oficiais do governo espanhol. A via de investidor não entra como recomendação automática porque está em transição normativa.",
    sourcesTitle: "Fontes oficiais principais",
    sourceIntro:
      "Essas são as páginas-base usadas para calibrar o simulador. Abra uma delas se quiser validar um caso específico.",
    resultLabels: {
      topMatch: "Melhor opção",
      alternative: "Alternativa",
      reasons: "Por que apareceu",
      checks: "O que confirmar",
      warning: "Atenção",
      open: "Abrir",
    },
    locationLabel: "Onde você está hoje?",
    objectiveLabel: "Qual é seu objetivo principal?",
    workLabel: "Como você ganha dinheiro ou pretende atuar?",
    incomeLabel: "Como está sua renda/folga financeira?",
    offerLabel: "Se houver oferta de trabalho, qual o nível?",
    studyLabel: "Você já tem matrícula ou admissão em curso oficial?",
    familyLabel: "Existe vínculo familiar com alguém na Espanha ou na UE?",
    monthsLabel: "Há quanto tempo você está na Espanha?",
    statusLabel: "Qual é o seu status atual?",
    projectLabel: "Seu projeto empresarial parece inovador?",
    options: {
      outside: "Fora da Espanha",
      inside: "Já estou na Espanha",
      remote: "Trabalho remoto / empresa fora da Espanha",
      job: "Emprego local na Espanha",
      study: "Estudos / curso oficial",
      family: "Via familiar",
      self: "Conta própria / autônomo",
      means: "Quero viver com meus meios",
      regularize: "Preciso regularizar / ajustar status",
      notSure: "Ainda estou decidindo",
      none: "Nada disso por enquanto",
      remoteForeign: "Empresa de fora da Espanha",
      localOffer: "Oferta local na Espanha",
      selfEmployed: "Atividade própria / autônoma",
      strongIncome: "Renda estável e confortável",
      stableIncome: "Renda estável",
      basicIncome: "Renda apertada, mas existente",
      noIncome: "Sem renda clara",
      notInSpain: "Ainda não estou na Espanha",
      normalOffer: "Oferta normal",
      highOffer: "Alta qualificação",
      officialStudy: "Sim, curso oficial",
      noStudy: "Ainda não",
      spanishFamily: "Sim, familiar de espanhol",
      euFamily: "Sim, familiar de cidadão da UE",
      residentFamily: "Sim, familiar de residente legal",
      noFamily: "Não",
      lessThanTwo: "Menos de 2 anos",
      twoOrMore: "2 anos ou mais",
      regular: "Regular",
      student: "Estudante",
      worker: "Trabalhador com residência",
      irregular: "Irregular",
      traditional: "Negócio tradicional",
      innovative: "Projeto inovador",
    },
  },
  es: {
    title: "Simulador de visado para España",
    subtitle:
      "Triagem orientativa basada en fuentes oficiales. El simulador devuelve las 3 vías con mayor ajuste a tu perfil.",
    disclaimer:
      "No es asesoramiento legal. Los casos límite deben confirmarse en el consulado, la UGE o con una asesoría especializada.",
    cta: "Analizar perfil",
    reset: "Limpiar respuestas",
    resultsTitle: "Resultado de la triage",
    resultsEmpty: "Responde el cuestionario y pulsa Analizar perfil.",
    noteTitle: "Base legal",
    noteBody:
      "La lectura prioriza páginas e instrucciones oficiales del gobierno español. La vía de inversor no entra como recomendación automática porque está en transición normativa.",
    sourcesTitle: "Principales fuentes oficiales",
    sourceIntro:
      "Estas son las páginas base usadas para calibrar el simulador. Ábre una si quieres validar un caso concreto.",
    resultLabels: {
      topMatch: "Mejor opción",
      alternative: "Alternativa",
      reasons: "Por qué aparece",
      checks: "Qué confirmar",
      warning: "Atención",
      open: "Abrir",
    },
    locationLabel: "¿Dónde estás hoy?",
    objectiveLabel: "¿Cuál es tu objetivo principal?",
    workLabel: "¿Cómo ganas dinero o piensas actuar?",
    incomeLabel: "¿Cómo está tu ingreso / margen financiero?",
    offerLabel: "Si hay oferta laboral, ¿qué nivel tiene?",
    studyLabel: "¿Ya tienes matrícula o admisión en un curso oficial?",
    familyLabel: "¿Existe vínculo familiar con alguien en España o en la UE?",
    monthsLabel: "¿Cuánto tiempo llevas en España?",
    statusLabel: "¿Cuál es tu situación actual?",
    projectLabel: "¿Tu proyecto empresarial parece innovador?",
    options: {
      outside: "Fuera de España",
      inside: "Ya estoy en España",
      remote: "Trabajo remoto / empresa fuera de España",
      job: "Empleo local en España",
      study: "Estudios / curso oficial",
      family: "Vía familiar",
      self: "Cuenta propia / autónomo",
      means: "Quiero vivir con mis medios",
      regularize: "Necesito regularizar / ajustar estatus",
      notSure: "Todavía estoy decidiendo",
      none: "Nada de esto por ahora",
      remoteForeign: "Empresa fuera de España",
      localOffer: "Oferta local en España",
      selfEmployed: "Actividad propia / autónoma",
      strongIncome: "Ingreso estable y cómodo",
      stableIncome: "Ingreso estable",
      basicIncome: "Ingreso ajustado, pero existente",
      noIncome: "Sin ingreso claro",
      notInSpain: "Todavía no estoy en España",
      normalOffer: "Oferta normal",
      highOffer: "Alta cualificación",
      officialStudy: "Sí, curso oficial",
      noStudy: "Todavía no",
      spanishFamily: "Sí, familiar de español",
      euFamily: "Sí, familiar de ciudadano UE",
      residentFamily: "Sí, familiar de residente legal",
      noFamily: "No",
      lessThanTwo: "Menos de 2 años",
      twoOrMore: "2 años o más",
      regular: "Regular",
      student: "Estudiante",
      worker: "Trabajador con residencia",
      irregular: "Irregular",
      traditional: "Negocio tradicional",
      innovative: "Proyecto innovador",
    },
  },
  en: {
    title: "Spain visa simulator",
    subtitle:
      "Guided triage based on official sources. The simulator returns the 3 routes with the best fit for your profile.",
    disclaimer:
      "This is not legal advice. Edge cases should be checked with the consulate, UGE, or a specialized advisor.",
    cta: "Analyze profile",
    reset: "Clear answers",
    resultsTitle: "Triage result",
    resultsEmpty: "Answer the questionnaire and click Analyze profile.",
    noteTitle: "Legal basis",
    noteBody:
      "The logic is based on official pages and instructions from the Spanish government. The investor route is not recommended automatically because the regime is in legal transition.",
    sourcesTitle: "Main official sources",
    sourceIntro:
      "These are the base pages used to calibrate the simulator. Open one of them if you want to validate a specific case.",
    resultLabels: {
      topMatch: "Best match",
      alternative: "Alternative",
      reasons: "Why it appears",
      checks: "What to confirm",
      warning: "Warning",
      open: "Open",
    },
    locationLabel: "Where are you today?",
    objectiveLabel: "What is your main goal?",
    workLabel: "How do you earn money or plan to act?",
    incomeLabel: "How is your income / financial cushion?",
    offerLabel: "If there is a job offer, what level is it?",
    studyLabel: "Do you already have enrollment or admission in an official course?",
    familyLabel: "Is there a family link with someone in Spain or the EU?",
    monthsLabel: "How long have you been in Spain?",
    statusLabel: "What is your current status?",
    projectLabel: "Does your business project look innovative?",
    options: {
      outside: "Outside Spain",
      inside: "Already in Spain",
      remote: "Remote work / company outside Spain",
      job: "Local job in Spain",
      study: "Studies / official course",
      family: "Family route",
      self: "Self-employed / freelance",
      means: "I want to live on my own means",
      regularize: "I need to regularize / change status",
      notSure: "I am still deciding",
      none: "None of the above",
      remoteForeign: "Company outside Spain",
      localOffer: "Local job offer in Spain",
      selfEmployed: "Own activity / freelance",
      strongIncome: "Stable and comfortable income",
      stableIncome: "Stable income",
      basicIncome: "Tight but existing income",
      noIncome: "No clear income",
      notInSpain: "I am not in Spain yet",
      normalOffer: "Standard offer",
      highOffer: "Highly qualified role",
      officialStudy: "Yes, official course",
      noStudy: "Not yet",
      spanishFamily: "Yes, Spanish national",
      euFamily: "Yes, EU citizen family member",
      residentFamily: "Yes, legal resident family member",
      noFamily: "No",
      lessThanTwo: "Less than 2 years",
      twoOrMore: "2 years or more",
      regular: "Regular",
      student: "Student",
      worker: "Resident worker",
      irregular: "Irregular",
      traditional: "Traditional business",
      innovative: "Innovative project",
    },
  },
} as const;

const locationOptions: Record<Locale, Choice<VisaLocation>[]> = {
  pt: [
    { value: "outside", label: ui.pt.options.outside },
    { value: "inside", label: ui.pt.options.inside },
  ],
  es: [
    { value: "outside", label: ui.es.options.outside },
    { value: "inside", label: ui.es.options.inside },
  ],
  en: [
    { value: "outside", label: ui.en.options.outside },
    { value: "inside", label: ui.en.options.inside },
  ],
};

const objectiveOptions: Record<Locale, Choice<VisaObjective>[]> = {
  pt: [
    { value: "remote", label: ui.pt.options.remote },
    { value: "job", label: ui.pt.options.job },
    { value: "study", label: ui.pt.options.study },
    { value: "family", label: ui.pt.options.family },
    { value: "self_employed", label: ui.pt.options.self },
    { value: "means", label: ui.pt.options.means },
    { value: "regularize", label: ui.pt.options.regularize },
    { value: "not_sure", label: ui.pt.options.notSure },
  ],
  es: [
    { value: "remote", label: ui.es.options.remote },
    { value: "job", label: ui.es.options.job },
    { value: "study", label: ui.es.options.study },
    { value: "family", label: ui.es.options.family },
    { value: "self_employed", label: ui.es.options.self },
    { value: "means", label: ui.es.options.means },
    { value: "regularize", label: ui.es.options.regularize },
    { value: "not_sure", label: ui.es.options.notSure },
  ],
  en: [
    { value: "remote", label: ui.en.options.remote },
    { value: "job", label: ui.en.options.job },
    { value: "study", label: ui.en.options.study },
    { value: "family", label: ui.en.options.family },
    { value: "self_employed", label: ui.en.options.self },
    { value: "means", label: ui.en.options.means },
    { value: "regularize", label: ui.en.options.regularize },
    { value: "not_sure", label: ui.en.options.notSure },
  ],
};

const workOptions: Record<Locale, Choice<VisaWorkMode>[]> = {
  pt: [
    { value: "remote_foreign", label: ui.pt.options.remoteForeign },
    { value: "local_offer", label: ui.pt.options.localOffer },
    { value: "self_employed", label: ui.pt.options.selfEmployed },
    { value: "none", label: ui.pt.options.none },
  ],
  es: [
    { value: "remote_foreign", label: ui.es.options.remoteForeign },
    { value: "local_offer", label: ui.es.options.localOffer },
    { value: "self_employed", label: ui.es.options.selfEmployed },
    { value: "none", label: ui.es.options.none },
  ],
  en: [
    { value: "remote_foreign", label: ui.en.options.remoteForeign },
    { value: "local_offer", label: ui.en.options.localOffer },
    { value: "self_employed", label: ui.en.options.selfEmployed },
    { value: "none", label: ui.en.options.none },
  ],
};

const incomeOptions: Record<Locale, Choice<VisaIncome>[]> = {
  pt: [
    { value: "strong", label: ui.pt.options.strongIncome },
    { value: "stable", label: ui.pt.options.stableIncome },
    { value: "basic", label: ui.pt.options.basicIncome },
    { value: "none", label: ui.pt.options.noIncome },
  ],
  es: [
    { value: "strong", label: ui.es.options.strongIncome },
    { value: "stable", label: ui.es.options.stableIncome },
    { value: "basic", label: ui.es.options.basicIncome },
    { value: "none", label: ui.es.options.noIncome },
  ],
  en: [
    { value: "strong", label: ui.en.options.strongIncome },
    { value: "stable", label: ui.en.options.stableIncome },
    { value: "basic", label: ui.en.options.basicIncome },
    { value: "none", label: ui.en.options.noIncome },
  ],
};

const offerOptions: Record<Locale, Choice<VisaOfferLevel>[]> = {
  pt: [
    { value: "high", label: ui.pt.options.highOffer },
    { value: "normal", label: ui.pt.options.normalOffer },
    { value: "none", label: ui.pt.options.none },
  ],
  es: [
    { value: "high", label: ui.es.options.highOffer },
    { value: "normal", label: ui.es.options.normalOffer },
    { value: "none", label: ui.es.options.none },
  ],
  en: [
    { value: "high", label: ui.en.options.highOffer },
    { value: "normal", label: ui.en.options.normalOffer },
    { value: "none", label: ui.en.options.none },
  ],
};

const studyOptions: Record<Locale, Choice<VisaStudyStatus>[]> = {
  pt: [
    { value: "official", label: ui.pt.options.officialStudy },
    { value: "none", label: ui.pt.options.noStudy },
  ],
  es: [
    { value: "official", label: ui.es.options.officialStudy },
    { value: "none", label: ui.es.options.noStudy },
  ],
  en: [
    { value: "official", label: ui.en.options.officialStudy },
    { value: "none", label: ui.en.options.noStudy },
  ],
};

const familyOptions: Record<Locale, Choice<VisaFamilyTie>[]> = {
  pt: [
    { value: "spanish", label: ui.pt.options.spanishFamily },
    { value: "eu", label: ui.pt.options.euFamily },
    { value: "resident", label: ui.pt.options.residentFamily },
    { value: "none", label: ui.pt.options.noFamily },
  ],
  es: [
    { value: "spanish", label: ui.es.options.spanishFamily },
    { value: "eu", label: ui.es.options.euFamily },
    { value: "resident", label: ui.es.options.residentFamily },
    { value: "none", label: ui.es.options.noFamily },
  ],
  en: [
    { value: "spanish", label: ui.en.options.spanishFamily },
    { value: "eu", label: ui.en.options.euFamily },
    { value: "resident", label: ui.en.options.residentFamily },
    { value: "none", label: ui.en.options.noFamily },
  ],
};

const monthsOptions: Record<Locale, Choice<VisaMonthsInSpain>[]> = {
  pt: [
    { value: "gte2y", label: ui.pt.options.twoOrMore },
    { value: "lt2y", label: ui.pt.options.lessThanTwo },
    { value: "outside", label: ui.pt.options.notInSpain },
  ],
  es: [
    { value: "gte2y", label: ui.es.options.twoOrMore },
    { value: "lt2y", label: ui.es.options.lessThanTwo },
    { value: "outside", label: ui.es.options.notInSpain },
  ],
  en: [
    { value: "gte2y", label: ui.en.options.twoOrMore },
    { value: "lt2y", label: ui.en.options.lessThanTwo },
    { value: "outside", label: ui.en.options.notInSpain },
  ],
};

const statusOptions: Record<Locale, Choice<VisaStatus>[]> = {
  pt: [
    { value: "regular", label: ui.pt.options.regular },
    { value: "student", label: ui.pt.options.student },
    { value: "worker", label: ui.pt.options.worker },
    { value: "irregular", label: ui.pt.options.irregular },
  ],
  es: [
    { value: "regular", label: ui.es.options.regular },
    { value: "student", label: ui.es.options.student },
    { value: "worker", label: ui.es.options.worker },
    { value: "irregular", label: ui.es.options.irregular },
  ],
  en: [
    { value: "regular", label: ui.en.options.regular },
    { value: "student", label: ui.en.options.student },
    { value: "worker", label: ui.en.options.worker },
    { value: "irregular", label: ui.en.options.irregular },
  ],
};

const projectOptions: Record<Locale, Choice<VisaProjectType>[]> = {
  pt: [
    { value: "innovative", label: ui.pt.options.innovative },
    { value: "traditional", label: ui.pt.options.traditional },
    { value: "none", label: ui.pt.options.none },
  ],
  es: [
    { value: "innovative", label: ui.es.options.innovative },
    { value: "traditional", label: ui.es.options.traditional },
    { value: "none", label: ui.es.options.none },
  ],
  en: [
    { value: "innovative", label: ui.en.options.innovative },
    { value: "traditional", label: ui.en.options.traditional },
    { value: "none", label: ui.en.options.none },
  ],
};

export default function VisaSimulator({ lang }: { lang: Locale }) {
  const copyLocale = ui[lang];
  const base = getVisaCopy(lang);
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
  const officialSources = getOfficialSources(lang);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-2xl shadow-gray-100/70">
          <div className="mb-8">
            <div className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] text-brand-700">
              {copyLocale.title}
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900 font-heading">
              {copyLocale.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">{copyLocale.subtitle}</p>
          </div>

          <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            <div className="font-black uppercase tracking-[0.22em] text-[10px] text-brand-600 mb-2">
              {copyLocale.noteTitle}
            </div>
            <p>{copyLocale.noteBody}</p>
          </div>

          <div className="grid gap-5">
            <ChoiceGroup
              label={copyLocale.locationLabel}
              value={answers.location}
              options={locationOptions[lang]}
              onChange={(location) => setAnswers((prev) => ({ ...prev, location }))}
              columns={2}
            />
            <ChoiceGroup
              label={copyLocale.objectiveLabel}
              value={answers.objective}
              options={objectiveOptions[lang]}
              onChange={(objective) => setAnswers((prev) => ({ ...prev, objective }))}
              columns={2}
            />
            <ChoiceGroup
              label={copyLocale.workLabel}
              value={answers.workMode}
              options={workOptions[lang]}
              onChange={(workMode) => setAnswers((prev) => ({ ...prev, workMode }))}
              columns={2}
            />
            <ChoiceGroup
              label={copyLocale.incomeLabel}
              value={answers.income}
              options={incomeOptions[lang]}
              onChange={(income) => setAnswers((prev) => ({ ...prev, income }))}
              columns={2}
            />
            <ChoiceGroup
              label={copyLocale.offerLabel}
              value={answers.offerLevel}
              options={offerOptions[lang]}
              onChange={(offerLevel) => setAnswers((prev) => ({ ...prev, offerLevel }))}
              columns={3}
            />
            <ChoiceGroup
              label={copyLocale.studyLabel}
              value={answers.studyStatus}
              options={studyOptions[lang]}
              onChange={(studyStatus) => setAnswers((prev) => ({ ...prev, studyStatus }))}
              columns={2}
            />
            <ChoiceGroup
              label={copyLocale.familyLabel}
              value={answers.familyTie}
              options={familyOptions[lang]}
              onChange={(familyTie) => setAnswers((prev) => ({ ...prev, familyTie }))}
              columns={2}
            />
            <ChoiceGroup
              label={copyLocale.monthsLabel}
              value={answers.monthsInSpain}
              options={monthsOptions[lang]}
              onChange={(monthsInSpain) => setAnswers((prev) => ({ ...prev, monthsInSpain }))}
              columns={3}
            />
            <ChoiceGroup
              label={copyLocale.statusLabel}
              value={answers.status}
              options={statusOptions[lang]}
              onChange={(status) => setAnswers((prev) => ({ ...prev, status }))}
              columns={2}
            />
            <ChoiceGroup
              label={copyLocale.projectLabel}
              value={answers.projectType}
              options={projectOptions[lang]}
              onChange={(projectType) => setAnswers((prev) => ({ ...prev, projectType }))}
              columns={3}
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="rounded-full bg-brand-600 px-6 py-4 text-sm font-black uppercase tracking-[0.22em] text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!answers.location || !answers.objective}
            >
              {copyLocale.cta}
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
              {copyLocale.reset}
            </button>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-gray-500">{copyLocale.disclaimer}</p>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-gray-200 bg-gray-950 p-6 text-white shadow-2xl shadow-gray-900/30">
            <div className="text-[10px] font-black uppercase tracking-[0.28em] text-brand-300">
              {copyLocale.resultsTitle}
            </div>
            {!assessment ? (
              <p className="mt-4 text-sm leading-relaxed text-gray-300">{copyLocale.resultsEmpty}</p>
            ) : (
              <div className="mt-5 space-y-4">
                <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200">
                  {assessment.disclaimer}
                </p>
                {assessment.results.length === 0 ? (
                  <div className="rounded-2xl bg-white p-5 text-gray-900">
                    <p className="font-black uppercase tracking-tight">{base.noClearRoute}</p>
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

                    return <ResultCard key={key} highlight={index === 0} labels={copyLocale.resultLabels} {...card} />;
                  })
                )}
              </div>
            )}
          </div>

          <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-xl">
            <div className="text-[10px] font-black uppercase tracking-[0.28em] text-brand-600">{copyLocale.sourcesTitle}</div>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">{copyLocale.sourceIntro}</p>
            <div className="mt-5 space-y-3">
              {officialSources.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-3 transition hover:border-brand-600 hover:bg-brand-50"
                >
                  <span className="text-sm font-bold text-gray-900">{source.label}</span>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-600">Open</span>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
