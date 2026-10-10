"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Download,
  FileText,
  Home,
  ReceiptText,
  RotateCcw,
  ShieldCheck,
  WalletCards,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TenantPaymentLoader() {
  return (
    <main className="min-h-screen bg-muted/20 text-foreground">
      <div className="lg:pl-72">
        <header className="border-b border-border/70 bg-background">
          <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8">
            <p className="text-sm text-muted-foreground">
              Homiee workspace / Payments
            </p>
            <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Payments
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Track rent, bills, and receipts for your home.
                </p>
              </div>
              <Badge variant="outline" className="w-fit gap-2">
                <ShieldCheck data-icon="inline-start" /> Secure payment history
              </Badge>
            </div>
          </div>
        </header>
        <div className="mx-auto grid max-w-7xl gap-6 p-5 sm:p-8">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <Card className="bg-gray-100 rounded-2xl p-20 animate-pulse"></Card>
            <Card className="bg-gray-100 rounded-2xl animate-pulse"></Card>

            <Card className="bg-gray-100 rounded-2xl animate-pulse"></Card>
          </section>
          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.75fr)]">
            <Card className="overflow-hidden shadow-sm">
              <CardHeader className="border-b border-border/60">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <CardTitle className="text-lg">Payment history</CardTitle>
                    <CardDescription>
                      Review your rent, bills, and transaction records.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Property</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">
                          Receipt / details
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[...new Array(10)].map((payment) => (
                        <TableRow className="cursor-pointer animate-pulse">
                          <TableCell className="font-mono text-xs font-medium"></TableCell>
                          <TableCell>
                            <Badge variant="outline"></Badge>
                          </TableCell>
                          <TableCell>
                            <div className="min-w-44">
                              <p className="font-medium"></p>
                              <p className="text-xs text-muted-foreground"></p>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium tabular-nums"></TableCell>
                          <TableCell className="whitespace-nowrap text-muted-foreground"></TableCell>
                          <TableCell></TableCell>
                          <TableCell className="text-right"></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            <Card className="p-20" />
          </div>
        </div>
      </div>
    </main>
  );
}
