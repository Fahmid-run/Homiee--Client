"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  FileText,
  Paperclip,
  Plus,
  Receipt,
  Upload,
  Users,
  WalletCards,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const roommates = [
  { name: "Tenant A", initials: "TA", status: "Paid" },
  { name: "Tenant B", initials: "TB", status: "Pending" },
  { name: "Tenant C", initials: "TC", status: "Paid" },
  { name: "Tenant D", initials: "TD", status: "Pending" },
];

function Money({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`font-mono tracking-tight ${className}`}>{children}</span>
  );
}

function StatusBadge({ paid }: { paid: boolean }) {
  return (
    <Badge
      variant="outline"
      className={
        paid
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
          : "border-amber-500/30 bg-amber-500/10 text-amber-300"
      }
    >
      {paid && <Check data-icon="inline-start" />}
      {paid ? "Paid" : "Pending"}
    </Badge>
  );
}

function BillCreation() {
  const [amount, setAmount] = useState("120");
  const [roommatesCount, setRoommatesCount] = useState("4");
  const [created, setCreated] = useState(false);
  const perPerson = useMemo(() => {
    const total = Number(amount) || 0;
    const count = Number(roommatesCount) || 1;
    return (total / count).toFixed(2);
  }, [amount, roommatesCount]);

  return (
    <Card className="border-border/70 bg-card/80 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-border/60">
        <div>
          <CardTitle className="text-lg">Create shared bill</CardTitle>
          <CardDescription className="mt-1">
            Split one bill fairly across everyone in the home.
          </CardDescription>
        </div>
        <Badge variant="secondary" className="gap-1.5">
          <Receipt data-icon="inline-start" />
          Owner
        </Badge>
      </CardHeader>
      <CardContent className="grid gap-8 p-6 lg:grid-cols-[1fr_300px]">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="property">Property</Label>
            <Select defaultValue="maple">
              <SelectTrigger id="property">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maple">Maple Heights Residence</SelectItem>
                <SelectItem value="riverside">Riverside Studios</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="room">Rental / Room</Label>
            <Select defaultValue="whole">
              <SelectTrigger id="room">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="whole">
                  Whole property · 4 roommates
                </SelectItem>
                <SelectItem value="room-1">Room 1 · Alex</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Bill title</Label>
            <Input id="title" defaultValue="Electricity Bill" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Bill type</Label>
            <Select defaultValue="utilities">
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="internet">Internet</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Total amount</Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-2.5 text-muted-foreground">
                $
              </span>
              <Input
                id="amount"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="pl-7"
                inputMode="decimal"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="due">Due date</Label>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-2.5 text-muted-foreground" />
              <Input
                id="due"
                type="date"
                defaultValue="2026-10-15"
                className="pl-10"
              />
            </div>
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="description">
              Description{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </Label>
            <Input
              id="description"
              placeholder="Add a note for your roommates"
            />
          </div>
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border/80 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted/40 sm:col-span-2">
            <Upload />
            <span>
              <span className="font-medium text-foreground">Attach a bill</span>
              <span className="ml-2">PDF, JPG, or PNG up to 10MB</span>
            </span>
            <Input type="file" className="sr-only" />
          </label>
          <Button
            className="sm:col-span-2 sm:w-fit"
            onClick={() => setCreated(true)}
          >
            <Plus data-icon="inline-start" />
            {created ? "Bill created" : "Create shared bill"}
          </Button>
        </div>
        <div className="rounded-2xl border border-primary/25 bg-primary/10 p-5 lg:self-start">
          <div className="mb-7 flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                Live preview
              </p>
              <h3 className="mt-2 text-lg font-semibold">Electricity Bill</h3>
            </div>
            <WalletCards className="text-primary" />
          </div>
          <div className="flex items-end justify-between border-b border-primary/20 pb-4">
            <span className="text-sm text-muted-foreground">Total</span>
            <Money className="text-2xl font-semibold">
              ${Number(amount || 0).toFixed(2)}
            </Money>
          </div>
          <div className="flex items-center justify-between py-4 text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Users />
              Roommates
            </span>
            <span className="font-semibold">{roommatesCount}</span>
          </div>
          <div className="rounded-xl bg-background/70 p-4 text-center">
            <p className="text-xs text-muted-foreground">Per-person share</p>
            <Money className="mt-1 block text-3xl font-semibold text-primary">
              ${perPerson}
            </Money>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Homiee calculates each share automatically.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function BillDetails() {
  const [tab, setTab] = useState("details");
  const paid = 60;
  return (
    <Card className="border-border/70 bg-card/80 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-border/60">
        <div>
          <CardTitle className="text-lg">Electricity Bill</CardTitle>
          <CardDescription className="mt-1 flex items-center gap-2">
            <FileText />
            Maple Heights Residence · Due Oct 15, 2026
          </CardDescription>
        </div>
        <Badge
          variant="outline"
          className="border-amber-500/30 bg-amber-500/10 text-amber-300"
        >
          2 pending
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={tab} onValueChange={setTab}>
          <div className="border-b border-border/60 px-6">
            <TabsList className="h-12 bg-transparent">
              <TabsTrigger value="details">Bill details</TabsTrigger>
              <TabsTrigger value="tenant">Tenant view</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="details"
            className="m-0 grid gap-8 p-6 lg:grid-cols-[1fr_260px]"
          >
            <div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-muted/40 p-4">
                  <p className="text-xs text-muted-foreground">Total bill</p>
                  <Money className="mt-1 block text-2xl font-semibold">
                    $120.00
                  </Money>
                </div>
                <div className="rounded-xl bg-muted/40 p-4">
                  <p className="text-xs text-muted-foreground">Roommates</p>
                  <span className="mt-1 block text-2xl font-semibold">4</span>
                </div>
                <div className="rounded-xl bg-primary/10 p-4">
                  <p className="text-xs text-primary">Per person</p>
                  <Money className="mt-1 block text-2xl font-semibold text-primary">
                    $30.00
                  </Money>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="mb-3 font-semibold">Roommate breakdown</h3>
                <div className="overflow-hidden rounded-xl border border-border/70">
                  <div className="grid grid-cols-[1fr_auto_auto] gap-4 bg-muted/30 px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <span>Roommate</span>
                    <span>Share</span>
                    <span>Status</span>
                  </div>
                  {roommates.map((roommate, index) => (
                    <div
                      key={roommate.name}
                      className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-t border-border/60 px-4 py-3.5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid size-8 place-items-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                          {roommate.initials}
                        </div>
                        <span className="font-medium">{roommate.name}</span>
                      </div>
                      <Money>$30.00</Money>
                      <StatusBadge paid={index % 3 === 0 || index === 2} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border/70 bg-muted/20 p-5">
              <p className="text-sm font-medium">Payment progress</p>
              <div className="mt-5 flex items-end justify-between">
                <Money className="text-2xl font-semibold">${paid}</Money>
                <span className="text-sm text-muted-foreground">of $120</span>
              </div>
              <Progress value={(paid / 120) * 100} className="mt-3" />
              <div className="mt-4 grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount paid</span>
                  <Money>$60.00</Money>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remaining</span>
                  <Money>$60.00</Money>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="tenant" className="m-0 p-6">
            <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
              <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-primary-foreground/70">
                      Your share
                    </p>
                    <Money className="mt-2 block text-5xl font-semibold">
                      $30.00
                    </Money>
                  </div>
                  <WalletCards className="text-primary-foreground/70" />
                </div>
                <div className="mt-8 grid gap-2 text-sm text-primary-foreground/75">
                  <span>Due date · October 15, 2026</span>
                  <span>Payment status · Pending</span>
                </div>
                <Button
                  variant="secondary"
                  className="mt-6 w-full text-primary"
                  onClick={() => setTab("details")}
                >
                  Pay bill
                </Button>
              </div>
              <div className="rounded-2xl border border-border/70 p-5">
                <p className="font-semibold">Your bill at a glance</p>
                <div className="mt-5 grid gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total bill</span>
                    <Money>$120.00</Money>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Your responsibility
                    </span>
                    <Money>$30.00</Money>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount paid</span>
                    <Money>$0.00</Money>
                  </div>
                  <div className="flex justify-between border-t border-border/60 pt-4">
                    <span className="font-medium">Amount remaining</span>
                    <Money className="font-semibold">$30.00</Money>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default function SharedBills() {
  return (
    <main className="min-h-screen bg-muted/20 text-foreground">
      <header className="border-b border-border/70 bg-background">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8">
          <p className="text-sm text-muted-foreground">
            Homiee workspace / Shared bills
          </p>
          <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Shared bills
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Create one bill. Homiee handles the split.
              </p>
            </div>
            <Button variant="outline">
              <ChevronDown data-icon="inline-start" />
              Maple Heights Residence
            </Button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 p-5 sm:p-8">
        <BillCreation />
        <BillDetails />
      </div>
    </main>
  );
}
