import AuthLoader from "@/components/auth/auth-loader";
import AdminDashboardLoader from "@/components/loading pages/admin-dashboard-loader";
import TenantPaymentLoader from "@/components/loading pages/tenant-payment-loader";
import OwnerProperties from "@/components/owner/owner-properties";
import PropertyDetails from "@/components/property/property-details";

export default function Home() {
  return <OwnerProperties></OwnerProperties>;
}
