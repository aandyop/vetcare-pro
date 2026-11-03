import React from 'react';
import { useSelector } from 'react-redux';

export const Dashboard = ({ setCurrentView }) => {
  // Extraemos las entidades desde Redux
  const pacientes = useSelector((state) => state.pacientes.items);
  const citas = useSelector((state) => state.citas.items);
  const inventario = useSelector((state) => state.inventario.items);

  const citasPendientes = citas.filter(c => c.estado === 'Pendiente').length;
  const stockBajo = inventario.filter(i => Number(i.stock) < 10).length;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Dashboard General</h1>
          <p className="text-slate-500 font-medium">Bienvenido de nuevo al panel de control de VetCare Pro.</p>
        </div>
        <div className="bg-purple-100 text-purple-800 font-bold px-4 py-2 rounded-2xl text-sm shadow-xs">
          📅 {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Grid Superior */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Pacientes</p>
            <h3 className="text-3xl font-black text-slate-800 mt-1">{pacientes.length}</h3>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl">🐶</div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Citas Pendientes</p>
            <h3 className="text-3xl font-black text-slate-800 mt-1">{citasPendientes}</h3>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-xl">⏰</div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Inventario Total</p>
            <h3 className="text-3xl font-black text-slate-800 mt-1">{inventario.length}</h3>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-xl">📦</div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Alertas Stock</p>
            <h3 className="text-3xl font-black text-slate-800 mt-1">{stockBajo}</h3>
          </div>
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-xl">⚠️</div>
        </div>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Accesos Rápidos */}
        <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-xs border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Módulos de Gestión</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => setCurrentView('pacientes')}
              className="p-5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-2xl font-semibold transition text-left flex justify-between items-center border border-slate-100 group"
            >
              <div>
                <p className="font-bold text-lg">Pacientes</p>
                <p className="text-xs text-slate-400 mt-0.5">Gestión de mascotas y dueños</p>
              </div>
              <span className="text-xl group-hover:translate-x-1 transition">→</span>
            </button>

            <button 
              onClick={() => setCurrentView('citas')}
              className="p-5 bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-700 rounded-2xl font-semibold transition text-left flex justify-between items-center border border-slate-100 group"
            >
              <div>
                <p className="font-bold text-lg">Citas Médicas</p>
                <p className="text-xs text-slate-400 mt-0.5">Calendario y agenda de consultas</p>
              </div>
              <span className="text-xl group-hover:translate-x-1 transition">→</span>
            </button>

            <button 
              onClick={() => setCurrentView('inventario')}
              className="p-5 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 rounded-2xl font-semibold transition text-left flex justify-between items-center border border-slate-100 group"
            >
              <div>
                <p className="font-bold text-lg">Inventario</p>
                <p className="text-xs text-slate-400 mt-0.5">Control de stock y farmacia</p>
              </div>
              <span className="text-xl group-hover:translate-x-1 transition">→</span>
            </button>

            <button 
              onClick={() => setCurrentView('reportes')}
              className="p-5 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-2xl font-semibold transition text-left flex justify-between items-center border border-slate-100 group"
            >
              <div>
                <p className="font-bold text-lg">Reportes</p>
                <p className="text-xs text-slate-400 mt-0.5">Estadísticas y balance financiero</p>
              </div>
              <span className="text-xl group-hover:translate-x-1 transition">→</span>
            </button>
          </div>
        </div>

        {/* Widget lateral */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-8 rounded-3xl shadow-lg flex flex-col justify-between">
          <div>
            <span className="bg-purple-500/40 text-purple-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Consejo Veterinario
            </span>
            <h3 className="text-2xl font-black mt-4 mb-2">Salud y Bienestar</h3>
            <p className="text-purple-100 text-sm leading-relaxed">
              Mantén siempre agua fresca disponible y programa revisiones dentales semestrales para prevenir enfermedades periodontales en tus mascotas.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-purple-500/30 flex items-center justify-between">
            <span className="text-xs text-purple-200">VetCare Pro System</span>
          </div>
        </div>

      </div>
    </div>
  );
};