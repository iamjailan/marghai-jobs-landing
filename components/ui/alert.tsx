import {
  CheckCircleIcon,
  InfoIcon,
  AlertTriangleIcon,
  XCircleIcon,
} from "lucide-react";
import { toast } from "sonner";
import React from "react";

export type AlertType = "success" | "error" | "warning" | "info";

const icons: Record<AlertType, React.ReactNode> = {
  success: <CheckCircleIcon className="size-4" />,
  info: <InfoIcon className="size-4" />,
  warning: <AlertTriangleIcon className="size-4" />,
  error: <XCircleIcon className="size-4" />,
};

const Alert = (type: AlertType, message: string, description?: string) => {
  const baseOptions = {
    description,
    position: "top-center" as const,
    duration: 8000,
    icon: icons[type],
  };

  const colorMap: Record<AlertType, { background: string; color: string }> = {
    success: { background: "#ecfdf5", color: "#065f46" },
    error: { background: "#fee2e2", color: "#991b1b" },
    warning: { background: "#fff7ed", color: "#92400e" },
    info: { background: "#eff6ff", color: "#1e3a8a" },
  };

  const styles = colorMap[type];

  if (type === "error") {
    return toast.error(message, {
      ...baseOptions,
      style: {
        background: styles.background,
        color: styles.color,
      },
    });
  }

  return toast[type](message, {
    ...baseOptions,
    style: {
      background: styles.background,
      color: styles.color,
    },
  });
};

export default Alert;
