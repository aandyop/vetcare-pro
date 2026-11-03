import React from 'react';

export const LandingPage = ({ setCurrentView }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">


      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            Atención Veterinaria Profesional
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-6 mb-6 leading-tight">
            Cuidado y bienestar <br />
            <span className="text-blue-600">al que puedes confiar</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Brindamos atención veterinaria moderna y especializada para asegurar la salud, felicidad y longevidad de tus queridas mascotas.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5"
            >
              Ingresar al Sistema →
            </button>
            <button 
              onClick={() => setCurrentView('servicios')}
              className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold px-8 py-4 rounded-2xl shadow-sm transition"
            >
              Nuestros Servicios
            </button>
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-blue-100 rounded-full filter blur-3xl opacity-50 -z-10"></div>
          <div className="bg-white p-4 rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full">
            <img 
              src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80" 
              alt="Mascotas felices" 
              className="rounded-2xl object-cover h-80 w-full mb-4"
            />
            <div className="flex items-center justify-between px-2">
              <div>
                <h3 className="font-bold text-slate-800">Más de 12,000 mascotas</h3>
                <p className="text-xs text-slate-500">Felices y atendidas por nuestros especialistas</p>
              </div>
              <span className="bg-amber-100 text-amber-700 font-bold text-sm px-3 py-1 rounded-full cursor-pointer" onClick={() => setCurrentView('resenas')}>
                ⭐ 4.9 / 5.0
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-white border-y border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4 cursor-pointer hover:bg-slate-50 rounded-2xl transition" onClick={() => setCurrentView('clinica')}>
            <p className="text-4xl font-extrabold text-blue-600">24/7</p>
            <p className="text-sm text-slate-500 font-medium mt-1">Atención y Urgencias</p>
          </div>
          <div className="p-4 cursor-pointer hover:bg-slate-50 rounded-2xl transition" onClick={() => setCurrentView('clinica')}>
            <p className="text-4xl font-extrabold text-blue-600">15+</p>
            <p className="text-sm text-slate-500 font-medium mt-1">Años de Experiencia</p>
          </div>
          <div className="p-4 cursor-pointer hover:bg-slate-50 rounded-2xl transition" onClick={() => setCurrentView('resenas')}>
            <p className="text-4xl font-extrabold text-blue-600">12k+</p>
            <p className="text-sm text-slate-500 font-medium mt-1">Clientes Satisfechos</p>
          </div>
          <div className="p-4 cursor-pointer hover:bg-slate-50 rounded-2xl transition" onClick={() => setCurrentView('resenas')}>
            <p className="text-4xl font-extrabold text-blue-600">98%</p>
            <p className="text-sm text-slate-500 font-medium mt-1">Reseñas Positivas</p>
          </div>
        </div>
      </section>

      {/* Servicios Principales */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Nuestros Servicios</h2>
          <p className="text-slate-600">Amplio espectro de soluciones médicas diseñadas para la salud integral de tu mascota.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div onClick={() => setCurrentView('servicios')} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition cursor-pointer">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6">🩺</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Diagnóstico</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Exámenes de laboratorio precisos y tecnología avanzada para detección temprana.</p>
          </div>
          <div onClick={() => setCurrentView('servicios')} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition cursor-pointer">
            <div className="w-14 h-14 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center text-2xl mb-6">🦷</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Odontología</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Limpieza dental profesional y tratamientos especializados sin estrés.</p>
          </div>
          <div onClick={() => setCurrentView('servicios')} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition cursor-pointer">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-2xl mb-6">✂️</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Cirugía</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Procedimientos seguros con protocolos de anestesia moderna y monitoreo continuo.</p>
          </div>
          <div onClick={() => setCurrentView('servicios')} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition cursor-pointer">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mb-6">🛡️</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Prevención</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Planes de vacunación, desparasitación y asesoría nutricional personalizada.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="bg-blue-600 text-white rounded-3xl p-10 md:p-16 flex flex-col md:flex-row justify-between items-center shadow-xl">
          <div className="max-w-xl mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Estamos listos cuando ellos necesitan ayuda</h2>
            <p className="text-blue-100 text-base leading-relaxed">Desde chequeos rutinarios hasta casos complejos. Nos ocupamos de cada patita con amor y profesionalismo.</p>
          </div>
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-2xl shadow-lg transition"
          >
            Acceder al Sistema Ahora
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 text-center text-slate-400 text-sm">
        &copy; 2026 VetCare Pro. Todos los derechos reservados.
      </footer>
    </div>
  );
};