import { RoleGuard } from "@/components/auth/role-guard";
import OwnerSidebar from "@/components/owner/owner-sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <RoleGuard roles={["PROPERTY_OWNER"]}>
      <OwnerSidebar>{children}</OwnerSidebar>
    </RoleGuard>
  );
};

export default layout;
