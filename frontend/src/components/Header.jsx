import React from 'react';

export default function Header({ toggleSidebar }) {
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
        <div className="h-10 w-10 min-w-[40px] rounded-full overflow-hidden border-2 border-white shadow-sm">
          {/* Avatar Placeholder */}
          <img alt="WIWU User Profile" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxeNOHWvOO8tNhht3y7rUFPVLZmj0oRvKhNGNi7I9qkaxK2lvxAPcFjEteCDrNtPZnWxDff-40TqUavt0tF6FogxJ5vLQbDh1cup1S5pKdr0jpwtc0otfdsZE-DvXsjcnE9Xufo7uF6_hBv3dGqGxcwRiMeTrVQ-23U5oqS66sG6_bclSzo8cyC-rK1Jvp7gxjJym2Ry6ZY9zYOmwFlpDbyKo5zgvgkACjhV2rpIriO7hfoyeKnH7Cz1BMbtVMHbIOVtnXWUIT-EU" />
        </div>
      </div>
    </header>
  );
}
