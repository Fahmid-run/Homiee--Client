"use client";

import { useState } from "react";

import { RentalHeader } from "../rental/rental-header";
import { RentalInformation } from "../rental/rental-information";
import { PaymentSection } from "../rental/payemnt-section";
import { rental } from "../rental/rental-data";

export type Role = "tenant" | "owner";

export function RentalManagement() {
  const [role, setRole] = useState<Role>("tenant");

  return (
    <div className="mx-auto  w-full    px-4 py-8 sm:px-6 lg:py-12 ">
      <div className="lg:pl-72 flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Rental Management
            </p>
            <h2 className="text-lg font-semibold">Contract & payment record</h2>
          </div>
        </div>

        <RentalHeader rental={rental} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <RentalInformation rental={rental} />
            <PaymentSection rental={rental} role={role} />
          </div>
        </div>
      </div>
    </div>
  );
}
