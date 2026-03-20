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
    <footer className="bg-[#1a1a1a] text-gray-400 pt-20 pb-10 border-t-8 border-brand-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <Link href={`/${lang}`} className="flex items-center gap-2 mb-6">
            <img src="/logo.png" alt="Plano Espanha Logo" className="h-10 w-auto brightness-0 invert" />
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter font-heading">
              Plano<span className="text-brand-600">Espanha</span>
            </h3>
          </Link>
          <p className="text-sm leading-relaxed mb-6 font-medium">
            {t.desc}
          </p>
          <div className="flex gap-4">
             <a href="https://instagram.com/planoespanha" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
             </a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8">{t.tools}</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href={`/${lang}/calculadora`} className="hover:text-brand-600 transition-colors uppercase tracking-wider">{t.calc}</Link></li>
            <li><Link href={`/${lang}/simulador`} className="hover:text-brand-600 transition-colors uppercase tracking-wider">{t.visa}</Link></li>
            <li><Link href={`/${lang}/blog`} className="hover:text-brand-600 transition-colors uppercase tracking-wider">{t.blog}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8">{t.contact}</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="mailto:contato@planoespanha.com" className="hover:text-brand-600 transition-colors">contato@planoespanha.com</a></li>
          </ul>
        </div>
        <div className="bg-white/5 p-8 rounded border border-white/10">
           <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-4">Newsletter</h4>
           <p className="text-xs mb-4">Receba dicas exclusivas sobre a Espanha.</p>
           <div className="flex">
              <input type="email" placeholder="Email" className="bg-white/10 border-none text-white text-xs px-4 py-2 w-full rounded-l focus:ring-1 focus:ring-brand-600" />
              <button className="bg-brand-600 text-white text-[10px] font-black px-4 py-2 rounded-r uppercase tracking-widest">OK</button>
           </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 pt-10 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600">
        &copy; {new Date().getFullYear()} Plano Espanha. {t.rights}
      </div>
    </footer>
  );
}
