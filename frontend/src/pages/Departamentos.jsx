import React, { useState } from 'react';

// Mock Data
const initialData = [
  {
    id: 'u1', 
    name: 'Lojas', 
    icon: 'storefront', 
    colorClass: 'text-indigo-600',
    bgClass: 'bg-indigo-500/10',
    hoverClass: 'group-hover:text-indigo-600',
    departamentos: [
      {
        id: 'd1', name: 'Vendas',
        funcionarios: [
          { 
            id: 'f1', name: 'Ana Silva', 
            birthDate: '1985-04-12', cargo: 'Gerente de Vendas', isManager: true 
          },
          { 
            id: 'f2', name: 'Carlos Dias', 
            birthDate: '1992-08-23', cargo: 'Vendedor', isManager: false 
          }
        ]
      },
      {
        id: 'd2', name: 'Estoque',
        funcionarios: [
          { id: 'f3', name: 'João Santos', birthDate: '1988-11-30', cargo: 'Estoquista', isManager: false }
        ]
      }
    ]
  },
  {
    id: 'u2', 
    name: 'Escritório', 
    icon: 'business_center', 
    colorClass: 'text-teal-600',
    bgClass: 'bg-teal-500/10',
    hoverClass: 'group-hover:text-teal-600',
    departamentos: [
      { 
        id: 'd3', name: 'Recursos Humanos', 
        funcionarios: [
          { id: 'f4', name: 'Mariana Costa', birthDate: '1990-01-15', cargo: 'Analista de RH', isManager: false }
        ] 
      },
      { id: 'd4', name: 'Financeiro', funcionarios: [] }
    ]
  }
];

const unitOptions = [
  { icon: 'domain', colorClass: 'text-blue-600', bgClass: 'bg-blue-500/10', hoverClass: 'group-hover:text-blue-600' },
  { icon: 'storefront', colorClass: 'text-indigo-600', bgClass: 'bg-indigo-500/10', hoverClass: 'group-hover:text-indigo-600' },
  { icon: 'business_center', colorClass: 'text-teal-600', bgClass: 'bg-teal-500/10', hoverClass: 'group-hover:text-teal-600' },
  { icon: 'factory', colorClass: 'text-orange-600', bgClass: 'bg-orange-500/10', hoverClass: 'group-hover:text-orange-600' },
  { icon: 'warehouse', colorClass: 'text-amber-600', bgClass: 'bg-amber-500/10', hoverClass: 'group-hover:text-amber-600' },
  { icon: 'local_hospital', colorClass: 'text-rose-600', bgClass: 'bg-rose-500/10', hoverClass: 'group-hover:text-rose-600' },
  { icon: 'school', colorClass: 'text-emerald-600', bgClass: 'bg-emerald-500/10', hoverClass: 'group-hover:text-emerald-600' },
  { icon: 'account_balance', colorClass: 'text-purple-600', bgClass: 'bg-purple-500/10', hoverClass: 'group-hover:text-purple-600' },
];

