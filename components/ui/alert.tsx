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
    success: { background: "#065f46", color: "#ecfdf5" },
    error: { background: "#991b1b", color: "#fee2e2" },
    warning: { background: "#92400e", color: "#fff7ed" },
    info: { background: "#1e3a8a", color: "#eff6ff" },
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
