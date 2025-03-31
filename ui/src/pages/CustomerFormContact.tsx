import { useState } from 'react';
import { useNavigate } from 'react-router'
import { Button, LinkButton } from '../components/ui/Button';
import { useCustomerForm } from '../context/CustomerFormContext';
import { CustomerContactDetails } from '../types';

export default function CustomerFormContact() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useCustomerForm();
  
  const [contactDetails, setContactDetails] = useState<CustomerContactDetails[]>(
    formData.contactDetails?.length ? formData.contactDetails : [{ type: 'email', value: '', dialCode: '' }]
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    contactDetails.forEach((contact, index) => {
      if (!contact.type) {
        newErrors[`type-${index}`] = 'Contact type is required';
      }
      if (!contact.value) {
        newErrors[`value-${index}`] = 'Contact value is required';
      } else {
        // Validate email format
        if (contact.type === 'email' && !/^\S+@\S+\.\S+$/.test(contact.value)) {
          newErrors[`value-${index}`] = 'Please enter a valid email address';
        }
        // Validate phone format (simple check)
        if (contact.type === 'phone' && !/^\d{10,}$/.test(contact.value)) {
          newErrors[`value-${index}`] = 'Please enter a valid phone number';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddContact = () => {
    setContactDetails([...contactDetails, { type: 'email', value: '', dialCode: '' }]);
  };

  const handleRemoveContact = (index: number) => {
    const newContacts = [...contactDetails];
    newContacts.splice(index, 1);
    setContactDetails(newContacts);
  };

  const handleContactChange = (index: number, field: keyof CustomerContactDetails, value: string) => {
    const newContacts = [...contactDetails];
    newContacts[index] = { ...newContacts[index], [field]: value };
    setContactDetails(newContacts);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      updateFormData({
        contactDetails
      });
      
      navigate('/customers/create/identity');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Contact Details</h1>
        <LinkButton 
          to="/"
          variant="outline"
        >
          Cancel
        </LinkButton>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {contactDetails.map((contact, index) => (
              <div key={index} className="border border-gray-200 rounded p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">Contact #{index + 1}</h3>
                  {contactDetails.length > 1 && (
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveContact(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Type *
                    </label>
                    <select
                      value={contact.type}
                      onChange={(e) => handleContactChange(index, 'type', e.target.value)}
                      className={`w-full p-2 border rounded ${errors[`type-${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select Type</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                    </select>
                    {errors[`type-${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`type-${index}`]}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {contact.type === 'phone' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dial Code
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 1"
                          value={contact.dialCode || ''}
                          onChange={(e) => handleContactChange(index, 'dialCode', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                    )}
                    <div className={contact.type === 'phone' ? 'md:col-span-2' : 'md:col-span-3'}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {contact.type === 'email' ? 'Email Address *' : 'Phone Number *'}
                      </label>
                      <input
                        type={contact.type === 'email' ? 'email' : 'tel'}
                        value={contact.value}
                        onChange={(e) => handleContactChange(index, 'value', e.target.value)}
                        className={`w-full p-2 border rounded ${errors[`value-${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors[`value-${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`value-${index}`]}</p>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-center">
              <Button
                type="button"
                variant="outline"
                onClick={handleAddContact}
              >
                + Add Another Contact
              </Button>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/customers/create/address')}
            >
              Back
            </Button>
            <Button
            variant="outline"

              type="submit"
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
