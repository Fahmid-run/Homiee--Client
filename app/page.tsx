import AuthLoader from "@/components/auth/auth-loader";
import AdminDashboardLoader from "@/components/loading pages/admin-dashboard-loader";
import TenantPaymentLoader from "@/components/loading pages/tenant-payment-loader";

export default function Home() {
  return <TenantPaymentLoader></TenantPaymentLoader>;
}
