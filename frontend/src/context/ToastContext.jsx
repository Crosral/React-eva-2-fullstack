import { createContext, useContext, useCallback, useRef, useState } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ visible: false, mensaje: "", icono: "🛒" });
  const temporizador = useRef(null);

  const mostrarToast = useCallback((mensaje, icono = "🛒") => {
    setToast({ visible: true, mensaje, icono });

    if (temporizador.current) clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => {
      setToast((actual) => ({ ...actual, visible: false }));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ mostrarToast }}>
      {children}
      <div
        id="toast-notificacion"
        className={toast.visible ? "mostrar" : ""}
        role="status"
        aria-live="polite"
      >
        <span id="toast-icono">{toast.icono}</span>
        <span id="toast-mensaje">{toast.mensaje}</span>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe usarse dentro de un <ToastProvider>");
  }
  return context;
}