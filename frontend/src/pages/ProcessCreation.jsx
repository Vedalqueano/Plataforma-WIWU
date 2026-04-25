import React, { useState, useRef, useEffect } from 'react';

// Lista de ícones disponíveis com cores predefinidas
const AVAILABLE_ICONS = [
  { name: 'edit_document', color: 'text-blue-500', bg: 'bg-blue-50' },
  { name: 'point_of_sale', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { name: 'inventory_2', color: 'text-amber-500', bg: 'bg-amber-50' },
  { name: 'local_mall', color: 'text-purple-500', bg: 'bg-purple-50' },
  { name: 'groups', color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { name: 'account_balance_wallet', color: 'text-teal-500', bg: 'bg-teal-50' },
  { name: 'shopping_cart', color: 'text-orange-500', bg: 'bg-orange-50' },
  { name: 'precision_manufacturing', color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { name: 'support_agent', color: 'text-rose-500', bg: 'bg-rose-50' },
  { name: 'campaign', color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { name: 'construction', color: 'text-slate-500', bg: 'bg-slate-100' },
  { name: 'local_shipping', color: 'text-sky-500', bg: 'bg-sky-50' },
  { name: 'storefront', color: 'text-fuchsia-500', bg: 'bg-fuchsia-50' },
  { name: 'business_center', color: 'text-violet-500', bg: 'bg-violet-50' },
  { name: 'star', color: 'text-yellow-400', bg: 'bg-yellow-50' },
  { name: 'rocket_launch', color: 'text-red-500', bg: 'bg-red-50' },
  { name: 'laptop_mac', color: 'text-slate-800', bg: 'bg-slate-100' },
  { name: 'assignment', color: 'text-lime-600', bg: 'bg-lime-50' },
  { name: 'build', color: 'text-zinc-600', bg: 'bg-zinc-100' },
  { name: 'event_note', color: 'text-pink-500', bg: 'bg-pink-50' }
];

// Mock de dados para a destinação (Fallback)
const FALLBACK_DATA = {
  unidade: [
    { id: 'u1', name: 'Matriz (São Paulo)', icon: 'domain' },
    { id: 'u2', name: 'Filial (Rio de Janeiro)', icon: 'store' },
    { id: 'u3', name: 'Centro de Distribuição', icon: 'warehouse' }
  ],
  departamento: [
    { id: 'd1', name: 'Financeiro', icon: 'account_balance' },
    { id: 'd2', name: 'Recursos Humanos', icon: 'groups' },
    { id: 'd3', name: 'Vendas', icon: 'trending_up' },
    { id: 'd4', name: 'Marketing', icon: 'campaign' },
    { id: 'd5', name: 'Tecnologia (TI)', icon: 'computer' },
    { id: 'd6', name: 'Logística', icon: 'local_shipping' }
  ],
  funcionario: [
    { id: 'f1', name: 'Gerente Geral', icon: 'badge' },
    { id: 'f2', name: 'Operador de Caixa', icon: 'point_of_sale' },
    { id: 'f3', name: 'Vendedor Externo', icon: 'directions_walk' },
    { id: 'f4', name: 'Atendente de Suporte', icon: 'headset_mic' },
    { id: 'f5', name: 'Analista de Sistemas', icon: 'code' }
  ]
};

// --- COMPONENTE EDITOR DE PROCESSO ---
function ProcessEditor({ onBack, onSave, onDelete, initialData, isNew = false }) {
  const [processName, setProcessName] = useState(isNew ? "" : (initialData?.name || ""));
  const [processDesc, setProcessDesc] = useState(isNew ? "" : (initialData?.desc || ""));
  const [processCategory, setProcessCategory] = useState(isNew ? "Rotina de Setor" : (initialData?.category || "Rotina de Setor"));
  
  // Icon State
  const initialIconObj = AVAILABLE_ICONS.find(i => i.name === initialData?.icon) || AVAILABLE_ICONS[0];
  const [selectedIcon, setSelectedIcon] = useState(initialIconObj);
  const [showIconPicker, setShowIconPicker] = useState(false);
  
  // Destinação State
  const [destinationType, setDestinationType] = useState(initialData?.destination?.type || 'todos');
  const [destinationValue, setDestinationValue] = useState(initialData?.destination?.value || '');

  const [stages, setStages] = useState(isNew ? [
    {
      id: Date.now(),
      title: "",
      tasks: [
        { id: Date.now() + 1, title: "", desc: "" }
      ]
    }
  ] : (initialData?.stages || []));

  const [trainings, setTrainings] = useState(isNew ? [] : (initialData?.trainings || []));
  const [dynamicData, setDynamicData] = useState(FALLBACK_DATA);

  const descRef = useRef(null);
  
  useEffect(() => {
    const savedDepts = localStorage.getItem('wiwu_departamentos_data');
    if (savedDepts) {
      try {
        const parsedDepts = JSON.parse(savedDepts);
        
        const unidades = parsedDepts.map(u => ({
          id: u.id,
          name: u.name,
          icon: u.isCustomIcon ? 'domain' : (u.icon || 'domain') // Simplify icon since custom text might break formatting
        }));

        const departamentos = [];
        const cargos = new Set();
        
        parsedDepts.forEach(u => {
          if (u.departamentos) {
            u.departamentos.forEach(d => {
              departamentos.push({
                id: d.id,
                name: d.name,
                unitName: u.name,
                icon: 'folder_open'
              });
              if (d.funcionarios) {
                d.funcionarios.forEach(f => {
                  if (f.cargo) cargos.add(f.cargo);
                });
              }
            });
          }
        });
        
        const cargosArray = Array.from(cargos).map((c, idx) => ({
          id: `c${idx}`,
          name: c,
          icon: 'badge'
        }));

        setDynamicData({
          unidade: unidades.length > 0 ? unidades : FALLBACK_DATA.unidade,
          departamento: departamentos.length > 0 ? departamentos : FALLBACK_DATA.departamento,
          funcionario: cargosArray.length > 0 ? cargosArray : FALLBACK_DATA.funcionario
        });
      } catch (e) {
        setDynamicData(FALLBACK_DATA);
      }
    }
  }, []);

  useEffect(() => {
    if (descRef.current) {
      descRef.current.style.height = "auto";
      descRef.current.style.height = descRef.current.scrollHeight + "px";
    }
  }, [processDesc]);

  const addStage = () => {
    setStages([...stages, { id: Date.now(), title: "", tasks: [{ id: Date.now() + 1, title: "", desc: "" }] }]);
  };

  const removeStage = (id) => {
    setStages(stages.filter(s => s.id !== id));
  };

  const updateStageTitle = (id, title) => {
    setStages(stages.map(s => s.id === id ? { ...s, title } : s));
  };

  const addTask = (stageId) => {
    setStages(stages.map(s => {
      if (s.id === stageId) {
        return { ...s, tasks: [...s.tasks, { id: Date.now(), title: "", desc: "" }] };
      }
      return s;
    }));
  };

  const removeTask = (stageId, taskId) => {
    setStages(stages.map(s => {
      if (s.id === stageId) {
        return { ...s, tasks: s.tasks.filter(t => t.id !== taskId) };
      }
      return s;
    }));
  };

  const updateTask = (stageId, taskId, field, value) => {
    setStages(stages.map(s => {
      if (s.id === stageId) {
        return {
          ...s,
          tasks: s.tasks.map(t => t.id === taskId ? { ...t, [field]: value } : t)
        };
      }
      return s;
    }));
  };

  const addTraining = () => {
    setTrainings([...trainings, { id: Date.now(), title: "", duration: "" }]);
  };

  const removeTraining = (id) => {
    setTrainings(trainings.filter(t => t.id !== id));
  };

  const updateTraining = (id, field, value) => {
    setTrainings(trainings.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleSave = () => {
    onSave({
      id: isNew ? Date.now().toString() : initialData.id,
      name: processName || "Novo Processo",
      desc: processDesc,
      category: processCategory,
      icon: selectedIcon.name,
      destination: {
        type: destinationType,
        value: destinationType === 'todos' ? '' : destinationValue
      },
      stages,
      trainings
    });
  };

  return (
    <div className="max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 px-4 md:px-0 pb-20">
      {/* Header & Breadcrumbs */}
      <header className="mb-10">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4 font-medium">
          <button onClick={onBack} className="hover:text-blue-500 transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Processos
          </button>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span>{isNew ? "Novo Processo" : "Edição de Processo"}</span>
          {!isNew && (
            <>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <span className="text-slate-800 font-bold">{processName || "Processo"}</span>
            </>
          )}
        </nav>
        
        <div className="relative bg-white/60 backdrop-blur-2xl border border-blue-100 rounded-3xl md:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] group">
          {/* Background decoration container (overflow hidden isolado para não cortar o ícone) */}
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
            <div className="absolute right-0 top-0 h-full w-1/2 opacity-30">
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
          </div>

          <div className="relative p-6 md:p-8 flex items-center justify-between flex-wrap gap-6 z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-3/4">
              
              {/* Ícone com Selector */}
              <div className="relative">
                <div 
                  onClick={() => setShowIconPicker(!showIconPicker)}
                  className={`h-20 w-20 ${selectedIcon.bg} rounded-[2rem] flex items-center justify-center border-2 border-white cursor-pointer shadow-sm hover:shadow-md transition-all flex-shrink-0 group/icon`}
                  title="Alterar Ícone"
                >
                  <span className={`material-symbols-outlined ${selectedIcon.color} text-4xl group-hover/icon:scale-110 transition-transform`}>
                    {selectedIcon.name}
                  </span>
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center border-2 border-white shadow-md opacity-0 group-hover/icon:opacity-100 transition-opacity">
                     <span className="material-symbols-outlined text-[14px]">edit</span>
                  </div>
                </div>

                {/* Popover de Ícones (Agora fora do overflow hidden) */}
                {showIconPicker && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowIconPicker(false)}></div>
                    <div className="absolute top-24 left-0 bg-white/95 backdrop-blur-3xl border border-slate-100 shadow-[0_20px_60px_rgb(0,0,0,0.15)] rounded-2xl p-4 w-[320px] z-50 grid grid-cols-5 gap-3 animate-in fade-in zoom-in-95 duration-200">
                       {AVAILABLE_ICONS.map(ic => (
                         <button
                           key={ic.name}
                           onClick={() => { setSelectedIcon(ic); setShowIconPicker(false); }}
                           className={`h-12 w-12 flex items-center justify-center rounded-[1rem] transition-all hover:scale-110 ${selectedIcon.name === ic.name ? `${ic.bg} border-2 border-blue-200 shadow-inner` : 'bg-transparent hover:bg-slate-50'}`}
                         >
                           <span className={`material-symbols-outlined text-2xl ${ic.color}`}>{ic.name}</span>
                         </button>
                       ))}
                    </div>
                  </>
                )}
              </div>

              <div className="w-full">
                <div className="flex items-center gap-2 mb-1">
                  <input
                     type="text"
                     value={processCategory}
                     onChange={(e) => setProcessCategory(e.target.value)}
                     className="text-[12px] font-black uppercase tracking-widest text-blue-500 bg-transparent border-none outline-none placeholder:text-blue-300 w-full"
                     placeholder="CATEGORIA (Ex: Rotina de Setor)"
                  />
                </div>
                <input
                   type="text"
                   value={processName}
                   onChange={(e) => setProcessName(e.target.value)}
                   placeholder="Nome do Processo"
                   className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 bg-transparent border-none outline-none placeholder:text-slate-300 w-full focus:ring-2 focus:ring-blue-100 rounded-lg -ml-2 px-2 py-1 transition-all"
                />
                <textarea
                   ref={descRef}
                   value={processDesc}
                   onChange={(e) => setProcessDesc(e.target.value)}
                   placeholder="Descreva o objetivo geral deste processo..."
                   className="text-slate-500 font-medium mt-1 bg-transparent border-none outline-none placeholder:text-slate-300 w-full resize-none overflow-hidden focus:ring-2 focus:ring-blue-100 rounded-lg -ml-2 px-2 py-1 transition-all"
                   rows={1}
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full lg:w-auto mt-4 lg:mt-0">
              {!isNew && (
                <button onClick={() => onDelete(initialData.id)} className="w-full sm:w-auto justify-center px-4 py-3.5 md:py-3 rounded-full text-sm font-bold bg-white text-red-500 hover:bg-red-50 border border-red-100 transition-colors shadow-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              )}
              <button onClick={handleSave} className="w-full sm:w-auto justify-center px-6 py-3.5 md:py-3 rounded-full text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">save</span>
                Salvar Processo
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Etapas do Processo */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-extrabold text-slate-900">Etapas do Processo</h2>
            <span className="text-xs font-bold bg-blue-100 text-blue-600 py-1.5 px-4 rounded-full">{stages.length} Fase{stages.length !== 1 && 's'}</span>
          </div>

          {stages.map((stage, index) => (
            <div key={stage.id} className="bg-white/80 backdrop-blur-2xl border border-slate-200 rounded-3xl md:rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative mt-8 md:mt-0 transition-all focus-within:border-blue-300 focus-within:shadow-[0_8px_30px_rgba(59,130,246,0.1)] group/stage">
               <div className="absolute -top-5 left-6 md:-left-3 md:top-8 h-12 w-12 md:h-10 md:w-10 bg-slate-100 text-slate-500 rounded-xl md:rounded-xl flex items-center justify-center font-black text-xl md:text-lg shadow-sm border-[3px] border-white group-focus-within/stage:bg-blue-600 group-focus-within/stage:text-white group-focus-within/stage:shadow-blue-500/30 transition-colors">
                  {index + 1}
               </div>
               
               <div className="pt-4 md:pt-0 md:pl-6">
                  <div className="flex justify-between items-start mb-6 gap-4">
                     <input 
                        type="text"
                        value={stage.title}
                        onChange={(e) => updateStageTitle(stage.id, e.target.value)}
                        placeholder="Título da Etapa (Ex: Preparação do Caixa)"
                        className="text-xl font-extrabold text-slate-900 bg-transparent border-none outline-none placeholder:text-slate-300 w-full focus:bg-slate-50 p-2 -ml-2 rounded-xl transition-colors"
                     />
                     <button onClick={() => removeStage(stage.id)} className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors opacity-0 group-hover/stage:opacity-100 focus:opacity-100 shrink-0">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                     </button>
                  </div>
                  
                  <div className="space-y-4">
                    {stage.tasks.map((task, taskIndex) => (
                      <div key={task.id} className="flex items-start gap-3 group/task relative bg-slate-50/50 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent focus-within:border-blue-100">
                        <div className="mt-2 flex-shrink-0">
                           <div className="w-5 h-5 rounded-md border-2 border-slate-300 bg-white flex items-center justify-center text-[10px] text-slate-400 font-bold">{taskIndex + 1}</div>
                        </div>
                        <div className="flex-grow pr-8">
                           <input 
                              type="text"
                              value={task.title}
                              onChange={(e) => updateTask(stage.id, task.id, 'title', e.target.value)}
                              placeholder="Título do subtítulo/tarefa"
                              className="text-sm font-bold text-slate-800 bg-transparent border-none outline-none placeholder:text-slate-400 w-full focus:text-blue-700 transition-colors"
                           />
                           <textarea
                              value={task.desc}
                              onChange={(e) => {
                                updateTask(stage.id, task.id, 'desc', e.target.value);
                                e.target.style.height = 'auto';
                                e.target.style.height = e.target.scrollHeight + 'px';
                              }}
                              placeholder="Descreva os detalhes e passos desta tarefa..."
                              className="text-xs text-slate-500 font-medium bg-transparent border-none outline-none placeholder:text-slate-400 w-full mt-1 resize-none overflow-hidden"
                              rows={1}
                              onFocus={(e) => {
                                e.target.style.height = 'auto';
                                e.target.style.height = e.target.scrollHeight + 'px';
                              }}
                           />
                        </div>
                        <button onClick={() => removeTask(stage.id, task.id)} className="opacity-0 group-hover/task:opacity-100 focus:opacity-100 text-red-400 hover:text-red-600 transition-opacity p-2 rounded-full hover:bg-red-50 absolute right-2 top-2">
                           <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                    ))}
                    
                    <button onClick={() => addTask(stage.id)} className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2 mt-4 py-2 px-4 hover:bg-blue-50 rounded-xl transition-colors border border-dashed border-blue-200 w-full justify-center">
                       <span className="material-symbols-outlined text-[18px]">add</span>
                       Adicionar Subtítulo/Tarefa
                    </button>
                  </div>
               </div>
            </div>
          ))}

          <button onClick={addStage} className="w-full border-2 border-dashed border-slate-200 text-slate-500 font-bold py-6 rounded-[2rem] hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 transition-all flex items-center justify-center gap-2 mt-6">
            <span className="material-symbols-outlined">add_circle</span>
            Criar Nova Etapa
          </button>
        </div>

        {/* Right Column: Destinação & Treinamentos */}
        <div className="space-y-6">
          
          {/* Card: Destinação do Processo */}
          <div className="bg-white/80 backdrop-blur-2xl border border-blue-100/50 rounded-3xl md:rounded-[2rem] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">
             <div className="flex flex-col mb-4">
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-500">share</span>
                  Destinação
                </h3>
                <p className="text-xs text-slate-500 mt-1">Quem deve visualizar e seguir este processo?</p>
             </div>

             <div className="space-y-3">
               {/* Opção: Todos */}
               <div 
                  onClick={() => { setDestinationType('todos'); setDestinationValue(''); }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${destinationType === 'todos' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${destinationType === 'todos' ? 'border-blue-500' : 'border-slate-300'}`}>
                    {destinationType === 'todos' && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${destinationType === 'todos' ? 'text-blue-900' : 'text-slate-700'}`}>Todos da Empresa</p>
                    <p className="text-[10px] text-slate-500">Processo global visível para todos.</p>
                  </div>
               </div>

               {/* Opção: Unidade */}
               <div 
                  onClick={() => setDestinationType('unidade')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${destinationType === 'unidade' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${destinationType === 'unidade' ? 'border-blue-500' : 'border-slate-300'}`}>
                      {destinationType === 'unidade' && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${destinationType === 'unidade' ? 'text-blue-900' : 'text-slate-700'}`}>Por Unidade</p>
                    </div>
                  </div>
                  {destinationType === 'unidade' && (
                    <div className="mt-4 grid grid-cols-1 gap-2 pl-8 animate-in fade-in slide-in-from-top-2">
                      {dynamicData.unidade.map(item => (
                        <div 
                          key={item.id} 
                          onClick={(e) => { e.stopPropagation(); setDestinationValue(item.name); }}
                          className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold transition-colors ${destinationValue === item.name ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                        >
                          <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                          {item.name}
                        </div>
                      ))}
                    </div>
                  )}
               </div>

               {/* Opção: Departamento */}
               <div 
                  onClick={() => setDestinationType('departamento')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${destinationType === 'departamento' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${destinationType === 'departamento' ? 'border-blue-500' : 'border-slate-300'}`}>
                      {destinationType === 'departamento' && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${destinationType === 'departamento' ? 'text-blue-900' : 'text-slate-700'}`}>Por Departamento</p>
                    </div>
                  </div>
                  {destinationType === 'departamento' && (
                    <div className="mt-4 grid grid-cols-2 gap-2 pl-8 animate-in fade-in slide-in-from-top-2">
                      {dynamicData.departamento.map(item => (
                        <div 
                          key={item.id} 
                          onClick={(e) => { e.stopPropagation(); setDestinationValue(item.name); }}
                          className={`flex flex-col items-center justify-center text-center gap-1 p-3 rounded-xl text-[10px] font-bold transition-colors ${destinationValue === item.name ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                        >
                          <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                          {item.name}
                          {item.unitName && <span className="text-[8px] font-normal opacity-70 block">{item.unitName}</span>}
                        </div>
                      ))}
                    </div>
                  )}
               </div>

               {/* Opção: Funcionário / Cargo */}
               <div 
                  onClick={() => setDestinationType('funcionario')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${destinationType === 'funcionario' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${destinationType === 'funcionario' ? 'border-blue-500' : 'border-slate-300'}`}>
                      {destinationType === 'funcionario' && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${destinationType === 'funcionario' ? 'text-blue-900' : 'text-slate-700'}`}>Por Cargo / Perfil</p>
                    </div>
                  </div>
                  {destinationType === 'funcionario' && (
                    <div className="mt-4 flex flex-wrap gap-2 pl-8 animate-in fade-in slide-in-from-top-2">
                      {dynamicData.funcionario.map(item => (
                        <div 
                          key={item.id} 
                          onClick={(e) => { e.stopPropagation(); setDestinationValue(item.name); }}
                          className={`flex items-center gap-1 px-3 py-2 rounded-full text-xs font-bold transition-colors ${destinationValue === item.name ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                        >
                          <span className="material-symbols-outlined text-[14px]">{item.icon}</span>
                          {item.name}
                        </div>
                      ))}
                    </div>
                  )}
               </div>

             </div>
          </div>

          <div className="bg-white/80 backdrop-blur-2xl border border-slate-200 rounded-3xl md:rounded-[2rem] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex flex-col mb-5">
               <h3 className="text-lg font-extrabold text-slate-900">Treinamentos Recomendados</h3>
               <p className="text-xs text-slate-500 mt-1">Adicione vídeos ou materiais de apoio para este processo.</p>
            </div>
            
            <div className="space-y-3">
              {trainings.map(training => (
                <div key={training.id} className="p-3 bg-white rounded-2xl border border-slate-100 flex items-center gap-3 relative group focus-within:border-blue-200 focus-within:ring-2 focus-within:ring-blue-50 transition-all shadow-sm">
                   <div className="h-10 w-10 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                     <span className="material-symbols-outlined text-purple-600">play_arrow</span>
                   </div>
                   <div className="flex-grow pr-6">
                     <input
                       type="text"
                       value={training.title}
                       onChange={(e) => updateTraining(training.id, 'title', e.target.value)}
                       placeholder="Título do vídeo"
                       className="text-xs font-bold text-slate-800 bg-transparent border-none outline-none placeholder:text-slate-300 w-full"
                     />
                     <input
                       type="text"
                       value={training.duration}
                       onChange={(e) => updateTraining(training.id, 'duration', e.target.value)}
                       placeholder="Duração (ex: 15 min)"
                       className="text-[10px] text-slate-500 font-medium bg-transparent border-none outline-none placeholder:text-slate-300 w-full mt-0.5"
                     />
                   </div>
                   <button onClick={() => removeTraining(training.id)} className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-red-400 hover:text-red-600 transition-opacity absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-red-50 rounded-full">
                       <span className="material-symbols-outlined text-[16px]">close</span>
                   </button>
                </div>
              ))}
              
              <button onClick={addTraining} className="w-full text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-2 mt-4 py-3 hover:bg-blue-50 rounded-2xl transition-colors border-2 border-dashed border-blue-100">
                 <span className="material-symbols-outlined text-[18px]">add</span>
                 Adicionar Vídeo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- DADOS INICIAIS ---
const initialProcesses = [
  {
    id: 'operador-caixa',
    category: 'Rotina de Setor',
    name: 'Operador de Caixa',
    desc: 'Procedimentos padrões para abertura, atendimento e fechamento de caixa.',
    icon: 'point_of_sale',
    destination: { type: 'funcionario', value: 'Operador de Caixa' },
    stages: [],
    trainings: []
  },
  {
    id: 'estoque',
    category: 'Logística',
    name: 'Estoque e Reposição',
    desc: 'Recebimento, organização e vitrine.',
    icon: 'inventory_2',
    destination: { type: 'departamento', value: 'Logística' },
    stages: [],
    trainings: []
  },
  {
    id: 'rh_admissao',
    category: 'Recursos Humanos',
    name: 'Processo de Admissão',
    desc: 'Passo a passo para contratação e integração de novos talentos.',
    icon: 'groups',
    destination: { type: 'departamento', value: 'Recursos Humanos' },
    stages: [],
    trainings: []
  },
  {
    id: 'seguranca',
    category: 'Segurança',
    name: 'Protocolos de Emergência',
    desc: 'Diretrizes gerais para evacuação e primeiros socorros.',
    icon: 'medical_services',
    destination: { type: 'todos', value: '' },
    stages: [],
    trainings: []
  }
];

// --- COMPONENTE PRINCIPAL (HUB) ---
export default function ProcessCreation() {
  const [processes, setProcesses] = useState(() => {
    const saved = localStorage.getItem('wiwu_processos_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialProcesses;
      }
    }
    return initialProcesses;
  });

  useEffect(() => {
    localStorage.setItem('wiwu_processos_data', JSON.stringify(processes));
  }, [processes]);

  const [activeProcessId, setActiveProcessId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSaveProcess = (processData) => {
    if (isCreating) {
      setProcesses([...processes, processData]);
    } else {
      setProcesses(processes.map(p => p.id === processData.id ? processData : p));
    }
    setActiveProcessId(null);
    setIsCreating(false);
  };

  const handleDeleteProcess = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este processo?")) {
      setProcesses(processes.filter(p => p.id !== id));
      setActiveProcessId(null);
      setIsCreating(false);
    }
  };

  if (isCreating) {
    return <ProcessEditor onBack={() => setIsCreating(false)} onSave={handleSaveProcess} isNew={true} />;
  }

  if (activeProcessId) {
    const processToEdit = processes.find(p => p.id === activeProcessId);
    if (processToEdit) {
      return <ProcessEditor onBack={() => setActiveProcessId(null)} onSave={handleSaveProcess} onDelete={handleDeleteProcess} initialData={processToEdit} isNew={false} />;
    }
  }

  // Função auxiliar para exibir a destinação no card
  const formatDestination = (dest) => {
    if (!dest) return "Não atribuído";
    switch(dest.type) {
      case 'todos': return "Todos da Empresa";
      case 'unidade': return `Unidade: ${dest.value || 'Não selecionada'}`;
      case 'departamento': return `Depto: ${dest.value || 'Não selecionado'}`;
      case 'funcionario': return `Cargo: ${dest.value || 'Não selecionado'}`;
      default: return "Não atribuído";
    }
  };

  // Encontra cor do ícone
  const getIconTheme = (iconName) => {
    const found = AVAILABLE_ICONS.find(i => i.name === iconName);
    return found || { color: 'text-blue-500', bg: 'bg-blue-50' };
  };

  return (
    <div className="max-w-7xl mx-auto w-full animate-in fade-in duration-500 px-4 md:px-0 pb-12">
      {/* Header Hub */}
      <header className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-4 px-4 md:px-0">
        <div>
          <span className="text-[12px] font-black uppercase tracking-widest text-blue-500 mb-1 block">Procedimentos Operacionais Padrão</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Processos</h1>
          <p className="text-slate-500 font-medium mt-2 text-sm md:text-lg leading-relaxed">Gerencie as rotinas da empresa e defina para quem cada processo é direcionado.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="w-full md:w-auto px-6 py-3 rounded-full text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Novo Processo
        </button>
      </header>

      {/* Grid Unificado de Processos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processes.map(process => {
          const theme = getIconTheme(process.icon);
          
          return (
            <div 
              key={process.id}
              onClick={() => setActiveProcessId(process.id)}
              className="group cursor-pointer bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] h-full"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`h-14 w-14 ${theme.bg} rounded-[1.5rem] flex items-center justify-center transition-all group-hover:scale-110 ${theme.color} shrink-0`}>
                    <span className="material-symbols-outlined text-2xl">{process.icon || 'edit_document'}</span>
                  </div>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-500 py-1 px-3 rounded-full uppercase tracking-wider">{process.category}</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 leading-tight">{process.name}</h3>
                <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-6">{process.desc || 'Sem descrição.'}</p>
              </div>
              
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-2 text-slate-400 group-hover:text-blue-500 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">share</span>
                    <span className="text-xs font-bold truncate max-w-[150px]">{formatDestination(process.destination)}</span>
                 </div>
                 <span className="material-symbols-outlined text-slate-300 group-hover:text-blue-500 transition-colors">chevron_right</span>
              </div>
            </div>
          );
        })}
        {processes.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[2rem]">
             <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">post_add</span>
             <p className="text-slate-400 font-bold">Nenhum processo criado ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
