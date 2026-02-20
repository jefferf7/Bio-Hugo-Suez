
import React from 'react';
import { LinkItem } from '../types';

interface LinksSectionProps {
  links: LinkItem[];
}

const LinksSection: React.FC<LinksSectionProps> = ({ links }) => {
  const getCategoryIcon = (category: string, label: string) => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('youtube')) return 'fa-brands fa-youtube';
    if (lowerLabel.includes('whatsapp')) return 'fa-brands fa-whatsapp';

    switch (category) {
      case 'Social': return 'fa-solid fa-share-nodes';
      case 'Acesso': return 'fa-solid fa-crown';
      case 'Método': return 'fa-solid fa-certificate';
      case 'Desafio': return 'fa-solid fa-bolt-lightning';
      case 'Combo': return 'fa-solid fa-layer-group';
      case 'Contato': return 'fa-solid fa-comment-dots';
      case 'Baixar': return 'fa-solid fa-circle-down';
      default: return 'fa-solid fa-arrow-right';
    }
  };

  const getAccentColor = (category: string, label: string) => {
    const lowerLabel = label.toLowerCase();
    // Cores premium: Ouro e Índigo Profundo
    if (lowerLabel.includes('youtube')) return 'from-red-500/10 to-red-900/20 text-red-400 border-red-500/20';
    if (lowerLabel.includes('whatsapp') || category === 'Contato') return 'from-emerald-500/10 to-emerald-900/20 text-emerald-400 border-emerald-500/20';
    if (category === 'Método') return 'from-[#d4af37]/20 to-[#d4af37]/5 text-[#d4af37] border-[#d4af37]/30';
    
    return 'from-indigo-500/10 to-indigo-900/20 text-indigo-400 border-indigo-500/20';
  };

  if (!links || links.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl mx-auto px-2">
      {links.map((link, index) => (
        <a 
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            group relative flex items-center justify-between p-5 rounded-2xl 
            bg-gradient-to-br ${getAccentColor(link.category, link.label)}
            border backdrop-blur-xl transition-all duration-500
            hover:scale-[1.02] hover:-translate-y-1 
            hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)]
            active:scale-[0.98]
          `}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Brilho dourado sutil no hover para links de Método */}
          {link.category === 'Método' && (
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-[#d4af37] pointer-events-none"></div>
          )}
          
          <div className="flex items-center gap-5 z-10">
            <div className={`
              w-12 h-12 flex items-center justify-center rounded-xl 
              bg-slate-950/80 border transition-all duration-500
              ${link.category === 'Método' ? 'border-[#d4af37]/40 group-hover:border-[#d4af37]' : 'border-white/10 group-hover:border-white/30'}
              group-hover:rotate-3 shadow-2xl
            `}>
              <i className={`${getCategoryIcon(link.category, link.label)} text-xl`}></i>
            </div>
            <div className="flex flex-col">
              <span className={`text-[9px] font-black uppercase tracking-[0.3em] opacity-40 mb-1 group-hover:opacity-100 transition-opacity ${link.category === 'Método' ? 'text-[#d4af37]' : ''}`}>
                {link.category}
              </span>
              <h4 className="text-base font-bold text-white leading-tight group-hover:text-white transition-colors">
                {link.label}
              </h4>
            </div>
          </div>
          
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white/20 group-hover:text-white group-hover:bg-white/10 transition-all">
            <i className="fa-solid fa-arrow-up-right-from-square text-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i>
          </div>
        </a>
      ))}
    </div>
  );
};

export default LinksSection;
