import React from 'react';

export const Navbar = ({ currentView, setCurrentView }) => {
  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}>
          <span className="text-3xl">🐾</span>
          <span className="font-extrabold text-2xl text-blue-600 tracking-tight">VetCare Pro</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <button 
            onClick={() => setCurrentView('landing')} 
            className={`transition ${currentView === 'landing' ? 'text-blue-600 font-bold' : 'hover:text-blue-600'}`}
          >
            Inicio
          </button>
          <button 
            onClick={() => setCurrentView('servicios')} 
            className={`transition ${currentView === 'servicios' ? 'text-blue-600 font-bold' : 'hover:text-blue-600'}`}
          >
            Servicios
          </button>
          <button 
            onClick={() => setCurrentView('clinica')} 
            className={`transition ${currentView === 'clinica' ? 'text-blue-600 font-bold' : 'hover:text-blue-600'}`}
          >
            Clínica
          </button>
          <button 
            onClick={() => setCurrentView('resenas')} 
            className={`transition ${currentView === 'resenas' ? 'text-blue-600 font-bold' : 'hover:text-blue-600'}`}
          >
            Reseñas
          </button>
        </nav>
        <button 
          onClick={() => setCurrentView('dashboard')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-full shadow-md transition transform hover:-translate-y-0.5"
        >
          Ingresar al Sistema 🚀
        </button>
      </div>
    </header>
  );
};