import { toast } from 'sonner';

interface ToastProps {
  title: string;
  type?: 'success' | 'error' | 'info' | 'warning';
}

export const showToast = ({ title, type = 'info' }: ToastProps) => {
  switch (type) {
    case 'success':
      toast.success(title);
      break;
    case 'error':
      toast.error(title);
      break;
    case 'warning':
      toast.warning(title);
      break;
    default:
      toast(title);
      break;
  }
};
