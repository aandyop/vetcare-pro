import React from 'react';
import { Logo } from './Logo';

export const Sidebar = ({ currentView, setCurrentView }) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-100 h-screen sticky top-0 flex flex-col justify-between p-6 shadow-xs hidden md:flex">
      <div>
        {/* Logotipo */}
        <div className="mb-10 pl-2">
          <Logo />
        </div>

        {/* Enlaces de Navegación */}
        <nav className="space-y-2">
          <button 
            onClick={() => setCurrentView('dashboard')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition ${
              currentView === 'dashboard' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span>📊</span>
            <span>Dashboard</span>
          </button>

          <button 
            onClick={() => setCurrentView('pacientes')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition ${
              currentView === 'pacientes' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span>🐶</span>
            <span>Pacientes</span>
          </button>

          <button 
            onClick={() => setCurrentView('citas')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition ${
              currentView === 'citas' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span>📅</span>
            <span>Citas Médicas</span>
          </button>

          <button 
            onClick={() => setCurrentView('inventario')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition ${
              currentView === 'inventario' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span>📦</span>
            <span>Inventario</span>
          </button>

          <button 
            onClick={() => setCurrentView('reportes')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition ${
              currentView === 'reportes' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span>📈</span>
            <span>Reportes</span>
          </button>
        </nav>
      </div>

      {/* Botón de Salir / Volver a Landing */}
      <div className="pt-6 border-t border-slate-100">
        <button 
          onClick={() => setCurrentView('landing')} 
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-red-600 hover:bg-red-50 transition"
        >
          <span>🚪</span>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};