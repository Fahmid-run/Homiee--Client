"use client";

import { useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FilterPanel, { Filters } from "@/components/property/filter-panel";
import PropertyCard from "@/components/property/property-card";
import SortDropdown from "@/components/property/sort-dropdown";

const properties = [
  {
    id: 1,
    name: "Modern Downtown Loft",
    location: "Downtown District",
    description:
      "Stylish loft with floor-to-ceiling windows and contemporary finishes.",
    image: "/property-1.png",
    price: 2500,
    availableRooms: 2,
    amenities: ["Gym", "Parking", "Rooftop"],
    propertyType: "Apartment",
  },
  {
    id: 2,
    name: "Cozy Studio Near Park",
    location: "Green Valley",
    description:
      "An intimate studio for professionals, close to shopping and green space.",
    image: "/property-2.png",
    price: 1200,
    availableRooms: 1,
    amenities: ["Garden", "WiFi", "Pet-friendly"],
    propertyType: "Studio",
  },
  {
    id: 3,
    name: "Luxury Family Home",
    location: "Suburban Heights",
    description:
      "Spacious home with modern amenities and a generous private backyard.",
    image: "/property-3.png",
    price: 4000,
    availableRooms: 4,
    amenities: ["Pool", "Parking", "Gym"],
    propertyType: "House",
  },
  {
    id: 4,
    name: "Tech Hub Shared Space",
    location: "Innovation District",
    description:
      "A vibrant shared living concept with community spaces and coworking.",
    image: "/property-4.png",
    price: 1800,
    availableRooms: 1,
    amenities: ["Coworking", "Events", "Parking"],
    propertyType: "Co-living",
  },
  {
    id: 5,
    name: "Riverside Penthouse",
    location: "Waterfront",
    description: "Upscale penthouse with panoramic views and premium finishes.",
    image: "/property-5.png",
    price: 5500,
    availableRooms: 3,
    amenities: ["Concierge", "Spa", "Restaurant"],
    propertyType: "Apartment",
  },
  {
    id: 6,
    name: "Urban Garden Townhouse",
    location: "Arts District",
    description:
      "Contemporary townhouse with a private patio and rooftop garden.",
    image: "/property-6.png",
    price: 3200,
    availableRooms: 3,
    amenities: ["Garden", "Parking", "Laundry"],
    propertyType: "Townhouse",
  },
];
const initialFilters: Filters = {
  location: "",
  minPrice: 0,
  maxPrice: 10000,
  propertyType: "",
  rooms: 0,
  availability: true,
};
const perPage = 6;

export default function PropertiesPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reset = () => {
    setFilters(initialFilters);
    setQuery("");
    setSort("relevance");
    setPage(1);
  };
  const results = useMemo(() => {
    const filtered = properties.filter(
      (property) =>
        (!filters.location || property.location === filters.location) &&
        property.price >= filters.minPrice &&
        property.price <= filters.maxPrice &&
        (!filters.propertyType ||
          property.propertyType === filters.propertyType) &&
        (!filters.rooms || property.availableRooms >= filters.rooms) &&
        (!query ||
          `${property.name} ${property.location} ${property.description}`
            .toLowerCase()
            .includes(query.toLowerCase())),
    );
    return [...filtered].sort((a, b) =>
      sort === "price-low"
        ? a.price - b.price
        : sort === "price-high"
          ? b.price - a.price
          : sort === "newest"
            ? b.id - a.id
            : a.id - b.id,
    );
  }, [filters, query, sort]);
  const totalPages = Math.max(1, Math.ceil(results.length / perPage));
  const visible = results.slice((page - 1) * perPage, page * perPage);

  return (
    <main className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-7">
            <div>
              <p className="mb-2 text-sm font-medium text-emerald-700">
                EXPLORE HOMES
              </p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Properties
              </h1>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Find a property that fits your lifestyle and budget.
              </p>
            </div>
            <div className="relative max-w-2xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <Input
                aria-label="Search properties"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by city, neighborhood, or property name"
                className="h-12 bg-muted/40 pl-11"
              />
            </div>
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:px-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-6 rounded-xl border bg-background p-5">
            <FilterPanel
              filters={filters}
              onFilterChange={(value) => {
                setFilters(value);
                setPage(1);
              }}
              onClearFilters={reset}
            />
          </div>
        </aside>
        <section className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal data-icon="inline-start" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[min(22rem,90vw)] overflow-y-auto"
                >
                  <SheetHeader>
                    <SheetTitle>Filter properties</SheetTitle>
                    <SheetDescription>
                      Adjust your search to find the right fit.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterPanel
                      filters={filters}
                      onFilterChange={(value) => {
                        setFilters(value);
                        setPage(1);
                      }}
                      onClearFilters={reset}
                    />
                  </div>
                </SheetContent>
              </Sheet>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {results.length}
                </span>{" "}
                properties found
              </p>
            </div>
            <SortDropdown
              value={sort}
              onChange={(value) => {
                setSort(value);
                setPage(1);
              }}
            />
          </div>
          {visible.length ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <Empty className="rounded-xl border bg-background py-20">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Filter />
                </EmptyMedia>
                <EmptyTitle>No properties found</EmptyTitle>
                <EmptyDescription>
                  Try widening your search or resetting the filters.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button onClick={reset}>Reset filters</Button>
              </EmptyContent>
            </Empty>
          )}
          {results.length > perPage && (
            <Pagination className="mt-10">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((current) => Math.max(1, current - 1));
                    }}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index + 1}>
                    <PaginationLink
                      href="#"
                      isActive={page === index + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(index + 1);
                      }}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((current) => Math.min(totalPages, current + 1));
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </section>
      </div>
    </main>
  );
}
