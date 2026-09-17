"use client";

import Image from "next/image";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Activity,
  Bell,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDollarSign,
  DoorOpen,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Receipt,
  Settings,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const navItems = [
  ["Dashboard", LayoutDashboard],
  ["Properties", Building2],
  ["Rooms", DoorOpen],
  ["Visit Requests", CalendarDays],
  ["Applications", FileText],
  ["Rentals", Home],
  ["Bills", Receipt],
  ["Documents", FileText],
  ["Profile", Users],
] as const;
const properties = [
  {
    name: "Modern Downtown Loft",
    location: "Downtown District, New York",
    image: "/property-1.png",
    total: 12,
    occupied: 10,
    available: 2,
  },
  {
    name: "Maple Heights Residence",
    location: "Brooklyn Heights, New York",
    image: "/property-2.png",
    total: 8,
    occupied: 6,
    available: 2,
  },
  {
    name: "Riverside Studios",
    location: "Long Island City, New York",
    image: "/property-3.png",
    total: 16,
    occupied: 14,
    available: 2,
  },
];
const actions = [
  [
    "Visit Requests",
    "Maya Chen",
    "Modern Downtown Loft",
    "Room 204",
    "Sep 24, 2026",
    "New",
  ],
  [
    "Visit Requests",
    "Jordan Lee",
    "Maple Heights Residence",
    "Room 103",
    "Sep 25, 2026",
    "New",
  ],
  [
    "Room Applications",
    "Sofia Williams",
    "Riverside Studios",
    "Room 308",
    "Sep 21, 2026",
    "Review",
  ],
  [
    "Room Applications",
    "Noah Brown",
    "Modern Downtown Loft",
    "Room 112",
    "Sep 20, 2026",
    "Review",
  ],
];
const chartData = [
  { month: "May", expected: 21000, collected: 19500 },
  { month: "Jun", expected: 21000, collected: 20300 },
  { month: "Jul", expected: 21000, collected: 21000 },
  { month: "Aug", expected: 23000, collected: 21800 },
  { month: "Sep", expected: 23000, collected: 22600 },
  { month: "Oct", expected: 23000, collected: 19800 },
];
const chartConfig = {
  expected: { label: "Expected rent", color: "var(--chart-2)" },
  collected: { label: "Collected rent", color: "var(--chart-1)" },
} satisfies ChartConfig;

