import type { Locale } from "@/lib/i18n";

type Localized<T> = Record<Locale, T>;

export type VisaSimulatorPageContent = {
  metadata: { title: string; description: string };
  eyebrow: string;
  lead: string;
  trustTitle: string;
  trustBody: string;
  cards: { title: string; body: string }[];
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  important: string;
  importantBody: string;
  noTitle: string;
  noItems: string[];
  noLegalAdvice: string;
};

export type CalculatorPageContent = {
  metadata: { title: string; description: string };
  eyebrow: string;
  intro: string;
  intro2: string;
  actions: { simulator: string; guide: string };
  benefitsTitle: string;
  benefits: string[];
  benefitBadge: string;
  methodTitle: string;
  method: string[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  relatedTitle: string;
  relatedBody: string;
  relatedLinks: { href: string; label: string }[];
  toolTitle: string;
  toolBody: string;
  comparisonLabels: { badge: string; solo: string; couple: string; family: string };
  costCards: { label: string; city: "madrid" | "barcelona" | "valencia" }[];
};

export type VisaSimulatorContent = {
  title: string;
  subtitle: string;
  disclaimer: string;
  cta: string;
  reset: string;
  resultsTitle: string;
  resultsEmpty: string;
  noteTitle: string;
  noteBody: string;
  sourcesTitle: string;
  sourceIntro: string;
  resultLabels: {
    topMatch: string;
    alternative: string;
    reasons: string;
    checks: string;
    warning: string;
    open: string;
  };
  labels: {
    location: string;
    objective: string;
    work: string;
    income: string;
    offer: string;
    study: string;
    family: string;
    months: string;
    status: string;
    project: string;
  };
  options: {
    location: { value: "outside" | "inside"; label: string }[];
    objective: { value: "remote" | "job" | "study" | "family" | "self_employed" | "means" | "regularize" | "not_sure"; label: string }[];
    work: { value: "remote_foreign" | "local_offer" | "self_employed" | "none"; label: string }[];
    income: { value: "strong" | "stable" | "basic" | "none"; label: string }[];
    offer: { value: "high" | "normal" | "none"; label: string }[];
    study: { value: "official" | "none"; label: string }[];
    family: { value: "spanish" | "eu" | "resident" | "none"; label: string }[];
    months: { value: "gte2y" | "lt2y" | "outside"; label: string }[];
    status: { value: "regular" | "student" | "worker" | "irregular"; label: string }[];
    project: { value: "innovative" | "traditional" | "none"; label: string }[];
  };
};

export type CalculatorWidgetContent = {
  cityLabels: Record<"madrid" | "barcelona" | "valencia" | "sevilla" | "granada" | "malaga" | "bilbao", string>;
  profileLabels: Record<"solo" | "couple" | "family", { label: string; icon: string }>;
  housingLabels: Record<"apartment" | "room", { label: string; icon: string; desc: string }>;
  categoryLabels: Record<string, string>;
  ui: {
    step1: string;
    step2: string;
    stepHousing: string;
    stepResult: string;
    resultCta: string;
    placeholder: string;
    send: string;
    month: string;
    back: string;
    next: string;
    success: string;
  };
};

export const visaRuleCopy: Localized<Record<string, string>> = {
  pt: {
    outsideSpain: "Você está fora da Espanha, o que combina com rotas consulares.",
    insideSpain: "Você já está na Espanha, então também avaliamos vias internas e de regularização.",
    stableIncome: "Você indicou renda estável o suficiente para uma residência sem trabalho.",
    strongIncome: "Sua renda e poupança sugerem folga financeira para rotas sem atividade laboral.",
    remoteForeign: "Seu trabalho remoto para empresa de fora da Espanha é o gatilho principal dessa via.",
    localOffer: "Há uma oferta de trabalho na Espanha, o que abre rotas laborais diretas.",
    highOffer: "A oferta parece de alta qualificação, então a via UGE ganha força.",
    selfEmployed: "Seu perfil aponta para atividade por conta própria.",
    innovativeProject: "O projeto tem cara de iniciativa empresarial inovadora.",
    officialStudy: "Você já tem matrícula ou aceitação em formação oficial.",
    familySpanish: "Há vínculo com pessoa de nacionalidade espanhola.",
    familyEU: "Há vínculo com cidadão da UE/EEE/Suíça.",
    familyResident: "Há vínculo com familiar residente legal na Espanha.",
    twoYears: "Você já cumpre o requisito temporal mínimo de dois anos na Espanha.",
    irregular: "O status atual é irregular, o que faz sentido para arraigo.",
    regular: "Seu status atual é regular, então o foco tende a ser entrada ou modificação.",
    noClearRoute: "Ainda não apareceu uma rota forte o suficiente para ir direto à recomendação final.",
    transitionNote: "A via de investidor não entra na recomendação automática porque o regime está em transição normativa e deve ser verificado caso a caso.",
  },
  es: {
    outsideSpain: "Estás fuera de España, así que encajan mejor las vías consulares.",
    insideSpain: "Ya estás en España, por lo que también evaluamos vías internas y de regularización.",
    stableIncome: "Tu ingreso estable encaja con una residencia sin trabajo.",
    strongIncome: "Tus ingresos y ahorros apuntan a un perfil financiero cómodo para vías sin actividad laboral.",
    remoteForeign: "El trabajo remoto para una empresa fuera de España es el disparador principal de esta vía.",
    localOffer: "Tienes una oferta de trabajo en España, lo que abre vías laborales directas.",
    highOffer: "La oferta parece de alta cualificación, así que la vía UGE gana fuerza.",
    selfEmployed: "Tu perfil apunta a actividad por cuenta propia.",
    innovativeProject: "El proyecto tiene rasgos de iniciativa empresarial innovadora.",
    officialStudy: "Ya tienes matrícula o admisión en formación oficial.",
    familySpanish: "Existe vínculo con una persona con nacionalidad española.",
    familyEU: "Existe vínculo con un ciudadano de la UE/EEE/Suiza.",
    familyResident: "Existe vínculo con un familiar residente legal en España.",
    twoYears: "Ya cumples el requisito temporal mínimo de dos años en España.",
    irregular: "La situación actual es irregular, lo que encaja con arraigo.",
    regular: "Tu situación actual es regular, así que el foco suele ser entrada o modificación.",
    noClearRoute: "Aún no aparece una vía lo bastante fuerte como para recomendarla de forma principal.",
    transitionNote: "La vía de inversor no entra en la recomendación automática porque el régimen está en transición normativa y debe verificarse caso por caso.",
  },
  en: {
    outsideSpain: "You are outside Spain, so consular routes fit better.",
    insideSpain: "You are already in Spain, so internal and regularization paths are also evaluated.",
    stableIncome: "Your stable income fits a residence route without work.",
    strongIncome: "Your income and savings suggest a comfortable financial profile for non-working routes.",
    remoteForeign: "Remote work for a company outside Spain is the main trigger for this route.",
    localOffer: "You have a job offer in Spain, which opens direct work routes.",
    highOffer: "The offer looks highly qualified, so the UGE route becomes stronger.",
    selfEmployed: "Your profile points to self-employment.",
    innovativeProject: "The project looks like an innovative business initiative.",
    officialStudy: "You already have enrollment or admission in an official program.",
    familySpanish: "There is a link to a Spanish national.",
    familyEU: "There is a link to an EU/EEA/Swiss citizen.",
    familyResident: "There is a link to a legal resident in Spain.",
    twoYears: "You already meet the minimum two-year presence requirement in Spain.",
    irregular: "Your current status is irregular, which is consistent with arraigo paths.",
    regular: "Your current status is regular, so the focus is usually entry or modification.",
    noClearRoute: "No route is strong enough yet to be the main recommendation.",
    transitionNote: "The investor route is not included in the automatic recommendation because the regime is in a legal transition and should be checked case by case.",
  },
};

export const visaSimulatorPageCopy: Localized<VisaSimulatorPageContent> = {
  pt: {
    metadata: {
      title: "Simulador de visto para a Espanha",
      description:
        "Triagem orientativa para descobrir quais vistos e rotas migratórias combinam com o seu perfil para morar legalmente na Espanha.",
    },
    eyebrow: "Triagem migratória",
    lead:
      "Este simulador foi desenhado para fazer uma triagem séria, baseada em fontes oficiais do governo espanhol. Ele não substitui análise jurídica, mas evita recomendações soltas e pouco confiáveis.",
    trustTitle: "O que ele faz",
    trustBody:
      "Ele cruza localização, objetivo, renda, oferta de trabalho, vínculo familiar, estudos e tempo de permanência na Espanha para sugerir as 3 rotas com maior aderência.",
    cards: [
      {
        title: "Base oficial",
        body:
          "As regras do motor usam páginas e instruções do Ministerio de Inclusión, UGE, BOE e portais oficiais. A via de investidor não entra como recomendação automática.",
      },
      {
        title: "Sem chute",
        body:
          "Quando o caso é limítrofe, o simulador deixa claro o que confirmar e por que a via apareceu, em vez de vender certeza onde não existe.",
      },
      {
        title: "Escopo completo",
        body:
          "O fluxo cobre perfis fora da Espanha e também quem já está no país e precisa regularizar a situação ou avaliar arraigo.",
      },
    ],
    ctaTitle: "Quer validar a parte financeira primeiro?",
    ctaBody:
      "A calculadora de custo de vida complementa o simulador: ela mostra quanto custa viver na Espanha por cidade e perfil.",
    ctaButton: "Abrir calculadora",
    important: "Importante",
    importantBody:
      "Se a pessoa já estiver em situação irregular, a resposta precisa ser mais conservadora. O simulador prioriza rotas que o governo espanhol reconhece formalmente.",
    noTitle: "O que o simulador não faz",
    noItems: [
      "Não é parecer jurídico.",
      "Não recomenda a via de investidor como padrão.",
      "Não promete aprovação automática.",
    ],
    noLegalAdvice:
      "Não é parecer jurídico. Casos limítrofes precisam de confirmação no consulado, na UGE ou com assessoria especializada.",
  },
  es: {
    metadata: {
      title: "Simulador de visado para España",
      description:
        "Triagem orientativa para descubrir qué visados y rutas migratorias encajan con tu perfil para vivir legalmente en España.",
    },
    eyebrow: "Triage migratoria",
    lead:
      "Este simulador está pensado para hacer una triage seria, basada en fuentes oficiales del gobierno español. No sustituye el análisis jurídico, pero evita recomendaciones vagas y poco confiables.",
    trustTitle: "Qué hace",
    trustBody:
      "Cruza ubicación, objetivo, ingresos, oferta laboral, vínculo familiar, estudios y tiempo de permanencia en España para sugerir las 3 vías con mayor ajuste.",
    cards: [
      {
        title: "Base oficial",
        body:
          "El motor usa páginas e instrucciones del Ministerio de Inclusión, UGE, BOE y portales oficiales. La vía de inversor no entra como recomendación automática.",
      },
      {
        title: "Sin adivinar",
        body:
          "Cuando el caso es límite, el simulador explica qué confirmar y por qué apareció la vía, en vez de fingir certeza donde no existe.",
      },
      {
        title: "Cobertura completa",
        body:
          "El flujo cubre perfiles fuera de España y también a quien ya está en el país y necesita regularizar o evaluar arraigo.",
      },
    ],
    ctaTitle: "¿Quieres validar primero la parte financiera?",
    ctaBody:
      "La calculadora de coste de vida complementa el simulador: muestra cuánto cuesta vivir en España por ciudad y perfil.",
    ctaButton: "Abrir calculadora",
    important: "Importante",
    importantBody:
      "Si la persona ya está en situación irregular, la respuesta debe ser más conservadora. El simulador prioriza vías reconocidas formalmente por el gobierno español.",
    noTitle: "Lo que no hace el simulador",
    noItems: [
      "No es asesoramiento legal.",
      "No recomienda la vía de inversor como opción estándar.",
      "No promete aprobación automática.",
    ],
    noLegalAdvice:
      "No es asesoramiento legal. Los casos límite deben confirmarse en el consulado, la UGE o con una asesoría especializada.",
  },
  en: {
    metadata: {
      title: "Spain visa simulator",
      description:
        "Guided triage to find out which visa and migration routes match your profile for living legally in Spain.",
    },
    eyebrow: "Migration triage",
    lead:
      "This simulator is built for serious triage based on official Spanish government sources. It does not replace legal advice, but it avoids vague and unreliable recommendations.",
    trustTitle: "What it does",
    trustBody:
      "It combines location, goal, income, job offer, family ties, studies, and time in Spain to suggest the 3 best-fitting routes.",
    cards: [
      {
        title: "Official basis",
        body:
          "The engine uses pages and instructions from the Ministry of Inclusion, UGE, BOE, and official portals. The investor route is not included as an automatic recommendation.",
      },
      {
        title: "No guessing",
        body:
          "When the case is borderline, the simulator says what to verify and why a route appears instead of pretending certainty where there is none.",
      },
      {
        title: "Full scope",
        body:
          "The flow covers people outside Spain and also those already in the country who need regularization or an arraigo path.",
      },
    ],
    ctaTitle: "Want to validate the financial side first?",
    ctaBody:
      "The cost of living calculator complements the simulator: it shows how much it costs to live in Spain by city and profile.",
    ctaButton: "Open calculator",
    important: "Important",
    importantBody:
      "If the person is already irregular, the answer needs to be more conservative. The simulator prioritizes routes formally recognized by the Spanish government.",
    noTitle: "What the simulator does not do",
    noItems: [
      "This is not legal advice.",
      "It does not recommend the investor route as a default option.",
      "It does not promise automatic approval.",
    ],
    noLegalAdvice:
      "This is not legal advice. Edge cases should be checked with the consulate, UGE, or a specialized advisor.",
  },
};

export const visaSimulatorWidgetContent: Localized<VisaSimulatorContent> = {
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
    labels: {
      location: "Onde você está hoje?",
      objective: "Qual é seu objetivo principal?",
      work: "Como você ganha dinheiro ou pretende atuar?",
      income: "Como está sua renda/folga financeira?",
      offer: "Se houver oferta de trabalho, qual o nível?",
      study: "Você já tem matrícula ou admissão em curso oficial?",
      family: "Existe vínculo familiar com alguém na Espanha ou na UE?",
      months: "Há quanto tempo você está na Espanha?",
      status: "Qual é o seu status atual?",
      project: "Seu projeto empresarial parece inovador?",
    },
    options: {
      location: [
        { value: "outside", label: "Fora da Espanha" },
        { value: "inside", label: "Já estou na Espanha" },
      ],
      objective: [
        { value: "remote", label: "Trabalho remoto / empresa fora da Espanha" },
        { value: "job", label: "Emprego local na Espanha" },
        { value: "study", label: "Estudos / curso oficial" },
        { value: "family", label: "Via familiar" },
        { value: "self_employed", label: "Conta própria / autônomo" },
        { value: "means", label: "Quero viver com meus meios" },
        { value: "regularize", label: "Preciso regularizar / ajustar status" },
        { value: "not_sure", label: "Ainda estou decidindo" },
      ],
      work: [
        { value: "remote_foreign", label: "Empresa de fora da Espanha" },
        { value: "local_offer", label: "Oferta local na Espanha" },
        { value: "self_employed", label: "Atividade própria / autônoma" },
        { value: "none", label: "Nada disso por enquanto" },
      ],
      income: [
        { value: "strong", label: "Renda estável e confortável" },
        { value: "stable", label: "Renda estável" },
        { value: "basic", label: "Renda apertada, mas existente" },
        { value: "none", label: "Sem renda clara" },
      ],
      offer: [
        { value: "high", label: "Alta qualificação" },
        { value: "normal", label: "Oferta normal" },
        { value: "none", label: "Nada disso por enquanto" },
      ],
      study: [
        { value: "official", label: "Sim, curso oficial" },
        { value: "none", label: "Ainda não" },
      ],
      family: [
        { value: "spanish", label: "Sim, familiar de espanhol" },
        { value: "eu", label: "Sim, familiar de cidadão da UE" },
        { value: "resident", label: "Sim, familiar de residente legal" },
        { value: "none", label: "Não" },
      ],
      months: [
        { value: "gte2y", label: "2 anos ou mais" },
        { value: "lt2y", label: "Menos de 2 anos" },
        { value: "outside", label: "Ainda não estou na Espanha" },
      ],
      status: [
        { value: "regular", label: "Regular" },
        { value: "student", label: "Estudante" },
        { value: "worker", label: "Trabalhador com residência" },
        { value: "irregular", label: "Irregular" },
      ],
      project: [
        { value: "innovative", label: "Projeto inovador" },
        { value: "traditional", label: "Negócio tradicional" },
        { value: "none", label: "Nada disso por enquanto" },
      ],
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
    labels: {
      location: "¿Dónde estás hoy?",
      objective: "¿Cuál es tu objetivo principal?",
      work: "¿Cómo ganas dinero o piensas actuar?",
      income: "¿Cómo está tu ingreso / margen financiero?",
      offer: "Si hay oferta laboral, ¿qué nivel tiene?",
      study: "¿Ya tienes matrícula o admisión en un curso oficial?",
      family: "¿Existe vínculo familiar con alguien en España o en la UE?",
      months: "¿Cuánto tiempo llevas en España?",
      status: "¿Cuál es tu situación actual?",
      project: "¿Tu proyecto empresarial parece innovador?",
    },
    options: {
      location: [
        { value: "outside", label: "Fuera de España" },
        { value: "inside", label: "Ya estoy en España" },
      ],
      objective: [
        { value: "remote", label: "Trabajo remoto / empresa fuera de España" },
        { value: "job", label: "Empleo local en España" },
        { value: "study", label: "Estudios / curso oficial" },
        { value: "family", label: "Vía familiar" },
        { value: "self_employed", label: "Cuenta propia / autónomo" },
        { value: "means", label: "Quiero vivir con mis medios" },
        { value: "regularize", label: "Necesito regularizar / ajustar estatus" },
        { value: "not_sure", label: "Todavía estoy decidiendo" },
      ],
      work: [
        { value: "remote_foreign", label: "Empresa fuera de España" },
        { value: "local_offer", label: "Oferta local en España" },
        { value: "self_employed", label: "Actividad propia / autónoma" },
        { value: "none", label: "Nada de esto por ahora" },
      ],
      income: [
        { value: "strong", label: "Ingreso estable y cómodo" },
        { value: "stable", label: "Ingreso estable" },
        { value: "basic", label: "Ingreso ajustado, pero existente" },
        { value: "none", label: "Sin ingreso claro" },
      ],
      offer: [
        { value: "high", label: "Alta cualificación" },
        { value: "normal", label: "Oferta normal" },
        { value: "none", label: "Nada de esto por ahora" },
      ],
      study: [
        { value: "official", label: "Sí, curso oficial" },
        { value: "none", label: "Todavía no" },
      ],
      family: [
        { value: "spanish", label: "Sí, familiar de español" },
        { value: "eu", label: "Sí, familiar de ciudadano UE" },
        { value: "resident", label: "Sí, familiar de residente legal" },
        { value: "none", label: "No" },
      ],
      months: [
        { value: "gte2y", label: "2 años o más" },
        { value: "lt2y", label: "Menos de 2 años" },
        { value: "outside", label: "Todavía no estoy en España" },
      ],
      status: [
        { value: "regular", label: "Regular" },
        { value: "student", label: "Estudiante" },
        { value: "worker", label: "Trabajador con residencia" },
        { value: "irregular", label: "Irregular" },
      ],
      project: [
        { value: "innovative", label: "Proyecto innovador" },
        { value: "traditional", label: "Negocio tradicional" },
        { value: "none", label: "Nada de esto por ahora" },
      ],
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
    labels: {
      location: "Where are you today?",
      objective: "What is your main goal?",
      work: "How do you earn money or plan to act?",
      income: "How is your income / financial cushion?",
      offer: "If there is a job offer, what level is it?",
      study: "Do you already have enrollment or admission in an official course?",
      family: "Is there a family link with someone in Spain or the EU?",
      months: "How long have you been in Spain?",
      status: "What is your current status?",
      project: "Does your business project look innovative?",
    },
    options: {
      location: [
        { value: "outside", label: "Outside Spain" },
        { value: "inside", label: "Already in Spain" },
      ],
      objective: [
        { value: "remote", label: "Remote work / company outside Spain" },
        { value: "job", label: "Local job in Spain" },
        { value: "study", label: "Studies / official course" },
        { value: "family", label: "Family route" },
        { value: "self_employed", label: "Self-employed / freelance" },
        { value: "means", label: "I want to live on my own means" },
        { value: "regularize", label: "I need to regularize / change status" },
        { value: "not_sure", label: "I am still deciding" },
      ],
      work: [
        { value: "remote_foreign", label: "Company outside Spain" },
        { value: "local_offer", label: "Local job offer in Spain" },
        { value: "self_employed", label: "Own activity / freelance" },
        { value: "none", label: "None of the above" },
      ],
      income: [
        { value: "strong", label: "Stable and comfortable income" },
        { value: "stable", label: "Stable income" },
        { value: "basic", label: "Tight but existing income" },
        { value: "none", label: "No clear income" },
      ],
      offer: [
        { value: "high", label: "Highly qualified role" },
        { value: "normal", label: "Standard offer" },
        { value: "none", label: "None of the above" },
      ],
      study: [
        { value: "official", label: "Yes, official course" },
        { value: "none", label: "Not yet" },
      ],
      family: [
        { value: "spanish", label: "Yes, Spanish national" },
        { value: "eu", label: "Yes, EU citizen family member" },
        { value: "resident", label: "Yes, legal resident family member" },
        { value: "none", label: "No" },
      ],
      months: [
        { value: "gte2y", label: "2 years or more" },
        { value: "lt2y", label: "Less than 2 years" },
        { value: "outside", label: "I am not in Spain yet" },
      ],
      status: [
        { value: "regular", label: "Regular" },
        { value: "student", label: "Student" },
        { value: "worker", label: "Resident worker" },
        { value: "irregular", label: "Irregular" },
      ],
      project: [
        { value: "innovative", label: "Innovative project" },
        { value: "traditional", label: "Traditional business" },
        { value: "none", label: "None of the above" },
      ],
    },
  },
};

export const calculatorPageContent: Localized<CalculatorPageContent> = {
  pt: {
    metadata: {
      title: "Calculadora de custo de vida na Espanha",
      description:
        "Veja quanto custa morar em Madrid, Barcelona, Valencia e outras cidades e estime seu orçamento mensal para viver na Espanha.",
    },
    eyebrow: "Custo de vida",
    intro:
      "A calculadora foi desenhada para responder a uma busca com intenção alta: quanto custa viver na Espanha de forma realista, por cidade e por perfil familiar.",
    intro2:
      "Ela funciona melhor como landing page e como ferramenta, então a página traz contexto, método e comparativos para aumentar confiança e tempo de permanência.",
    actions: {
      simulator: "Abrir simulador",
      guide: "Ver guia de custos",
    },
    benefitsTitle: "Por que usar esta calculadora",
    benefitBadge: "SEO",
    benefits: [
      "Mostra estimativa mensal por cidade e perfil.",
      "Ajuda a comparar Madrid, Barcelona, Valencia e outras cidades.",
      "Serve de ponto de partida para orçamento e mudança.",
    ],
    methodTitle: "Como calculamos",
    method: [
      "Usamos dados agregados e arredondados por cidade e perfil.",
      "Os números são atualizados com base em referências públicas e revisão editorial.",
      "O resultado é uma estimativa prática, não uma cotação imobiliária em tempo real.",
    ],
    faqTitle: "Perguntas frequentes",
    faq: [
      {
        q: "A calculadora substitui orçamento profissional?",
        a: "Não. Ela serve para triagem e planejamento inicial, com foco em comparação e faixas realistas.",
      },
      {
        q: "Por que Madrid e Barcelona parecem mais caras?",
        a: "Porque concentram mais demanda, aluguel mais caro e um custo geral superior ao de cidades como Valencia ou Sevilha.",
      },
      {
        q: "A calculadora ajuda no visto?",
        a: "Sim. Ela complementa o simulador de visto mostrando se o seu plano financeiro faz sentido para a rota escolhida.",
      },
      {
        q: "Os valores são oficiais?",
        a: "São estimativas editoriais e de mercado, usadas como referência prática. Para decisões jurídicas ou financeiras, confirme os dados atualizados.",
      },
    ],
    relatedTitle: "Próximos passos",
    relatedBody:
      "Depois de estimar o custo de vida, o próximo passo lógico é validar qual rota migratória combina com seu perfil e então cruzar os dois resultados.",
    relatedLinks: [
      { href: "/pt/simulador/", label: "Abrir simulador de visto" },
      { href: "/pt/blog/qual-visto-espanha-brasileiro/", label: "Ler guia de vistos" },
      { href: "/pt/blog/custo-de-vida-espanha-2026/", label: "Ver guia de cidades" },
    ],
    toolTitle: "Ferramenta",
    toolBody:
      "Depois do contexto editorial, a ferramenta permite refinar o cálculo por cidade e perfil em poucos cliques.",
    comparisonLabels: {
      badge: "Solo",
      solo: "Solo",
      couple: "Casal",
      family: "Família",
    },
    costCards: [
      { label: "Madrid", city: "madrid" },
      { label: "Barcelona", city: "barcelona" },
      { label: "Valência", city: "valencia" },
    ],
  },
  es: {
    metadata: {
      title: "Calculadora de coste de vida en España",
      description:
        "Comprueba cuánto cuesta vivir en Madrid, Barcelona, Valencia y otras ciudades y estima tu presupuesto mensual para España.",
    },
    eyebrow: "Coste de vida",
    intro:
      "La calculadora está pensada para una búsqueda de alta intención: cuánto cuesta vivir en España de forma realista, por ciudad y por perfil familiar.",
    intro2:
      "Funciona mejor como landing page y como herramienta, así que la página aporta contexto, método y comparativas para reforzar confianza y tiempo de permanencia.",
    actions: {
      simulator: "Abrir simulador",
      guide: "Ver guía de costes",
    },
    benefitsTitle: "Por qué usar esta calculadora",
    benefitBadge: "SEO",
    benefits: [
      "Muestra estimaciones mensuales por ciudad y perfil.",
      "Ayuda a comparar Madrid, Barcelona, Valencia y otras ciudades.",
      "Sirve como punto de partida para presupuesto y mudanza.",
    ],
    methodTitle: "Cómo calculamos",
    method: [
      "Usamos datos agregados y redondeados por ciudad y perfil.",
      "Las cifras se actualizan con referencias públicas y revisión editorial.",
      "El resultado es una estimación práctica, no una cotización inmobiliaria en tiempo real.",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      {
        q: "¿La calculadora sustituye un presupuesto profesional?",
        a: "No. Sirve para triage y planificación inicial, con foco en comparación y rangos realistas.",
      },
      {
        q: "¿Por qué Madrid y Barcelona parecen más caras?",
        a: "Porque concentran más demanda, alquiler más caro y un coste general superior al de Valencia o Sevilla.",
      },
      {
        q: "¿La calculadora ayuda con el visado?",
        a: "Sí. Complementa el simulador de visado mostrando si tu plan financiero encaja con la vía elegida.",
      },
      {
        q: "¿Los valores son oficiales?",
        a: "Son estimaciones editoriales y de mercado, útiles como referencia práctica. Para decisiones jurídicas o financieras, confirma los datos actualizados.",
      },
    ],
    relatedTitle: "Siguientes pasos",
    relatedBody:
      "Después de estimar el coste de vida, el siguiente paso lógico es validar qué ruta migratoria encaja con tu perfil y cruzar ambos resultados.",
    relatedLinks: [
      { href: "/es/simulador/", label: "Abrir simulador de visado" },
      { href: "/es/blog/qual-visto-espanha-brasileiro/", label: "Leer guía de visados" },
      { href: "/es/blog/custo-de-vida-espanha-2026/", label: "Ver guía de ciudades" },
    ],
    toolTitle: "Herramienta",
    toolBody:
      "Después del contexto editorial, la herramienta permite afinar el cálculo por ciudad y perfil en pocos clics.",
    comparisonLabels: {
      badge: "Solo",
      solo: "Solo",
      couple: "Pareja",
      family: "Familia",
    },
    costCards: [
      { label: "Madrid", city: "madrid" },
      { label: "Barcelona", city: "barcelona" },
      { label: "Valencia", city: "valencia" },
    ],
  },
  en: {
    metadata: {
      title: "Spain cost of living calculator",
      description:
        "Check how much it costs to live in Madrid, Barcelona, Valencia and other cities and estimate your monthly Spain budget.",
    },
    eyebrow: "Cost of living",
    intro:
      "The calculator is built for a high-intent search: how much it costs to live in Spain in a realistic way, by city and household profile.",
    intro2:
      "It works best both as a landing page and as a tool, so the page adds context, method, and comparisons to improve trust and dwell time.",
    actions: {
      simulator: "Open simulator",
      guide: "View cost guide",
    },
    benefitsTitle: "Why use this calculator",
    benefitBadge: "SEO",
    benefits: [
      "Shows monthly estimates by city and profile.",
      "Helps compare Madrid, Barcelona, Valencia, and other cities.",
      "Acts as a starting point for budgeting and moving.",
    ],
    methodTitle: "How we calculate",
    method: [
      "We use aggregated, rounded data by city and profile.",
      "Numbers are updated with public references and editorial review.",
      "The result is a practical estimate, not a live property quote.",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "Does the calculator replace a professional budget?",
        a: "No. It is for triage and initial planning, focused on comparison and realistic ranges.",
      },
      {
        q: "Why do Madrid and Barcelona look more expensive?",
        a: "They have more demand, higher rent, and a generally higher cost than cities like Valencia or Seville.",
      },
      {
        q: "Does the calculator help with the visa?",
        a: "Yes. It complements the visa simulator by showing whether your financial plan matches the chosen route.",
      },
      {
        q: "Are the numbers official?",
        a: "They are editorial and market-based estimates, useful as practical references. For legal or financial decisions, confirm up-to-date figures.",
      },
    ],
    relatedTitle: "Next steps",
    relatedBody:
      "After estimating the cost of living, the next logical step is to validate which migration route fits your profile and compare both results.",
    relatedLinks: [
      { href: "/en/simulador/", label: "Open visa simulator" },
      { href: "/en/blog/qual-visto-espanha-brasileiro/", label: "Read visa guide" },
      { href: "/en/blog/custo-de-vida-espanha-2026/", label: "View city guide" },
    ],
    toolTitle: "Tool",
    toolBody:
      "After the editorial context, the tool lets users refine the estimate by city and profile in a few clicks.",
    comparisonLabels: {
      badge: "Solo",
      solo: "Solo",
      couple: "Couple",
      family: "Family",
    },
    costCards: [
      { label: "Madrid", city: "madrid" },
      { label: "Barcelona", city: "barcelona" },
      { label: "Valencia", city: "valencia" },
    ],
  },
};

export const calculatorWidgetContent: Localized<CalculatorWidgetContent> = {
  pt: {
    cityLabels: {
      madrid: "Madrid",
      barcelona: "Barcelona",
      valencia: "Valência",
      sevilla: "Sevilha",
      granada: "Granada",
      malaga: "Málaga",
      bilbao: "Bilbao",
    },
    profileLabels: {
      solo: { label: "Sozinho(a)", icon: "🧑" },
      couple: { label: "Casal", icon: "👫" },
      family: { label: "Família", icon: "👨‍👩‍👧" },
    },
    housingLabels: {
      apartment: { label: "Apartamento inteiro", icon: "🏠", desc: "Apartamento só para você" },
      room: { label: "Quarto em piso compartilhado", icon: "🛏️", desc: "Quarto em apartamento dividido" },
    },
    categoryLabels: {
      rent: "Aluguel",
      utilities: "Contas (luz/água/internet)",
      groceries: "Supermercado",
      transport: "Transporte",
      health: "Saúde",
      leisure: "Lazer",
      dining: "Comer fora",
      total: "Total estimado",
    },
    ui: {
      step1: "Cidade",
      step2: "Perfil",
      stepHousing: "Moradia",
      stepResult: "Resultado",
      resultCta: "Receber relatório completo por email",
      placeholder: "seu@email.com",
      send: "Enviar",
      month: "/mês",
      back: "Voltar",
      next: "Continuar",
      success: "Enviado! Verifique seu email.",
    },
  },
  es: {
    cityLabels: {
      madrid: "Madrid",
      barcelona: "Barcelona",
      valencia: "Valencia",
      sevilla: "Sevilla",
      granada: "Granada",
      malaga: "Málaga",
      bilbao: "Bilbao",
    },
    profileLabels: {
      solo: { label: "Solo/a", icon: "🧑" },
      couple: { label: "Pareja", icon: "👫" },
      family: { label: "Familia", icon: "👨‍👩‍👧" },
    },
    housingLabels: {
      apartment: { label: "Piso completo", icon: "🏠", desc: "Apartamento solo para ti" },
      room: { label: "Habitación en piso compartido", icon: "🛏️", desc: "Habitación en piso compartido" },
    },
    categoryLabels: {
      rent: "Alquiler",
      utilities: "Suministros (luz/agua/internet)",
      groceries: "Supermercado",
      transport: "Transporte",
      health: "Salud",
      leisure: "Ocio",
      dining: "Comer fuera",
      total: "Total estimado",
    },
    ui: {
      step1: "Ciudad",
      step2: "Perfil",
      stepHousing: "Vivienda",
      stepResult: "Resultado",
      resultCta: "Recibir informe completo por email",
      placeholder: "tu@email.com",
      send: "Enviar",
      month: "/mes",
      back: "Volver",
      next: "Continuar",
      success: "¡Enviado! Revisa tu email.",
    },
  },
  en: {
    cityLabels: {
      madrid: "Madrid",
      barcelona: "Barcelona",
      valencia: "Valencia",
      sevilla: "Seville",
      granada: "Granada",
      malaga: "Malaga",
      bilbao: "Bilbao",
    },
    profileLabels: {
      solo: { label: "Solo", icon: "🧑" },
      couple: { label: "Couple", icon: "👫" },
      family: { label: "Family", icon: "👨‍👩‍👧" },
    },
    housingLabels: {
      apartment: { label: "Full apartment", icon: "🏠", desc: "Apartment just for you" },
      room: { label: "Room in shared flat", icon: "🛏️", desc: "Room in a shared apartment" },
    },
    categoryLabels: {
      rent: "Rent",
      utilities: "Utilities (power/water/internet)",
      groceries: "Groceries",
      transport: "Transport",
      health: "Health",
      leisure: "Leisure",
      dining: "Dining out",
      total: "Estimated total",
    },
    ui: {
      step1: "City",
      step2: "Profile",
      stepHousing: "Housing",
      stepResult: "Result",
      resultCta: "Get full report by email",
      placeholder: "your@email.com",
      send: "Send",
      month: "/month",
      back: "Back",
      next: "Continue",
      success: "Sent! Check your email.",
    },
  },
};

export function getVisaRuleCopy(locale: Locale) {
  return visaRuleCopy[locale];
}

export function getVisaSimulatorPageContent(locale: Locale) {
  return visaSimulatorPageCopy[locale];
}

export function getVisaSimulatorWidgetContent(locale: Locale) {
  return visaSimulatorWidgetContent[locale];
}

export function getCalculatorPageContent(locale: Locale) {
  return calculatorPageContent[locale];
}

export function getCalculatorWidgetContent(locale: Locale) {
  return calculatorWidgetContent[locale];
}
