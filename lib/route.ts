type UserRole = "TENANT" | "ADMIN" | "PROPERTY_OWNER";

export const DASHBOARD_BY_ROLE: Record<UserRole, string> = {
  ADMIN: "/admin",
  TENANT: "/tenant",
  PROPERTY_OWNER: "/owner",
};

export const getDashboard = (role: UserRole) => DASHBOARD_BY_ROLE[role] ?? "/";
