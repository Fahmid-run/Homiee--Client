import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { FileTextIcon } from "lucide-react";
import { PaymentStatusBadge } from "../ui/status-badge";
import { formatCurrency, formatDate, type Rental } from "./rental-data";

export function RentalInformation({ rental }: { rental: Rental }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileTextIcon className="size-4 text-muted-foreground" />
          Rental Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
          <InfoRow label="Monthly rent">
            <span className="text-base font-semibold tabular-nums">
              {formatCurrency(rental.monthlyRent, rental.currency)}
            </span>
            <span className="text-xs text-muted-foreground"> / month</span>
          </InfoRow>
          <InfoRow label="Security deposit">
            <span className="tabular-nums">
              {formatCurrency(rental.deposit, rental.currency)}
            </span>
          </InfoRow>
          <InfoRow label="Rental start date">
            {formatDate(rental.startDate)}
          </InfoRow>
          <InfoRow label="Rental end date">
            {rental.endDate ? (
              formatDate(rental.endDate)
            ) : (
              <span className="text-muted-foreground">Open-ended</span>
            )}
          </InfoRow>
          <InfoRow label="Payment status">
            <PaymentStatusBadge status={rental.paymentStatus} />
          </InfoRow>
          <InfoRow label="Created date">
            {formatDate(rental.createdDate)}
          </InfoRow>
        </dl>
      </CardContent>
    </Card>
  );
}

function InfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 bg-card p-4">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium">{children}</dd>
    </div>
  );
}
