import React from 'react';

export const ServiciosPage = ({ setCurrentView }) => {
  const serviciosDetallados = [
    {
      titulo: 'Consulta Médica General',
      desc: 'Evaluaciones físicas completas, diagnóstico oportuno y seguimiento personalizado para tu mascota.',
      icon: '🩺',
      img: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600&q=80',
      tag: 'Esencial'
    },
    {
      titulo: 'Medicina Preventiva & Vacunas',
      desc: 'Esquemas completos de inmunización, desparasitación interna y externa adaptados a la edad.',
      icon: '💉',
      img: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=600&q=80',
      tag: 'Salud'
    },
    {
      titulo: 'Odontología Veterinaria',
      desc: 'Limpiezas ultrasónicas sin dolor, tratamiento de encías y profilaxis profunda.',
      icon: '🦷',
      img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
      tag: 'Cuidado'
    },
    {
      titulo: 'Cirugía y Quirófano',
      desc: 'Procedimientos quirúrgicos con anestesia inhalatoria y monitoreo de signos vitales en tiempo real.',
      icon: '✂️',
      img: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600&q=80',
      tag: 'Especializado'
    },
    {
      titulo: 'Estética & Grooming Spa',
      desc: 'Baños medicinales, corte de pelo especializado, corte de uñas y limpieza de oídos sin estrés.',
      icon: '🚿',
      img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80',
      tag: 'Bienestar'
    },
    {
      titulo: 'Atención a Animales Exóticos',
      desc: 'Cuidado veterinario para aves, roedores, conejos y reptiles por especialistas capacitados.',
      icon: '🐰',
      img: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80',
      tag: 'Especial'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-16 px-6 text-center">
        <span className="bg-white/20 text-emerald-100 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
          Nuestros Servicios Médicos
        </span>
        <h1 className="text-4xl md:text-5xl font-black mt-4 mb-4">Cuidado Integral para Cada Mascota</h1>
        <p className="max-w-2xl mx-auto text-emerald-100 text-lg">
          Ofrecemos un catálogo completo de atención médica, preventiva y estética con tecnología de vanguardia.
        </p>
      </section>

      {/* Grid de Servicios */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviciosDetallados.map((s, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-xs border border-slate-100 hover:shadow-lg transition group">
              <div className="relative h-48 overflow-hidden">
                <img src={s.img} alt={s.titulo} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs text-slate-800 font-bold text-xs px-3 py-1 rounded-full shadow-xs">
                  {s.tag}
                </span>
              </div>
              <div className="p-6">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{s.titulo}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{s.desc}</p>
                <button 
                  onClick={() => setCurrentView('citas')}
                  className="w-full py-2.5 bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 font-semibold rounded-xl transition text-sm flex justify-center items-center gap-2"
                >
                  Agendar este Servicio →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};