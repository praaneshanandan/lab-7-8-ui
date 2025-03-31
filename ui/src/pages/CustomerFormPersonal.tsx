import { useState } from 'react';
import { useNavigate } from 'react-router'
import { Button, LinkButton } from '../components/ui/Button';
import { useCustomerForm } from '../context/CustomerFormContext';

export default function CustomerFormPersonal() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useCustomerForm();
  
  const [firstName, setFirstName] = useState(formData.name?.firstName || '');
  const [middleName, setMiddleName] = useState(formData.name?.middleName || '');
  const [lastName, setLastName] = useState(formData.name?.lastName || '');
  const [dateOfBirth, setDateOfBirth] = useState(formData.dateOfBirth || '');
  const [gender, setGender] = useState(formData.gender || '');
  const [language, setLanguage] = useState(formData.language || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!gender) newErrors.gender = 'Gender is required';
    if (!language) newErrors.language = 'Language is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      updateFormData({
        name: { firstName, middleName, lastName },
        dateOfBirth,
        gender,
        language
      });
      
      navigate('/customers/create/address');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customer Personal Details</h1>
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
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`w-full p-2 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              
              <div>
                <label htmlFor="middleName" className="block text-sm font-medium text-gray-700 mb-1">
                  Middle Name
                </label>
                <input
                  id="middleName"
                  type="text"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={`w-full p-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>
            
            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth *
              </label>
              <input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className={`w-full p-2 border rounded ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
            </div>
            
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                    className="form-radio text-primary"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={() => setGender('female')}
                    className="form-radio text-primary"
                  />
                  <span className="ml-2">Female</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={gender === 'other'}
                    onChange={() => setGender('other')}
                    className="form-radio text-primary"
                  />
                  <span className="ml-2">Other</span>
                </label>
              </div>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>
            
            {/* Language */}
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Language *
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`w-full p-2 border rounded ${errors.language ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Language</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="chinese">Chinese</option>
                <option value="hindi">Hindi</option>
              </select>
              {errors.language && <p className="text-red-500 text-sm mt-1">{errors.language}</p>}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
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
