import React from 'react';

export default function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] bg-surface-container-lowest rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100">
      <div className="h-24 w-24 bg-primary/5 rounded-3xl flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-primary text-5xl">construction</span>
      </div>
      <h2 className="text-3xl font-extrabold tracking-tight text-primary mb-2">Página {title}</h2>
      <p className="text-on-primary-container font-medium text-lg text-center max-w-md">
        Esta seção do sistema ainda está em desenvolvimento. Em breve, novas funcionalidades estarão disponíveis aqui.
      </p>
    </div>
  );
}
