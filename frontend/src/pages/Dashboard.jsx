import React from 'react';

export default function Dashboard() {
  return (
    <>
      {/* Greeting Section */}
      <section className="px-4 mb-8">
        <h2 className="text-5xl font-extrabold tracking-tight text-slate-800 mb-2">Bom dia, Abbas</h2>
        <p className="text-slate-500 font-medium text-lg">Você está logado como Admin. Seu resumo executivo para esta terça-feira está pronto.</p>
      </section>

      {/* Bento Box Grid - Liquid Glass */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 pb-12 auto-rows-auto md:auto-rows-[160px]">
        
        {/* BIG FEATURED: Tarefas do Dia (col-span-2, row-span-2) */}
        <div className="col-span-1 md:col-span-2 row-span-2 group relative bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] text-slate-800">
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 opacity-80">O que fazer?</span>
              <h3 className="text-2xl font-extrabold mt-1 text-slate-900">Tarefas Urgentes</h3>
            </div>
            <div className="h-12 w-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600">task_alt</span>
            </div>
          </div>
          
          <div className="space-y-3 relative z-10">
            <div className="bg-white/40 backdrop-blur-xl p-4 rounded-2xl hover:bg-white/80 transition-colors cursor-pointer border border-white/50 shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-sm font-bold text-slate-800">Aprovar Budget Q4</p>
                <span className="text-[10px] font-bold py-1 px-3 bg-red-100 text-red-600 rounded-full">Urgente</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-2">Vence em 2h</p>
            </div>
            <div className="bg-white/40 backdrop-blur-xl p-4 rounded-2xl hover:bg-white/80 transition-colors cursor-pointer border border-white/50 shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-sm font-bold text-slate-800">Revisar Contratos Alpha</p>
                <span className="text-[10px] font-bold py-1 px-3 bg-slate-200 text-slate-600 rounded-full">Hoje</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-2">Designado por Diretoria</p>
            </div>
          </div>
          
          <button className="mt-6 w-full py-3.5 rounded-full text-[11px] font-black uppercase tracking-widest text-slate-700 bg-white hover:bg-slate-50 border border-white/80 transition-colors shadow-sm relative z-10">Lista Completa (8)</button>
        </div>

        {/* TALL LIST: Quem está presente (col-span-1, row-span-2) */}
        <div className="col-span-1 row-span-2 group relative bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Tempo Real</span>
              <h3 className="text-lg font-extrabold mt-1 text-slate-900">Equipe</h3>
            </div>
            <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 py-1 px-3 rounded-full">142 online</span>
          </div>
          
          <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2 min-h-[160px]">
            {[1, 2, 3, 4].map((_, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 hover:bg-white/50 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                    <img alt="Team member" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD2QLvydze0R7iRf1r3lE4XUcUeRAKbUgkmQj170vRWAhAB_k-TZxevaq_zyB6nfX7mj-gA5SZKLRAe4AEf1qLivHM_Ic5HBcwsF46UdKsh1dOIvVYSggwNB0bCglACel-6twFbNC_kB1hTRgWm9Rk30QWC6A_QtWWEyz6lbLGKF8NZWWaI5ia5iwUxYAMFX_nz_elXisbpXJmkV4lJk6y4OOqWvigQ1fC8wJxmfz2ZWaEy4_-QjlAVQSAKCdOLcRafHfk4RRt2so" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-800 block">Ana Paula</span>
                    <span className="text-[10px] text-slate-500 font-medium">Marketing</span>
                  </div>
                </div>
                <div className="h-2 w-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-3 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors">Ver Mapa Completo</button>
        </div>

        {/* SMALL SQUARE 1: Financeiro */}
        <div className="col-span-1 row-span-1 group relative bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]">
          <div className="flex justify-between items-start">
            <div className="h-10 w-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-emerald-600 text-lg">payments</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full">+5.2%</span>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Caixa Geral</p>
            <h3 className="text-2xl font-extrabold text-slate-900">Estável</h3>
          </div>
        </div>

        {/* SMALL SQUARE 2: Próximo Evento */}
        <div className="col-span-1 row-span-1 group relative bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] overflow-hidden">
          <div className="absolute -right-2 -bottom-4 text-slate-200/50 text-8xl font-black select-none pointer-events-none">14</div>
          <div className="flex justify-between items-start relative z-10">
            <div className="h-10 w-10 bg-orange-500/10 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-orange-500 text-lg">calendar_today</span>
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">14 Outubro</p>
            <h3 className="text-sm font-extrabold text-slate-900 leading-tight pr-4">Workshop IA Generativa</h3>
          </div>
        </div>

        {/* WIDE PANORAMIC: Performance (col-span-4, row-span-1) */}
        <div className="col-span-1 md:col-span-4 row-span-1 group relative bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-2/3 md:w-1/2 opacity-30 pointer-events-none">
            <svg viewBox="0 0 400 100" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0 100 L0 80 Q 50 20, 100 60 T 200 40 T 300 10 T 400 30 L400 100 Z" fill="url(#grad2)" />
              <path d="M0 80 Q 50 20, 100 60 T 200 40 T 300 10 T 400 30" fill="none" stroke="#3B82F6" strokeWidth="4" />
              <defs>
                <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div className="flex items-center gap-6 relative z-10 w-full md:w-auto mb-4 md:mb-0">
            <div className="h-16 w-16 bg-blue-500/10 rounded-[1.5rem] flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600 text-3xl">trending_up</span>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-500">Performance Global</p>
              <h3 className="text-3xl font-extrabold mt-1 text-slate-900">Metas +12%</h3>
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto relative z-10">
            <div className="bg-white/50 backdrop-blur-xl px-6 py-3.5 rounded-2xl border border-white/80 shadow-sm flex-1 md:flex-none">
              <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Vendas Acumuladas</p>
              <p className="text-xl font-extrabold text-slate-800">R$ 1.2M</p>
            </div>
            <div className="bg-white/50 backdrop-blur-xl px-6 py-3.5 rounded-2xl border border-white/80 shadow-sm flex-1 md:flex-none">
              <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Novos Clientes</p>
              <p className="text-xl font-extrabold text-slate-800">48</p>
            </div>
          </div>
        </div>

        {/* MEDIUM RECTANGLE: Vagas (col-span-2, row-span-1) */}
        <div className="col-span-1 md:col-span-2 row-span-1 group relative bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row md:items-center justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
             <div className="h-14 w-14 bg-purple-500/10 rounded-[1.5rem] flex items-center justify-center relative">
               <span className="material-symbols-outlined text-purple-600 text-2xl">work</span>
             </div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-purple-500">Recrutamento</p>
               <h3 className="text-lg font-extrabold text-slate-900">3 Vagas Abertas</h3>
             </div>
          </div>
          <button className="px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest text-purple-700 bg-purple-500/10 hover:bg-purple-500/20 transition-colors">Gerenciar</button>
        </div>

        {/* MEDIUM RECTANGLE: Comunicação (col-span-2, row-span-1) */}
         <div className="col-span-1 md:col-span-2 row-span-1 group relative bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row md:items-center justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] overflow-hidden">
          <span className="material-symbols-outlined absolute -left-8 -top-8 text-[12rem] text-blue-500/5 pointer-events-none select-none">forum</span>
          <div className="flex items-center gap-4 relative z-10 mb-4 md:mb-0">
             <div className="h-14 w-14 bg-blue-500/10 rounded-[1.5rem] flex items-center justify-center">
               <span className="material-symbols-outlined text-blue-600 text-2xl">mark_email_unread</span>
             </div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-blue-500">Comunicação</p>
               <h3 className="text-lg font-extrabold text-slate-900">2 Novas Mensagens</h3>
             </div>
          </div>
          <button className="px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest text-blue-700 bg-blue-500/10 hover:bg-blue-500/20 transition-colors relative z-10">Abrir Caixa</button>
        </div>

      </div>
    </>
  );
}
