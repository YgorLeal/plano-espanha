import type { Locale } from "@/lib/i18n";

export type VisaLocation = "outside" | "inside";
export type VisaObjective =
  | "remote"
  | "job"
  | "study"
  | "family"
  | "self_employed"
  | "means"
  | "regularize"
  | "not_sure";
export type VisaWorkMode = "none" | "remote_foreign" | "local_offer" | "self_employed";
export type VisaIncome = "none" | "basic" | "stable" | "strong";
export type VisaOfferLevel = "none" | "normal" | "high";
export type VisaStudyStatus = "none" | "official";
export type VisaFamilyTie = "none" | "spanish" | "eu" | "resident";
export type VisaMonthsInSpain = "outside" | "lt2y" | "gte2y";
export type VisaStatus = "outside" | "regular" | "student" | "worker" | "irregular";
export type VisaProjectType = "none" | "traditional" | "innovative";

export type VisaInputs = {
  location: VisaLocation | null;
  objective: VisaObjective | null;
  workMode: VisaWorkMode | null;
  income: VisaIncome | null;
  offerLevel: VisaOfferLevel | null;
  studyStatus: VisaStudyStatus | null;
  familyTie: VisaFamilyTie | null;
  monthsInSpain: VisaMonthsInSpain | null;
  status: VisaStatus | null;
  projectType: VisaProjectType | null;
};

export type VisaConfidence = "alta" | "media" | "baixa";

export type VisaResult = {
  key: string;
  title: string;
  summary: string;
  score: number;
  confidence: VisaConfidence;
  reasons: string[];
  checks: string[];
  caution: string[];
  sources: { label: string; href: string }[];
};

type RouteMatcher = {
  key: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  checks: Record<Locale, string[]>;
  caution: Record<Locale, string[]>;
  score: (input: VisaInputs) => number;
  reasons: (input: VisaInputs, locale: Locale) => string[];
  sources: { label: Record<Locale, string>; href: string }[];
};

const copy = {
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
} as const;

const officialSources = {
  instructions: "https://ciudadaniaexterior.inclusion.gob.es/web/migraciones/instrucciones",
  uGe: "https://ciudadaniaexterior.inclusion.gob.es/web/unidadgrandesempresas/autorizaciones-y-requisitos",
  telework: "https://ciudadaniaexterior.inclusion.gob.es/gl/web/unidadgrandesempresas/teletrabajadores",
  nonLucrative: "https://ciudadaniaexterior.inclusion.gob.es/en/web/migraciones/w/autorizacion-inicial-de-residencia-temporal-no-lucrativa",
  studies: "https://ciudadaniaexterior.inclusion.gob.es/fr/web/migraciones/listado-completo",
  cuentaAjena: "https://ciudadaniaexterior.inclusion.gob.es/en/web/migraciones/cuenta-ajena",
  cuentaPropia: "https://ciudadaniaexterior.inclusion.gob.es/fr/web/migraciones/cuenta-propia-/-emprendedores",
  familySpanish: "https://ciudadaniaexterior.inclusion.gob.es/eu/web/migraciones/w/18.-autorizacion-de-residencia-temporal-de-familiares-de-personas-con-nacionalidad-espanola",
  familyEU: "https://ciudadaniaexterior.inclusion.gob.es/fr/web/migraciones/w/62.-tarjeta-de-residencia-de-familiar-de-ciudadano-de-la-union-europea",
  reunification: "https://ciudadaniaexterior.inclusion.gob.es/fr/web/migraciones/listado-completo",
  selfEmployed: "https://ciudadaniaexterior.inclusion.gob.es/fr/web/migraciones/cuenta-propia-/-emprendedores",
  highlyQualified: "https://ciudadaniaexterior.inclusion.gob.es/en/web/migraciones/trabajador-altamente-cualificado?fmdesktop-language-picker-select=es_ES",
  arraigoSocial: "https://ciudadaniaexterior.inclusion.gob.es/fr/web/migraciones/listado-completo",
  arraigoSocioformativo: "https://bibliovirtual.inclusion.gob.es/web/migraciones/w/30.-autorizacion-residencia-temporal-por-circunstancias-excepcionales.-arraigo-socioformativo",
  arraigoSociolaboral: "https://bibliovirtual.inclusion.gob.es/eu/web/migraciones/situacion-excepcional-o-de-irregularidad",
  investorLaw: "https://boe.es/buscar/act.php?id=BOE-A-2013-10074",
} as const;

