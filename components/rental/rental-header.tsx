import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { BuildingIcon, DoorOpenIcon, UserIcon } from "lucide-react";
import { RentalStatusBadge } from "../ui/status-badge";
import { Rental } from "./rental-data";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export function RentalHeader({ rental }: { rental: Rental }) {
  return (
    <header className="overflow-hidden rounded-xl border bg-card">
      <div className="relative h-40 w-full sm:h-48">
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <RentalStatusBadge status={rental.status} />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="font-mono text-xs text-muted-foreground">
            {rental.reference}
          </p>
          <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            {rental.property.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {rental.property.address}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <HeaderCell
          icon={<BuildingIcon className="size-4 text-muted-foreground" />}
          label="Property"
          value={rental.property.name}
          sub={rental.property.address}
        />
        <HeaderCell
          icon={<DoorOpenIcon className="size-4 text-muted-foreground" />}
          label="Room"
          value={rental.room.name}
          sub={rental.room.floor}
        />
        <div className="flex items-center gap-3 p-4">
          <Avatar className="size-9">
            <AvatarImage
              src={rental.tenant.avatar || "/placeholder.svg"}
              alt={rental.tenant.name}
            />
            <AvatarFallback>{initials(rental.tenant.name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <UserIcon className="size-3" />
              Tenant
            </div>
            <p className="truncate text-sm font-medium">{rental.tenant.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {rental.tenant.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeaderCell({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="flex flex-col gap-1 p-4">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="truncate text-sm font-medium">{value}</p>
      <p className="truncate text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}
