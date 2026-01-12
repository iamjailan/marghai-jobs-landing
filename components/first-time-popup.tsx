"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { setHasSeenWelcome } from "@/store/authSlice"
import { RootState } from "@/store/store"

export function FirstTimePopup() {
  const dispatch = useDispatch()
  const { hasSeenWelcome } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Check if user has seen the welcome popup
    if (!hasSeenWelcome) {
      // Show the popup
      const timer = setTimeout(() => {
        // Auto-show after a short delay
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [hasSeenWelcome])

  const handleDismiss = () => {
    dispatch(setHasSeenWelcome(true))
  }

  return (
    <Dialog open={!hasSeenWelcome} onOpenChange={(open) => !open && handleDismiss()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">👋</span>
            Welcome to Marghai Dashboard!
          </DialogTitle>
          <div className="space-y-3 text-base text-muted-foreground">
            <div>
              This is a <strong>side project</strong> created for demonstration purposes.
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>Please note:</strong> All data displayed in this dashboard is <strong>dummy data</strong> and not real.
              </p>
            </div>
            <div className="text-sm">
              Feel free to explore the features and interface. This project showcases modern web development techniques using Next.js, React, and Tailwind CSS.
            </div>
          </div>
        </DialogHeader>
        <div className="flex justify-end">
          <Button onClick={handleDismiss}>
            Got it, thanks!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}