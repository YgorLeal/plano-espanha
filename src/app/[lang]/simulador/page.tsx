import Link from "next/link";
import { Locale } from "@/lib/i18n";

export const runtime = 'edge';

const content: Record<Locale, { title: string; subtitle: string; soon: string; cta: string }> = {
  pt: {
    title: "Simulador de Visto",
    subtitle: "Descubra qual tipo de visto se encaixa no seu perfil",
    soon: "O simulador de visto está sendo finalizado e estará disponível em breve. Enquanto isso, confira nosso guia completo sobre vistos.",
    cta: "Ler guia de vistos",
  },
  es: {
    title: "Simulador de Visado",
    subtitle: "Descubre qué tipo de visado se adapta a tu perfil",
    soon: "El simulador de visado se está finalizando y estará disponible pronto. Mientras tanto, consulta nuestra guía completa sobre visados.",
    cta: "Leer guía de visados",
  },
  en: {
    title: "Visa Simulator",
    subtitle: "Find out which visa type fits your profile",
    soon: "The visa simulator is being finalized and will be available soon. Meanwhile, check out our complete visa guide.",
    cta: "Read visa guide",
  },
};

export default function SimuladorPage({ params }: { params: { lang: Locale } }) {
  const t = content[params.lang];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="bg-gradient-to-br from-brand-50 to-orange-50 rounded-2xl p-12 border border-brand-100">
        <div className="text-5xl mb-6">🛂</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">{t.title}</h1>
        <p className="text-lg text-gray-600 mb-6">{t.subtitle}</p>
        <div className="inline-block bg-yellow-100 text-yellow-800 text-sm font-medium px-4 py-2 rounded-full mb-6">
          Em breve / Coming soon
        </div>
        <p className="text-gray-600 max-w-lg mx-auto mb-8">{t.soon}</p>
        <Link
          href={`/${params.lang}/blog/qual-visto-espanha-brasileiro`}
          className="inline-block bg-brand-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-brand-700 transition"
        >
          {t.cta}
        </Link>
      </div>
    </section>
  );
}
