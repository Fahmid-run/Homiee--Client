import { RoleGuard } from "@/components/auth/role-guard";
import { ReactNode } from "react";

import TenantSidebar from "@/components/tenant/tenant-sidebar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <RoleGuard roles={["TENANT"]}>
      <TenantSidebar>{children}</TenantSidebar>
    </RoleGuard>
  );
};

export default layout;
