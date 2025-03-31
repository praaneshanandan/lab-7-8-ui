import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router'
import { LinkButton } from '../components/ui/Button';
import { getAllCustomers } from '../services/api';
import { Customer } from '../types';

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getAllCustomers();
        setCustomers(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load customers. Please try again later.');
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Customer List</h1>
        <LinkButton 
          to="/"
          variant="outline"
        >
          Back to Home
        </LinkButton>
      </div>

      {loading && (
        <div className="text-center py-16">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading customers...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!loading && !error && customers.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">No customers found.</p>
          <LinkButton 
            to="/customers/create/personal"
            className="mt-4"
          >
            Create Your First Customer
          </LinkButton>
        </div>
      )}

      {!loading && !error && customers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.map(customer => (
            <div 
              key={customer.id}
              onClick={() => navigate(`/customers/view/${customer.id}`)}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 cursor-pointer border-l-4 border-primary"
            >
              <h3 className="text-xl font-semibold mb-2">{customer.name.firstName} {customer.name.lastName}</h3>
              <p className="text-gray-600">ID: {customer.id}</p>
              <p className="text-gray-600">DOB: {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