function confidenceFromScore(score: number): VisaConfidence {
  if (score >= 75) return "alta";
  if (score >= 45) return "media";
  return "baixa";
}

function hasStableIncome(input: VisaInputs) {
  return input.income === "stable" || input.income === "strong";
}

function hasStrongIncome(input: VisaInputs) {
  return input.income === "strong";
}

function isInsideSpain(input: VisaInputs) {
  return input.location === "inside";
}

function isOutsideSpain(input: VisaInputs) {
  return input.location === "outside";
}

function addIf(array: string[], condition: boolean, value: string) {
  if (condition) array.push(value);
}

function getArraigoSubtype(input: VisaInputs, locale: Locale) {
  if (input.studyStatus === "official" || input.objective === "study") {
    return locale === "pt" ? "arraigo socioformativo" : locale === "es" ? "arraigo socioformativo" : "arraigo socio-formative";
  }

  if (input.workMode === "local_offer" || input.objective === "job") {
    return locale === "pt" ? "arraigo sociolaboral" : locale === "es" ? "arraigo sociolaboral" : "arraigo socio-laboral";
  }

  return locale === "pt" ? "arraigo social" : locale === "es" ? "arraigo social" : "social arraigo";
}

const routeMatchers: RouteMatcher[] = [
  {
    key: "telework",
    title: {
      pt: "Teletrabalho internacional",
      es: "Teletrabajo internacional",
      en: "International remote work",
    },
    summary: {
      pt: "Para quem trabalha para empresa de fora da Espanha e quer viver no país com base em atividade remota.",
      es: "Para quien trabaja para una empresa fuera de España y quiere vivir en el país con base en actividad remota.",
      en: "For people working for a company outside Spain who want to live in Spain on a remote-work basis.",
    },
    checks: {
      pt: ["Trabalho remoto com vínculo externo", "Seguro de saúde e meios de vida", "Documentação da empresa e contrato"],
      es: ["Trabajo remoto con vínculo externo", "Seguro médico y medios de vida", "Documentación de la empresa y contrato"],
      en: ["Remote work with an external employer", "Health insurance and means of support", "Company and contract evidence"],
    },
    caution: {
      pt: ["Se houver empresa/estrutura em Espanha, a via pode mudar de categoria.", "A UGE exige comprovação e deve ser revisada caso a caso."],
      es: ["Si existe empresa/estructura en España, la vía puede cambiar de categoría.", "UGE exige comprobación y debe revisarse caso por caso."],
      en: ["If there is a company structure in Spain, the route can change.", "UGE requires proof and should be checked case by case."],
    },
    score: (input) => {
      let score = 0;
      if (input.workMode === "remote_foreign") score += 55;
      if (input.objective === "remote") score += 20;
      if (hasStableIncome(input)) score += 15;
      if (isOutsideSpain(input)) score += 10;
      if (input.status === "irregular" && isInsideSpain(input)) score = 0;
      return score;
    },
    reasons: (input, locale) => {
      const m = copy[locale];
      const reasons: string[] = [];
      addIf(reasons, input.workMode === "remote_foreign", m.remoteForeign);
      addIf(reasons, hasStableIncome(input), m.stableIncome);
      addIf(reasons, isOutsideSpain(input), m.outsideSpain);
      addIf(reasons, isInsideSpain(input), m.insideSpain);
      return reasons;
    },
    sources: [
      { label: { pt: "UGE: teletrabalhadores", es: "UGE: teletrabajadores", en: "UGE: teleworkers" }, href: officialSources.telework },
      { label: { pt: "Instruções 2023/2025", es: "Instrucciones 2023/2025", en: "2023/2025 instructions" }, href: officialSources.instructions },
    ],
  },
  {
    key: "studies",
    title: {
      pt: "Estudos",
      es: "Estudios",
      en: "Studies",
    },
    summary: {
      pt: "Para quem foi admitido em curso oficial ou pretende estudar e depois compatibilizar trabalho dentro das regras.",
      es: "Para quien fue admitido en un programa oficial o quiere estudiar y luego compatibilizar trabajo dentro de las reglas.",
      en: "For people admitted to an official program who want to study and later combine work within the rules.",
    },
    checks: {
      pt: ["Matrícula ou admissão formal", "Meios para manutenção", "Regras de trabalho compatível"],
      es: ["Matrícula o admisión formal", "Medios de subsistencia", "Reglas de trabajo compatible"],
      en: ["Enrollment or formal admission", "Means of support", "Compatible work rules"],
    },
    caution: {
      pt: ["A carga horária e o tipo de curso importam.", "Trabalho por conta alheia ou própria pode depender do tipo de estudo e do limite legal."],
      es: ["La carga horaria y el tipo de curso importan.", "El trabajo por cuenta ajena o propia depende del tipo de estudio y del límite legal."],
      en: ["Course load and program type matter.", "Working rules depend on the study type and legal limits."],
    },
    score: (input) => {
      let score = 0;
      if (input.studyStatus === "official") score += 60;
      if (input.objective === "study") score += 25;
      if (input.status === "student") score += 10;
      if (isOutsideSpain(input)) score += 5;
      return score;
    },
    reasons: (input, locale) => {
      const m = copy[locale];
      const reasons: string[] = [];
      addIf(reasons, input.studyStatus === "official", m.officialStudy);
      addIf(reasons, input.objective === "study", locale === "pt" ? "Seu objetivo principal é estudar." : locale === "es" ? "Tu objetivo principal es estudiar." : "Your main goal is to study.");
      addIf(reasons, isOutsideSpain(input), m.outsideSpain);
      return reasons;
    },
    sources: [
      { label: { pt: "Estudos oficiais", es: "Estudios oficiales", en: "Official studies" }, href: officialSources.studies },
      { label: { pt: "Prorroga e trabalho compatível", es: "Prórroga y trabajo compatible", en: "Extension and compatible work" }, href: officialSources.instructions },
    ],
  },
  {
    key: "non_lucrative",
    title: {
      pt: "Residência não lucrativa",
      es: "Residencia no lucrativa",
      en: "Non-lucrative residence",
    },
    summary: {
      pt: "Para quem quer viver na Espanha sem trabalhar e tem meios econômicos próprios.",
      es: "Para quien quiere vivir en España sin trabajar y tiene medios económicos propios.",
      en: "For people who want to live in Spain without working and have their own means.",
    },
    checks: {
      pt: ["Meios econômicos estáveis", "Seguro de saúde privado", "Sem atividade laboral na Espanha"],
      es: ["Medios económicos estables", "Seguro médico privado", "Sin actividad laboral en España"],
      en: ["Stable financial means", "Private health insurance", "No work activity in Spain"],
    },
    caution: {
      pt: ["A via exige comprovar renda/recursos sem trabalhar.", "Se a pessoa já estiver em situação irregular, a via deixa de ser a recomendada."],
      es: ["La vía exige acreditar recursos sin trabajar.", "Si la persona ya está en situación irregular, deja de ser la vía recomendada."],
      en: ["This route requires proving resources without working.", "If the person is already irregular, it stops being the recommended route."],
    },
    score: (input) => {
      let score = 0;
      if (hasStableIncome(input)) score += 35;
      if (hasStrongIncome(input)) score += 20;
      if (input.workMode === "none") score += 20;
      if (input.objective === "means") score += 25;
      if (isOutsideSpain(input)) score += 15;
      if (input.status === "irregular" && isInsideSpain(input)) score = 0;
      return score;
    },
    reasons: (input, locale) => {
      const m = copy[locale];
      const reasons: string[] = [];
      addIf(reasons, hasStableIncome(input), m.stableIncome);
      addIf(reasons, hasStrongIncome(input), m.strongIncome);
      addIf(reasons, input.workMode === "none", locale === "pt" ? "Você não indicou atividade laboral na Espanha." : locale === "es" ? "No indicaste actividad laboral en España." : "You did not indicate work activity in Spain.");
      addIf(reasons, isOutsideSpain(input), m.outsideSpain);
      return reasons;
    },
    sources: [
      { label: { pt: "Hoja 6", es: "Hoja 6", en: "Sheet 6" }, href: officialSources.nonLucrative },
    ],
  },
  {
    key: "job_offer",
    title: {
      pt: "Trabalho por conta alheia",
      es: "Trabajo por cuenta ajena",
      en: "Employed work",
    },
    summary: {
      pt: "Para quem tem oferta formal de emprego na Espanha e será contratado por empresa local.",
      es: "Para quien tiene una oferta formal de empleo en España y será contratado por una empresa local.",
      en: "For people with a formal job offer in Spain who will be hired by a local company.",
    },
    checks: {
      pt: ["Oferta de trabalho formal", "Empresa espanhola contratante", "Situação migratória compatível"],
      es: ["Oferta formal de empleo", "Empresa española contratante", "Situación migratoria compatible"],
      en: ["Formal job offer", "Hiring Spanish company", "Compatible immigration status"],
    },
    caution: {
      pt: ["O empregador precisa estar apto a fazer o pedido.", "Se o cargo exigir alta qualificação, a via UGE pode ser melhor."],
      es: ["El empleador debe poder presentar la solicitud.", "Si el puesto exige alta cualificación, la vía UGE puede ser mejor."],
      en: ["The employer must be able to file the request.", "If the role is highly qualified, the UGE route may be better."],
    },
    score: (input) => {
      let score = 0;
      if (input.workMode === "local_offer") score += 45;
      if (input.objective === "job") score += 20;
      if (input.offerLevel === "normal") score += 20;
      if (input.offerLevel === "high") score -= 10;
      if (input.status === "irregular" && isInsideSpain(input)) score = 0;
      return score;
    },
    reasons: (input, locale) => {
      const m = copy[locale];
      const reasons: string[] = [];
      addIf(reasons, input.workMode === "local_offer", m.localOffer);
      addIf(reasons, input.offerLevel === "normal", locale === "pt" ? "A vaga não foi sinalizada como alta qualificação." : locale === "es" ? "La vacante no fue marcada como alta cualificación." : "The role was not marked as highly qualified.");
      addIf(reasons, input.objective === "job", locale === "pt" ? "Seu objetivo principal é trabalhar na Espanha." : locale === "es" ? "Tu objetivo principal es trabajar en España." : "Your main goal is to work in Spain.");
      return reasons;
    },
    sources: [
      { label: { pt: "Trabalho por conta alheia", es: "Cuenta ajena", en: "Employed work" }, href: officialSources.cuentaAjena },
      { label: { pt: "Hoja 12", es: "Hoja 12", en: "Sheet 12" }, href: officialSources.cuentaAjena },
    ],
  },
  {
    key: "highly_qualified",
    title: {
      pt: "Profissionais altamente qualificados",
      es: "Profesionales altamente cualificados",
      en: "Highly qualified professionals",
    },
    summary: {
      pt: "Para cargos de alta qualificação, normalmente tramitados pela UGE sob a Lei 14/2013.",
      es: "Para puestos de alta cualificación, normalmente tramitados por la UGE bajo la Ley 14/2013.",
      en: "For highly qualified roles, usually processed by the UGE under Law 14/2013.",
    },
    checks: {
      pt: ["Oferta firme ou contrato qualificado", "Cualificação superior ou experiência relevante", "Tramitação UGE"],
      es: ["Oferta firme o contrato cualificado", "Cualificación superior o experiencia relevante", "Tramitación UGE"],
      en: ["Firm offer or qualified contract", "Higher qualification or relevant experience", "UGE processing"],
    },
    caution: {
      pt: ["O enquadramento depende do cargo e da prova de qualificação.", "A via é diferente da contratação ordinária por conta alheia."],
      es: ["El encaje depende del puesto y de la prueba de cualificación.", "La vía es diferente de la contratación ordinaria por cuenta ajena."],
      en: ["Eligibility depends on the role and proof of qualification.", "This route differs from ordinary employed work."],
    },
    score: (input) => {
      let score = 0;
      if (input.workMode === "local_offer") score += 35;
      if (input.offerLevel === "high") score += 45;
      if (input.objective === "job") score += 10;
      if (isOutsideSpain(input)) score += 10;
      return score;
    },
    reasons: (input, locale) => {
      const m = copy[locale];
      const reasons: string[] = [];
      addIf(reasons, input.workMode === "local_offer", m.localOffer);
      addIf(reasons, input.offerLevel === "high", m.highOffer);
      addIf(reasons, isOutsideSpain(input), m.outsideSpain);
      return reasons;
    },
    sources: [
      { label: { pt: "Hoja 66", es: "Hoja 66", en: "Sheet 66" }, href: officialSources.highlyQualified },
      { label: { pt: "UGE: autorizações e requisitos", es: "UGE: autorizaciones y requisitos", en: "UGE: authorizations and requirements" }, href: officialSources.uGe },
    ],
  },
  {
    key: "self_employed",
    title: {
      pt: "Trabalho por conta própria",
      es: "Trabajo por cuenta propia",
      en: "Self-employed work",
    },
    summary: {
      pt: "Para quem vai abrir ou tocar uma atividade por conta própria na Espanha.",
      es: "Para quien va a abrir o gestionar una actividad por cuenta propia en España.",
      en: "For people opening or running a self-employed activity in Spain.",
    },
    checks: {
      pt: ["Projeto próprio ou atividade autônoma", "Capacidade técnica e financeira", "Licenças e plano de negócio quando aplicável"],
      es: ["Proyecto propio o actividad autónoma", "Capacidad técnica y financiera", "Licencias y plan de negocio cuando aplique"],
      en: ["Own project or freelance activity", "Technical and financial capacity", "Licenses and business plan when applicable"],
    },
    caution: {
      pt: ["Se o projeto tiver caráter inovador, a via de emprendedor pode ser melhor.", "A documentação varia conforme a atividade e o município."],
      es: ["Si el proyecto es innovador, la vía de emprendedor puede ser mejor.", "La documentación cambia según la actividad y el municipio."],
      en: ["If the project is innovative, the entrepreneur route may be better.", "Documentation varies by activity and municipality."],
    },
    score: (input) => {
      let score = 0;
      if (input.workMode === "self_employed") score += 45;
      if (input.projectType === "traditional") score += 25;
      if (input.objective === "self_employed") score += 15;
      if (isOutsideSpain(input)) score += 10;
      return score;
    },
    reasons: (input, locale) => {
      const m = copy[locale];
      const reasons: string[] = [];
      addIf(reasons, input.workMode === "self_employed", m.selfEmployed);
      addIf(reasons, input.projectType === "traditional", locale === "pt" ? "O projeto parece de operação clássica, não necessariamente inovadora." : locale === "es" ? "El proyecto parece de operación clásica, no necesariamente innovadora." : "The project looks like a classic, non-innovative operation.");
      return reasons;
    },
    sources: [
      { label: { pt: "Conta própria / empreendedores", es: "Cuenta propia / emprendedores", en: "Self-employed / entrepreneurs" }, href: officialSources.selfEmployed },
    ],
  },
  {
    key: "entrepreneur",
    title: {
      pt: "Empreendedor / projeto empresarial",
      es: "Emprendedor / proyecto empresarial",
      en: "Entrepreneur / business project",
    },
    summary: {
      pt: "Para projetos empresariais com componente inovadora ou potencial econômico relevante.",
      es: "Para proyectos empresariales con componente innovadora o potencial económico relevante.",
      en: "For business projects with an innovative component or relevant economic potential.",
    },
    checks: {
      pt: ["Projeto inovador", "Plano empresarial", "Enquadramento UGE / Lei 14/2013"],
      es: ["Proyecto innovador", "Plan empresarial", "Encaje UGE / Ley 14/2013"],
      en: ["Innovative project", "Business plan", "UGE / Law 14/2013 route"],
    },
    caution: {
      pt: ["Não confundir com simples autônomo.", "O projeto precisa demonstrar valor econômico, inovação ou interesse específico."],
      es: ["No confundir con autónomo simple.", "El proyecto debe demostrar valor económico, innovación o interés específico."],
      en: ["Do not confuse this with simple self-employment.", "The project must show economic value, innovation, or specific interest."],
    },
    score: (input) => {
      let score = 0;
      if (input.projectType === "innovative") score += 55;
      if (input.objective === "self_employed") score += 10;
      if (input.workMode === "self_employed") score += 10;
      if (isOutsideSpain(input)) score += 10;
      return score;
    },
    reasons: (input, locale) => {
      const m = copy[locale];
      const reasons: string[] = [];
      addIf(reasons, input.projectType === "innovative", m.innovativeProject);
      addIf(reasons, input.objective === "self_employed", locale === "pt" ? "Você quer empreender ou trabalhar por conta própria." : locale === "es" ? "Quieres emprender o trabajar por cuenta propia." : "You want to start a business or work independently.");
      return reasons;
    },
    sources: [
      { label: { pt: "UGE: autorização empresarial", es: "UGE: autorización empresarial", en: "UGE: business authorization" }, href: officialSources.uGe },
      { label: { pt: "Lei 14/2013", es: "Ley 14/2013", en: "Law 14/2013" }, href: officialSources.investorLaw },
    ],
  },
  {
    key: "family_spanish",
    title: {
      pt: "Familiar de espanhol",
      es: "Familiar de español",
      en: "Family member of a Spanish national",
    },
    summary: {
      pt: "Para cônjuge, parceiro ou demais familiares de pessoa com nacionalidade espanhola.",
      es: "Para cónyuge, pareja u otros familiares de persona con nacionalidad española.",
      en: "For spouses, partners, or other relatives of a Spanish national.",
    },
    checks: {
      pt: ["Vínculo com nacional espanhol", "Conviver, acompanhar ou reunir-se conforme a norma", "Pedido com modelo correto"],
      es: ["Vínculo con nacional español", "Conviva, acompañe o se reúna según la norma", "Solicitud con modelo correcto"],
      en: ["Family tie with a Spanish national", "Accompany, join, or live together under the rule", "Correct application model"],
    },
    caution: {
      pt: ["A residência de familiar de espanhol tem regra própria e atualizada.", "Se houve livre circulação da pessoa espanhola, pode haver via comunitária."],
      es: ["La residencia de familiar de español tiene su propia regla actualizada.", "Si hubo libre circulación, puede aplicar la vía comunitaria."],
      en: ["Residence for family members of a Spanish national has its own updated rule.", "If free movement was exercised, the EU-family route may apply."],
    },
    score: (input) => {
      let score = 0;
      if (input.familyTie === "spanish") score += 65;
      if (input.objective === "family") score += 20;
      if (input.location === "outside") score += 10;
      return score;
    },
    reasons: (input, locale) => {
      const m = copy[locale];
      const reasons: string[] = [];
      addIf(reasons, input.familyTie === "spanish", m.familySpanish);
      addIf(reasons, input.objective === "family", locale === "pt" ? "Você quer seguir por via familiar." : locale === "es" ? "Quieres ir por la vía familiar." : "You want a family-based route.");
      return reasons;
    },
    sources: [
      { label: { pt: "Hoja 18", es: "Hoja 18", en: "Sheet 18" }, href: officialSources.familySpanish },
      { label: { pt: "Instruções SEM 2/2025", es: "Instrucciones SEM 2/2025", en: "SEM 2/2025 instructions" }, href: officialSources.instructions },
    ],
  },
  {
    key: "family_eu",
    title: {
      pt: "Familiar de cidadão da UE",
      es: "Familiar de ciudadano de la UE",
      en: "Family member of an EU citizen",
    },
    summary: {
      pt: "Para familiares de cidadão da UE/EEE/Suíça com enquadramento comunitário.",
      es: "Para familiares de ciudadano de la UE/EEE/Suiza con encaje comunitario.",
      en: "For family members of an EU/EEA/Swiss citizen under the community regime.",
    },
    checks: {
      pt: ["Vínculo com cidadão da UE/EEE/Suíça", "Convivência ou dependência conforme o caso", "Modelo comunitário adequado"],
      es: ["Vínculo con ciudadano de la UE/EEE/Suiza", "Convivencia o dependencia según el caso", "Modelo comunitario adecuado"],
      en: ["Family tie with an EU/EEA/Swiss citizen", "Cohabitation or dependency as applicable", "Correct community model"],
    },
    caution: {
      pt: ["Para familiar de espanhol, a via comunitária só entra se houve livre circulação.", "O modelo pode variar entre EX19 e EX24."],
      es: ["Para familiar de español, la vía comunitaria solo aplica si hubo libre circulación.", "El modelo puede variar entre EX19 y EX24."],
      en: ["For Spanish nationals, the EU-family route only applies if free movement was exercised.", "The form can vary between EX19 and EX24."],
    },
    score: (input) => {
      let score = 0;
      if (input.familyTie === "eu") score += 65;
      if (input.objective === "family") score += 15;
      return score;
    },
    reasons: (input, locale) => {
      const m = copy[locale];
      const reasons: string[] = [];
      addIf(reasons, input.familyTie === "eu", m.familyEU);
      return reasons;
    },
    sources: [
      { label: { pt: "Hoja 62", es: "Hoja 62", en: "Sheet 62" }, href: officialSources.familyEU },
      { label: { pt: "Portal UGE", es: "Portal UGE", en: "UGE portal" }, href: officialSources.uGe },
    ],
  },
  {
    key: "reunification",
    title: {
      pt: "Reagrupação familiar",
      es: "Reagrupación familiar",
      en: "Family reunification",
    },
    summary: {
      pt: "Para familiares de pessoa estrangeira com residência legal na Espanha.",
      es: "Para familiares de una persona extranjera con residencia legal en España.",
      en: "For family members of a legally resident foreigner in Spain.",
    },
    checks: {
      pt: ["Reagrupante com residência legal", "Laços familiares admitidos", "Pedido na via correta"],
      es: ["Reagrupante con residencia legal", "Vínculos familiares admitidos", "Solicitud por la vía correcta"],
      en: ["Sponsor with legal residence", "Accepted family links", "Correct application route"],
    },
    caution: {
      pt: ["É uma via diferente da residência de familiar de espanhol.", "Depende de quem é o reagrupante e do seu status em Espanha."],
      es: ["Es una vía distinta de la residencia de familiar de español.", "Depende de quién es el reagrupante y de su estatus en España."],
      en: ["This is different from residence for family members of a Spanish national.", "It depends on the sponsor and their status in Spain."],
    },
    score: (input) => {
      let score = 0;
      if (input.familyTie === "resident") score += 65;
      if (input.objective === "family") score += 15;
      return score;
    },
    reasons: (input, locale) => {
      const m = copy[locale];
      const reasons: string[] = [];
      addIf(reasons, input.familyTie === "resident", m.familyResident);
      return reasons;
    },
    sources: [
      { label: { pt: "Reagrupação familiar", es: "Reagrupación familiar", en: "Family reunification" }, href: officialSources.reunification },
    ],
  },
  {
    key: "arraigo",
    title: {
      pt: "Arraigo",
      es: "Arraigo",
      en: "Arraigo",
    },
    summary: {
      pt: "Para quem já está na Espanha há pelo menos dois anos e precisa de regularização por circunstâncias excepcionais.",
      es: "Para quien ya está en España desde hace al menos dos años y necesita regularización por circunstancias excepcionales.",
      en: "For people already in Spain for at least two years who need exceptional regularization.",
    },
    checks: {
      pt: ["Permanência continuada de 2 anos", "Situação irregular ou de regularização", "Subtipo correto: social, sociolaboral ou socioformativo"],
      es: ["Permanencia continuada de 2 años", "Situación irregular o de regularización", "Subtipo correcto: social, sociolaboral o socioformativo"],
      en: ["Continuous stay for 2 years", "Irregular or regularization need", "Correct subtype: social, labor, or training"],
    },
    caution: {
      pt: ["Sem 2 anos de permanência, a via de arraigo não fecha.", "O subtipo depende de prova social, trabalho ou formação."],
      es: ["Sin 2 años de permanencia, la vía de arraigo no encaja.", "El subtipo depende de prueba social, laboral o formativa."],
      en: ["Without 2 years of presence, arraigo does not fit.", "The subtype depends on social, work, or training proof."],
    },
    score: (input) => {
      let score = 0;
      if (isInsideSpain(input)) score += 25;
      if (input.monthsInSpain === "gte2y") score += 40;
      if (input.status === "irregular") score += 25;
      if (input.objective === "regularize") score += 10;
      return score;
    },
    reasons: (input, locale) => {
      const m = copy[locale];
      const reasons: string[] = [];
      addIf(reasons, isInsideSpain(input), m.insideSpain);
      addIf(reasons, input.monthsInSpain === "gte2y", m.twoYears);
      addIf(reasons, input.status === "irregular", m.irregular);
      addIf(reasons, input.status === "regular", m.regular);
      return reasons;
    },
    sources: [
      { label: { pt: "Arraigo social", es: "Arraigo social", en: "Social arraigo" }, href: officialSources.arraigoSocial },
      { label: { pt: "Arraigo socioformativo", es: "Arraigo socioformativo", en: "Training arraigo" }, href: officialSources.arraigoSocioformativo },
      { label: { pt: "Instruções de arraigo", es: "Instrucciones de arraigo", en: "Arraigo instructions" }, href: officialSources.instructions },
    ],
  },
];

