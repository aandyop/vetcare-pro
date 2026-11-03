import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInventario, addProducto, updateProducto, deleteProducto } from '../features/inventarioSlice';
import { useFetchBackend } from '../hooks/useFetchBackend';
import { useModal } from '../hooks/useModal';
import { useForm } from '../hooks/useForm';

export const InventarioView = () => {
  const dispatch = useDispatch();
  const inventario = useSelector((state) => state.inventario.items);

  const { request, loading } = useFetchBackend();
  const { isOpen, modalData, openModal, closeModal } = useModal();
  const [formValues, handleInputChange, reset, setFormValues] = useForm({
    nombreProducto: '',
    categoria: '',
    stock: '',
    precio: ''
  });

  useEffect(() => {
    const fetchInventario = async () => {
      try {
        const data = await request('http://localhost:5000/inventario');
        dispatch(setInventario(data));
      } catch (err) {
        console.error("Error al cargar inventario", err);
      }
    };
    fetchInventario();
  }, [dispatch, request]);

  const handleOpenModal = (producto = null) => {
    if (producto) {
      setFormValues(producto);
    } else {
      reset();
    }
    openModal(producto);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalData) {
        const updated = await request(`http://localhost:5000/inventario/${modalData.id}`, 'PUT', formValues);
        dispatch(updateProducto(updated));
      } else {
        const nuevoProducto = { ...formValues, id: Date.now().toString() };
        const created = await request('http://localhost:5000/inventario', 'POST', nuevoProducto);
        dispatch(addProducto(created));
      }
      closeModal();
      reset();
    } catch (err) {
      console.error("Error al guardar producto", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await request(`http://localhost:5000/inventario/${id}`, 'DELETE');
        dispatch(deleteProducto(id));
      } catch (err) {
        console.error("Error al eliminar producto", err);
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Gestión de Inventario</h2>
          <p className="text-gray-500">Control de stock, medicamentos e insumos médicos.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition flex items-center gap-2"
        >
          <span>+ Nuevo Producto</span>
        </button>
      </div>

      {loading && <p className="text-blue-600 font-medium mb-4">Sincronizando con el servidor...</p>}

      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Producto</th>
              <th className="p-4 font-semibold text-gray-600">Categoría</th>
              <th className="p-4 font-semibold text-gray-600">Stock</th>
              <th className="p-4 font-semibold text-gray-600">Precio Unitario</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {inventario.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">No hay productos en el inventario.</td>
              </tr>
            ) : (
              inventario.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-800">{item.nombreProducto}</td>
                  <td className="p-4 text-gray-600">{item.categoria}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded font-medium text-sm ${Number(item.stock) < 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {item.stock} unidades
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">${Number(item.precio).toFixed(2)}</td>
                  <td className="p-4 text-right space-x-2">
                    <button 
                      onClick={() => handleOpenModal(item)}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded text-sm transition font-medium"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
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
              <h3 className="text-xl font-bold text-gray-800">{modalData ? 'Editar Producto' : 'Registrar Producto'}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
                <input 
                  type="text" 
                  name="nombreProducto" 
                  value={formValues.nombreProducto} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Ej. Vacuna Antirrábica"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <input 
                  type="text" 
                  name="categoria" 
                  value={formValues.categoria} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Ej. Farmacia / Biológicos"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input 
                  type="number" 
                  name="stock" 
                  value={formValues.stock} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Ej. 20"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio Unitario ($)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  name="precio" 
                  value={formValues.precio} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Ej. 15.50"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                />
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