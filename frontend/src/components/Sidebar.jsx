import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ isOpen, setIsOpen }) {
  const menuItems = [
    { icon: 'dashboard', label: 'Dashboard', path: '/' },
    { icon: 'account_tree', label: 'Processos', path: '/processos' },
    { icon: 'assignment_turned_in', label: 'Tarefas', path: '/tarefas' },
    { icon: 'location_on', label: 'Presença', path: '/presenca' },
    { icon: 'school', label: 'Treinamentos', path: '/treinamentos' },
    { icon: 'event', label: 'Eventos', path: '/eventos' },
    { icon: 'directions_walk', label: 'Visitas', path: '/visitas' },
    { icon: 'meeting_room', label: 'Sala', path: '/salas' },
    { icon: 'group', label: 'Equipe', path: '/equipe' },
    { icon: 'assessment', label: 'Relatórios', path: '/relatorios' },
    { icon: 'policy', label: 'Políticas', path: '/politicas' },
    { icon: 'monetization_on', label: 'Comercial', path: '/comercial' },
    { icon: 'flag', label: 'Metas', path: '/metas' },
    { icon: 'settings_suggest', label: 'Gestão', path: '/gestao' },
    { icon: 'person', label: 'Cliente', path: '/clientes' },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-full flex flex-col p-6 space-y-2 bg-white/60 dark:bg-black/30 backdrop-blur-2xl border border-white/80 rounded-r-[3rem] md:rounded-[3rem] md:m-4 md:h-[calc(100vh-2rem)] w-72 shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      
      <div className="flex items-center justify-between px-2 md:px-6 py-4 mb-4">
        <div className="flex items-center">
          <img alt="Logo WIWU" className="h-10 w-10 mr-3 object-contain" src="/logo_wiwu_1000.png" />
          <div>
            <h1 className="text-lg font-black text-slate-900 tracking-tighter">WIWU</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold"><br/></p>
          </div>
        </div>
        
        <button 
          onClick={() => setIsOpen(false)}
          className="md:hidden p-2 text-slate-500 hover:bg-white/50 rounded-full flex items-center"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      
      <button className="bg-slate-900 text-white rounded-full py-4 px-6 mx-2 mb-6 flex items-center justify-center gap-2 font-bold transition-transform active:scale-95 shadow-lg">
        <span className="material-symbols-outlined">add</span>
        <span>Novo Processo</span>
      </button>

      <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-2">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `py-3 px-6 rounded-full flex items-center gap-3 transition-all group ${
                isActive
                  ? 'bg-white dark:bg-slate-800 text-black dark:text-white shadow-sm font-bold'
                  : 'text-slate-500 hover:bg-white/50'
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-manrope text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="pt-4 mt-4 border-t border-slate-200/50 pb-8 md:pb-0">
        <a className="text-slate-500 hover:bg-white/50 py-3 px-6 rounded-full flex items-center gap-3 transition-all" href="#">
          <span className="material-symbols-outlined">help_outline</span>
          <span className="font-manrope text-sm font-semibold">Ajuda</span>
        </a>
        <a className="text-slate-500 hover:bg-white/50 py-3 px-6 rounded-full flex items-center gap-3 transition-all" href="#">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-manrope text-sm font-semibold">Sair</span>
        </a>
      </div>
    </aside>
  );
}
