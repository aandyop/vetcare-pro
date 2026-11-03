import React from 'react';

export const ResenasPage = () => {
  const opiniones = [
    {
      nombre: 'Elena Rostova',
      mascota: 'Dueña de Toby (Golden Retriever)',
      comentario: 'VetCare Pro ha sido una bendición para nuestra familia. El trato con Toby siempre es amable, profesional y lleno de paciencia.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
    },
    {
      nombre: 'Carlos Mendoza',
      mascota: 'Dueño de Michi (Siamés)',
      comentario: 'Excelente servicio quirúrgico. Mi gato fue operado aquí y la recuperación fue súper rápida. Las instalaciones son impecables.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    {
      nombre: 'Mariana Silva',
      mascota: 'Dueña de Luna (Pug)',
      comentario: 'El servicio de grooming y la atención dental son los mejores de la ciudad. Siempre regresamos tranquilos.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
          Lo que dicen nuestros clientes
        </span>
        <h1 className="text-4xl font-black text-slate-900 mt-4 mb-4">Experiencias y Opiniones Reales</h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          La confianza de miles de familias respalda la calidad de nuestro trabajo diario.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {opiniones.map((o, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl shadow-xs border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 mb-4">
                {'★'.repeat(o.rating)}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed italic mb-6">
                "{o.comentario}"
              </p>
            </div>
            <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
              <img src={o.avatar} alt={o.nombre} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{o.nombre}</h4>
                <p className="text-xs text-slate-400">{o.mascota}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};