
import { type ToastProps } from "@/components/ui/toast";
import {
  useToast as useToastOriginal,
} from "@radix-ui/react-toast";

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  open: boolean;
};

export const TOAST_LIMIT = 5;
export const TOAST_REMOVE_DELAY = 1000000;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ToastActionType = (props: Omit<ToasterToast, "id" | "open">) => string;
type ToastStateType = {
  toasts: ToasterToast[];
  toast: ToastActionType;
  dismiss: (toastId?: string) => void;
  update: (props: Partial<ToasterToast> & { id: string }) => void;
};

const toastState: ToastStateType = {
  toasts: [],
  toast: ({ ...props }) => {
    const id = genId();

    const toast = {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) toastState.dismiss(id);
      },
    };

    toastState.toasts = [toast, ...toastState.toasts].slice(0, TOAST_LIMIT);

    return id;
  },
  dismiss: (toastId?: string) => {
    toastState.toasts = toastState.toasts.map((toast) =>
      toast.id === toastId || toastId === undefined
        ? {
            ...toast,
            open: false,
          }
        : toast
    );
  },
  update: (props) => {
    toastState.toasts = toastState.toasts.map((t) =>
      t.id === props.id ? { ...t, ...props } : t
    );
  },
};

export function useToast() {
  const { ...originalHook } = useToastOriginal();
  
  return {
    ...toastState,
    ...originalHook,
  };
}

export const toast: ToastActionType = (props) => {
  return toastState.toast(props);
};
