import { useState } from 'react';
import { useNavigate } from 'react-router'
import { Button, LinkButton } from '../components/ui/Button';
import { useCustomerForm } from '../context/CustomerFormContext';
import { CustomerIdentityProof } from '../types';

export default function CustomerFormIdentity() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useCustomerForm();
  
  const [identityProofs, setIdentityProofs] = useState<CustomerIdentityProof[]>(
    formData.identityProofs?.length ? formData.identityProofs : [{ type: '', value: '', issuedDate: '', expiryDate: '' }]
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    identityProofs.forEach((proof, index) => {
      if (!proof.type) {
        newErrors[`type-${index}`] = 'ID type is required';
      }
      if (!proof.value) {
        newErrors[`value-${index}`] = 'ID number is required';
      }
      if (!proof.issuedDate) {
        newErrors[`issuedDate-${index}`] = 'Issue date is required';
      }
      if (!proof.expiryDate) {
        newErrors[`expiryDate-${index}`] = 'Expiry date is required';
      } else if (proof.issuedDate && new Date(proof.expiryDate) <= new Date(proof.issuedDate)) {
        newErrors[`expiryDate-${index}`] = 'Expiry date must be after issue date';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProof = () => {
    setIdentityProofs([...identityProofs, { type: '', value: '', issuedDate: '', expiryDate: '' }]);
  };

  const handleRemoveProof = (index: number) => {
    const newProofs = [...identityProofs];
    newProofs.splice(index, 1);
    setIdentityProofs(newProofs);
  };

  const handleProofChange = (index: number, field: keyof CustomerIdentityProof, value: string) => {
    const newProofs = [...identityProofs];
    newProofs[index] = { ...newProofs[index], [field]: value };
    setIdentityProofs(newProofs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      updateFormData({
        identityProofs
      });
      
      // Set the preview data for the summary page
      window.previewCustomer = { ...formData, identityProofs };
      
      navigate('/customers/create/summary');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Identity Proofs</h1>
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
            {identityProofs.map((proof, index) => (
              <div key={index} className="border border-gray-200 rounded p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">ID Proof #{index + 1}</h3>
                  {identityProofs.length > 1 && (
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveProof(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID Type *
                    </label>
                    <select
                      value={proof.type}
                      onChange={(e) => handleProofChange(index, 'type', e.target.value)}
                      className={`w-full p-2 border rounded ${errors[`type-${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select Type</option>
                      <option value="passport">Passport</option>
                      <option value="nationalId">National ID</option>
                      <option value="drivingLicense">Driving License</option>
                      <option value="voterCard">Voter Card</option>
                    </select>
                    {errors[`type-${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`type-${index}`]}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID Number *
                    </label>
                    <input
                      type="text"
                      value={proof.value}
                      onChange={(e) => handleProofChange(index, 'value', e.target.value)}
                      className={`w-full p-2 border rounded ${errors[`value-${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors[`value-${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`value-${index}`]}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Issue Date *
                      </label>
                      <input
                        type="date"
                        value={proof.issuedDate}
                        onChange={(e) => handleProofChange(index, 'issuedDate', e.target.value)}
                        className={`w-full p-2 border rounded ${errors[`issuedDate-${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors[`issuedDate-${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`issuedDate-${index}`]}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date *
                      </label>
                      <input
                        type="date"
                        value={proof.expiryDate}
                        onChange={(e) => handleProofChange(index, 'expiryDate', e.target.value)}
                        className={`w-full p-2 border rounded ${errors[`expiryDate-${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors[`expiryDate-${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`expiryDate-${index}`]}</p>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-center">
              <Button
                type="button"
                variant="outline"
                onClick={handleAddProof}
              >
                + Add Another ID Proof
              </Button>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/customers/create/contact')}
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
