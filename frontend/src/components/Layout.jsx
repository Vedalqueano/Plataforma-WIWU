import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen text-slate-900 font-body selection:bg-blue-500/30 selection:text-blue-900 relative z-0 overflow-x-hidden w-full">
      {/* iOS System Background with Subtle Blur Orbs */}
      <div className="fixed inset-0 z-[-1] bg-[#F2F2F7] overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-300/30 rounded-full mix-blend-multiply filter blur-[100px]"></div>
         <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-purple-300/30 rounded-full mix-blend-multiply filter blur-[100px]"></div>
         <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] bg-emerald-300/20 rounded-full mix-blend-multiply filter blur-[100px]"></div>
      </div>

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className="flex-1 w-full md:ml-80 mr-0 md:mr-8 pt-4 md:pt-8 pb-12 min-h-screen relative z-10 overflow-x-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <Outlet />
      </main>
    </div>
  );
}
