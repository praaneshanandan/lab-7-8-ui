import { BrowserRouter as Router, Routes, Route } from 'react-router'
import LandingPage from './pages/LandingPage'
import CustomerList from './pages/CustomerList'
import CustomerDetails from './pages/CustomerDetails'
import CustomerFormPersonal from './pages/CustomerFormPersonal'
import CustomerFormAddress from './pages/CustomerFormAddress'
import CustomerFormContact from './pages/CustomerFormContact'
import CustomerFormIdentity from './pages/CustomerFormIdentity'
import CustomerFormSummary from './pages/CustomerFormSummary'
import CustomerSubmissionSuccess from './pages/CustomerSubmissionSuccess'
import { CustomerFormProvider } from './context/CustomerFormContext'
import { Toaster } from './components/ui/Toaster'

const App = () => {
  return (
    <Router>
      <CustomerFormProvider>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/customers/view" element={<CustomerList />} />
              <Route path="/customers/view/:id" element={<CustomerDetails />} />
              <Route path="/customers/create/personal" element={<CustomerFormPersonal />} />
              <Route path="/customers/create/address" element={<CustomerFormAddress />} />
              <Route path="/customers/create/contact" element={<CustomerFormContact />} />
              <Route path="/customers/create/identity" element={<CustomerFormIdentity />} />
              <Route path="/customers/create/summary" element={<CustomerFormSummary />} />
              <Route path="/customers/success" element={<CustomerSubmissionSuccess />} />
            </Routes>
          </div>
          <Toaster />
        </div>
      </CustomerFormProvider>
    </Router>
  )
}

export default App
