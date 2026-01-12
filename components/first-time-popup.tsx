"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { setHasSeenWelcome } from "@/store/authSlice";
import { RootState } from "@/store/store";
import { useI18n } from "@/lib/i18n";

export function FirstTimePopup() {
  const dispatch = useDispatch();
  const { hasSeenWelcome } = useSelector((state: RootState) => state.auth);
  const { t } = useI18n();

  useEffect(() => {
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => {}, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasSeenWelcome]);

  const handleDismiss = () => {
    dispatch(setHasSeenWelcome(true));
  };

  return (
    <Dialog
      open={!hasSeenWelcome}
      onOpenChange={(open) => !open && handleDismiss()}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">👋</span>
            {t("popup.welcome")}
          </DialogTitle>

          <div className="space-y-3 text-base text-muted-foreground">
            <p>
              {t("popup.disclaimer")}
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                {t("popup.dummyData")}
              </p>
            </div>

            <p className="text-sm">
              {t("popup.techStack")}
            </p>
          </div>
        </DialogHeader>

        <div className="flex justify-end">
          <Button onClick={handleDismiss}>{t("popup.gotIt")}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
