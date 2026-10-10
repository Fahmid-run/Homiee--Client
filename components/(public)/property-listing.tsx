"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Bath,
  BedDouble,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Filter,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const properties = [
  {
    id: 1,
    name: "Maple Court Residences",
    city: "Brooklyn, NY",
    type: "Apartment",
    rooms: 4,
    available: 2,
    price: 1850,
    description:
      "Bright, well-connected rooms in a thoughtfully managed shared home.",
    amenities: ["Furnished", "Wi-Fi", "Laundry"],
    image: "/modern-apartment-building-exterior.png",
    newest: 4,
  },
  {
    id: 2,
    name: "The Elmwood House",
    city: "Queens, NY",
    type: "House",
    rooms: 5,
    available: 1,
    price: 1425,
    description:
      "A calm residential home with generous common spaces and a garden.",
    amenities: ["Garden", "Parking", "Utilities included"],
    image: "/modern-apartment-building-exterior.png",
    newest: 3,
  },
  {
    id: 3,
    name: "Parkside Lofts",
    city: "Jersey City, NJ",
    type: "Loft",
    rooms: 3,
    available: 3,
    price: 2200,
    description:
      "Modern loft living with natural light, city access, and flexible stays.",
    amenities: ["Gym", "Rooftop", "Pet friendly"],
    image: "/modern-apartment-building-exterior.png",
    newest: 2,
  },
  {
    id: 4,
    name: "Willow & 8th",
    city: "Brooklyn, NY",
    type: "Apartment",
    rooms: 6,
    available: 2,
    price: 1650,
    description:
      "A welcoming home for people who value community and easy commutes.",
    amenities: ["Furnished", "Bike storage", "Doorman"],
    image: "/modern-apartment-building-exterior.png",
    newest: 1,
  },
];

const initialFilters = {
  location: "",
  minPrice: "",
  maxPrice: "",
  type: "All types",
  rooms: "Any rooms",
  availability: "Available now",
};

function Filters({
  filters,
  setFilters,
  onApply,
  onClear,
  compact = false,
}: {
  filters: typeof initialFilters;
  setFilters: (filters: typeof initialFilters) => void;
  onApply?: () => void;
  onClear: () => void;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "flex flex-col gap-5" : "flex flex-col gap-6"}>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">Refine your search</p>
          <p className="text-sm text-muted-foreground">
            Find a home that feels right.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear
        </Button>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <MapPin
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              data-icon="inline-start"
            />
            <Input
              id="location"
              className="pl-9"
              placeholder="City or neighbourhood"
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="min-price">Min price</Label>
            <Input
              id="min-price"
              type="number"
              placeholder="$1,000"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="max-price">Max price</Label>
            <Input
              id="max-price"
              type="number"
              placeholder="$3,000"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="type">Property type</Label>
          <select
            id="type"
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option>All types</option>
            <option>Apartment</option>
            <option>House</option>
            <option>Loft</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="rooms">Number of rooms</Label>
          <select
            id="rooms"
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
            value={filters.rooms}
            onChange={(e) => setFilters({ ...filters, rooms: e.target.value })}
          >
            <option>Any rooms</option>
            <option>3+ rooms</option>
            <option>4+ rooms</option>
            <option>5+ rooms</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="availability">Availability</Label>
          <select
            id="availability"
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
            value={filters.availability}
            onChange={(e) =>
              setFilters({ ...filters, availability: e.target.value })
            }
          >
            <option>Available now</option>
            <option>Any availability</option>
          </select>
        </div>
      </div>
      {compact && <Button onClick={onApply}>Apply Filters</Button>}
    </div>
  );
}

