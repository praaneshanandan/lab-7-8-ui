import { Customer } from './types';

declare global {
  interface Window {
    showToast: (message: string, type: 'success' | 'error' | 'info') => void;
    previewCustomer: Partial<Customer>;
  }
}
