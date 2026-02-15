
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
    if (lowerLabel.includes('youtube')) return 'from-red-500/20 to-red-600/5 text-red-400 border-red-500/20';
    if (lowerLabel.includes('whatsapp') || category === 'Contato') return 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/20';
    if (category === 'Método') return 'from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/20';
    
    return 'from-indigo-500/20 to-indigo-600/5 text-indigo-400 border-indigo-500/20';
  };

  if (!links || links.length === 0) return null;

  return (
    <div className="flex flex-col gap-5 w-full max-w-xl mx-auto px-2">
      {links.map((link, index) => (
        <a 
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            group relative flex items-center justify-between p-5 rounded-2xl 
            bg-gradient-to-br ${getAccentColor(link.category, link.label)}
            border backdrop-blur-md transition-all duration-500
            hover:scale-[1.03] hover:-translate-y-1 
            hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]
            active:scale-[0.98]
          `}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Subtle Glow Effect on Hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/5 pointer-events-none"></div>
          
          <div className="flex items-center gap-5 z-10">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-900/50 border border-white/10 group-hover:border-white/20 transition-all duration-300 group-hover:rotate-6 shadow-inner">
              <i className={`${getCategoryIcon(link.category, link.label)} text-xl`}></i>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] opacity-50 mb-1 group-hover:opacity-80 transition-opacity">
                {link.category}
              </span>
              <h4 className="text-lg font-bold text-white leading-tight group-hover:text-indigo-100 transition-colors">
                {link.label}
              </h4>
            </div>
          </div>
          
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 text-white/30 group-hover:text-white group-hover:bg-white/10 transition-all">
            <i className="fa-solid fa-chevron-right text-xs group-hover:translate-x-0.5 transition-transform"></i>
          </div>
        </a>
      ))}
    </div>
  );
};

export default LinksSection;
