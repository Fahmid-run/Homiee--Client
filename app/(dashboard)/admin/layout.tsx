import { RoleGuard } from "@/components/auth/role-guard";
import { ReactNode } from "react";

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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AdminSidebar from "@/components/admin/admin-sidebar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <RoleGuard roles={["ADMIN"]}>
      <AdminSidebar>{children}</AdminSidebar>
    </RoleGuard>
  );
};

export default layout;
