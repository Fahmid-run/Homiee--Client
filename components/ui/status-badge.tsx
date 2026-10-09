import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import {
  CircleCheckIcon,
  CircleDotIcon,
  ClockIcon,
  TriangleAlertIcon,
  XCircleIcon,
} from "lucide-react";
import type { PaymentStatus, RentalStatus } from "../rental/rental-data";

const rentalStatusConfig: Record<
  RentalStatus,
  { label: string; className: string; icon: typeof CircleDotIcon }
> = {
  active: {
    label: "Active",
    className:
      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    icon: CircleCheckIcon,
  },
  pending: {
    label: "Pending",
    className:
      "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    icon: ClockIcon,
  },
  ended: {
    label: "Ended",
    className: "bg-muted text-muted-foreground border-border",
    icon: CircleDotIcon,
  },
  terminated: {
    label: "Terminated",
    className: "bg-destructive/10 text-destructive border-destructive/20",
    icon: XCircleIcon,
  },
};

const paymentStatusConfig: Record<
  PaymentStatus,
  { label: string; className: string; icon: typeof CircleDotIcon }
> = {
  paid: {
    label: "Paid",
    className:
      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    icon: CircleCheckIcon,
  },
  due: {
    label: "Due",
    className:
      "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    icon: ClockIcon,
  },
  overdue: {
    label: "Overdue",
    className: "bg-destructive/10 text-destructive border-destructive/20",
    icon: TriangleAlertIcon,
  },
  processing: {
    label: "Processing",
    className:
      "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
    icon: CircleDotIcon,
  },
};

export function RentalStatusBadge({ status }: { status: RentalStatus }) {
  const config = rentalStatusConfig[status];
  const Icon = config.icon;
  return (
    <Badge variant="outline" className={cn(config.className)}>
      <Icon data-icon="inline-start" />
      {config.label}
    </Badge>
  );
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const config = paymentStatusConfig[status];
  const Icon = config.icon;
  return (
    <Badge variant="outline" className={cn(config.className)}>
      <Icon data-icon="inline-start" />
      {config.label}
    </Badge>
  );
}
