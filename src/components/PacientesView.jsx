import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPacientes, addPaciente, updatePaciente, deletePaciente } from '../features/pacientesSlice';
import { useFetchBackend } from '../hooks/useFetchBackend';
import { useModal } from '../hooks/useModal';
import { useForm } from '../hooks/useForm';
import { useDebounce } from '../hooks/useDebounce';

export const PacientesView = () => {
  const dispatch = useDispatch();
  // Obtenemos la lista de pacientes desde el estado global de Redux
  const pacientes = useSelector((state) => state.pacientes.items);
  
  // Estado local para la búsqueda y aplicación de useDebounce
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Custom hooks
  const { request, loading } = useFetchBackend();
  const { isOpen, modalData, openModal, closeModal } = useModal();
  const [formValues, handleInputChange, reset, setFormValues] = useForm({
    nombre: '',
    especie: '',
    raza: '',
    edad: '',
    propietario: ''
  });

  // 1. Cargar los pacientes del backend al montar el componente y guardarlos en Redux
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await request('http://localhost:5000/pacientes');
        dispatch(setPacientes(data));
      } catch (err) {
        console.error("Error al cargar pacientes", err);
      }
    };
    fetchPacientes();
  }, [dispatch, request]);

  // 2. Abrir modal (si recibe paciente es para editar, si es null es para crear)
  const handleOpenModal = (paciente = null) => {
    if (paciente) {
      setFormValues(paciente);
    } else {
      reset();
    }
    openModal(paciente);
  };

  // 3. Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalData) {
        // Actualizar registro existente
        const updated = await request(`http://localhost:5000/pacientes/${modalData.id}`, 'PUT', formValues);
        dispatch(updatePaciente(updated));
      } else {
        // Crear nuevo registro
        const newPaciente = { ...formValues, id: Date.now().toString() };
        const created = await request('http://localhost:5000/pacientes', 'POST', newPaciente);
        dispatch(addPaciente(created));
      }
      closeModal();
      reset();
    } catch (err) {
      console.error("Error al guardar paciente", err);
    }
  };

  // 4. Eliminar registro
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este paciente?')) {
      try {
        await request(`http://localhost:5000/pacientes/${id}`, 'DELETE');
        dispatch(deletePaciente(id));
      } catch (err) {
        console.error("Error al eliminar paciente", err);
      }
    }
  };

  const pacientesFiltrados = pacientes.filter(p => 
    p.nombre.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    p.especie.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    p.propietario.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Cabecera de la vista */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Gestión de Pacientes</h2>
          <p className="text-gray-500">Administra el registro clínico de las mascotas.</p>
        </div>
      </div>

      {/* Barra de Búsqueda y Botón de Nuevo Paciente */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <input 
          type="text"
          placeholder="Buscar por nombre, especie o propietario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
        />
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl shadow transition flex items-center gap-2 w-full md:w-auto justify-center"
        >
          <span>+ Nuevo Paciente</span>
        </button>
      </div>

      {/* Indicador de carga */}
      {loading && <p className="text-blue-600 font-medium mb-4">Sincronizando con el servidor...</p>}

      {/* Tabla de Pacientes */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Nombre</th>
              <th className="p-4 font-semibold text-gray-600">Especie</th>
              <th className="p-4 font-semibold text-gray-600">Raza</th>
              <th className="p-4 font-semibold text-gray-600">Edad</th>
              <th className="p-4 font-semibold text-gray-600">Propietario</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pacientesFiltrados.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">No se encontraron pacientes coincidentes.</td>
              </tr>
            ) : (
              pacientesFiltrados.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-800">{p.nombre}</td>
                  <td className="p-4 text-gray-600">{p.especie}</td>
                  <td className="p-4 text-gray-600">{p.raza}</td>
                  <td className="p-4 text-gray-600">{p.edad} años</td>
                  <td className="p-4 text-gray-600">{p.propietario}</td>
                  <td className="p-4 text-right space-x-2">
                    <button 
                      onClick={() => handleOpenModal(p)}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded text-sm transition font-medium"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(p.id)}
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

      {/* Modal para Formulario */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-xl font-bold text-gray-800">
                {modalData ? 'Editar Paciente' : 'Registrar Nuevo Paciente'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Mascota</label>
                <input 
                  type="text" 
                  name="nombre" 
                  value={formValues.nombre} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Ej. Max"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Especie</label>
                <input 
                  type="text" 
                  name="especie" 
                  value={formValues.especie} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Ej. Perro / Gato"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Raza</label>
                <input 
                  type="text" 
                  name="raza" 
                  value={formValues.raza} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Ej. Golden Retriever"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Edad (años)</label>
                <input 
                  type="number" 
                  name="edad" 
                  value={formValues.edad} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Ej. 3"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Propietario</label>
                <input 
                  type="text" 
                  name="propietario" 
                  value={formValues.propietario} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Ej. Carlos Gómez"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition font-medium"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition font-medium shadow"
                >
                  {modalData ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};