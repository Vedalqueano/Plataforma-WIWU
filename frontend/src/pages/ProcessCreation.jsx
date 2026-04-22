import React from 'react';

export default function ProcessCreation() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Header & Breadcrumbs */}
      <header className="mb-16">
        <nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-4 font-body">
          <a className="hover:text-primary transition-colors" href="#">Processos</a>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-on-surface font-medium">Criar Novo Processo</span>
        </nav>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-5xl font-display font-extrabold tracking-tight text-primary">Criar Novo Processo</h1>
          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-full border border-outline-variant/15 text-primary font-medium hover:bg-surface-variant transition-colors">Cancelar</button>
            <button className="px-8 py-3 rounded-full bg-primary text-on-primary font-bold hover:bg-on-surface transition-colors shadow-[0_20px_40px_rgba(25,28,29,0.05)]">Salvar Processo</button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Process Details & Steps */}
        <div className="lg:col-span-2 space-y-12">
          {/* Basic Details */}
          <section className="bg-surface-container-lowest rounded-lg p-10 shadow-[0_20px_40px_rgba(25,28,29,0.05)]">
            <h2 className="text-2xl font-display font-bold mb-8">Detalhes do Processo</h2>
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">Nome do Processo</label>
                <input className="w-full bg-surface-container-highest border-none rounded-[24px] px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline outline-none" placeholder="Ex: Onboarding de Novos Colaboradores" type="text" />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">Unidade Responsável</label>
                <div className="relative">
                  <select className="w-full bg-surface-container-highest border-none rounded-[24px] px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none" defaultValue="">
                    <option disabled value="">Selecione a unidade</option>
                    <option value="matriz">Matriz</option>
                    <option value="filial-sp">Filial São Paulo</option>
                    <option value="filial-rj">Filial Rio de Janeiro</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>
          </section>

          {/* Steps Builder */}
          <section className="space-y-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold">Etapas do Processo</h2>
              <button className="flex items-center gap-2 text-primary font-bold hover:text-on-surface-variant transition-colors">
                <span className="material-symbols-outlined">add_circle</span>
                Adicionar Etapa
              </button>
            </div>

            {/* Step 1 */}
            <div className="bg-surface-container-lowest rounded-lg p-8 shadow-[0_20px_40px_rgba(25,28,29,0.05)] border border-outline-variant/15 relative group">
              <div className="absolute -left-4 top-8 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold font-display shadow-sm">1</div>
              <div className="pl-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">Título da Ação</label>
                  <input className="w-full bg-surface-container-highest border-none rounded-[24px] px-6 py-4 text-on-surface font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="Ex: Recepção e Boas-vindas" type="text" defaultValue="Recepção e Boas-vindas" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">Como Fazer? (Instruções detalhadas)</label>
                  <textarea className="w-full bg-surface-container-low border-none rounded-DEFAULT px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all resize-none outline-none" placeholder="Descreva os passos necessários para executar esta ação..." rows="4" defaultValue="O colaborador recém-contratado deve ser recebido na recepção principal pelo RH. Entregar o kit de boas-vindas (crachá, notebook, caderno) e realizar um tour pelas instalações do escritório." />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-surface-container-lowest rounded-lg p-8 shadow-[0_20px_40px_rgba(25,28,29,0.05)] border border-outline-variant/15 relative group">
              <div className="absolute -left-4 top-8 w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold font-display shadow-sm">2</div>
              <div className="pl-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">Título da Ação</label>
                  <input className="w-full bg-surface-container-highest border-none rounded-[24px] px-6 py-4 text-on-surface font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="Ex: Configuração de Acessos" type="text" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">Como Fazer? (Instruções detalhadas)</label>
                  <textarea className="w-full bg-surface-container-low border-none rounded-DEFAULT px-6 py-4 text-on-surface focus:ring-2 focus:ring-primary/20 transition-all resize-none outline-none" placeholder="Descreva os passos necessários para executar esta ação..." rows="4" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Settings & Directives */}
        <div className="space-y-8">
          {/* Sectors Directive */}
          <aside className="bg-surface-container-lowest rounded-lg p-8 shadow-[0_20px_40px_rgba(25,28,29,0.05)]">
            <h3 className="text-xl font-display font-bold mb-6">Direcionamento</h3>
            <p className="text-sm text-on-surface-variant mb-6">Quais setores devem executar este processo?</p>
            <div className="flex flex-wrap gap-3">
              <label className="cursor-pointer relative">
                <input defaultChecked className="peer sr-only" type="checkbox" />
                <div className="px-5 py-2.5 rounded-full border border-outline-variant/30 text-sm font-medium text-on-surface-variant peer-checked:bg-primary-container peer-checked:text-white peer-checked:border-transparent transition-all shadow-sm">
                  Recursos Humanos
                </div>
              </label>
              <label className="cursor-pointer relative">
                <input className="peer sr-only" type="checkbox" />
                <div className="px-5 py-2.5 rounded-full border border-outline-variant/30 text-sm font-medium text-on-surface-variant peer-checked:bg-primary-container peer-checked:text-white peer-checked:border-transparent transition-all shadow-sm">
                  TI
                </div>
              </label>
              <label className="cursor-pointer relative">
                <input className="peer sr-only" type="checkbox" />
                <div className="px-5 py-2.5 rounded-full border border-outline-variant/30 text-sm font-medium text-on-surface-variant peer-checked:bg-primary-container peer-checked:text-white peer-checked:border-transparent transition-all shadow-sm">
                  Vendas
                </div>
              </label>
              <label className="cursor-pointer relative">
                <input className="peer sr-only" type="checkbox" />
                <div className="px-5 py-2.5 rounded-full border border-outline-variant/30 text-sm font-medium text-on-surface-variant peer-checked:bg-primary-container peer-checked:text-white peer-checked:border-transparent transition-all shadow-sm">
                  Financeiro
                </div>
              </label>
              <label className="cursor-pointer relative">
                <input className="peer sr-only" type="checkbox" />
                <div className="px-5 py-2.5 rounded-full border border-outline-variant/30 text-sm font-medium text-on-surface-variant peer-checked:bg-primary-container peer-checked:text-white peer-checked:border-transparent transition-all shadow-sm">
                  Operações
                </div>
              </label>
            </div>
          </aside>

          {/* Notifications */}
          <aside className="bg-surface-container-lowest rounded-lg p-8 shadow-[0_20px_40px_rgba(25,28,29,0.05)]">
            <h3 className="text-xl font-display font-bold mb-6">Notificações e Controle</h3>
            <div className="space-y-6">
              <label className="flex items-center justify-between cursor-pointer group">
                <div>
                  <div className="font-medium text-on-surface mb-1">Notificar Gestores</div>
                  <div className="text-xs text-on-surface-variant">Envia alerta via email e painel</div>
                </div>
                <div className="relative">
                  <input defaultChecked className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </div>
              </label>
              <div className="h-px bg-outline-variant/15 w-full"></div>
              <label className="flex items-center justify-between cursor-pointer group">
                <div>
                  <div className="font-medium text-on-surface mb-1">Exigir Confirmação</div>
                  <div className="text-xs text-on-surface-variant">Obrigatório marcar como 'Lido'</div>
                </div>
                <div className="relative">
                  <input className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </div>
              </label>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
