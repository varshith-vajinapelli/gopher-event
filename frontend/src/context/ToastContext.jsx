import { createContext, useContext, useState } from "react";
import Toast from "../components/ToastNotification";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  const clearToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={clearToast} />
      )}
    </ToastContext.Provider>
  );
};

// This hook is intentionally exported with the provider so consumers share one context.
// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);
