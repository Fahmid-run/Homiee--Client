"use client";

import { CreditCard, MoreHorizontal, Search, TrendingUp } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminDashboardLoader() {
  return (
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
              <Input placeholder="Search platform..." className="w-64 pl-9" />
            </div>
            <Avatar className="size-9">
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-[1500px] flex-col gap-6 p-5 sm:p-8">
        <div className="flex items-end justify-between gap-4">
          <div className="bg-gray-200 p-5 rounded-2xl w-50 "></div>

          <Button variant="outline" size="sm">
            <TrendingUp data-icon="inline-start" />
            View analytics
          </Button>
        </div>
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
          {[...new Array(10)].map(() => (
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground"></span>
                  <Badge variant="secondary" className="text-[10px]"></Badge>
                </div>
                <p className="mt-4 text-xs text-muted-foreground"></p>
                <p className="mt-1 text-xl font-semibold tracking-tight"></p>
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
                    {[...new Array(10)]?.map((userData) => (
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="size-8">
                              <AvatarFallback className="text-xs"></AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium bg-gray-300 rounded-2xl"></p>
                              <p className="text-xs text-muted-foreground bg-gray-300 rounded-2xl"></p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">.</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground  rounded-2xl"></TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              status === "Active" ? "secondary" : "outline"
                            }
                          >
                            {userData?.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Payment overview</CardTitle>
                  <CardDescription>
                    Current platform payment health.
                  </CardDescription>
                </div>
                <CreditCard className="text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="rounded-xl bg-primary p-4 text-primary-foreground h-40"></div>
              {[
                ["Successful payments", "1,842", "76.4%"],
                ["Pending payments", "214", "8.9%"],
                ["Failed payments", "63", "2.6%"],
              ].map(([label, value, percent], i) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`size-2.5 rounded-full ${i === 0 ? "bg-primary" : i === 1 ? "bg-muted-foreground" : "bg-destructive"}`}
                    />
                    <span className="text-sm">{label}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{value}</p>
                    <p className="text-xs text-muted-foreground">{percent}</p>
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
                  <CardTitle className="text-lg">Property overview</CardTitle>
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
                  {[...new Array(5)]?.map((propertyData) => (
                    <TableRow key={propertyData?.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium"></p>
                          <p className="text-xs text-muted-foreground"></p>
                        </div>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-muted-foreground"></TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            status === "Active" ? "secondary" : "outline"
                          }
                        ></Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export { AdminDashboardLoader };
