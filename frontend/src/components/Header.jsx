import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header({ toggleSidebar }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <header className="flex justify-between items-center px-4 md:px-8 py-4 w-full bg-white/60 backdrop-blur-2xl border border-white/80 sticky top-0 z-40 md:rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8 md:mb-12">
      <div className="flex items-center gap-2 md:gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 text-slate-600 hover:bg-white/60 transition-all rounded-full flex items-center justify-center"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        
        <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-2 rounded-full px-4 flex items-center gap-2 shadow-sm flex-1 md:flex-none">
          <span className="material-symbols-outlined text-slate-500 text-sm hidden md:block">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-sm font-manrope w-full md:w-64 outline-none text-slate-800 placeholder-slate-400" placeholder="Buscar..." type="text" />
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4 ml-4">
        <button className="p-2 text-slate-500 hover:bg-white/60 transition-all rounded-full relative hidden sm:flex">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-white/60 transition-all rounded-full hidden sm:flex">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <button 
          onClick={handleLogout}
          className="p-2 text-red-500 hover:bg-red-50 transition-all rounded-full hidden sm:flex"
          title="Sair"
        >
          <span className="material-symbols-outlined">logout</span>
        </button>
        <div className="h-12 w-12 min-w-[48px] rounded-full overflow-hidden border-2 border-white shadow-sm ring-2 ring-white/50">
          {/* Avatar Profile */}
          <img 
            alt="User Profile" 
            className="h-full w-full object-cover object-center" 
            style={{ imageRendering: 'high-quality', transform: 'translateZ(0)' }} 
            src="/profile.png" 
          />
        </div>
      </div>
    </header>
  );
}
