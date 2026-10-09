"use client";
import React, { ReactNode, useState } from "react";
import {
  Building2,
  CalendarDays,
  ChevronRight,
  CreditCard,
  DoorOpen,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Receipt,
  Settings,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { toast } from "../ui/toast";
import { logout } from "@/utils/logout";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { Card, CardContent } from "../ui/card";

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
function OwnerSidebar({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    toast.add({
      type: "sucess",
      description: "Logout Success!!",
    });

    router.push("/auth");
  };
  return (
    <div className="min-h-screen bg-muted/20 text-foreground">
      <div className="flex min-h-screen">
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
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}

export default OwnerSidebar;
