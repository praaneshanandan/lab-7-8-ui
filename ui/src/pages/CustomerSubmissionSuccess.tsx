import { useLocation } from 'react-router'
import { LinkButton } from '../components/ui/Button';

export default function CustomerSubmissionSuccess() {
  const location = useLocation();
  const { customerId, customerName } = location.state || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
        </svg>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Customer Data Submitted Successfully!</h1>
      
      {customerName && (
        <p className="text-xl text-gray-700 mb-2">
          Customer: {customerName}
        </p>
      )}
      
      {customerId && (
        <p className="text-lg text-gray-600 mb-8">
          Customer ID: {customerId}
        </p>
      )}
      
      <div className="flex gap-4">
        {customerId ? (
          <LinkButton
            to={`/customers/view/${customerId}`}
          >
            View Customer Details
          </LinkButton>
        ) : (
          <LinkButton
            to="/customers/view"
          >
            View All Customers
          </LinkButton>
        )}
        
        <LinkButton
          to="/customers/create/personal"
          variant="secondary"
        >
          Add Another Customer
        </LinkButton>
      </div>
    </div>
  );
}
