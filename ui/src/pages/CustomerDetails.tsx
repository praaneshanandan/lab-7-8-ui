import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router'
import { LinkButton } from '../components/ui/Button';
import { getCustomerById } from '../services/api';
import { Customer } from '../types';

export default function CustomerDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isPreview = location.pathname.includes('/create/summary');

  useEffect(() => {
    if (!isPreview && id) {
      const fetchCustomer = async () => {
        try {
          const data = await getCustomerById(id);
          setCustomer(data);
          setLoading(false);
        } catch (err) {
          setError('Failed to load customer details. Please try again later.');
          setLoading(false);
        }
      };

      fetchCustomer();
    } else if (isPreview) {
      setLoading(false);
    }
  }, [id, isPreview]);

  if (loading && !isPreview) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!customer && !isPreview) {
    return <div>No customer data found.</div>;
  }

  const displayCustomer = isPreview ? window.previewCustomer : customer;
  if (!displayCustomer) return null;

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {isPreview ? 'Customer Summary' : 'Customer Details'}
        </h1>
        <LinkButton 
          to={!isPreview ? "/customers/view" : "#"}
          variant="outline"
          className={isPreview ? "invisible" : ""}
        >
          {isPreview ? '' : 'Back to List'}
        </LinkButton>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Personal Information */}
        <div className="border-b border-gray-200">
          <div className="px-6 py-4 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Full Name</p>
              <p className="mt-1">
                {displayCustomer.name.firstName} {displayCustomer.name.middleName} {displayCustomer.name.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Date of Birth</p>
              <p className="mt-1">{new Date(displayCustomer.dateOfBirth).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Gender</p>
              <p className="mt-1">{displayCustomer.gender}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Preferred Language</p>
              <p className="mt-1">{displayCustomer.language}</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="border-b border-gray-200">
          <div className="px-6 py-4 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">Address</h2>
          </div>
          <div className="p-6">
            <p className="mt-1">
              {displayCustomer.address.addressLine1}<br />
              {displayCustomer.address.addressLine2 && <>{displayCustomer.address.addressLine2}<br /></>}
              {displayCustomer.address.city}, {displayCustomer.address.state} {displayCustomer.address.zipCode}<br />
              {displayCustomer.address.country}
            </p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="border-b border-gray-200">
          <div className="px-6 py-4 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">Contact Details</h2>
          </div>
          <div className="p-6">
            {displayCustomer.contactDetails && displayCustomer.contactDetails.length > 0 ? (
              <div className="space-y-4">
                {displayCustomer.contactDetails.map((contact: { type: string; dialCode?: string; value: string }, index: number) => (
                  <div key={index} className="flex items-center">
                    <div className="w-24 font-medium text-gray-500">{contact.type}:</div>
                    <div>{contact.dialCode && `+${contact.dialCode} `}{contact.value}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No contact details provided.</p>
            )}
          </div>
        </div>

        {/* Identity Proofs */}
        <div>
          <div className="px-6 py-4 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">Identity Proofs</h2>
          </div>
          <div className="p-6">
            {displayCustomer.identityProofs && displayCustomer.identityProofs.length > 0 ? (
              <div className="space-y-6">
                {displayCustomer.identityProofs.map((proof: { type: string; value: string; issuedDate: string; expiryDate: string }, index: number) => (
                  <div key={index} className="border border-gray-200 rounded p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Type</p>
                        <p className="mt-1">{proof.type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Number</p>
                        <p className="mt-1">{proof.value}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Issued Date</p>
                        <p className="mt-1">{new Date(proof.issuedDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Expiry Date</p>
                        <p className="mt-1">{new Date(proof.expiryDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No identity proofs provided.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
