import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular um pequeno delay de rede para efeito visual
    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        navigate('/'); // Redireciona para o Dashboard após o login
      } else {
        setError('Usuário ou senha incorretos.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Effects (Liquid Glass Aesthetic - Light Theme) */}
      <div className="fixed inset-0 z-[0] overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-300/30 rounded-full mix-blend-multiply filter blur-[100px]"></div>
         <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-purple-300/30 rounded-full mix-blend-multiply filter blur-[100px]"></div>
         <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] bg-emerald-300/20 rounded-full mix-blend-multiply filter blur-[100px]"></div>
      </div>
      
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          
          <div className="text-center mb-8 flex flex-col items-center">
            <img alt="Logo WIWU" className="h-20 w-20 mb-4 object-contain drop-shadow-md" src="/logo_wiwu_1000.png" />
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-tight mb-2">Plataforma WiWU Conect</h1>
            <p className="text-slate-500 font-medium">Acesso Restrito ao Administrador</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="username">
                Usuário do Administrador
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
                  placeholder="admin"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="password">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center font-medium shadow-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full relative overflow-hidden group bg-slate-900 text-white font-bold py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 active:scale-[0.98] ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              <span className={`relative z-10 flex items-center justify-center ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                Entrar na Plataforma
              </span>
              
              {/* Loading Spinner */}
              {isLoading && (
                <span className="absolute inset-0 flex items-center justify-center z-20">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              )}

              {/* Hover effect highlight */}
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
            </button>
          </form>
          
        </div>
        
        {/* Helper Note */}
        <p className="text-center text-slate-500 text-xs mt-6 font-medium">
          Dica de acesso seguro: use <span className="font-bold text-slate-700">admin / admin</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
