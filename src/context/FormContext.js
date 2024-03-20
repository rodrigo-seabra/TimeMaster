import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  const updateFormData = (campo, valor) => {
    setFormData((prevData) => ({
      ...prevData,
      [campo]: valor,
    }));
  };

  const resetFormData = () => {
    setFormData({
      nome: '',
      email: '',
      senha: '',
    });
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </FormContext.Provider>
  );
};
