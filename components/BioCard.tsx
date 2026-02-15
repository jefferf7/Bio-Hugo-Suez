
import React, { useState } from 'react';
import { GeneratedBio } from '../types';

interface BioCardProps {
  bio: GeneratedBio;
}

const BioCard: React.FC<BioCardProps> = ({ bio }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const textToCopy = `${bio.content}\n\n${bio.hashtags.join(' ')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIcon = () => {
    switch (bio.type) {
      case 'Professional': return 'fa-briefcase';
      case 'Creative': return 'fa-wand-magic-sparkles';
      case 'Minimalist': return 'fa-bolt';
      default: return 'fa-align-left';
    }
  };

  const getTypeLabel = () => {
    switch (bio.type) {
      case 'Professional': return 'Profissional';
      case 'Creative': return 'Criativa';
      case 'Minimalist': return 'Minimalista';
      default: return bio.type;
    }
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300 group">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <i className={`fa-solid ${getIcon()} text-lg`}></i>
          </div>
          <h3 className="font-semibold text-lg text-slate-100">{getTypeLabel()}</h3>
        </div>
        <button 
          onClick={copyToClipboard}
          className="text-slate-400 hover:text-indigo-400 transition-colors p-2"
          title="Copiar para área de transferência"
        >
          {copied ? (
            <i className="fa-solid fa-check text-green-400"></i>
          ) : (
            <i className="fa-regular fa-copy"></i>
          )}
        </button>
      </div>
      
      <p className="text-slate-300 leading-relaxed mb-4 whitespace-pre-wrap">
        {bio.content}
      </p>
      
      {bio.hashtags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto">
          {bio.hashtags.map((tag, idx) => (
            <span key={idx} className="text-xs font-medium text-indigo-400/80 bg-indigo-500/5 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default BioCard;
