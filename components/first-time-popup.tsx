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

export function FirstTimePopup() {
  const dispatch = useDispatch();
  const { hasSeenWelcome } = useSelector((state: RootState) => state.auth);

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
            Welcome to Marghai Jobs!
          </DialogTitle>

          <div className="space-y-3 text-base text-muted-foreground">
            <p>
              This is a <strong>personal side project</strong> built for
              learning and demonstration purposes.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>Heads up:</strong> All data shown here is{" "}
                <strong>dummy data</strong> and not real.
              </p>
            </div>

            <p className="text-sm">
              Feel free to explore the UI and features. This project highlights
              modern web development using <strong>Next.js</strong>,{" "}
              <strong>React</strong>, <strong>Nest.js</strong>,{" "}
              <strong>Postgres</strong>, and <strong>Tailwind CSS</strong>.
            </p>
          </div>
        </DialogHeader>

        <div className="flex justify-end">
          <Button onClick={handleDismiss}>Got it 👍</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
