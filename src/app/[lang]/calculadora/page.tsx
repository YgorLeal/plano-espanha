import Calculator from "@/components/Calculator";
import { Locale } from "@/lib/i18n";

const titles: Record<Locale, { title: string; subtitle: string }> = {
  pt: { title: "Calculadora de Custo de Vida", subtitle: "Descubra quanto custa viver na Espanha para o seu perfil" },
  es: { title: "Calculadora de Coste de Vida", subtitle: "Descubre cuánto cuesta vivir en España para tu perfil" },
  en: { title: "Cost of Living Calculator", subtitle: "Find out how much it costs to live in Spain for your profile" },
};

export default function CalculadoraPage({ params }: { params: { lang: Locale } }) {
  const t = titles[params.lang];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">{t.title}</h1>
        <p className="text-lg text-gray-600">{t.subtitle}</p>
      </div>
      <Calculator lang={params.lang} />
    </section>
  );
}
