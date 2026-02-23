
import React, { useState, useEffect, useMemo } from 'react';
import { AppStatus, LinkItem, LinkResponse } from './types';
import { generateLinks } from './services/geminiService';
import LoadingState from './components/LoadingState';
import LinksSection from './components/LinksSection';

const App: React.FC = () => {
  const [url] = useState('https://hugosuez.com.br/');
  const [status, setStatus] = useState<AppStatus>(AppStatus.SUCCESS);
  const [data, setData] = useState<LinkResponse | null>({
    name: "Hugo Suez",
    shortDescription: "Vocal Coach Expert - Sistema Movimento e Expressividade Vocal™",
    links: [],
    sources: []
  });
  const [error, setError] = useState<string | null>(null);

  const profileImageUrl = "https://hugosuez.com.br/wp-content/uploads/al_opt_content/IMAGE/hugosuez.com.br/wp-content/uploads/2022/04/1-removebg-preview.png?bv_host=hugosuez.com.br&bv-resized-infos=bv_resized_mobile%3A480%2A284%3Bbv_resized_ipad%3A649%2A384%3Bbv_resized_desktop%3A649%2A384";

  const handleGenerate = async () => {
    // Mantemos a função caso você queira usar IA para algo no futuro, 
    // mas ela não será chamada automaticamente no início.
    if (!url) return;
    setStatus(AppStatus.LOADING);
    setError(null);
    try {
      const result = await generateLinks(url);
      setData(result);
      setStatus(AppStatus.SUCCESS);
    } catch (err: any) {
      setError(err.message);
      setStatus(AppStatus.ERROR);
    }
  };

  useEffect(() => {
    // Removido o handleGenerate() automático para economizar API
  }, []);

  const { mainLinks, legalLinks } = useMemo(() => {
    const finalLinks: LinkItem[] = [
      { label: 'Método Ornamento Expert', url: 'https://metodoornamentoexpert.com/', category: 'Método' },
      { label: 'Desafio Agilidade e Definição 30D', url: 'https://hugosuez.com.br/desafio-de-agilidade-e-definicao-vocal/', category: 'Desafio' },
      { label: 'Curso Combo Expert', url: 'https://hugosuez.com.br/combo-rapido-cantor-expert/', category: 'Combo' },
      { label: 'Aulas Particulares', url: `https://wa.me/5511986041291?text=${encodeURIComponent("Olá, gostaria de obter informações de aulas particulares")}`, category: 'Contato' },
      { label: 'Pack Grátis de Exercícios Vocais', url: 'https://hugosuez.com.br/pack-gratis/', category: 'Baixar' },
      { label: 'Inscreva-se no YouTube', url: 'https://www.youtube.com/@hugosuez', category: 'Canal Hugo Suez' }
    ];

    const finalLegal = [
      { label: 'Termos de Uso', url: 'https://hugosuez.com.br/termos-de-uso/', category: 'Legal' },
      { label: 'Política de Privacidade', url: 'https://hugosuez.com.br/politica-de-privacidade/', category: 'Legal' }
    ];

    return { mainLinks: finalLinks, legalLinks: finalLegal };
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col items-center selection:bg-indigo-500/30 overflow-hidden">
      
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

      <main className="flex-1 w-full max-w-2xl px-6 pt-16 pb-24 flex flex-col items-center">
        {status === AppStatus.LOADING && <LoadingState url={url} />}

        {status === AppStatus.ERROR && (
          <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center gap-6 animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center text-red-400">
              <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Ops! Algo deu errado</h3>
              <p className="text-slate-400 leading-relaxed">{error}</p>
            </div>
            <button 
              onClick={() => handleGenerate()}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] active:scale-95"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {status === AppStatus.SUCCESS && data && (
          <div className="w-full space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            
            <header className="flex flex-col items-center text-center gap-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative w-44 h-44 rounded-full p-1 bg-slate-900 border border-white/10 overflow-hidden">
                  <img 
                    src={profileImageUrl} 
                    alt="Hugo Suez" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>

              <div className="space-y-4 max-w-lg">
                <div className="space-y-1">
                   <h1 className="text-4xl font-extrabold text-white tracking-tight">Hugo Suez</h1>
                   <div className="flex items-center justify-center gap-2 text-indigo-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                     <i className="fa-solid fa-music"></i>
                     <span>Vocal Coach Expert</span>
                   </div>
                </div>
                
                <p className="text-slate-300 text-lg leading-relaxed font-medium">
                  Ajudo cantores a se tornarem marcantes e expressivos com o <span className="text-white font-bold italic">Sistema Movimento e Expressividade Vocal™</span>
                </p>

                <div className="flex justify-center gap-6 pt-2">
                  <a href="https://www.instagram.com/hugosuez/" target="_blank" className="text-slate-500 hover:text-white transition-colors text-xl">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a href="https://www.youtube.com/@hugosuez" target="_blank" className="text-slate-500 hover:text-white transition-colors text-xl">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </div>
              </div>
            </header>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-800"></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Experiências & Cursos</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-800"></div>
              </div>
              
              <LinksSection links={mainLinks} />
            </div>

            <div className="flex flex-col items-center gap-8 pt-8">
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                {legalLinks.map((link, idx) => (
                  <a 
                    key={idx} 
                    href={link.url} 
                    className="text-[10px] font-bold text-slate-500 hover:text-indigo-400 transition-colors uppercase tracking-[0.2em]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              
              <div className="flex flex-col items-center gap-2 opacity-40">
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-500">
                  © {new Date().getFullYear()} Hugo Suez
                </p>
                <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default App;
