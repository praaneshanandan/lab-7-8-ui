import { LinkButton } from '../components/ui/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background-light to-background-dark">
      {/* Header/Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 max-w-6xl">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary leading-tight">
              Customer Management System
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0">
              Efficiently manage your customer database with our streamlined, powerful platform designed for modern businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center md:justify-start">
              <LinkButton
                to="/customers/view"
                variant="primary"
                size="lg"
                className="shadow-soft hover:shadow-hover transition-all duration-300 transform hover:-translate-y-1 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg w-full sm:w-auto"
              >
                View All Customers
              </LinkButton>
              <LinkButton
                to="/customers/create/personal"
                variant="secondary"
                size="lg"
                className="shadow-soft hover:shadow-hover transition-all duration-300 transform hover:-translate-y-1 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg w-full sm:w-auto"
              >
                Create New Customer
              </LinkButton>
            </div>
          </div>
          
          {/* Right Side - Decorative Element */}
          <div className="flex-1 relative w-full max-w-sm mx-auto md:max-w-none mb-8 md:mb-0">
            <div className="w-full h-56 sm:h-64 md:h-72 rounded-2xl bg-gradient-to-tr from-primary-light/20 to-secondary-light/20 relative overflow-hidden shadow-soft">
              {/* Abstract shapes for decoration */}
              <div className="absolute top-8 right-8 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-primary/30"></div>
              <div className="absolute bottom-8 left-8 w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-secondary/20"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-white/80 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mt-16 sm:mt-20 md:mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: "Easy Management",
              description: "Manage customer data with intuitive tools and interfaces.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              )
            },
            {
              title: "Powerful Analytics",
              description: "Gain insights from comprehensive customer analytics.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              )
            },
            {
              title: "Secure Storage",
              description: "Keep customer information safe with advanced security.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )
            },
          ].map((feature, index) => (
            <div key={index} className="bg-white p-5 sm:p-6 rounded-xl shadow-soft hover:shadow-hover transition-all duration-300">
              <div className="text-primary mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
