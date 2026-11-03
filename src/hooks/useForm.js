import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  // Maneja cambios en inputs de texto, selects, etc.
  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Restaura el formulario a su estado inicial
  const reset = () => {
    setValues(initialState);
  };

  // Permite establecer valores nuevos (ideal para rellenar el formulario al editar un registro)
  const setFormValues = (newValues) => {
    setValues(newValues);
  };

  return [values, handleInputChange, reset, setFormValues];
};