import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCitas, addCita, updateCita, deleteCita } from '../features/citasSlice';
import { useFetchBackend } from '../hooks/useFetchBackend';
import { useModal } from '../hooks/useModal';
import { useForm } from '../hooks/useForm';

export const CitasView = () => {
  const dispatch = useDispatch();
  const citas = useSelector((state) => state.citas.items);
  const pacientes = useSelector((state) => state.pacientes.items); // Necesario para asociar la cita a un paciente

  const { request, loading } = useFetchBackend();
  const { isOpen, modalData, openModal, closeModal } = useModal();
  const [formValues, handleInputChange, reset, setFormValues] = useForm({
    pacienteId: '',
    fecha: '',
    motivo: '',
    estado: 'Pendiente'
  });

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const data = await request('http://localhost:5000/citas');
        dispatch(setCitas(data));
      } catch (err) {
        console.error("Error al cargar citas", err);
      }
    };
    fetchCitas();
  }, [dispatch, request]);

  const handleOpenModal = (cita = null) => {
    if (cita) {
      setFormValues(cita);
    } else {
      reset();
    }
    openModal(cita);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalData) {
        const updated = await request(`http://localhost:5000/citas/${modalData.id}`, 'PUT', formValues);
        dispatch(updateCita(updated));
      } else {
        const newCita = { ...formValues, id: Date.now().toString() };
        const created = await request('http://localhost:5000/citas', 'POST', newCita);
        dispatch(addCita(created));
      }
      closeModal();
      reset();
    } catch (err) {
      console.error("Error al guardar cita", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta cita?')) {
      try {
        await request(`http://localhost:5000/citas/${id}`, 'DELETE');
        dispatch(deleteCita(id));
      } catch (err) {
        console.error("Error al eliminar cita", err);
      }
    }
  };

  // Función auxiliar para buscar el nombre del paciente por ID
  const getNombrePaciente = (id) => {
    const paciente = pacientes.find(p => p.id === id);
    return paciente ? paciente.nombre : 'Paciente desconocido';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Gestión de Citas Médicas</h2>
          <p className="text-gray-500">Programa y controla las consultas veterinarias.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition flex items-center gap-2"
        >
          <span>+ Nueva Cita</span>
        </button>
      </div>

      {loading && <p className="text-blue-600 font-medium mb-4">Sincronizando con el servidor...</p>}

      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Paciente</th>
              <th className="p-4 font-semibold text-gray-600">Fecha</th>
              <th className="p-4 font-semibold text-gray-600">Motivo</th>
              <th className="p-4 font-semibold text-gray-600">Estado</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {citas.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">No hay citas programadas.</td>
              </tr>
            ) : (
              citas.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-800">{getNombrePaciente(c.pacienteId)}</td>
                  <td className="p-4 text-gray-600">{c.fecha}</td>
                  <td className="p-4 text-gray-600">{c.motivo}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      c.estado === 'Pendiente' ? 'bg-amber-100 text-amber-700' :
                      c.estado === 'Completada' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {c.estado}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button 
                      onClick={() => handleOpenModal(c)}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded text-sm transition font-medium"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(c.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition font-medium"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-xl font-bold text-gray-800">{modalData ? 'Editar Cita' : 'Programar Cita'}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paciente</label>
                <select 
                  name="pacienteId" 
                  value={formValues.pacienteId} 
                  onChange={handleInputChange} 
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Seleccione un paciente</option>
                  {pacientes.map(p => (
                    <option key={p.id} value={p.id}>{p.nombre} ({p.propietario})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input 
                  type="date" 
                  name="fecha" 
                  value={formValues.fecha} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Motivo de la Consulta</label>
                <input 
                  type="text" 
                  name="motivo" 
                  value={formValues.motivo} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Ej. Vacunación anual"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select 
                  name="estado" 
                  value={formValues.estado} 
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Completada">Completada</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button type="button" onClick={closeModal} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium">Cancelar</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow">{modalData ? 'Actualizar' : 'Guardar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};