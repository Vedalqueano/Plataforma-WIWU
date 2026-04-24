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
        cargos: [
          { 
            id: 'c1', name: 'Gerente de Vendas', 
            funcionarios: [{ id: 'f1', name: 'Ana Silva', role: 'Gerente' }] 
          },
          { 
            id: 'c2', name: 'Vendedor', 
            funcionarios: [{ id: 'f2', name: 'Carlos Dias', role: 'Vendedor' }] 
          }
        ]
      },
      {
        id: 'd2', name: 'Estoque',
        cargos: [
          { id: 'c3', name: 'Estoquista', funcionarios: [] }
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
        cargos: [
          { id: 'c4', name: 'Analista de RH', funcionarios: [] }
        ] 
      },
      { id: 'd4', name: 'Financeiro', cargos: [] }
    ]
  }
];

export default function Departamentos() {
  const [data, setData] = useState(initialData);
  const [activeUnitId, setActiveUnitId] = useState(null);
  const [activeDeptId, setActiveDeptId] = useState(null);
  const [activeCargoId, setActiveCargoId] = useState(null);
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);

  // Derivando estado atual para as colunas
  const activeUnit = data.find(u => u.id === activeUnitId);
  const activeDept = activeUnit?.departamentos.find(d => d.id === activeDeptId);
  const activeCargo = activeDept?.cargos.find(c => c.id === activeCargoId);

  // Handlers
  const handleSelectUnit = (id) => {
    setActiveUnitId(id);
    setActiveDeptId(null);
    setActiveCargoId(null);
  };

  const handleSelectDept = (id) => {
    setActiveDeptId(id);
    setActiveCargoId(null);
  };

  const handleSelectCargo = (id) => {
    setActiveCargoId(id);
  };

  // Funções de Criação
  const handleCreateUnit = () => {
    setIsUnitModalOpen(true);
  };

  const confirmCreateUnit = (type) => {
    const isLoja = type === '1';
    const baseName = isLoja ? 'Loja' : 'Escritório';
    
    // Contar quantas unidades desse tipo já existem para a numeração
    const count = data.filter(u => u.name.startsWith(baseName)).length;
    const suffix = count > 0 ? ` ${count + 1}` : '';
    const newName = `${baseName}${suffix}`;

    const icon = isLoja ? 'storefront' : 'business_center';
    const colorClass = isLoja ? 'text-indigo-600' : 'text-teal-600';
    const bgClass = isLoja ? 'bg-indigo-500/10' : 'bg-teal-500/10';
    const hoverClass = isLoja ? 'group-hover:text-indigo-600' : 'group-hover:text-teal-600';

    const newData = [...data];
    newData.push({
      id: `u${Date.now()}`,
      name: newName,
      icon,
      colorClass,
      bgClass,
      hoverClass,
      departamentos: []
    });
    setData(newData);
    setIsUnitModalOpen(false);
  };

  const handleCreateDept = () => {
    const name = window.prompt('Nome do novo departamento:');
    if (!name || !activeUnit) return;
    const newData = [...data];
    const unitIndex = newData.findIndex(u => u.id === activeUnitId);
    newData[unitIndex].departamentos.push({
      id: `d${Date.now()}`,
      name,
      cargos: []
    });
    setData(newData);
  };

  const handleCreateCargo = () => {
    const name = window.prompt('Nome do novo cargo:');
    if (!name || !activeDept) return;
    const newData = [...data];
    const unitIndex = newData.findIndex(u => u.id === activeUnitId);
    const deptIndex = newData[unitIndex].departamentos.findIndex(d => d.id === activeDeptId);
    newData[unitIndex].departamentos[deptIndex].cargos.push({
      id: `c${Date.now()}`,
      name,
      funcionarios: []
    });
    setData(newData);
  };

  const handleCreateFuncionario = () => {
    const name = window.prompt('Nome do novo funcionário:');
    if (!name || !activeCargo) return;
    const newData = [...data];
    const unitIndex = newData.findIndex(u => u.id === activeUnitId);
    const deptIndex = newData[unitIndex].departamentos.findIndex(d => d.id === activeDeptId);
    const cargoIndex = newData[unitIndex].departamentos[deptIndex].cargos.findIndex(c => c.id === activeCargoId);
    newData[unitIndex].departamentos[deptIndex].cargos[cargoIndex].funcionarios.push({
      id: `f${Date.now()}`,
      name,
      role: activeCargo.name
    });
    setData(newData);
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
      setActiveCargoId(null);
    }
  };

  const handleDeleteDept = (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Tem certeza que deseja excluir este departamento? Todos os cargos dentro dele serão apagados.')) return;
    const newData = [...data];
    const unitIndex = newData.findIndex(u => u.id === activeUnitId);
    newData[unitIndex].departamentos = newData[unitIndex].departamentos.filter(d => d.id !== id);
    setData(newData);
    if (activeDeptId === id) {
      setActiveDeptId(null);
      setActiveCargoId(null);
    }
  };

  const handleDeleteCargo = (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Tem certeza que deseja excluir este cargo? Todos os funcionários dentro dele serão apagados.')) return;
    const newData = [...data];
    const unitIndex = newData.findIndex(u => u.id === activeUnitId);
    const deptIndex = newData[unitIndex].departamentos.findIndex(d => d.id === activeDeptId);
    newData[unitIndex].departamentos[deptIndex].cargos = newData[unitIndex].departamentos[deptIndex].cargos.filter(c => c.id !== id);
    setData(newData);
    if (activeCargoId === id) {
      setActiveCargoId(null);
    }
  };

  const handleDeleteFuncionario = (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Tem certeza que deseja excluir este funcionário?')) return;
    const newData = [...data];
    const unitIndex = newData.findIndex(u => u.id === activeUnitId);
    const deptIndex = newData[unitIndex].departamentos.findIndex(d => d.id === activeDeptId);
    const cargoIndex = newData[unitIndex].departamentos[deptIndex].cargos.findIndex(c => c.id === activeCargoId);
    newData[unitIndex].departamentos[deptIndex].cargos[cargoIndex].funcionarios = newData[unitIndex].departamentos[deptIndex].cargos[cargoIndex].funcionarios.filter(f => f.id !== id);
    setData(newData);
  };

  return (
    <div className="max-w-full mx-auto w-full h-full flex flex-col animate-in fade-in duration-500 overflow-hidden">
      {/* Header */}
      <header className="mb-8 flex-shrink-0">
        <span className="text-[12px] font-black uppercase tracking-widest text-blue-500 mb-1 block">Estrutura Organizacional</span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Departamentos</h1>
        <p className="text-slate-500 font-medium mt-2 text-sm md:text-lg">Gerencie unidades, setores, cargos e aloque seus funcionários.</p>
      </header>

      {/* Miller Columns Container */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 custom-scrollbar snap-x">
        
        {/* COLUNA 1: UNIDADES */}
        <div className="w-80 flex-shrink-0 flex flex-col snap-start">
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
          <div className="w-80 flex-shrink-0 flex flex-col snap-start animate-in slide-in-from-left-4 fade-in duration-300">
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
                      <p className="text-xs text-slate-500 font-medium">{dept.cargos.length} cargos</p>
                    </div>
                    <div className="flex items-center gap-1">
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

        {/* COLUNA 3: CARGOS */}
        {activeDept && (
          <div className="w-80 flex-shrink-0 flex flex-col snap-start animate-in slide-in-from-left-4 fade-in duration-300">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                Cargos
                <span className="text-xs font-bold bg-slate-100 text-slate-500 py-1 px-3 rounded-full">{activeDept.cargos.length}</span>
              </h2>
              <button onClick={handleCreateCargo} className="text-xs font-bold bg-blue-100 hover:bg-blue-200 text-blue-600 py-1 px-3 rounded-full transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">add</span> Novo
              </button>
            </div>
            
            <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1 overflow-y-auto space-y-2">
              {activeDept.cargos.length === 0 ? (
                <div className="text-center p-6 opacity-50">
                  <span className="material-symbols-outlined text-4xl mb-2">badge</span>
                  <p className="text-sm font-medium">Nenhum cargo cadastrado.</p>
                </div>
              ) : (
                activeDept.cargos.map(cargo => (
                  <div 
                    key={cargo.id}
                    onClick={() => handleSelectCargo(cargo.id)}
                    className={`group cursor-pointer rounded-2xl p-4 flex items-center justify-between transition-all duration-300 border ${activeCargoId === cargo.id ? 'bg-white border-blue-200 shadow-md scale-[1.02]' : 'bg-transparent border-transparent hover:bg-white/50'}`}
                  >
                    <div>
                      <h3 className={`text-sm font-extrabold transition-colors ${activeCargoId === cargo.id ? 'text-blue-600' : 'text-slate-800 group-hover:text-blue-500'}`}>{cargo.name}</h3>
                      <p className="text-xs text-slate-500 font-medium">{cargo.funcionarios.length} funcionários</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={(e) => handleDeleteCargo(e, cargo.id)} className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-500 transition-all rounded-full hover:bg-red-50" title="Excluir Cargo">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                      <span className={`material-symbols-outlined text-sm transition-colors ${activeCargoId === cargo.id ? 'text-blue-500' : 'text-slate-300 group-hover:text-blue-400'}`}>chevron_right</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* COLUNA 4: FUNCIONÁRIOS */}
        {activeCargo && (
          <div className="w-80 flex-shrink-0 flex flex-col snap-start animate-in slide-in-from-left-4 fade-in duration-300">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                Funcionários
                <span className="text-xs font-bold bg-slate-100 text-slate-500 py-1 px-3 rounded-full">{activeCargo.funcionarios.length}</span>
              </h2>
              <button onClick={handleCreateFuncionario} className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 py-1 px-3 rounded-full transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">person_add</span> Alocar
              </button>
            </div>
            
            <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1 overflow-y-auto space-y-2 relative">
              {activeCargo.funcionarios.length === 0 ? (
                <div className="text-center p-6 opacity-50">
                  <span className="material-symbols-outlined text-4xl mb-2">person_off</span>
                  <p className="text-sm font-medium">Nenhum funcionário alocado.</p>
                </div>
              ) : (
                activeCargo.funcionarios.map(func => (
                  <div key={func.id} className="group bg-white border border-slate-100 rounded-2xl p-3 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                        <span className="material-symbols-outlined text-slate-400">person</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">{func.name}</h3>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">{func.role}</p>
                      </div>
                    </div>
                    <button onClick={(e) => handleDeleteFuncionario(e, func.id)} className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-300 hover:text-red-500 transition-all rounded-full hover:bg-red-50" title="Desalocar Funcionário">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>

      {/* MODAL DE CRIAÇÃO DE UNIDADE */}
      {isUnitModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 border border-slate-100 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold text-slate-900">Selecione o tipo de Unidade</h3>
              <button onClick={() => setIsUnitModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Option: Loja */}
              <button 
                onClick={() => confirmCreateUnit('1')}
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-indigo-100 bg-indigo-50 hover:border-indigo-500 hover:bg-indigo-500 hover:text-white text-indigo-900 transition-all group"
              >
                <div className="h-14 w-14 bg-white/60 group-hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-3xl">storefront</span>
                </div>
                <span className="font-bold">Loja</span>
              </button>
              
              {/* Option: Escritório */}
              <button 
                onClick={() => confirmCreateUnit('2')}
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-teal-100 bg-teal-50 hover:border-teal-500 hover:bg-teal-500 hover:text-white text-teal-900 transition-all group"
              >
                <div className="h-14 w-14 bg-white/60 group-hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-3xl">business_center</span>
                </div>
                <span className="font-bold">Escritório</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
