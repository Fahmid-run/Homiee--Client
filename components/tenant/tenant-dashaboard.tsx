"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Bell,
  Check,
  ChevronRight,
  CircleDollarSign,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreHorizontal,
  Receipt,
  Search,
  Settings,
  Sparkles,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Properties", icon: Home },
  { label: "Visit Requests", icon: Search, count: "2" },
  { label: "Applications", icon: FileText },
  { label: "My Rental", icon: WalletCards },
  { label: "Payments", icon: CircleDollarSign },
  { label: "Bills", icon: Receipt, count: "1" },
  { label: "Documents", icon: FileText },
];

const payments = [
  {
    label: "Rent",
    date: "Oct 01, 2026",
    amount: "$1,250.00",
    status: "Due soon",
    tone: "warning",
  },
  {
    label: "Electricity bill",
    date: "Sep 28, 2026",
    amount: "$42.80",
    status: "Pending",
    tone: "muted",
  },
  {
    label: "Internet",
    date: "Sep 25, 2026",
    amount: "$29.00",
    status: "Paid",
    tone: "success",
  },
];

const activity = [
  ["Application submitted", "Modern Downtown Loft", "2 days ago", "FileText"],
  [
    "Visit accepted",
    "Your visit is confirmed for Sep 24",
    "4 days ago",
    "Check",
  ],
  [
    "Payment completed",
    "September rent payment",
    "Sep 01, 2026",
    "CircleDollarSign",
  ],
  ["Bill generated", "Electricity bill for August", "Aug 28, 2026", "Receipt"],
];

