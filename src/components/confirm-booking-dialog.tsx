"use client";

import { useState } from "react";
import { type TourDate } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ConfirmBookingDialogProps = {
  tour: TourDate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (tour: TourDate) => void;
};

export function ConfirmBookingDialog({
  tour,
  open,
  onOpenChange,
  onConfirm,
}: ConfirmBookingDialogProps) {
  const [busy, setBusy] = useState(false);

  if (!tour) return null;

  async function handleConfirm() {
    setBusy(true);
    await onConfirm(tour as TourDate);
    setBusy(false);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm booking</DialogTitle>
          <DialogDescription>
            You&apos;re about to book a ticket for this show. This will add it to your tickets.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-2xl border border-border bg-surface p-4">
          <p className="font-display text-xl">{tour.show}</p>
          <p className="text-sm text-muted-foreground">
            {tour.city} • {tour.venue}
          </p>
          <p className="mt-2 text-sm font-bold text-accent">
            {tour.date} at {tour.time} • {tour.price}
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={busy}>
            {busy ? "Booking..." : "Confirm booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