export default function Departamentos() {
  const [data, setData] = useState(initialData);
  const [activeUnitId, setActiveUnitId] = useState(null);
  const [activeDeptId, setActiveDeptId] = useState(null);
  
  // Modal states
  const [isFuncModalOpen, setIsFuncModalOpen] = useState(false);
  const [editingFunc, setEditingFunc] = useState(null);
  const [funcFormData, setFuncFormData] = useState({ name: '', birthDate: '', cargo: '', isManager: false });

  // Unit Modal states
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [editingUnitId, setEditingUnitId] = useState(null);
  const [unitFormData, setUnitFormData] = useState({ name: '', selectedOption: 0 });

  // Derivando estado
  const activeUnit = data.find(u => u.id === activeUnitId);
  const activeDept = activeUnit?.departamentos.find(d => d.id === activeDeptId);

  // Handlers de seleção
  const handleSelectUnit = (id) => {
    setActiveUnitId(id);
    setActiveDeptId(null);
  };

  const handleSelectDept = (id) => {
    setActiveDeptId(id);
  };

  // Funções de Criação e Edição
  const openUnitModal = (unit = null) => {
    if (unit) {
      setEditingUnitId(unit.id);
      const optionIndex = unitOptions.findIndex(o => o.icon === unit.icon) !== -1 
        ? unitOptions.findIndex(o => o.icon === unit.icon) 
        : 0;
      setUnitFormData({ name: unit.name, selectedOption: optionIndex });
    } else {
      setEditingUnitId(null);
      setUnitFormData({ name: '', selectedOption: 0 });
    }
    setIsUnitModalOpen(true);
  };

  const handleSaveUnit = (e) => {
    e.preventDefault();
    if (!unitFormData.name || unitFormData.name.trim() === '') return;
    
    const selectedStyle = unitOptions[unitFormData.selectedOption];
    const newData = [...data];

    if (editingUnitId) {
      const unitIndex = newData.findIndex(u => u.id === editingUnitId);
      if (unitIndex !== -1) {
        newData[unitIndex] = {
          ...newData[unitIndex],
          name: unitFormData.name.trim(),
          ...selectedStyle
        };
      }
    } else {
      newData.push({
        id: `u${Date.now()}`,
        name: unitFormData.name.trim(),
        ...selectedStyle,
        departamentos: []
      });
    }

    setData(newData);
    setIsUnitModalOpen(false);
  };

  const handleCreateUnit = () => openUnitModal();

  const handleEditUnit = (e, unit) => {
    e.stopPropagation();
    openUnitModal(unit);
  };

  const handleCreateDept = () => {
    const name = window.prompt('Nome do novo departamento:');
    if (!name || name.trim() === '' || !activeUnit) return;
    const newData = [...data];
    const unitIndex = newData.findIndex(u => u.id === activeUnitId);
    newData[unitIndex].departamentos.push({
      id: `d${Date.now()}`,
      name: name.trim(),
      funcionarios: []
    });
    setData(newData);
  };

  const handleEditDept = (e, dept) => {
    e.stopPropagation();
    const newName = window.prompt('Editar nome do departamento:', dept.name);
    if (newName && newName.trim() !== '') {
      const newData = [...data];
      const unitIndex = newData.findIndex(u => u.id === activeUnitId);
      const deptIndex = newData[unitIndex].departamentos.findIndex(d => d.id === dept.id);
      newData[unitIndex].departamentos[deptIndex].name = newName.trim();
      setData(newData);
    }
  };

  // Funcionários Modal Handlers
  const openFuncModal = (func = null) => {
    if (func) {
      setEditingFunc(func.id);
      setFuncFormData({ 
        name: func.name, 
        birthDate: func.birthDate || '', 
        cargo: func.cargo, 
        isManager: func.isManager || false 
      });
    } else {
      setEditingFunc(null);
      setFuncFormData({ name: '', birthDate: '', cargo: '', isManager: false });
    }
    setIsFuncModalOpen(true);
  };

  const handleSaveFuncionario = (e) => {
    e.preventDefault();
    if (!activeDept) return;
    
    const newData = [...data];
    const unitIndex = newData.findIndex(u => u.id === activeUnitId);
    const deptIndex = newData[unitIndex].departamentos.findIndex(d => d.id === activeDeptId);
    
    if (editingFunc) {
      // Editar
      const funcIndex = newData[unitIndex].departamentos[deptIndex].funcionarios.findIndex(f => f.id === editingFunc);
      if (funcIndex !== -1) {
        newData[unitIndex].departamentos[deptIndex].funcionarios[funcIndex] = { 
          ...newData[unitIndex].departamentos[deptIndex].funcionarios[funcIndex],
          ...funcFormData 
        };
      }
    } else {
      // Criar
      newData[unitIndex].departamentos[deptIndex].funcionarios.push({
        id: `f${Date.now()}`,
        ...funcFormData
      });
    }
    
    setData(newData);
    setIsFuncModalOpen(false);
  };

  // Funções de Exclusão
  const handleDeleteUnit = (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Tem certeza que deseja excluir esta unidade? Todos os departamentos dentro dela serão apagados.')) return;
    const newData = data.filter(u => u.id !== id);
    setData(newData);
    if (activeUnitId === id) {
      setActiveUnitId(null);
      setActiveDeptId(null);
    }
  };

  const handleDeleteDept = (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Tem certeza que deseja excluir este departamento? Todos os funcionários dentro dele serão apagados.')) return;
    const newData = [...data];
    const unitIndex = newData.findIndex(u => u.id === activeUnitId);
    newData[unitIndex].departamentos = newData[unitIndex].departamentos.filter(d => d.id !== id);
    setData(newData);
    if (activeDeptId === id) {
      setActiveDeptId(null);
    }
  };

  const handleDeleteFuncionario = (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Tem certeza que deseja excluir este funcionário?')) return;
    const newData = [...data];
    const unitIndex = newData.findIndex(u => u.id === activeUnitId);
    const deptIndex = newData[unitIndex].departamentos.findIndex(d => d.id === activeDeptId);
    newData[unitIndex].departamentos[deptIndex].funcionarios = newData[unitIndex].departamentos[deptIndex].funcionarios.filter(f => f.id !== id);
    setData(newData);
  };

  return (
    <div className="max-w-full mx-auto w-full h-full flex flex-col animate-in fade-in duration-500 overflow-hidden">
      {/* Header */}
      <header className="mb-8 flex-shrink-0 px-4 md:px-0">
        <span className="text-[12px] font-black uppercase tracking-widest text-blue-500 mb-1 block">Estrutura Organizacional</span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Departamentos</h1>
        <p className="text-slate-500 font-medium mt-2 text-sm md:text-lg">Gerencie unidades, setores e aloque seus funcionários.</p>
      </header>

      {/* Miller Columns Container */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 custom-scrollbar snap-x px-4 md:px-0">
        
        {/* COLUNA 1: UNIDADES */}
        <div className="w-[85vw] max-w-[320px] md:w-80 flex-shrink-0 flex flex-col snap-start">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              Unidades 
              <span className="text-xs font-bold bg-slate-100 text-slate-500 py-1 px-3 rounded-full">{data.length}</span>
            </h2>
            <button onClick={handleCreateUnit} className="text-xs font-bold bg-blue-100 hover:bg-blue-200 text-blue-600 py-1 px-3 rounded-full transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">add</span> Novo
            </button>
          </div>
          
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1 overflow-y-auto space-y-3">
            {data.length === 0 ? (
              <div className="text-center p-6 opacity-50">
                <span className="material-symbols-outlined text-4xl mb-2">business</span>
                <p className="text-sm font-medium">Nenhuma unidade cadastrada.</p>
              </div>
            ) : (
              data.map(unit => (
                <div 
                  key={unit.id}
                  onClick={() => handleSelectUnit(unit.id)}
                  className={`group cursor-pointer rounded-2xl p-4 flex items-center justify-between transition-all duration-300 border ${activeUnitId === unit.id ? 'bg-white border-blue-200 shadow-md scale-[1.02]' : 'bg-transparent border-transparent hover:bg-white/50'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-[1rem] flex items-center justify-center transition-colors ${unit.bgClass} ${unit.colorClass}`}>
                      <span className="material-symbols-outlined">{unit.icon}</span>
                    </div>
                    <div>
                      <h3 className={`text-md font-extrabold transition-colors ${activeUnitId === unit.id ? 'text-blue-600' : 'text-slate-900 ' + unit.hoverClass}`}>{unit.name}</h3>
                      <p className="text-xs text-slate-500 font-medium">{unit.departamentos.length} departamentos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={(e) => handleEditUnit(e, unit)} className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-blue-500 transition-all rounded-full hover:bg-blue-50" title="Editar Unidade">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button onClick={(e) => handleDeleteUnit(e, unit.id)} className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-500 transition-all rounded-full hover:bg-red-50" title="Excluir Unidade">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                    <span className={`material-symbols-outlined transition-colors ${activeUnitId === unit.id ? 'text-blue-500' : 'text-slate-300 group-hover:text-slate-400'}`}>chevron_right</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* COLUNA 2: DEPARTAMENTOS */}
        {activeUnit && (
          <div className="w-[85vw] max-w-[320px] md:w-80 flex-shrink-0 flex flex-col snap-start animate-in slide-in-from-left-4 fade-in duration-300">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                Departamentos
                <span className="text-xs font-bold bg-slate-100 text-slate-500 py-1 px-3 rounded-full">{activeUnit.departamentos.length}</span>
              </h2>
              <button onClick={handleCreateDept} className="text-xs font-bold bg-blue-100 hover:bg-blue-200 text-blue-600 py-1 px-3 rounded-full transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">add</span> Novo
              </button>
            </div>
            
            <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1 overflow-y-auto space-y-2">
              {activeUnit.departamentos.length === 0 ? (
                <div className="text-center p-6 opacity-50">
                  <span className="material-symbols-outlined text-4xl mb-2">domain_disabled</span>
                  <p className="text-sm font-medium">Nenhum departamento cadastrado.</p>
                </div>
              ) : (
                activeUnit.departamentos.map(dept => (
                  <div 
                    key={dept.id}
                    onClick={() => handleSelectDept(dept.id)}
                    className={`group cursor-pointer rounded-2xl p-4 flex items-center justify-between transition-all duration-300 border ${activeDeptId === dept.id ? 'bg-white border-blue-200 shadow-md scale-[1.02]' : 'bg-transparent border-transparent hover:bg-white/50'}`}
                  >
                    <div>
                      <h3 className={`text-sm font-extrabold transition-colors ${activeDeptId === dept.id ? 'text-blue-600' : 'text-slate-800 group-hover:text-blue-500'}`}>{dept.name}</h3>
                      <p className="text-xs text-slate-500 font-medium">{dept.funcionarios.length} funcionários</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={(e) => handleEditDept(e, dept)} className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-blue-500 transition-all rounded-full hover:bg-blue-50" title="Editar Departamento">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button onClick={(e) => handleDeleteDept(e, dept.id)} className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-500 transition-all rounded-full hover:bg-red-50" title="Excluir Departamento">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                      <span className={`material-symbols-outlined text-sm transition-colors ${activeDeptId === dept.id ? 'text-blue-500' : 'text-slate-300 group-hover:text-blue-400'}`}>chevron_right</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* COLUNA 3: FUNCIONÁRIOS */}
        {activeDept && (
          <div className="w-[85vw] max-w-[320px] md:w-80 flex-shrink-0 flex flex-col snap-start animate-in slide-in-from-left-4 fade-in duration-300">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                Funcionários
                <span className="text-xs font-bold bg-slate-100 text-slate-500 py-1 px-3 rounded-full">{activeDept.funcionarios.length}</span>
              </h2>
              <button onClick={() => openFuncModal()} className="text-xs font-bold bg-blue-100 hover:bg-blue-200 text-blue-600 py-1 px-3 rounded-full transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">add</span> Novo
              </button>
            </div>
            
            <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1 overflow-y-auto space-y-2 relative">
              {activeDept.funcionarios.length === 0 ? (
                <div className="text-center p-6 opacity-50">
                  <span className="material-symbols-outlined text-4xl mb-2">badge</span>
                  <p className="text-sm font-medium">Nenhum funcionário cadastrado.</p>
                </div>
              ) : (
                <>
                  {/* Destacar Responsável */}
                  {activeDept.funcionarios.filter(f => f.isManager).map(func => (
                    <div 
                      key={func.id}
                      className="group rounded-2xl p-4 flex items-center justify-between transition-all duration-300 border bg-blue-50 border-blue-200 shadow-sm relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 bg-blue-500 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-bl-lg">
                        Responsável
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm flex-shrink-0 text-blue-600">
                          <span className="material-symbols-outlined">star</span>
                        </div>
                        <div>
                          <h3 className="text-sm font-extrabold text-blue-900">{func.name}</h3>
                          <p className="text-[11px] text-blue-600 font-medium">{func.cargo}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0 relative z-10">
                        <button onClick={(e) => { e.stopPropagation(); openFuncModal(func); }} className="opacity-0 group-hover:opacity-100 p-1 text-blue-400 hover:text-blue-600 transition-all rounded-full hover:bg-blue-100" title="Editar Funcionário">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button onClick={(e) => handleDeleteFuncionario(e, func.id)} className="opacity-0 group-hover:opacity-100 p-1 text-blue-400 hover:text-red-500 transition-all rounded-full hover:bg-blue-100" title="Excluir Funcionário">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Restante dos Funcionários */}
                  {activeDept.funcionarios.filter(f => !f.isManager).map(func => (
                    <div 
                      key={func.id}
                      className={`group rounded-2xl p-4 flex items-center justify-between transition-all duration-300 border bg-transparent border-transparent hover:bg-white/50 hover:shadow-sm`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                          <span className="material-symbols-outlined text-slate-400">person</span>
                        </div>
                        <div>
                          <h3 className="text-sm font-extrabold text-slate-800">{func.name}</h3>
                          <p className="text-[11px] text-slate-500 font-medium">{func.cargo}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button onClick={(e) => { e.stopPropagation(); openFuncModal(func); }} className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-blue-500 transition-all rounded-full hover:bg-blue-50" title="Editar Funcionário">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button onClick={(e) => handleDeleteFuncionario(e, func.id)} className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-500 transition-all rounded-full hover:bg-red-50" title="Excluir Funcionário">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

      </div>

      {/* MODAL DE CRIAÇÃO/EDIÇÃO DE UNIDADE */}
      {isUnitModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 border border-slate-100 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold text-slate-900">{editingUnitId ? 'Editar Unidade' : 'Nova Unidade'}</h3>
              <button onClick={() => setIsUnitModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSaveUnit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nome da Unidade</label>
                <input 
                  type="text" 
                  required
                  value={unitFormData.name}
                  onChange={e => setUnitFormData({...unitFormData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Ex: Loja Centro, Matriz..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Ícone e Cor</label>
                <div className="grid grid-cols-4 gap-3">
                  {unitOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setUnitFormData({...unitFormData, selectedOption: idx})}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-200 ${unitFormData.selectedOption === idx ? 'border-blue-500 bg-blue-50 scale-105 shadow-sm' : 'border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-slate-200'}`}
                    >
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-1 ${opt.bgClass} ${opt.colorClass}`}>
                        <span className="material-symbols-outlined text-[20px]">{opt.icon}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsUnitModalOpen(false)} className="px-5 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100 transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE CRIAÇÃO/EDIÇÃO DE FUNCIONÁRIO */}
      {isFuncModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 border border-slate-100 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold text-slate-900">{editingFunc ? 'Editar Funcionário' : 'Novo Funcionário'}</h3>
              <button onClick={() => setIsFuncModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSaveFuncionario} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nome</label>
                <input 
                  type="text" 
                  required
                  value={funcFormData.name}
                  onChange={e => setFuncFormData({...funcFormData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Ex: João da Silva"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Data de Nascimento</label>
                <input 
                  type="date" 
                  value={funcFormData.birthDate}
                  onChange={e => setFuncFormData({...funcFormData, birthDate: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-slate-700"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Cargo</label>
                <input 
                  type="text" 
                  required
                  value={funcFormData.cargo}
                  onChange={e => setFuncFormData({...funcFormData, cargo: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Ex: Gerente, Vendedor..."
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer mt-4 mb-2">
                  <input
                    type="checkbox"
                    checked={funcFormData.isManager}
                    onChange={e => setFuncFormData({...funcFormData, isManager: e.target.checked})}
                    className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 transition-all"
                  />
                  <span className="text-sm font-bold text-slate-700">É o responsável/gerente deste setor?</span>
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsFuncModalOpen(false)} className="px-5 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100 transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