export default function TenantDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paid, setPaid] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-muted/30 text-foreground">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r bg-background p-5 transition-transform lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-2">
          <a href="#" className="text-2xl font-bold tracking-tight">
            homiee<span className="text-primary">.</span>
          </a>
          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X />
          </Button>
        </div>
        <div className="mt-10 flex flex-1 flex-col gap-1">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Workspace
          </p>
          {navItems.map(({ label, icon: Icon, active, count }) => (
            <Button
              key={label}
              variant={active ? "secondary" : "ghost"}
              className={`justify-start gap-3 ${active ? "font-semibold text-primary" : "text-muted-foreground"}`}
            >
              <Icon data-icon="inline-start" />
              {label}
              {count && (
                <Badge variant="outline" className="ml-auto">
                  {count}
                </Badge>
              )}
            </Button>
          ))}
          <Separator className="my-6" />
          <Button
            variant="ghost"
            className="justify-start gap-3 text-muted-foreground"
          >
            <Settings data-icon="inline-start" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-3 text-muted-foreground"
          >
            <LogOut data-icon="inline-start" />
            Logout
          </Button>
        </div>
        <Card className="border-primary/15 bg-primary/5 shadow-none">
          <CardContent className="p-4">
            <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Sparkles />
            </div>
            <p className="font-medium">Need a hand?</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Our support team is here for your rental journey.
            </p>
            <Button variant="link" className="mt-2 h-auto p-0 text-xs">
              Contact support <ArrowUpRight data-icon="inline-end" />
            </Button>
          </CardContent>
        </Card>
      </aside>

      {mobileOpen && (
        <button
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
        />
      )}
      <div className="lg:pl-72">
        <header className="flex h-20 items-center justify-between border-b bg-background/80 px-5 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu />
            </Button>
            <div>
              <p className="text-sm text-muted-foreground">
                Tuesday, September 22, 2026
              </p>
              <h1 className="text-lg font-semibold sm:text-xl">
                Good morning, Alex
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button size="icon" variant="outline" aria-label="Notifications">
              <Bell />
            </Button>
            <Separator orientation="vertical" className="hidden h-8 sm:block" />
            <Avatar className="size-9">
              <AvatarImage src="/placeholder-user.jpg" alt="Alex Morgan" />
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">Alex Morgan</p>
              <p className="text-xs text-muted-foreground">Tenant</p>
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-7xl p-5 sm:p-8">
          <div className="mb-8">
            <p className="text-muted-foreground">
              Here&apos;s what&apos;s happening with your rental.
            </p>
          </div>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Summary
              icon={Home}
              label="Active rental"
              value="1"
              meta="Modern Downtown Loft"
            />
            <Summary
              icon={CircleDollarSign}
              label="Next rent"
              value="$1,250"
              meta="Due in 9 days"
              accent
            />
            <Summary
              icon={FileText}
              label="Pending applications"
              value="2"
              meta="Awaiting response"
            />
            <Summary
              icon={Receipt}
              label="Outstanding bills"
              value="$42.80"
              meta="1 bill to review"
              warning
            />
          </section>
          <div className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
            <Card className="overflow-hidden">
              <CardHeader className="flex-row items-start justify-between border-b bg-primary/5">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    Current rental
                  </p>
                  <CardTitle>Modern Downtown Loft</CardTitle>
                  <CardDescription className="mt-1">
                    Downtown District, New York
                  </CardDescription>
                </div>
                <Badge>Active</Badge>
              </CardHeader>
              <CardContent className="grid gap-6 p-5 sm:grid-cols-[180px_1fr] sm:p-6">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:aspect-square">
                  <Image
                    src="/property-1.png"
                    alt="Modern Downtown Loft"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between gap-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="text-xs text-muted-foreground">Room</p>
                      <p className="mt-1 font-medium">Room 204</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Monthly rent
                      </p>
                      <p className="mt-1 font-medium">$1,250 / month</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Next payment
                      </p>
                      <p className="mt-1 font-medium">Oct 01, 2026</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Lease ends
                      </p>
                      <p className="mt-1 font-medium">Aug 31, 2027</p>
                    </div>
                  </div>
                  <Button className="w-full sm:w-fit">
                    View rental <ChevronRight data-icon="inline-end" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Quick actions</CardTitle>
                    <CardDescription>
                      Common tasks, one click away.
                    </CardDescription>
                  </div>
                  <MoreHorizontal className="text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <QuickAction icon={Search} label="Browse properties" />
                <QuickAction icon={WalletCards} label="View rental" />
                <QuickAction icon={CircleDollarSign} label="Pay rent" />
                <QuickAction icon={Receipt} label="View bills" />
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Upcoming payments</CardTitle>
                    <CardDescription>
                      Your next scheduled payments.
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    View all <ChevronRight data-icon="inline-end" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {payments.map((payment) => (
                  <div
                    key={payment.label}
                    className="flex flex-wrap items-center gap-4 rounded-xl border p-4"
                  >
                    <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                      <CircleDollarSign className="text-primary" />
                    </div>
                    <div className="min-w-28 flex-1">
                      <p className="font-medium">{payment.label}</p>
                      <p className="text-xs text-muted-foreground">
                        Due {payment.date}
                      </p>
                    </div>
                    <Badge
                      variant={
                        payment.tone === "success"
                          ? "secondary"
                          : payment.tone === "warning"
                            ? "default"
                            : "outline"
                      }
                    >
                      {paid === payment.label ? "Paid" : payment.status}
                    </Badge>
                    <p className="font-semibold">{payment.amount}</p>
                    {payment.status !== "Paid" && (
                      <Button
                        size="sm"
                        variant={
                          payment.label === "Rent" ? "default" : "outline"
                        }
                        onClick={() => setPaid(payment.label)}
                      >
                        {paid === payment.label ? (
                          <>
                            <Check data-icon="inline-start" />
                            Paid
                          </>
                        ) : (
                          "Pay"
                        )}
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent activity</CardTitle>
                <CardDescription>Stay up to date.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-5">
                  {activity.map(([title, description, date, icon]) => {
                    const Icon =
                      icon === "Check"
                        ? Check
                        : icon === "CircleDollarSign"
                          ? CircleDollarSign
                          : icon === "Receipt"
                            ? Receipt
                            : FileText;
                    return (
                      <div key={title} className="flex gap-3">
                        <div className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon />
                          <span className="absolute left-1/2 top-8 h-6 w-px bg-border last:hidden" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium">{title}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {description}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {date}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

function Summary({
  icon: Icon,
  label,
  value,
  meta,
  accent,
  warning,
}: {
  icon: typeof Home;
  label: string;
  value: string;
  meta: string;
  accent?: boolean;
  warning?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div
            className={`flex size-10 items-center justify-center rounded-xl ${warning ? "bg-destructive/10 text-destructive" : accent ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
          >
            <Icon />
          </div>
          {warning && <Badge variant="destructive">Action needed</Badge>}
        </div>
        <p className="mt-5 text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
        <p className="mt-1 truncate text-xs text-muted-foreground">{meta}</p>
      </CardContent>
    </Card>
  );
}
function QuickAction({
  icon: Icon,
  label,
}: {
  icon: typeof Home;
  label: string;
}) {
  return (
    <Button
      variant="outline"
      className="h-auto flex-col items-start gap-3 p-4 text-left"
    >
      <Icon className="text-primary" />
      <span className="text-xs font-medium">{label}</span>
    </Button>
  );
}
