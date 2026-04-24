import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const renderMiniCircularProgress = (percentage, colorClass, label) => {
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-16 h-16">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="5" fill="transparent" className="text-slate-100" />
            <circle 
              cx="32" cy="32" r={radius} 
              stroke="currentColor" strokeWidth="5" fill="transparent" 
              className={`${colorClass} transition-all duration-1500 ease-out`}
              strokeDasharray={circumference}
              strokeDashoffset={mounted ? strokeDashoffset : circumference}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-black text-slate-800">{mounted ? percentage : 0}%</span>
          </div>
        </div>
        <span className="mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
      </div>
    );
  };

  return (
    <div className="px-4 md:px-6 pb-20 md:pb-12 font-sans animate-[fadeIn_0.5s_ease-out] w-full max-w-full overflow-hidden">
      
      {/* 1. TOP STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        
        {/* Card 1 */}
        <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-3xl md:rounded-[2rem] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between transition-transform hover:-translate-y-1 group">
          <div className="h-14 w-14 bg-[#4f46e5]/10 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="material-symbols-outlined text-2xl text-[#4f46e5]">calendar_month</span>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#4f46e5] mb-1">Reuniões Agendadas</p>
            <h3 className="text-3xl font-extrabold text-slate-900">86</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-3xl md:rounded-[2rem] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between transition-transform hover:-translate-y-1 group">
          <div className="h-14 w-14 bg-[#3b82f6]/10 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="material-symbols-outlined text-2xl text-[#3b82f6]">business_center</span>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#3b82f6] mb-1">Processos Abertos</p>
            <h3 className="text-3xl font-extrabold text-slate-900">75</h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-3xl md:rounded-[2rem] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between transition-transform hover:-translate-y-1 group">
          <div className="h-14 w-14 bg-[#10b981]/10 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="material-symbols-outlined text-2xl text-[#10b981]">person</span>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#10b981] mb-1">Visualizações</p>
            <h3 className="text-3xl font-extrabold text-slate-900">45,673</h3>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-3xl md:rounded-[2rem] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between transition-transform hover:-translate-y-1 group">
          <div className="h-14 w-14 bg-[#84cc16]/10 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="material-symbols-outlined text-2xl text-[#84cc16]">mail</span>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#84cc16] mb-1">Mensagens Novas</p>
            <h3 className="text-3xl font-extrabold text-slate-900">93</h3>
          </div>
        </div>

      </div>

      {/* 2. MAIN GRID (Left Column + Right Column) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT COLUMN: Profile & Activities */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Profile Card */}
          <div className="bg-white rounded-3xl md:rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="h-28 w-28 rounded-full border-4 border-indigo-50 p-1">
                <img src="/profile.png" alt="Profile" className="h-full w-full rounded-full object-cover" />
              </div>
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-[3px] border-indigo-600 border-t-transparent border-r-transparent animate-spin-slow"></div>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mb-1">Abbas Admin</h2>
            <p className="text-sm font-semibold text-slate-500 mb-8">Administrador do Sistema</p>
            
            <div className="flex justify-between w-full px-2">
              {renderMiniCircularProgress(66, 'text-orange-500', 'Gestão')}
              {renderMiniCircularProgress(31, 'text-emerald-500', 'Vendas')}
              {renderMiniCircularProgress(7, 'text-blue-500', 'TI')}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-3xl md:rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
            <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider">Atividades Recentes</h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              
              {[
                { time: '12h ago', title: 'Aprovação de Orçamento Q4', type: 'accepted' },
                { time: '12h ago', title: 'Aprovação de Orçamento Q4', type: 'accepted' },
                { time: '12h ago', title: 'Aprovação de Orçamento Q4', type: 'accepted' },
              ].map((act, i) => (
                <div key={i} className="relative flex items-start gap-4 z-10 group cursor-pointer">
                  <div className="h-10 w-10 bg-[#4f46e5]/10 rounded-xl flex-shrink-0 flex items-center justify-center z-10 group-hover:bg-[#4f46e5]/20 transition-colors">
                    <span className="material-symbols-outlined text-[#4f46e5] text-xl">extension</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 leading-tight">Sua solicitação foi <span className="text-slate-900 font-bold">aceita</span> no processo de Vendas.</p>
                    <span className="text-xs text-slate-400 font-medium">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <button className="h-10 w-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors z-20">
                <span className="material-symbols-outlined">arrow_downward</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Chart & Recommended */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Main Chart Card */}
          <div className="bg-white rounded-3xl md:rounded-[2rem] p-5 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h2 className="text-xl font-bold text-slate-900">Desempenho da Empresa</h2>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#4f46e5]"></span>
                  <span className="text-sm font-semibold text-slate-600">Abertos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#10b981]"></span>
                  <span className="text-sm font-semibold text-slate-600">Fechados</span>
                </div>
                <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block px-3 py-2 outline-none font-medium appearance-none cursor-pointer pr-8 relative">
                  <option>Este Mês</option>
                  <option>Mês Passado</option>
                </select>
              </div>
            </div>

            {/* SVG Chart Mockup */}
            <div className="relative h-64 w-full mt-4">
              <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                {/* Grid Lines */}
                <path d="M 0 0 L 800 0" stroke="#f1f5f9" strokeWidth="1" fill="none" />
                <path d="M 0 50 L 800 50" stroke="#f1f5f9" strokeWidth="1" fill="none" />
                <path d="M 0 100 L 800 100" stroke="#f1f5f9" strokeWidth="1" fill="none" />
                <path d="M 0 150 L 800 150" stroke="#f1f5f9" strokeWidth="1" fill="none" />
                <path d="M 0 200 L 800 200" stroke="#f1f5f9" strokeWidth="1" fill="none" />
                
                {/* Y Axis Labels (HTML Overlay is better, but doing simple text here) */}
                <text x="-20" y="5" className="text-[10px] fill-slate-400 font-medium">80</text>
                <text x="-20" y="55" className="text-[10px] fill-slate-400 font-medium">60</text>
                <text x="-20" y="105" className="text-[10px] fill-slate-400 font-medium">40</text>
                <text x="-20" y="155" className="text-[10px] fill-slate-400 font-medium">20</text>
                <text x="-15" y="205" className="text-[10px] fill-slate-400 font-medium">0</text>

                {/* Smooth Line 1 (Purple) */}
                <path 
                  d="M 0 80 C 100 20, 150 150, 250 120 S 350 40, 450 70 S 550 150, 650 120 S 750 30, 800 50" 
                  stroke="#4f46e5" strokeWidth="4" fill="none" 
                  className="drop-shadow-[0_4px_6px_rgba(79,70,229,0.3)] animate-[dash_3s_ease-out_forwards]"
                  strokeDasharray="2000" strokeDashoffset={mounted ? 0 : 2000}
                />
                
                {/* Smooth Line 2 (Green) */}
                <path 
                  d="M 0 140 C 100 100, 150 180, 250 160 S 350 90, 450 130 S 550 180, 650 140 S 750 100, 800 110" 
                  stroke="#10b981" strokeWidth="4" fill="none" 
                  className="drop-shadow-[0_4px_6px_rgba(16,185,129,0.3)] animate-[dash_3s_ease-out_forwards]"
                  strokeDasharray="2000" strokeDashoffset={mounted ? 0 : 2000}
                />

                {/* Tooltip Point */}
                <circle cx="650" cy="120" r="6" fill="#4f46e5" stroke="white" strokeWidth="3" className="shadow-lg" />
              </svg>

              {/* Tooltip HTML */}
              <div className="absolute top-[30%] right-[10%] bg-white rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] p-3 border border-slate-100 transform -translate-y-1/2">
                <p className="text-[10px] text-slate-500 font-semibold mb-2">Jul 23, 2026</p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#4f46e5]"></span>
                    <span className="font-bold text-slate-800 text-sm">37</span>
                    <span className="text-xs text-slate-500">Abertos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                    <span className="font-bold text-slate-800 text-sm">2</span>
                    <span className="text-xs text-slate-500">Fechados</span>
                  </div>
                </div>
              </div>

              {/* X Axis Labels */}
              <div className="flex justify-between mt-4 text-[11px] text-slate-400 font-semibold px-2">
                <span>Semana 01</span><span>Semana 02</span><span>Semana 03</span><span>Semana 04</span>
                <span>Semana 05</span><span>Semana 06</span><span>Semana 07</span><span>Semana 08</span>
                <span>Semana 09</span><span>Semana 10</span>
              </div>
            </div>
          </div>

          {/* Recommended Jobs / Processos */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Processos Recomendados</h2>
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-[#4f46e5]"></span>
                <span className="h-2 w-2 rounded-full bg-slate-300"></span>
                <span className="h-2 w-2 rounded-full bg-slate-300"></span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1 */}
              <div className="bg-white rounded-3xl md:rounded-[2rem] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-1">Equipe Vendas</p>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">Analista de Vendas B2B</h3>
                  </div>
                  <div className="h-10 w-10 bg-[#3b82f6]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#3b82f6]">point_of_sale</span>
                  </div>
                </div>
                <p className="text-sm font-extrabold text-slate-800 mb-4">R$ 14,000 - R$ 25,000</p>
                <p className="text-xs text-slate-500 line-clamp-3 mb-6">Responsável por identificar, prospectar e fechar negócios com clientes corporativos. Acompanhamento de metas agressivas e KPIs de conversão mensal.</p>
                
                <div className="flex justify-between items-center">
                  <span className="px-4 py-1.5 bg-purple-50 text-purple-600 text-xs font-bold rounded-lg">REMOTO</span>
                  <span className="text-xs font-bold text-slate-600">São Paulo, BR</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-3xl md:rounded-[2rem] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-1">Equipe TI</p>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">Desenvolvedor Sênior</h3>
                  </div>
                  <div className="h-10 w-10 bg-[#f97316]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#f97316]">terminal</span>
                  </div>
                </div>
                <p className="text-sm font-extrabold text-slate-800 mb-4">R$ 18,000 - R$ 22,000</p>
                <p className="text-xs text-slate-500 line-clamp-3 mb-6">Arquitetura de sistemas em nuvem, liderança técnica de esquadrões ágeis e code review das entregas principais de infraestrutura.</p>
                
                <div className="flex justify-between items-center">
                  <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg">HÍBRIDO</span>
                  <span className="text-xs font-bold text-slate-600">Florianópolis, BR</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-3xl md:rounded-[2rem] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-1">Equipe Design</p>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">Product Designer Pleno</h3>
                  </div>
                  <div className="h-10 w-10 bg-[#8b5cf6]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#8b5cf6]">design_services</span>
                  </div>
                </div>
                <p className="text-sm font-extrabold text-slate-800 mb-4">R$ 9,000 - R$ 12,000</p>
                <p className="text-xs text-slate-500 line-clamp-3 mb-6">Pesquisa com usuários, prototipação em alta fidelidade e manutenção do Design System corporativo da plataforma principal.</p>
                
                <div className="flex justify-between items-center">
                  <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg">PRESENCIAL</span>
                  <span className="text-xs font-bold text-slate-600">Rio de Janeiro, BR</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
