import React from 'react';

export const ClinicaPage = ({ setCurrentView }) => {
  const galeria = [
    { title: 'Quirófano Equipado', img: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600&q=80' },
    { title: 'Área de Grooming & Spa', img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80' },
    { title: 'Hospitalización y Cuidados', img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80' },
    { title: 'Laboratorio de Diagnóstico', img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Banner */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Nuestra Historia y Filosofía
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 mb-6">
            Profesionalismo y un <span className="text-blue-600">corazón cálido</span>
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            En VetCare Pro combinamos tecnología de vanguardia y amor genuino por los animales. Diseñamos nuestras instalaciones para que cada visita sea cómoda, libre de estrés y completamente segura para tus mascotas.
          </p>
          <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-6">
            <div>
              <h4 className="font-bold text-slate-900 text-xl">Instalaciones 24/7</h4>
              <p className="text-slate-500 text-sm">Monitoreo y atención de urgencias continuo.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xl">Personal Certificado</h4>
              <p className="text-slate-500 text-sm">Médicos especialistas con más de 15 años de experiencia.</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80" 
            alt="Nuestra Clínica" 
            className="rounded-3xl shadow-xl object-cover h-96 w-full"
          />
        </div>
      </section>

      {/* Galería */}
      <section className="bg-white border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-slate-900">Conoce Nuestras Instalaciones</h2>
            <p className="text-slate-500 mt-2">Espacios higiénicos, amplios y diseñados especialmente para la tranquilidad de tus compañeros.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {galeria.map((g, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden shadow-xs border border-slate-100 group">
                <img src={g.img} alt={g.title} className="h-48 w-full object-cover group-hover:scale-105 transition duration-300" />
                <div className="p-4 bg-white text-center">
                  <h4 className="font-bold text-slate-800 text-sm">{g.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};