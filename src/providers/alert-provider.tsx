import { ReactNode, useCallback, useState } from "react";
import CustomAlertDialog, { AlertAction } from "../components/alerts/CustomAlertDialog";
import { AlertContext } from "../contexts/use-alert-context";

export type AlertVariant = "info" | "success" | "error" | "confirm" | "warning";

export interface AlertOptions {
  variant?: AlertVariant;
  title?: string;
  message?: string;

  confirmText?: string;
  onConfirm?: () => void | Promise<void>;

  cancelText?: string;
  onCancel?: () => void;

  actions?: AlertAction[];
}

interface AlertProviderProps {
  children: ReactNode;
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [queue, setQueue] = useState<AlertOptions[]>([]);
  const [current, setCurrent] = useState<AlertOptions | null>(null);

  const show = useCallback((options: AlertOptions) => {
      setQueue((prev) => {
          const updated = [...prev, options];
          
          // wenn kein Alert aktiv ist → direkt setzen
      setCurrent((curr) => curr ?? options);
      
      return updated;
    });
}, []);

const hide = useCallback(() => {
    setQueue((prev) => {
        const [, ...rest] = prev;
        
        setCurrent(rest[0] ?? null);
        
        return rest;
    });
}, []);

// convinience methoden -> Lazy
const info = (message: string, title = "Info") =>
    show({ variant: "info", title, message });

const success = (message: string, title = "Erfolg") =>
    show({ variant: "success", title, message });

const error = (message: string, title = "Fehler") =>
    show({ variant: "error", title, message });

const warning = (
      message: string,
    onConfirm: () => void | Promise<void>,
    title = "Warnung"
  ) =>
    show({
      variant: "warning",
      title,
      message,
      cancelText: "OK",
      onCancel: hide,
    });

  const confirm = (
    message: string,
    onConfirm: () => void | Promise<void>,
    title = "Bestätigen"
  ) =>
    show({
      variant: "confirm",
      title,
      message,
      confirmText: "OK",
      cancelText: "Abbrechen",
      onConfirm,
      onCancel: hide,
    });
  return (
    <AlertContext.Provider
      value={{ show, hide, info, success, error, confirm, warning }}
    >
      {children}

      {current && (
        <CustomAlertDialog
          isOpen={true}
          onClose={hide}
          {...current}
        />
      )}
    </AlertContext.Provider>
  );
}
