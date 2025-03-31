import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Add window declarations for our global objects
declare global {
  interface Window {
    showToast: (message: string, type: 'success' | 'error' | 'info') => void;
    previewCustomer: any;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
