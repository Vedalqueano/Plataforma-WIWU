import React, { useState } from 'react';

// --- COMPONENTE DETALHE DO PROCESSO ---
function ProcessDetail({ onBack }) {
  return (
    <div className="max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 px-4 md:px-0">
      {/* Header & Breadcrumbs */}
      <header className="mb-10">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4 font-medium">
          <button onClick={onBack} className="hover:text-blue-500 transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Processos
          </button>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span>Loja</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-slate-800 font-bold">Operador de Caixa</span>
        </nav>
        
        <div className="flex items-center justify-between flex-wrap gap-6 bg-white/60 backdrop-blur-2xl border border-white/80 p-6 md:p-8 rounded-3xl md:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-30 pointer-events-none">
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

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
            <div className="h-20 w-20 bg-blue-500/10 rounded-[2rem] flex items-center justify-center border border-white">
              <span className="material-symbols-outlined text-blue-600 text-4xl">point_of_sale</span>
            </div>
            <div>
              <span className="text-[12px] font-black uppercase tracking-widest text-blue-500 mb-1 block">Rotina de Setor</span>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Operador de Caixa</h1>
              <p className="text-slate-500 font-medium mt-1">Procedimentos padrões para abertura, atendimento e fechamento de caixa.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full lg:w-auto mt-4 lg:mt-0">
            <button className="w-full sm:w-auto justify-center px-6 py-3.5 md:py-3 rounded-full text-sm font-bold bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 transition-colors shadow-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
              Baixar PDF
            </button>
            <button className="w-full sm:w-auto justify-center px-6 py-3.5 md:py-3 rounded-full text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">edit</span>
              Editar Processo
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Etapas do Processo */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-extrabold text-slate-900">Etapas Diárias</h2>
            <span className="text-xs font-bold bg-blue-100 text-blue-600 py-1.5 px-4 rounded-full">3 Fases Principais</span>
          </div>

          {/* Fase 1 */}
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-3xl md:rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative mt-8 md:mt-0">
             <div className="absolute -top-5 left-6 md:-left-3 md:top-8 h-12 w-12 md:h-10 md:w-10 bg-blue-600 text-white rounded-xl md:rounded-xl flex items-center justify-center font-black text-xl md:text-lg shadow-lg shadow-blue-500/30 border-[3px] border-white">1</div>
             <div className="pt-4 md:pt-0 md:pl-6">
                <h3 className="text-xl font-extrabold text-slate-900 mb-4">Preparação e Abertura do Caixa</h3>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Verificar Suprimentos</p>
                      <p className="text-xs text-slate-500 font-medium">Garantir que há bobinas de papel suficientes, canetas, e itens de embalagem no checkout.</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Conferência do Fundo de Troco</p>
                      <p className="text-xs text-slate-500 font-medium">Contar e confirmar o valor inicial repassado pela tesouraria antes de abrir o PDV.</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Login no Sistema PDV</p>
                      <p className="text-xs text-slate-500 font-medium">Acessar o sistema com as próprias credenciais. Nunca usar login de outro colaborador.</p>
                    </div>
                  </label>
                </div>
             </div>
          </div>

          {/* Fase 2 */}
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-3xl md:rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative mt-8 md:mt-0">
             <div className="absolute -top-5 left-6 md:-left-3 md:top-8 h-12 w-12 md:h-10 md:w-10 bg-slate-200 text-slate-600 rounded-xl flex items-center justify-center font-black text-xl md:text-lg border-[3px] border-white shadow-sm">2</div>
             <div className="pt-4 md:pt-0 md:pl-6">
                <h3 className="text-xl font-extrabold text-slate-900 mb-4">Atendimento ao Cliente e Registros</h3>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Cordialidade no Atendimento</p>
                      <p className="text-xs text-slate-500 font-medium">Cumprimentar o cliente ("Bom dia/Boa tarde"), perguntar se encontrou tudo o que procurava.</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Registro de Produtos</p>
                      <p className="text-xs text-slate-500 font-medium">Escanear códigos de barras com atenção. Conferir peso de mercadorias pesáveis.</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Recebimento e Emissão de Cupom</p>
                      <p className="text-xs text-slate-500 font-medium">Anunciar o valor total. Conferir notas para evitar fraudes (dinheiro). Emitir e entregar a nota fiscal.</p>
                    </div>
                  </label>
                </div>
             </div>
          </div>

          {/* Fase 3 */}
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-3xl md:rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative mt-8 md:mt-0">
             <div className="absolute -top-5 left-6 md:-left-3 md:top-8 h-12 w-12 md:h-10 md:w-10 bg-slate-200 text-slate-600 rounded-xl flex items-center justify-center font-black text-xl md:text-lg border-[3px] border-white shadow-sm">3</div>
             <div className="pt-4 md:pt-0 md:pl-6">
                <h3 className="text-xl font-extrabold text-slate-900 mb-4">Fechamento e Sangria</h3>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Realizar Sangria de Valores Altos</p>
                      <p className="text-xs text-slate-500 font-medium">Durante o turno, se o valor em dinheiro exceder o limite seguro, solicitar sangria ao gerente.</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Fechamento Final no PDV</p>
                      <p className="text-xs text-slate-500 font-medium">Encerrar o caixa no sistema. Imprimir relatório de fechamento (Leitura X/Z).</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Entrega do Malote</p>
                      <p className="text-xs text-slate-500 font-medium">Acondicionar dinheiro, comprovantes de cartão e vales. Entregar ao financeiro/cofre com protocolo.</p>
                    </div>
                  </label>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Informações e KPIs */}
        <div className="space-y-6">
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-3xl md:rounded-[2rem] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="text-lg font-extrabold text-slate-900 mb-6">Métricas de Sucesso</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-emerald-600">timer</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">TMA</p>
                  <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Tempo Médio Atendimento</p>
                </div>
                <div className="ml-auto text-sm font-extrabold text-emerald-600">&lt; 2 min</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-600">sentiment_very_satisfied</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">NPS Cliente</p>
                  <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Nível de Satisfação</p>
                </div>
                <div className="ml-auto text-sm font-extrabold text-blue-600">&gt; 90%</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-red-500/10 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-red-600">money_off</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Quebra de Caixa</p>
                  <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Diferença de Valores</p>
                </div>
                <div className="ml-auto text-sm font-extrabold text-slate-800">R$ 0,00</div>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-3xl md:rounded-[2rem] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="text-lg font-extrabold text-slate-900 mb-4">Treinamentos Recomendados</h3>
            <div className="space-y-3">
              <div className="p-3 bg-white/50 rounded-xl border border-slate-100 flex items-center gap-3 cursor-pointer hover:bg-white transition-colors">
                 <div className="h-8 w-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                   <span className="material-symbols-outlined text-purple-600 text-sm">play_arrow</span>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-slate-800">Prevenção a Fraudes</p>
                   <p className="text-[10px] text-slate-500 font-medium">Videoaula • 15 min</p>
                 </div>
              </div>
              <div className="p-3 bg-white/50 rounded-xl border border-slate-100 flex items-center gap-3 cursor-pointer hover:bg-white transition-colors">
                 <div className="h-8 w-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                   <span className="material-symbols-outlined text-orange-600 text-sm">play_arrow</span>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-slate-800">Atendimento de Excelência</p>
                   <p className="text-[10px] text-slate-500 font-medium">Videoaula • 20 min</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL (HUB) ---
export default function ProcessCreation() {
  const [activeProcess, setActiveProcess] = useState(null);

  if (activeProcess === 'operador-caixa') {
    return <ProcessDetail onBack={() => setActiveProcess(null)} />;
  }

  return (
    <div className="max-w-7xl mx-auto w-full animate-in fade-in duration-500 px-4 md:px-0">
      {/* Header Hub */}
      <header className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-4 px-4 md:px-0">
        <div>
          <span className="text-[12px] font-black uppercase tracking-widest text-blue-500 mb-1 block">Procedimentos Operacionais Padrão</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Processos</h1>
          <p className="text-slate-500 font-medium mt-2 text-sm md:text-lg leading-relaxed">Gerencie e acesse as rotinas padronizadas de cada setor da empresa.</p>
        </div>
        <button className="w-full md:w-auto px-6 py-3 rounded-full text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Novo Processo
        </button>
      </header>

      {/* Grid Loja vs Escritório */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* COLUNA LOJA */}
        <section>
          <div className="flex items-center gap-3 mb-6">
             <div className="h-10 w-10 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined text-indigo-600">storefront</span>
             </div>
             <h2 className="text-2xl font-extrabold text-slate-900">Loja</h2>
          </div>

          <div className="space-y-4">
            {/* Card: Operador de Caixa */}
            <div 
              onClick={() => setActiveProcess('operador-caixa')}
              className="group cursor-pointer bg-white/60 backdrop-blur-2xl border border-white/80 rounded-3xl md:rounded-[2rem] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-indigo-500/10 rounded-[1.5rem] flex items-center justify-center transition-colors group-hover:bg-indigo-500 group-hover:text-white text-indigo-600">
                  <span className="material-symbols-outlined text-2xl">point_of_sale</span>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">Operador de Caixa</h3>
                  <p className="text-xs text-slate-500 font-medium">Abertura, atendimento e fechamento</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-300 group-hover:text-indigo-500 transition-colors">chevron_right</span>
            </div>

            {/* Card: Estoque */}
            <div className="group cursor-pointer bg-white/60 backdrop-blur-2xl border border-white/80 rounded-3xl md:rounded-[2rem] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">inventory_2</span>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">Estoque e Reposição</h3>
                  <p className="text-xs text-slate-500 font-medium">Recebimento, organização e vitrine</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-300 group-hover:text-indigo-500 transition-colors">chevron_right</span>
            </div>

            {/* Card: Vendas */}
            <div className="group cursor-pointer bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">local_mall</span>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">Vendas e Consultoria</h3>
                  <p className="text-xs text-slate-500 font-medium">Abordagem, negociação e fechamento</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-300 group-hover:text-indigo-500 transition-colors">chevron_right</span>
            </div>
          </div>
        </section>

        {/* COLUNA ESCRITÓRIO */}
        <section>
          <div className="flex items-center gap-3 mb-6">
             <div className="h-10 w-10 bg-teal-500/10 rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined text-teal-600">business_center</span>
             </div>
             <h2 className="text-2xl font-extrabold text-slate-900">Escritório</h2>
          </div>

          <div className="space-y-4">
            {/* Card: RH */}
            <div className="group cursor-pointer bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-500 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">groups</span>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors">Recursos Humanos</h3>
                  <p className="text-xs text-slate-500 font-medium">Recrutamento, admissão e folha</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-300 group-hover:text-teal-500 transition-colors">chevron_right</span>
            </div>

            {/* Card: Financeiro */}
            <div className="group cursor-pointer bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-500 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors">Financeiro</h3>
                  <p className="text-xs text-slate-500 font-medium">Contas a pagar, receber e conciliação</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-300 group-hover:text-teal-500 transition-colors">chevron_right</span>
            </div>

            {/* Card: Compras */}
            <div className="group cursor-pointer bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-500 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">shopping_cart</span>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors">Compras e Suprimentos</h3>
                  <p className="text-xs text-slate-500 font-medium">Cotação, pedidos e negociação</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-300 group-hover:text-teal-500 transition-colors">chevron_right</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
