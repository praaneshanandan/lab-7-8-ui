import { useEffect } from 'react';
import { useNavigate } from 'react-router'
import { Button } from '../components/ui/Button';
import { useCustomerForm } from '../context/CustomerFormContext';
import { createCustomer } from '../services/api';
import CustomerDetails from './CustomerDetails';

export default function CustomerFormSummary() {
  const navigate = useNavigate();
  const { formData, resetForm } = useCustomerForm();

  useEffect(() => {
    // Make the form data available for the CustomerDetails component
    window.previewCustomer = formData;
  }, [formData]);

  const handleSubmit = async () => {
    try {
      // Add a temporary ID for submission
      const customerData = {
        ...formData,
      } as any; // Type assertion since formData is partial
      
      // Call the API function directly
      const response = await createCustomer(customerData);
      
      // Show success toast
      if (window.showToast) {
        window.showToast('Customer created successfully!', 'success');
      }
      
      // Reset the form
      resetForm();
      
      // Navigate to the success page and pass the newly created customer ID
      navigate('/customers/success', { 
        state: { 
          customerId: response.id,
          customerName: `${response.name.firstName} ${response.name.lastName}`
        } 
      });
    } catch (error) {
      console.error('Error creating customer:', error);
      
      // Show error toast
      if (window.showToast) {
        window.showToast('Failed to create customer. Please try again.', 'error');
      }
    }
  };

  const handleBack = () => {
    navigate('/customers/create/identity');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Review Customer Information</h1>
      </div>
      
      <p className="mb-6 text-gray-600">
        Please review all the information carefully before submitting.
      </p>
      
      {/* Reuse CustomerDetails component for display */}
      <CustomerDetails />
      
      <div className="mt-8 flex justify-between">
        <Button
          onClick={handleBack}
          variant="outline"
        >
          Back to Edit
        </Button>
        <Button
          onClick={handleSubmit}
          variant="outline"
        >
          Submit Customer Data
        </Button>
      </div>
    </div>
  );
}