export default function OwnerDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [reviewed, setReviewed] = useState<string[]>([]);
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
          {navItems.map(([label, Icon], i) => (
            <Button
              key={label}
              variant={i === 0 ? "secondary" : "ghost"}
              className={`justify-start gap-3 ${i === 0 ? "font-semibold text-primary" : "text-muted-foreground"}`}
            >
              <Icon data-icon="inline-start" />
              {label}
              {label === "Visit Requests" && (
                <Badge variant="outline" className="ml-auto">
                  2
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
            <p className="font-medium">Owner workspace</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Keep your properties and tenants moving forward.
            </p>
            <Button variant="link" className="mt-2 h-auto p-0 text-xs">
              View help <ChevronRight data-icon="inline-end" />
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
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">Alex Morgan</p>
              <p className="text-xs text-muted-foreground">Property owner</p>
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-7xl p-5 sm:p-8">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-muted-foreground">
                A clear view of your property portfolio.
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Owner dashboard
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button>
                <Plus data-icon="inline-start" />
                Add property
              </Button>
              <Button variant="outline">
                <Receipt data-icon="inline-start" />
                Create bill
              </Button>
              <Button variant="outline">
                <FileText data-icon="inline-start" />
                View applications
              </Button>
            </div>
          </div>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Metric
              icon={Building2}
              label="Total properties"
              value="3"
              meta="Across New York"
            />
            <Metric
              icon={DoorOpen}
              label="Total rooms"
              value="36"
              meta="30 occupied"
            />
            <Metric
              icon={Home}
              label="Occupied rooms"
              value="30"
              meta="83.3% occupancy"
              accent
            />
            <Metric
              icon={DoorOpen}
              label="Available rooms"
              value="6"
              meta="Ready to lease"
            />
          </section>
          <section className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <Metric
              icon={WalletCards}
              label="Active rentals"
              value="30"
              meta="All properties"
            />
            <Metric
              icon={FileText}
              label="Pending applications"
              value="4"
              meta="Needs your review"
              warning
            />
            <Metric
              icon={CircleDollarSign}
              label="Outstanding payments"
              value="$3,200"
              meta="Across 6 tenants"
              warning
            />
          </section>
          <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Property overview</CardTitle>
                    <CardDescription>
                      Your portfolio at a glance.
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    View all <ChevronRight data-icon="inline-end" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-3">
                {properties.map((property) => (
                  <Card
                    key={property.name}
                    className="overflow-hidden shadow-none"
                  >
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={property.image}
                        alt={property.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <p className="font-semibold">{property.name}</p>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {property.location}
                      </p>
                      <div className="mt-4 grid grid-cols-3 gap-2 border-y py-3 text-center">
                        <div>
                          <p className="font-semibold">{property.total}</p>
                          <p className="text-[10px] text-muted-foreground">
                            Rooms
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-primary">
                            {property.occupied}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            Occupied
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold">{property.available}</p>
                          <p className="text-[10px] text-muted-foreground">
                            Available
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="mt-4 w-full"
                        size="sm"
                      >
                        Manage property <ChevronRight data-icon="inline-end" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent activity</CardTitle>
                <CardDescription>
                  Important updates from your workspace.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                {[
                  [
                    "New application received",
                    "Sofia Williams applied to Room 308",
                    "2 hours ago",
                    FileText,
                  ],
                  [
                    "Payment received",
                    "$1,250 from Jamie Taylor",
                    "Yesterday",
                    CircleDollarSign,
                  ],
                  [
                    "Visit request submitted",
                    "Jordan Lee requested a visit",
                    "2 days ago",
                    CalendarDays,
                  ],
                  [
                    "Bill marked as paid",
                    "Electricity bill for August",
                    "4 days ago",
                    Check,
                  ],
                ].map(([title, desc, date, Icon]) => (
                  <div className="flex gap-3" key={String(title)}>
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{title}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {date}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Pending actions</CardTitle>
                    <CardDescription>
                      Review requests and applications.
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">4 pending</Badge>
                </div>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Property / room</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Review</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {actions.map((row) => (
                      <TableRow key={row[1]}>
                        <TableCell>
                          <Badge variant="outline">
                            {row[0] === "Visit Requests"
                              ? "Visit"
                              : "Application"}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{row[1]}</TableCell>
                        <TableCell>
                          <p>{row[2]}</p>
                          <p className="text-xs text-muted-foreground">
                            {row[3]}
                          </p>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-muted-foreground">
                          {row[4]}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              reviewed.includes(row[1])
                                ? "secondary"
                                : "default"
                            }
                          >
                            {reviewed.includes(row[1]) ? "Reviewed" : row[5]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              setReviewed((current) => [...current, row[1]])
                            }
                          >
                            {reviewed.includes(row[1]) ? "Done" : "Review"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment overview</CardTitle>
                <CardDescription>
                  Rent performance for the last six months.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-5 grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Expected</p>
                    <p className="mt-1 font-semibold">$23,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Collected</p>
                    <p className="mt-1 font-semibold text-primary">$19,800</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Outstanding</p>
                    <p className="mt-1 font-semibold text-destructive">
                      $3,200
                    </p>
                  </div>
                </div>
                <ChartContainer
                  config={chartConfig}
                  className="h-[210px] w-full"
                >
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="expected"
                      fill="var(--color-expected)"
                      radius={4}
                    />
                    <Bar
                      dataKey="collected"
                      fill="var(--color-collected)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
function Metric({
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
        <p className="mt-1 text-xs text-muted-foreground">{meta}</p>
      </CardContent>
    </Card>
  );
}