function qualifyResult(route: RouteMatcher, score: number, input: VisaInputs, locale: Locale): VisaResult | null {
  if (score <= 0) return null;

  const reasons = route.reasons(input, locale);
  const confidence = confidenceFromScore(score);
  const title = route.title[locale];
  const summary = route.summary[locale];
  const checks = route.checks[locale];
  const caution = route.caution[locale];

  return {
    key: route.key,
    title,
    summary,
    score,
    confidence,
    reasons: reasons.length > 0 ? reasons : [copy[locale].noClearRoute],
    checks,
    caution,
    sources: route.sources.map((source) => ({
      label: source.label[locale],
      href: source.href,
    })),
  };
}

export function evaluateVisaProfile(locale: Locale, input: VisaInputs) {
  const results = routeMatchers
    .map((route) => {
      const score = route.score(input);
      return qualifyResult(route, score, input, locale);
    })
    .filter((result): result is VisaResult => Boolean(result))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return {
    results,
    disclaimer: copy[locale].transitionNote,
    hasStrongMatch: results.length > 0 && results[0].score >= 45,
  };
}

export function getVisaCopy(locale: Locale) {
  return copy[locale];
}

export function getOfficialSources(locale: Locale) {
  return [
    { label: locale === "pt" ? "Instruções e critérios oficiais" : locale === "es" ? "Instrucciones y criterios oficiales" : "Official instructions and criteria", href: officialSources.instructions },
    { label: locale === "pt" ? "UGE: autorizações e requisitos" : locale === "es" ? "UGE: autorizaciones y requisitos" : "UGE: authorizations and requirements", href: officialSources.uGe },
    { label: locale === "pt" ? "Teletrabalho internacional" : locale === "es" ? "Teletrabajo internacional" : "International remote work", href: officialSources.telework },
    { label: locale === "pt" ? "Residência não lucrativa" : locale === "es" ? "Residencia no lucrativa" : "Non-lucrative residence", href: officialSources.nonLucrative },
    { label: locale === "pt" ? "Estudos e formação" : locale === "es" ? "Estudios y formación" : "Studies and training", href: officialSources.studies },
    { label: locale === "pt" ? "Família e reagrupação" : locale === "es" ? "Familia y reagrupación" : "Family and reunification", href: officialSources.reunification },
  ];
}
