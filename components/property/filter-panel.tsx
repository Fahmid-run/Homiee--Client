"use client";

import { useState } from "react";
import { ChevronDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export interface Filters {
  location: string;
  minPrice: number;
  maxPrice: number;
  propertyType: string;
  rooms: number;
  availability: boolean;
}

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onClearFilters: () => void;
}

const LOCATIONS = [
  "Downtown District",
  "Green Valley",
  "Suburban Heights",
  "Innovation District",
  "Waterfront",
  "Arts District",
];
const PROPERTY_TYPES = [
  "Apartment",
  "Studio",
  "House",
  "Townhouse",
  "Co-living",
];
const ROOM_OPTIONS = [1, 2, 3, 4];

export default function FilterPanel({
  filters,
  onFilterChange,
  onClearFilters,
}: FilterPanelProps) {
  const [expanded, setExpanded] = useState({
    location: true,
    price: true,
    type: true,
    rooms: true,
    availability: true,
  });
  const toggle = (key: keyof typeof expanded) =>
    setExpanded((current) => ({ ...current, [key]: !current[key] }));
  const update = (change: Partial<Filters>) =>
    onFilterChange({ ...filters, ...change });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Refine your search</p>
          <p className="text-xs text-muted-foreground">
            Find a place that feels like home
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-muted-foreground"
        >
          <RotateCcw data-icon="inline-start" /> Reset
        </Button>
      </div>
      <Separator />

      <FilterSection
        title="Location"
        open={expanded.location}
        onToggle={() => toggle("location")}
      >
        <div className="flex flex-col gap-2.5">
          {LOCATIONS.map((location) => (
            <CheckRow
              key={location}
              label={location}
              checked={filters.location === location}
              onChange={() =>
                update({
                  location: filters.location === location ? "" : location,
                })
              }
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Monthly budget"
        open={expanded.price}
        onToggle={() => toggle("price")}
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="min-price"
              className="text-xs text-muted-foreground"
            >
              Minimum
            </Label>
            <Input
              id="min-price"
              type="number"
              min="0"
              value={filters.minPrice || ""}
              placeholder="$0"
              onChange={(e) =>
                update({ minPrice: Number(e.target.value) || 0 })
              }
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="max-price"
              className="text-xs text-muted-foreground"
            >
              Maximum
            </Label>
            <Input
              id="max-price"
              type="number"
              min="0"
              value={filters.maxPrice === 10000 ? "" : filters.maxPrice}
              placeholder="$10,000"
              onChange={(e) =>
                update({ maxPrice: Number(e.target.value) || 10000 })
              }
            />
          </div>
        </div>
      </FilterSection>

      <FilterSection
        title="Property type"
        open={expanded.type}
        onToggle={() => toggle("type")}
      >
        <div className="flex flex-col gap-2.5">
          {PROPERTY_TYPES.map((type) => (
            <CheckRow
              key={type}
              label={type}
              checked={filters.propertyType === type}
              onChange={() =>
                update({
                  propertyType: filters.propertyType === type ? "" : type,
                })
              }
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Number of rooms"
        open={expanded.rooms}
        onToggle={() => toggle("rooms")}
      >
        <div className="flex flex-col gap-2.5">
          {ROOM_OPTIONS.map((room) => (
            <CheckRow
              key={room}
              label={`${room}+ room${room > 1 ? "s" : ""}`}
              checked={filters.rooms === room}
              onChange={() =>
                update({ rooms: filters.rooms === room ? 0 : room })
              }
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Availability"
        open={expanded.availability}
        onToggle={() => toggle("availability")}
      >
        <CheckRow
          label="Available now"
          checked={filters.availability}
          onChange={(checked) => update({ availability: checked })}
        />
      </FilterSection>

      <Button onClick={() => onFilterChange(filters)} className="w-full">
        Apply filters
      </Button>
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <Label className="flex cursor-pointer items-center gap-3 text-sm font-normal text-muted-foreground hover:text-foreground">
      <Checkbox
        checked={checked}
        onCheckedChange={(value) => onChange(value === true)}
      />
      {label}
    </Label>
  );
}

function FilterSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between text-sm font-semibold"
      >
        <span>{title}</span>
        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && children}
    </section>
  );
}
