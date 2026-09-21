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

const payments = [
  {
    id: "PAY-10482",
    type: "Rent",
    property: "Maple Heights Residence",
    room: "Room 204",
    amount: 1200,
    date: "Sep 01, 2026",
    status: "Paid",
    reference: "ch_3Qm8K2L0",
  },
  {
    id: "PAY-10461",
    type: "Bill",
    property: "Maple Heights Residence",
    room: "Room 204",
    amount: 86.4,
    date: "Aug 25, 2026",
    status: "Paid",
    reference: "ch_3Qm2P7H1",
  },
  {
    id: "PAY-10420",
    type: "Rent",
    property: "Maple Heights Residence",
    room: "Room 204",
    amount: 1200,
    date: "Oct 01, 2026",
    status: "Pending",
    reference: "Awaiting payment",
  },
  {
    id: "PAY-10384",
    type: "Bill",
    property: "Maple Heights Residence",
    room: "Room 204",
    amount: 42.15,
    date: "Aug 12, 2026",
    status: "Refunded",
    reference: "re_3Qj9W4N2",
  },
  {
    id: "PAY-10362",
    type: "Bill",
    property: "Maple Heights Residence",
    room: "Room 204",
    amount: 31.8,
    date: "Jul 28, 2026",
    status: "Failed",
    reference: "Payment declined",
  },
];

const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value,
  );

function StatusBadge({ status }: { status: string }) {
  const icon =
    status === "Paid" ? (
      <CheckCircle2 data-icon="inline-start" />
    ) : status === "Pending" ? (
      <Clock3 data-icon="inline-start" />
    ) : status === "Refunded" ? (
      <RotateCcw data-icon="inline-start" />
    ) : (
      <XCircle data-icon="inline-start" />
    );
  return (
    <Badge
      variant={
        status === "Paid"
          ? "secondary"
          : status === "Pending"
            ? "outline"
            : "destructive"
      }
      className="gap-1.5 font-medium"
    >
      {icon}
      {status}
    </Badge>
  );
}

function SummaryCard({
  label,
  value,
  detail,
  icon: Icon,
  emphasis = false,
}: {
  label: string;
  value: string;
  detail: string;
  icon: typeof WalletCards;
  emphasis?: boolean;
}) {
  return (
    <Card
      className={
        emphasis ? "border-primary/30 bg-primary/5 shadow-sm" : "shadow-sm"
      }
    >
      <CardContent className="flex items-start justify-between gap-3 p-5">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
        </div>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <Icon />
        </div>
      </CardContent>
    </Card>
  );
}

function PaymentDetail({
  payment,
  onPay,
}: {
  payment: (typeof payments)[number];
  onPay: () => void;
}) {
  const unpaid = payment.status === "Pending" || payment.status === "Failed";
  return (
    <Card className="h-fit shadow-sm">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardDescription>Payment detail</CardDescription>
            <CardTitle className="mt-1 text-2xl">
              {formatMoney(payment.amount)}
            </CardTitle>
          </div>
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ReceiptText />
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="rounded-xl bg-muted/40 p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
              {payment.type === "Rent" ? <Home /> : <CreditCard />}
            </div>
            <div>
              <p className="font-medium">{payment.type} payment</p>
              <p className="text-sm text-muted-foreground">
                {payment.property}
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-3 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Property</span>
            <span className="text-right font-medium">{payment.property}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Room</span>
            <span className="font-medium">{payment.room}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium">{payment.date}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Status</span>
            <StatusBadge status={payment.status} />
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Transaction reference</span>
            <span className="max-w-36 truncate text-right font-mono text-xs">
              {payment.reference}
            </span>
          </div>
        </div>
        {unpaid && (
          <>
            <Separator />
            <Button size="lg" className="w-full" onClick={onPay}>
              Pay Now <ArrowUpRight data-icon="inline-end" />
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Secure payment processing by Homiee
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function Payments() {
  const [selectedId, setSelectedId] = useState("PAY-10420");
  const [paid, setPaid] = useState(false);
  const selected = useMemo(
    () => payments.find((payment) => payment.id === selectedId) ?? payments[0],
    [selectedId],
  );
  const totalPaid = payments
    .filter((payment) => payment.status === "Paid")
    .reduce((sum, payment) => sum + payment.amount, 0);
  const pending = payments
    .filter((payment) => payment.status === "Pending")
    .reduce((sum, payment) => sum + payment.amount, 0);
  const outstanding = payments
    .filter(
      (payment) => payment.status === "Pending" || payment.status === "Failed",
    )
    .reduce((sum, payment) => sum + payment.amount, 0);
  const currentSelected =
    paid && selected.status === "Pending"
      ? { ...selected, status: "Paid" }
      : selected;
  return (
    <main className="min-h-screen bg-muted/20 text-foreground">
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
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Total paid"
            value={formatMoney(totalPaid)}
            detail="Across 2 completed payments"
            icon={WalletCards}
            emphasis
          />
          <SummaryCard
            label="Pending"
            value={formatMoney(pending)}
            detail="Processing or awaiting confirmation"
            icon={Clock3}
          />
          <SummaryCard
            label="Outstanding"
            value={formatMoney(outstanding)}
            detail="Rent and bills still due"
            icon={CreditCard}
          />
          <SummaryCard
            label="Next payment"
            value={formatMoney(1200)}
            detail="Rent · Due Oct 01, 2026"
            icon={CalendarDays}
          />
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
                <Button variant="outline" size="sm">
                  <Download data-icon="inline-start" />
                  Export history
                </Button>
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
                    {payments.map((payment) => (
                      <TableRow
                        key={payment.id}
                        data-state={
                          payment.id === selectedId ? "selected" : undefined
                        }
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedId(payment.id);
                          setPaid(false);
                        }}
                      >
                        <TableCell className="font-mono text-xs font-medium">
                          {payment.id}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{payment.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="min-w-44">
                            <p className="font-medium">{payment.property}</p>
                            <p className="text-xs text-muted-foreground">
                              {payment.room}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium tabular-nums">
                          {formatMoney(payment.amount)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-muted-foreground">
                          {payment.date}
                        </TableCell>
                        <TableCell>
                          <StatusBadge
                            status={
                              paid &&
                              payment.id === selectedId &&
                              payment.status === "Pending"
                                ? "Paid"
                                : payment.status
                            }
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(event) => {
                              event.stopPropagation();
                              setSelectedId(payment.id);
                              setPaid(false);
                            }}
                          >
                            {payment.status === "Paid" ||
                            payment.status === "Refunded" ? (
                              <FileText data-icon="inline-start" />
                            ) : (
                              "Review"
                            )}
                            <span className="sr-only">
                              {" "}
                              payment {payment.id}
                            </span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <PaymentDetail
            payment={currentSelected}
            onPay={() => setPaid(true)}
          />
        </div>
      </div>
    </main>
  );
}

export { formatMoney, StatusBadge };
