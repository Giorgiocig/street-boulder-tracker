// ToastContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

type SnackbarContextType = {
  message: string;
  open: boolean;
  showSnackbar: (msg: string) => void;
  hideToast: () => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const showSnackbar = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  const hideToast = () => setOpen(false);

  return (
    <SnackbarContext.Provider
      value={{ message, open, showSnackbar, hideToast }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error("useSnackbar must be used inside ToastProvider");
  return ctx;
};
