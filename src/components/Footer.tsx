import Link from "next/link";
import { Locale } from "@/lib/i18n";

const labels: Record<Locale, { desc: string; tools: string; contact: string; rights: string; calc: string; visa: string; blog: string }> = {
  pt: {
    desc: "Ferramentas gratuitas para brasileiros que querem planejar sua mudança para a Espanha.",
    tools: "Ferramentas", contact: "Contato", rights: "Todos os direitos reservados.",
    calc: "Calculadora de Custo de Vida", visa: "Simulador de Visto", blog: "Blog",
  },
  es: {
    desc: "Herramientas gratuitas para brasileños que quieren planificar su mudanza a España.",
    tools: "Herramientas", contact: "Contacto", rights: "Todos los derechos reservados.",
    calc: "Calculadora de Coste de Vida", visa: "Simulador de Visado", blog: "Blog",
  },
  en: {
    desc: "Free tools for Brazilians planning their move to Spain.",
    tools: "Tools", contact: "Contact", rights: "All rights reserved.",
    calc: "Cost of Living Calculator", visa: "Visa Simulator", blog: "Blog",
  },
};

export default function Footer({ lang }: { lang: Locale }) {
  const t = labels[lang];

  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">
            Plano<span className="text-brand-400">Espanha</span>
          </h3>
          <p className="text-sm leading-relaxed">{t.desc}</p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">{t.tools}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${lang}/calculadora`} className="hover:text-white transition">{t.calc}</Link></li>
            <li><Link href={`/${lang}/simulador`} className="hover:text-white transition">{t.visa}</Link></li>
            <li><Link href={`/${lang}/blog`} className="hover:text-white transition">{t.blog}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">{t.contact}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="https://instagram.com/planoespanha" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a></li>
            <li><a href="mailto:contato@planoespanha.com" className="hover:text-white transition">contato@planoespanha.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Plano Espanha. {t.rights}
      </div>
    </footer>
  );
}
