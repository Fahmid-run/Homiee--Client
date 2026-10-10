"use client";

import PropertyDetails from "@/components/property/property-details";
import { useGetPropertyById } from "@/hooks/properties.hook";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PropertyFetcher() {
  const pathname = usePathname(); // e.g. "/properties/fa03d593-5535-4172-88c0-f371ab898e14"

  const segments = pathname.split("/");
  const slug =
    segments[segments.length - 1] === "detail"
      ? null
      : segments[segments.length - 1];

  const { data, isPending, isError } = useGetPropertyById(slug as string);

  if (!slug || isPending) return <div>Loading property details...</div>;
  if (isError) return <div>Error loading property.</div>;

  return <PropertyDetails slug={slug} data={data?.data} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading property details...</div>}>
      <PropertyFetcher />
    </Suspense>
  );
}
