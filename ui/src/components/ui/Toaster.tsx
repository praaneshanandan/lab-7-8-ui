import { useState, useEffect, createContext, useContext } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToasterContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  return (
    <ToasterContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))} />
        ))}
      </div>
    </ToasterContext.Provider>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const bgColor = toast.type === 'success' 
    ? 'bg-green-500' 
    : toast.type === 'error' 
    ? 'bg-red-500' 
    : 'bg-blue-500';

  return (
    <div className={`${bgColor} text-white px-4 py-3 rounded shadow-lg flex justify-between items-center min-w-[300px]`}>
      <p>{toast.message}</p>
      <button onClick={onClose} className="ml-4 text-white">&times;</button>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType = 'info') => {
    const newToast: Toast = {
      id: Date.now().toString(),
      message,
      type
    };
    
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      removeToast(newToast.id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Export the add toast function to window for global access
  useEffect(() => {
    (window as any).showToast = addToast;
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <div 
          key={toast.id} 
          className={`
            px-4 py-3 rounded shadow-lg flex justify-between min-w-[300px] text-white
            ${toast.type === 'success' ? 'bg-green-500' : 
              toast.type === 'error' ? 'bg-red-500' : 'bg-primary'}
          `}
        >
          <p>{toast.message}</p>
          <button 
            onClick={() => removeToast(toast.id)} 
            className="ml-4 text-white"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
