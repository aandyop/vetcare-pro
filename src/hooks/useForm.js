import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const reset = () => {
    setValues(initialState);
  };

  const setFormValues = (newValues) => {
    setValues(newValues);
  };

  return [values, handleInputChange, reset, setFormValues];
};