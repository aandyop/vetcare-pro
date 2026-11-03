import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { ServiciosPage } from './components/ServiciosPage';
import { ClinicaPage } from './components/ClinicaPage';
import { ResenasPage } from './components/ResenasPage';
import { Dashboard } from './components/Dashboard';
import { PacientesView } from './components/PacientesView';
import { CitasView } from './components/CitasView';
import { InventarioView } from './components/InventarioView';
import { ReportesView } from './components/ReportesView';

function App() {
  const [currentView, setCurrentView] = useState('landing');

  // Vistas Públicas (Landing, Servicios, Clínica, Reseñas) usan el Navbar superior
  const publicViews = ['landing', 'servicios', 'clinica', 'resenas'];
  const isPublicView = publicViews.includes(currentView);

  if (isPublicView) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
        <Navbar currentView={currentView} setCurrentView={setCurrentView} />
        <main>
          {currentView === 'landing' && <LandingPage setCurrentView={setCurrentView} />}
          {currentView === 'servicios' && <ServiciosPage setCurrentView={setCurrentView} />}
          {currentView === 'clinica' && <ClinicaPage setCurrentView={setCurrentView} />}
          {currentView === 'resenas' && <ResenasPage />}
        </main>
      </div>
    );
  }

  // Vistas Internas del Sistema (Dashboard, Pacientes, Citas, etc.) usan el Sidebar izquierdo
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 overflow-y-auto max-h-screen">
        {currentView === 'dashboard' && <Dashboard setCurrentView={setCurrentView} />}
        {currentView === 'pacientes' && <PacientesView />}
        {currentView === 'citas' && <CitasView />}
        {currentView === 'inventario' && <InventarioView />}
        {currentView === 'reportes' && <ReportesView />}
      </main>
    </div>
  );
}

export default App;