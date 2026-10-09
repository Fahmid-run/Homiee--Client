"use client";
import React, { ReactNode } from "react";

import {
  ArrowUpRight,
  CircleDollarSign,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Receipt,
  Search,
  Settings,
  Sparkles,
  WalletCards,
  X,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/logout";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true, to: "/" },
  { label: "Properties", icon: Home, to: "/" },
  { label: "Visit Requests", icon: Search, count: "2", to: "/" },
  { label: "Applications", icon: FileText, to: "/" },
  { label: "My Rental", icon: WalletCards, to: "/" },
  { label: "Payments", icon: CircleDollarSign, to: "/" },
  { label: "Bills", icon: Receipt, count: "1", to: "/" },
  { label: "Documents", icon: FileText, to: "/documents" },
];

function TenantSidebar({ children }: { children: ReactNode }) {
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
              Homiee<span className="text-primary">.</span>
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
            {navItems.map(({ label, icon: Icon, active, count, to }) => (
              <Link href={`/tenant${to}`} key={label}>
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
              </Link>
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
              onClick={handleLogout}
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

        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}

export default TenantSidebar;
