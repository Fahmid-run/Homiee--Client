"use client";

import {
  Activity,
  Building2,
  CreditCard,
  DoorOpen,
  Home,
  LayoutDashboard,
  LogOut,
  MoreHorizontal,
  Search,
  Settings,
  ShieldCheck,
  TrendingUp,
  UserRound,
  Users,
  WalletCards,
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const metrics = [
  { label: "Total users", value: "2,847", change: "+12.5%", icon: Users },
  { label: "Total owners", value: "486", change: "+8.2%", icon: UserRound },
  {
    label: "Total tenants",
    value: "2,361",
    change: "+14.1%",
    icon: ShieldCheck,
  },
  { label: "Properties", value: "742", change: "+6.8%", icon: Building2 },
  { label: "Rooms", value: "3,184", change: "+9.4%", icon: DoorOpen },
  { label: "Active rentals", value: "2,109", change: "+11.2%", icon: Home },
  {
    label: "Total payments",
    value: "$428.6K",
    change: "+18.7%",
    icon: WalletCards,
  },
];

const users = [
  [
    "Olivia Martin",
    "olivia.martin@email.com",
    "Tenant",
    "Sep 22, 2026",
    "Active",
    "OM",
  ],
  [
    "Ethan Williams",
    "ethan.williams@email.com",
    "Owner",
    "Sep 21, 2026",
    "Active",
    "EW",
  ],
  [
    "Sophia Brown",
    "sophia.brown@email.com",
    "Tenant",
    "Sep 20, 2026",
    "Active",
    "SB",
  ],
  [
    "James Anderson",
    "james.anderson@email.com",
    "Owner",
    "Sep 19, 2026",
    "Pending",
    "JA",
  ],
];

const properties = [
  [
    "Maple Heights Residence",
    "Austin, TX",
    "48 rooms",
    "Sep 22, 2026",
    "Active",
  ],
  ["The Franklin Lofts", "Dallas, TX", "32 rooms", "Sep 20, 2026", "Active"],
  ["Oakwood Commons", "Houston, TX", "24 rooms", "Sep 18, 2026", "Review"],
];

const activities = [
  [
    "New property listed",
    "Maple Heights Residence was added by Ethan Williams",
    "8 min ago",
    Building2,
  ],
  [
    "Payment received",
    "PAY-10482 completed by Olivia Martin",
    "34 min ago",
    CreditCard,
  ],
  [
    "New user registered",
    "James Anderson joined as an owner",
    "1 hr ago",
    UserRound,
  ],
  [
    "Rental agreement signed",
    "Room 204 at The Franklin Lofts",
    "2 hrs ago",
    Home,
  ],
];

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-muted/20 text-foreground">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-border/70 bg-background lg:flex lg:flex-col">
          <div className="flex h-16 items-center gap-3 border-b border-border/70 px-6">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Home />
            </div>
            <span className="text-lg font-semibold tracking-tight">homiee</span>
            <Badge variant="secondary" className="ml-auto text-[10px]">
              Admin
            </Badge>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-4">
            <p className="px-3 pb-2 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Workspace
            </p>
            {[
              ["Dashboard", LayoutDashboard],
              ["Users", Users],
              ["Properties", Building2],
              ["Rooms", DoorOpen],
              ["Rentals", Home],
              ["Payments", CreditCard],
            ].map(([label, Icon], index) => (
              <Button
                key={String(label)}
                variant={index === 0 ? "secondary" : "ghost"}
                className="justify-start gap-3"
              >
                <Icon data-icon="inline-start" />
                {String(label)}
              </Button>
            ))}
            <p className="px-3 pb-2 pt-7 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Account
            </p>
            <Button variant="ghost" className="justify-start gap-3">
              <UserRound data-icon="inline-start" />
              Profile
            </Button>
            <Button variant="ghost" className="justify-start gap-3">
              <LogOut data-icon="inline-start" />
              Logout
            </Button>
          </nav>
          <div className="border-t border-border/70 p-4">
            <div className="flex items-center gap-3 rounded-lg p-2">
              <Avatar className="size-9">
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">Admin account</p>
                <p className="truncate text-xs text-muted-foreground">
                  admin@homiee.co
                </p>
              </div>
              <Settings className="ml-auto text-muted-foreground" />
            </div>
          </div>
        </aside>
        <section className="min-w-0 flex-1">
          <header className="border-b border-border/70 bg-background">
            <div className="flex h-16 items-center justify-between gap-4 px-5 sm:px-8">
              <div>
                <p className="text-sm text-muted-foreground">
                  Workspace / Dashboard
                </p>
                <h1 className="text-xl font-semibold tracking-tight">
                  Admin dashboard
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-2.5 text-muted-foreground" />
                  <Input
                    placeholder="Search platform..."
                    className="w-64 pl-9"
                  />
                </div>
                <Avatar className="size-9">
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>
          <div className="mx-auto flex max-w-[1500px] flex-col gap-6 p-5 sm:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Monday, September 22, 2026
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                  Good morning, Admin
                </h2>
              </div>
              <Button variant="outline" size="sm">
                <TrendingUp data-icon="inline-start" />
                View analytics
              </Button>
            </div>
            <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
              {metrics.map(({ label, value, change, icon: Icon }) => (
                <Card key={label} className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                        <Icon />
                      </span>
                      <Badge variant="secondary" className="text-[10px]">
                        {change}
                      </Badge>
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-1 text-xl font-semibold tracking-tight">
                      {value}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </section>
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
              <Card className="overflow-hidden shadow-sm">
                <CardHeader className="border-b border-border/60">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Recent users</CardTitle>
                      <CardDescription>
                        Latest accounts across the platform.
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">
                      View all
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Registered</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map(
                          ([name, email, role, date, status, initials]) => (
                            <TableRow key={email}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="size-8">
                                    <AvatarFallback className="text-xs">
                                      {initials}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {email}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{role}</Badge>
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {date}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    status === "Active"
                                      ? "secondary"
                                      : "outline"
                                  }
                                >
                                  {status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ),
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        Payment overview
                      </CardTitle>
                      <CardDescription>
                        Current platform payment health.
                      </CardDescription>
                    </div>
                    <CreditCard className="text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="rounded-xl bg-primary p-4 text-primary-foreground">
                    <p className="text-sm opacity-80">Total processed</p>
                    <p className="mt-1 text-3xl font-semibold">$428,642</p>
                    <p className="mt-1 text-xs opacity-70">
                      +18.7% from last month
                    </p>
                  </div>
                  {[
                    ["Successful payments", "1,842", "76.4%"],
                    ["Pending payments", "214", "8.9%"],
                    ["Failed payments", "63", "2.6%"],
                  ].map(([label, value, percent], i) => (
                    <div
                      key={label}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`size-2.5 rounded-full ${i === 0 ? "bg-primary" : i === 1 ? "bg-muted-foreground" : "bg-destructive"}`}
                        />
                        <span className="text-sm">{label}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{value}</p>
                        <p className="text-xs text-muted-foreground">
                          {percent}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
              <Card className="overflow-hidden shadow-sm">
                <CardHeader className="border-b border-border/60">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        Property overview
                      </CardTitle>
                      <CardDescription>
                        Recently created properties.
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">
                      View all
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Rooms</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {properties.map(
                        ([name, location, rooms, date, status]) => (
                          <TableRow key={name}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {location}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>{rooms}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {date}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  status === "Active" ? "secondary" : "outline"
                                }
                              >
                                {status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ),
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Recent activity</CardTitle>
                  <CardDescription>
                    Platform events in real time.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-5">
                    {activities.map(
                      ([title, description, time, Icon], index) => (
                        <div key={String(title)} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                              <Icon />
                            </div>
                            {index < activities.length - 1 && (
                              <Separator
                                orientation="vertical"
                                className="mt-2 h-7"
                              />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium">
                              {String(title)}
                            </p>
                            <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                              {String(description)}
                            </p>
                            <p className="mt-1 text-[11px] text-muted-foreground">
                              {String(time)}
                            </p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export { AdminDashboard };
