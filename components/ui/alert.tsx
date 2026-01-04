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
  return toast[type](message, {
    description,
    position: "top-center",
    duration: 8000,
    icon: icons[type],
    style: {
      background: "black",
      color: "white",
    },
  });
};

export default Alert;
