import React, { useState, useRef, useEffect } from 'react';

// Lista de ícones disponíveis para escolha
const AVAILABLE_ICONS = [
  'edit_document', 'point_of_sale', 'inventory_2', 'local_mall', 
  'groups', 'account_balance_wallet', 'shopping_cart', 'precision_manufacturing',
  'support_agent', 'campaign', 'construction', 'local_shipping',
  'storefront', 'business_center', 'star', 'rocket_launch',
  'laptop_mac', 'assignment', 'build', 'event_note'
];

// --- COMPONENTE EDITOR DE PROCESSO ---
function ProcessEditor({ onBack, onSave, onDelete, initialData, isNew = false }) {
  const [processName, setProcessName] = useState(isNew ? "" : (initialData?.name || ""));
  const [processDesc, setProcessDesc] = useState(isNew ? "" : (initialData?.desc || ""));
  const [processCategory, setProcessCategory] = useState(isNew ? "Rotina de Setor" : (initialData?.category || "Rotina de Setor"));
  const [icon, setIcon] = useState(initialData?.icon || 'edit_document');
  const [showIconPicker, setShowIconPicker] = useState(false);
  
  // Destinação
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

  const descRef = useRef(null);
  
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
      icon: icon,
      destination: {
        type: destinationType,
        value: destinationValue
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
        
        <div className="flex items-center justify-between flex-wrap gap-6 bg-white/60 backdrop-blur-2xl border border-blue-100 p-6 md:p-8 rounded-3xl md:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
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

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-3/4">
            
            {/* Ícone com Selector */}
            <div className="relative">
              <div 
                onClick={() => setShowIconPicker(!showIconPicker)}
                className="h-20 w-20 bg-blue-500/10 rounded-[2rem] flex items-center justify-center border border-white cursor-pointer hover:bg-blue-500/20 transition-colors flex-shrink-0 group/icon"
                title="Alterar Ícone"
              >
                <span className="material-symbols-outlined text-blue-600 text-4xl group-hover/icon:scale-110 transition-transform">{icon}</span>
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-sm opacity-0 group-hover/icon:opacity-100 transition-opacity">
                   <span className="material-symbols-outlined text-[14px]">edit</span>
                </div>
              </div>

              {/* Popover de Ícones */}
              {showIconPicker && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowIconPicker(false)}></div>
                  <div className="absolute top-24 left-0 bg-white border border-slate-100 shadow-[0_20px_40px_rgb(0,0,0,0.1)] rounded-2xl p-4 w-64 z-50 grid grid-cols-5 gap-2 animate-in fade-in zoom-in-95 duration-200">
                     {AVAILABLE_ICONS.map(ic => (
                       <button
                         key={ic}
                         onClick={() => { setIcon(ic); setShowIconPicker(false); }}
                         className={`h-10 w-10 flex items-center justify-center rounded-xl transition-colors ${icon === ic ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                       >
                         <span className="material-symbols-outlined text-xl">{ic}</span>
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
          <div className="bg-white/80 backdrop-blur-2xl border border-blue-100/50 rounded-3xl md:rounded-[2rem] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
             <div className="flex flex-col mb-4">
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-500">share</span>
                  Destinação
                </h3>
                <p className="text-xs text-slate-500 mt-1">Quem deve visualizar e seguir este processo?</p>
             </div>

             <div className="space-y-3">
               <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                  <input 
                    type="radio" 
                    name="destination" 
                    value="todos"
                    checked={destinationType === 'todos'}
                    onChange={() => setDestinationType('todos')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-800">Todos</p>
                    <p className="text-[10px] text-slate-500">Visível para toda a empresa</p>
                  </div>
               </label>

               <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                  <input 
                    type="radio" 
                    name="destination" 
                    value="unidade"
                    checked={destinationType === 'unidade'}
                    onChange={() => setDestinationType('unidade')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="w-full">
                    <p className="text-sm font-bold text-slate-800">Por Unidade</p>
                    {destinationType === 'unidade' && (
                      <input 
                        type="text" 
                        placeholder="Ex: Loja Matriz" 
                        value={destinationValue}
                        onChange={(e) => setDestinationValue(e.target.value)}
                        className="mt-2 w-full text-xs p-2 rounded-lg bg-slate-50 border border-slate-200 outline-none focus:border-blue-400"
                      />
                    )}
                  </div>
               </label>

               <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                  <input 
                    type="radio" 
                    name="destination" 
                    value="departamento"
                    checked={destinationType === 'departamento'}
                    onChange={() => setDestinationType('departamento')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="w-full">
                    <p className="text-sm font-bold text-slate-800">Por Departamento</p>
                    {destinationType === 'departamento' && (
                      <input 
                        type="text" 
                        placeholder="Ex: Financeiro" 
                        value={destinationValue}
                        onChange={(e) => setDestinationValue(e.target.value)}
                        className="mt-2 w-full text-xs p-2 rounded-lg bg-slate-50 border border-slate-200 outline-none focus:border-blue-400"
                      />
                    )}
                  </div>
               </label>

               <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                  <input 
                    type="radio" 
                    name="destination" 
                    value="funcionario"
                    checked={destinationType === 'funcionario'}
                    onChange={() => setDestinationType('funcionario')}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="w-full">
                    <p className="text-sm font-bold text-slate-800">Por Funcionário / Cargo</p>
                    {destinationType === 'funcionario' && (
                      <input 
                        type="text" 
                        placeholder="Ex: Operador de Caixa" 
                        value={destinationValue}
                        onChange={(e) => setDestinationValue(e.target.value)}
                        className="mt-2 w-full text-xs p-2 rounded-lg bg-slate-50 border border-slate-200 outline-none focus:border-blue-400"
                      />
                    )}
                  </div>
               </label>
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
    destination: { type: 'funcionario', value: 'Operadores de Caixa' },
    stages: [],
    trainings: []
  },
  {
    id: 'estoque',
    category: 'Logística',
    name: 'Estoque e Reposição',
    desc: 'Recebimento, organização e vitrine.',
    icon: 'inventory_2',
    destination: { type: 'departamento', value: 'Estoque' },
    stages: [],
    trainings: []
  },
  {
    id: 'rh_admissao',
    category: 'Recursos Humanos',
    name: 'Processo de Admissão',
    desc: 'Passo a passo para contratação e integração de novos talentos.',
    icon: 'groups',
    destination: { type: 'departamento', value: 'RH' },
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
  const [processes, setProcesses] = useState(initialProcesses);
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
      case 'unidade': return `Unidade: ${dest.value || 'Não especificada'}`;
      case 'departamento': return `Depto: ${dest.value || 'Não especificado'}`;
      case 'funcionario': return `Cargo/Func: ${dest.value || 'Não especificado'}`;
      default: return "Não atribuído";
    }
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
        {processes.map(process => (
          <div 
            key={process.id}
            onClick={() => setActiveProcessId(process.id)}
            className="group cursor-pointer bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] h-full"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="h-14 w-14 bg-blue-500/10 rounded-[1.5rem] flex items-center justify-center transition-colors group-hover:bg-blue-500 group-hover:text-white text-blue-600 shrink-0">
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
        ))}
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
