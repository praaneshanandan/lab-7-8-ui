import { useState } from 'react';
import { useNavigate } from 'react-router'
import { Button, LinkButton } from '../components/ui/Button';
import { useCustomerForm } from '../context/CustomerFormContext';

export default function CustomerFormAddress() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useCustomerForm();
  
  const [addressLine1, setAddressLine1] = useState(formData.address?.addressLine1 || '');
  const [addressLine2, setAddressLine2] = useState(formData.address?.addressLine2 || '');
  const [city, setCity] = useState(formData.address?.city || '');
  const [state, setState] = useState(formData.address?.state || '');
  const [country, setCountry] = useState(formData.address?.country || '');
  const [zipCode, setZipCode] = useState(formData.address?.zipCode || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!addressLine1.trim()) newErrors.addressLine1 = 'Address line 1 is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!state.trim()) newErrors.state = 'State is required';
    if (!country.trim()) newErrors.country = 'Country is required';
    if (!zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      updateFormData({
        address: {
          addressLine1,
          addressLine2,
          city,
          state,
          country,
          zipCode
        }
      });
      
      navigate('/customers/create/contact');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customer Address</h1>
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
            <div>
              <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 1 *
              </label>
              <input
                id="addressLine1"
                type="text"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                className={`w-full p-2 border rounded ${errors.addressLine1 ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.addressLine1 && <p className="text-red-500 text-sm mt-1">{errors.addressLine1}</p>}
            </div>
            
            <div>
              <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 2
              </label>
              <input
                id="addressLine2"
                type="text"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`w-full p-2 border rounded ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State/Province *
                </label>
                <input
                  id="state"
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={`w-full p-2 border rounded ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <select
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={`w-full p-2 border rounded ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select Country</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="India">India</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>
              
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Zip/Postal Code *
                </label>
                <input
                  id="zipCode"
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className={`w-full p-2 border rounded ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/customers/create/personal')}
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
