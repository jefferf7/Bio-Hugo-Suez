
import React from 'react';

interface LoadingStateProps {
  url: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ url }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <i className="fa-solid fa-sparkles text-indigo-400 animate-pulse"></i>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-medium text-slate-200 mb-2">Analisando o site...</h3>
        <p className="text-slate-400 max-w-xs mx-auto">
          Nossa IA está lendo o conteúdo de <strong>{url}</strong> e buscando as melhores referências.
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
