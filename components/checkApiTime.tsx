"use client";

import { useGetStatistics } from "@/query/hooks";
import { useEffect, useRef } from "react";
import Alert from "./ui/alert";
import { useI18n } from "@/lib/i18n";

export function CheckApiTime() {
  const status = useGetStatistics();
  const { t } = useI18n();
  const delay = 6000;
  const hasShownRef = useRef(false);

  useEffect(() => {
    if (!status.isLoading && !status.isFetching) return;

    const timer = setTimeout(() => {
      if (!hasShownRef.current) {
        Alert(
          "info",
          t("api.wakingServer"),
          t("api.freeHostingNote")
        );
        hasShownRef.current = true;
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [status.isLoading, status.isFetching, delay, t]);

  return null;
}
