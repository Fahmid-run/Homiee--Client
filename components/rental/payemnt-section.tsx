"use client";

import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  CalendarClockIcon,
  CreditCardIcon,
  ReceiptTextIcon,
  WalletIcon,
} from "lucide-react";
import { Role } from "../tenant/rental-management";
import { formatCurrency, formatDate, Rental } from "./rental-data";
import { PaymentStatusBadge } from "../ui/status-badge";

export function PaymentSection({
  rental,
  role,
}: {
  rental: Rental;
  role: Role;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <WalletIcon className="size-4 text-muted-foreground" />
          Payments
        </CardTitle>
        <CardDescription>
          Rent schedule, history and settlement status.
        </CardDescription>
        <CardAction>
          <PaymentStatusBadge status={rental.paymentStatus} />
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1 rounded-lg border bg-muted/40 p-4">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ReceiptTextIcon className="size-3.5" />
              Current rent
            </span>
            <span className="text-2xl font-semibold tracking-tight tabular-nums">
              {formatCurrency(rental.currentRent.amount, rental.currency)}
            </span>
            <span className="text-xs text-muted-foreground">
              {rental.currentRent.period}
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg border bg-muted/40 p-4">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarClockIcon className="size-3.5" />
              Next due date
            </span>
            <span className="text-2xl font-semibold tracking-tight">
              {formatDate(rental.nextDueDate)}
            </span>
            <span className="text-xs text-muted-foreground">
              Auto-reminder 3 days prior
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">Payment history</h3>
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Due date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rental.payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      {payment.period}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(payment.dueDate)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {payment.method ?? "—"}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatCurrency(payment.amount, rental.currency)}
                    </TableCell>
                    <TableCell className="flex justify-end">
                      <PaymentStatusBadge status={payment.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-between gap-3">
        <div className="text-sm">
          <p className="text-muted-foreground">Amount due now</p>
          <p className="font-semibold tabular-nums">
            {formatCurrency(rental.currentRent.amount, rental.currency)}
          </p>
        </div>
        {role === "tenant" ? (
          <PayRentDialog rental={rental} />
        ) : (
          <Button variant="outline">
            <ReceiptTextIcon data-icon="inline-start" />
            View Payment
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

function PayRentDialog({ rental }: { rental: Rental }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <CreditCardIcon data-icon="inline-start" />
            Pay Rent
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pay rent</DialogTitle>
          <DialogDescription>
            {rental.currentRent.period} · due {formatDate(rental.nextDueDate)}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-lg border bg-muted/40 p-4">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-xl font-semibold tabular-nums">
              {formatCurrency(rental.currentRent.amount, rental.currency)}
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <CreditCardIcon className="size-4 text-muted-foreground" />
            <div className="text-sm">
              <p className="font-medium">Card •••• 4291</p>
              <p className="text-xs text-muted-foreground">
                Visa · expires 09/28
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button onClick={() => setOpen(false)}>
            Pay {formatCurrency(rental.currentRent.amount, rental.currency)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
