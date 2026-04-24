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

  // Funções de Criação Básicas (Mockups por enquanto usando prompt)
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
            <h2 className="text-lg font-extrabold text-slate-900">Unidades</h2>
            <span className="text-xs font-bold bg-slate-100 text-slate-500 py-1 px-3 rounded-full">{data.length}</span>
          </div>
          
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1 overflow-y-auto space-y-3">
            {data.map(unit => (
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
                <span className={`material-symbols-outlined transition-colors ${activeUnitId === unit.id ? 'text-blue-500' : 'text-slate-300 group-hover:text-slate-400'}`}>chevron_right</span>
              </div>
            ))}
          </div>
        </div>

        {/* COLUNA 2: DEPARTAMENTOS */}
        {activeUnit && (
          <div className="w-80 flex-shrink-0 flex flex-col snap-start animate-in slide-in-from-left-4 fade-in duration-300">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-lg font-extrabold text-slate-900">Departamentos</h2>
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
                    <span className={`material-symbols-outlined text-sm transition-colors ${activeDeptId === dept.id ? 'text-blue-500' : 'text-slate-300 group-hover:text-blue-400'}`}>chevron_right</span>
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
              <h2 className="text-lg font-extrabold text-slate-900">Cargos</h2>
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
                    <span className={`material-symbols-outlined text-sm transition-colors ${activeCargoId === cargo.id ? 'text-blue-500' : 'text-slate-300 group-hover:text-blue-400'}`}>chevron_right</span>
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
              <h2 className="text-lg font-extrabold text-slate-900">Funcionários</h2>
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
                  <div key={func.id} className="bg-white border border-slate-100 rounded-2xl p-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                      <span className="material-symbols-outlined text-slate-400">person</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">{func.name}</h3>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">{func.role}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