export function PropertiesListing() {
  const [filters, setFilters] = useState(initialFilters);
  const [applied, setApplied] = useState(initialFilters);
  const [sort, setSort] = useState("Relevance");
  const [page, setPage] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleProperties = useMemo(() => {
    const filtered = properties.filter((property) => {
      const locationMatch =
        !applied.location ||
        `${property.city} ${property.name}`
          .toLowerCase()
          .includes(applied.location.toLowerCase());
      const minMatch =
        !applied.minPrice || property.price >= Number(applied.minPrice);
      const maxMatch =
        !applied.maxPrice || property.price <= Number(applied.maxPrice);
      const typeMatch =
        applied.type === "All types" || property.type === applied.type;
      const roomsMatch =
        applied.rooms === "Any rooms" ||
        property.rooms >= Number(applied.rooms[0]);
      return (
        locationMatch &&
        minMatch &&
        maxMatch &&
        typeMatch &&
        roomsMatch &&
        (applied.availability === "Any availability" || property.available > 0)
      );
    });
    return [...filtered].sort((a, b) =>
      sort === "Price: Low to High"
        ? a.price - b.price
        : sort === "Price: High to Low"
          ? b.price - a.price
          : sort === "Newest"
            ? b.newest - a.newest
            : a.id - b.id,
    );
  }, [applied, sort]);

  function clearFilters() {
    setFilters(initialFilters);
    setApplied(initialFilters);
    setPage(1);
  }

  return (
    <main className="min-h-screen bg-muted/30 text-foreground">
      <header className="border-b bg-background/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Building2 data-icon="inline-start" />
            </div>
            <span className="text-lg font-bold tracking-tight">homiee</span>
          </div>
          <Button variant="ghost">Sign in</Button>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-12 lg:px-8 lg:pt-16">
        <div className="max-w-2xl">
          <Badge variant="secondary" className="mb-4 gap-1">
            <Sparkles data-icon="inline-start" /> Better ways to live together
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Properties
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Find a property that fits your lifestyle and budget.
          </p>
        </div>
        <div className="mt-8 flex max-w-3xl items-center gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              data-icon="inline-start"
            />
            <Input
              className="h-12 rounded-xl bg-background pl-11"
              placeholder="Search by city, neighbourhood, or property name"
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setApplied(filters);
                  setPage(1);
                }
              }}
            />
          </div>
          <Button
            className="h-12 rounded-xl"
            onClick={() => {
              setApplied(filters);
              setPage(1);
            }}
          >
            Search
          </Button>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden rounded-2xl border bg-background p-5 lg:block">
            <Filters
              filters={filters}
              setFilters={setFilters}
              onClear={clearFilters}
              onApply={() => {
                setApplied(filters);
                setPage(1);
              }}
              compact
            />
          </aside>
          <div className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold">
                  {visibleProperties.length} properties found
                </p>
                <p className="text-sm text-muted-foreground">
                  Curated homes, ready for your next chapter.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
                  <DialogTrigger
                    render={<Button variant="outline" className="lg:hidden" />}
                  >
                    <Filter data-icon="inline-start" /> Filters
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Filter properties</DialogTitle>
                    </DialogHeader>
                    <Filters
                      filters={filters}
                      setFilters={setFilters}
                      onClear={clearFilters}
                      onApply={() => {
                        setApplied(filters);
                        setPage(1);
                        setMobileOpen(false);
                      }}
                      compact
                    />
                  </DialogContent>
                </Dialog>
                <SlidersHorizontal
                  className="hidden text-muted-foreground sm:block"
                  data-icon="inline-start"
                />
                <select
                  aria-label="Sort properties"
                  className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
            {visibleProperties.length === 0 ? (
              <Card className="flex min-h-80 items-center justify-center">
                <CardContent className="flex flex-col items-center gap-4 pt-6 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                    <Search className="text-muted-foreground" />
                  </div>
                  <div>
                    <h2 className="font-semibold">No properties found</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Try adjusting your filters or searching another area.
                    </p>
                  </div>
                  <Button variant="outline" onClick={clearFilters}>
                    Reset filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {visibleProperties.map((property) => (
                  <Card
                    key={property.id}
                    className="overflow-hidden rounded-2xl"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                      <Image
                        src={property.image}
                        alt={`${property.name} exterior`}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <Badge className="absolute left-4 top-4 bg-background/90 text-foreground hover:bg-background">
                        {property.available} rooms available
                      </Badge>
                    </div>
                    <CardContent className="flex flex-col gap-4 p-5">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h2 className="text-lg font-semibold">
                              {property.name}
                            </h2>
                            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin data-icon="inline-start" />
                              {property.city}
                            </p>
                          </div>
                          <Badge variant="outline">{property.type}</Badge>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                          {property.description}
                        </p>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BedDouble data-icon="inline-start" />
                          {property.rooms} rooms
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath data-icon="inline-start" />
                          Shared bath
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {property.amenities.map((amenity) => (
                          <Badge
                            variant="secondary"
                            key={amenity}
                            className="gap-1"
                          >
                            <Check data-icon="inline-start" />
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-end justify-between gap-4 pt-1">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Monthly price from
                          </p>
                          <p className="text-xl font-semibold">
                            ${property.price.toLocaleString()}
                            <span className="text-sm font-normal text-muted-foreground">
                              {" "}
                              / month
                            </span>
                          </p>
                        </div>
                        <Button>View Property</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            <div className="mt-8 flex items-center justify-between border-t pt-5">
              <p className="text-sm text-muted-foreground">Page {page} of 2</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Previous page"
                  disabled={page === 1}
                  onClick={() => setPage(Math.max(1, page - 1))}
                >
                  <ChevronLeft data-icon="inline-start" />
                </Button>
                <Button
                  variant={page === 1 ? "default" : "outline"}
                  size="icon"
                  onClick={() => setPage(1)}
                >
                  1
                </Button>
                <Button
                  variant={page === 2 ? "default" : "outline"}
                  size="icon"
                  onClick={() => setPage(2)}
                >
                  2
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Next page"
                  disabled={page === 2}
                  onClick={() => setPage(Math.min(2, page + 1))}
                >
                  <ChevronRight data-icon="inline-start" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PropertiesListing;
