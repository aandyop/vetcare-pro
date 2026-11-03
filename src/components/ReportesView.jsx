import React from 'react';
import { useSelector } from 'react-redux';

export const ReportesView = () => {
  const citas = useSelector((state) => state.citas.items);
  const inventario = useSelector((state) => state.inventario.items);

  const valorTotalInventario = inventario.reduce((acc, item) => acc + (Number(item.stock) * Number(item.precio)), 0);
  
  const citasCompletadas = citas.filter(c => c.estado === 'Completada').length;
  const citasPendientes = citas.filter(c => c.estado === 'Pendiente').length;
  const citasCanceladas = citas.filter(c => c.estado === 'Cancelada').length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Reportes y Estadísticas</h2>
        <p className="text-gray-500">Análisis general del rendimiento y estado del negocio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reporte Financiero de Inventario */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Valoración del Inventario</h3>
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-600 font-medium">Capital invertido en stock y medicamentos</p>
            <p className="text-4xl font-extrabold text-blue-800 mt-2">${valorTotalInventario.toFixed(2)}</p>
          </div>
        </div>

        {/* Reporte Operativo de Citas */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Estado de las Citas Médicas</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-100">
              <span className="font-medium text-amber-800">Pendientes</span>
              <span className="font-bold text-amber-900 bg-amber-200 px-3 py-1 rounded-full">{citasPendientes}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
              <span className="font-medium text-green-800">Completadas</span>
              <span className="font-bold text-green-900 bg-green-200 px-3 py-1 rounded-full">{citasCompletadas}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-100">
              <span className="font-medium text-red-800">Canceladas</span>
              <span className="font-bold text-red-900 bg-red-200 px-3 py-1 rounded-full">{citasCanceladas}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};