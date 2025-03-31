import { Customer } from '../types';

const API_URL = '/api';

// Export functions explicitly with the export keyword
export const getAllCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await fetch(`${API_URL}/customer`);
    if (!response.ok) {
      throw new Error('Failed to fetch customers');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const getCustomerById = async (id: string): Promise<Customer> => {
  try {
    const response = await fetch(`${API_URL}/customer/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch customer with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching customer with ID ${id}:`, error);
    throw error;
  }
};

export const createCustomer = async (customer: Customer): Promise<Customer> => {
  try {
    const response = await fetch(`${API_URL}/customer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create customer ' + response.statusText);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};
