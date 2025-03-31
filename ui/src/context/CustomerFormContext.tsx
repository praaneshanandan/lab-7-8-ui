import { createContext, useContext, useState, ReactNode } from 'react';
import { Customer } from '../types';

interface CustomerFormContextType {
  formData: Partial<Customer>;
  updateFormData: (data: Partial<Customer>) => void;
  resetForm: () => void;
}

const CustomerFormContext = createContext<CustomerFormContextType | undefined>(undefined);

export function CustomerFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<Partial<Customer>>({
    name: { firstName: '', middleName: '', lastName: '' },
    dateOfBirth: '',
    gender: '',
    language: '',
    address: { addressLine1: '', city: '', state: '', country: '', zipCode: '' },
    contactDetails: [],
    identityProofs: [],
  });

  const updateFormData = (data: Partial<Customer>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormData({
      name: { firstName: '', middleName: '', lastName: '' },
      dateOfBirth: '',
      gender: '',
      language: '',
      address: { addressLine1: '', city: '', state: '', country: '', zipCode: '' },
      contactDetails: [],
      identityProofs: [],
    });
  };

  return (
    <CustomerFormContext.Provider value={{ formData, updateFormData, resetForm }}>
      {children}
    </CustomerFormContext.Provider>
  );
}

export function useCustomerForm() {
  const context = useContext(CustomerFormContext);
  if (context === undefined) {
    throw new Error('useCustomerForm must be used within a CustomerFormProvider');
  }
  return context;
}
