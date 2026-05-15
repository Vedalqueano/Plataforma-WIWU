import React, { useState, useEffect } from 'react';

const PRIORITY_COLORS = {
  baixa: 'bg-green-100 text-green-700 border-green-200',
  media: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  alta: 'bg-red-100 text-red-700 border-red-200',
};

const STATUS_COLUMNS = [
  { id: 'todo', title: 'A Fazer', color: 'bg-slate-100/50', headerColor: 'border-slate-300' },
  { id: 'inProgress', title: 'Em Andamento', color: 'bg-blue-50/50', headerColor: 'border-blue-300' },
  { id: 'done', title: 'Concluído', color: 'bg-emerald-50/50', headerColor: 'border-emerald-300' },
];

export default function Tarefas() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Revisar Contratos Q3', description: 'Verificar cláusulas do novo fornecedor de TI.', status: 'todo', priority: 'alta', date: '2026-05-20', assignee: 'Maria' },
    { id: '2', title: 'Atualizar Layout do App', description: 'Implementar a estética Liquid Glass na tela de Login.', status: 'inProgress', priority: 'media', date: '2026-05-18', assignee: 'Julio' },
    { id: '3', title: 'Entrevista Dev Senior', description: 'Sala de reunião 3 às 14h com candidato.', status: 'done', priority: 'alta', date: '2026-05-14', assignee: 'Pedro' },
    { id: '4', title: 'Relatório Mensal', description: 'Consolidar as vendas do mês de Abril.', status: 'todo', priority: 'baixa', date: '2026-05-25', assignee: 'Ana' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);
  
  // Modal Form State
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'media', date: '', assignee: '' });

  // KPIs
  const todoCount = tasks.filter(t => t.status === 'todo').length;
  const inProgressCount = tasks.filter(t => t.status === 'inProgress').length;
  const doneCount = tasks.filter(t => t.status === 'done').length;

  // --- Drag and Drop Logic ---
  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
    // Removemos a imagem padrão de drag para um visual mais limpo (opcional)
    e.currentTarget.style.opacity = '0.4';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedTask(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessário para permitir o drop
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== status) {
      setTasks(tasks.map(t => t.id === draggedTask.id ? { ...t, status } : t));
    }
    setDraggedTask(null);
  };

  // --- Modal Logic ---
  const handleCreateTask = (e) => {
    e.preventDefault();
    const taskToAdd = {
      ...newTask,
      id: Date.now().toString(),
      status: 'todo',
    };
    setTasks([...tasks, taskToAdd]);
    setIsModalOpen(false);
    setNewTask({ title: '', description: '', priority: 'media', date: '', assignee: '' });
  };

  return (
    <div className="px-4 md:px-6 pb-20 md:pb-12 font-sans animate-[fadeIn_0.5s_ease-out] w-full h-full flex flex-col">
      
      {/* HEADER & KPIs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Tarefas</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Gestão de atividades e produtividade da equipe.</p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-3 rounded-xl font-bold shadow-[0_8px_20px_rgba(79,70,229,0.3)] transition-all hover:-translate-y-1 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-xl">add</span>
          Nova Tarefa
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-4">
          <div className="h-12 w-12 bg-slate-100 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-600">inbox</span>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">A Fazer</p>
            <h3 className="text-2xl font-extrabold text-slate-900">{todoCount}</h3>
          </div>
        </div>
        <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-4">
          <div className="h-12 w-12 bg-blue-100 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-blue-600">clock_loader_40</span>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">Em Andamento</p>
            <h3 className="text-2xl font-extrabold text-slate-900">{inProgressCount}</h3>
          </div>
        </div>
        <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-4">
          <div className="h-12 w-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-emerald-600">check_circle</span>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Concluídas</p>
            <h3 className="text-2xl font-extrabold text-slate-900">{doneCount}</h3>
          </div>
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-[500px]">
        {STATUS_COLUMNS.map(column => (
          <div 
            key={column.id}
            className={`flex-1 rounded-[2rem] p-4 flex flex-col border border-white/50 shadow-inner ${column.color}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className={`border-b-2 ${column.headerColor} pb-3 mb-4 flex items-center justify-between px-2`}>
              <h2 className="font-bold text-slate-800">{column.title}</h2>
              <span className="bg-white text-slate-600 text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                {tasks.filter(t => t.status === column.id).length}
              </span>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2 pb-10 custom-scrollbar">
              {tasks.filter(t => t.status === column.id).map(task => (
                <div 
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                  onDragEnd={handleDragEnd}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-[#4f46e5]/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${PRIORITY_COLORS[task.priority]}`}>
                      {task.priority}
                    </span>
                    <button className="text-slate-400 hover:text-slate-600">
                      <span className="material-symbols-outlined text-sm">more_horiz</span>
                    </button>
                  </div>
                  
                  <h3 className="font-bold text-slate-800 mb-1">{task.title}</h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">{task.description}</p>
                  
                  <div className="flex justify-between items-center mt-auto border-t border-slate-50 pt-3">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                        {task.assignee.charAt(0)}
                      </div>
                      <span className="text-xs font-semibold text-slate-600">{task.assignee}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      <span className="text-[10px] font-semibold">{task.date || 'Sem data'}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Drop Zone Placeholder for empty columns */}
              {tasks.filter(t => t.status === column.id).length === 0 && (
                <div className="h-24 rounded-2xl border-2 border-dashed border-slate-300/50 flex items-center justify-center text-slate-400 text-sm font-medium">
                  Solte a tarefa aqui
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* NEW TASK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Overlay com blur Liquid Glass */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="relative bg-white rounded-[2rem] w-full max-w-lg shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden animate-[slideUp_0.3s_ease-out]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900">Nova Tarefa</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            
            <form onSubmit={handleCreateTask} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Título da Tarefa *</label>
                <input 
                  type="text" 
                  required
                  value={newTask.title}
                  onChange={e => setNewTask({...newTask, title: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-[#4f46e5] focus:border-[#4f46e5] block px-4 py-3 outline-none transition-colors"
                  placeholder="Ex: Atualizar dashboard"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Descrição</label>
                <textarea 
                  rows="3"
                  value={newTask.description}
                  onChange={e => setNewTask({...newTask, description: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-[#4f46e5] focus:border-[#4f46e5] block px-4 py-3 outline-none transition-colors resize-none"
                  placeholder="Detalhes adicionais sobre a tarefa..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Prioridade</label>
                  <select 
                    value={newTask.priority}
                    onChange={e => setNewTask({...newTask, priority: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-[#4f46e5] focus:border-[#4f46e5] block px-4 py-3 outline-none transition-colors appearance-none"
                  >
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Data Limite</label>
                  <input 
                    type="date" 
                    value={newTask.date}
                    onChange={e => setNewTask({...newTask, date: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-[#4f46e5] focus:border-[#4f46e5] block px-4 py-3 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Responsável</label>
                <input 
                  type="text" 
                  required
                  value={newTask.assignee}
                  onChange={e => setNewTask({...newTask, assignee: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-[#4f46e5] focus:border-[#4f46e5] block px-4 py-3 outline-none transition-colors"
                  placeholder="Nome do responsável"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-xl font-bold shadow-md transition-all"
                >
                  Criar Tarefa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Adicionando um estilo global para a barra de rolagem da área Kanban */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(203, 213, 225, 0.5);
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: rgba(148, 163, 184, 0.8);
        }
      `}} />
    </div>
  );
}
