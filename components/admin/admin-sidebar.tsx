import React, { ReactNode } from "react";
import {
  Building2,
  CreditCard,
  DoorOpen,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  UserRound,
  Users,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
function AdminSidebar({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20 text-foreground">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-border/70 bg-background lg:flex lg:flex-col sticky">
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
              </div>
              <Settings className="ml-auto text-muted-foreground" />
            </div>
          </div>
        </aside>

        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}

export default AdminSidebar;
