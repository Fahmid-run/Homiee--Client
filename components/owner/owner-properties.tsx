"use client";

import Image from "next/image";
import { ChangeEvent, DragEvent, useEffect, useState } from "react";
import {
  AlertCircle,
  Building2,
  Check,
  ChevronDown,
  Edit3,
  Eye,
  ImagePlus,
  MapPin,
  MoreHorizontal,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

const initialProperties = [
  {
    name: "Modern Downtown Loft",
    location: "Downtown District, New York",
    type: "Apartment",
    rooms: 12,
    available: 2,
    occupied: 10,
    status: "Active",
    image: "/property-1.png",
  },
  {
    name: "Maple Heights Residence",
    location: "Brooklyn Heights, New York",
    type: "House",
    rooms: 8,
    available: 2,
    occupied: 6,
    status: "Active",
    image: "/property-2.png",
  },
  {
    name: "Riverside Studios",
    location: "Long Island City, New York",
    type: "Studio",
    rooms: 16,
    available: 2,
    occupied: 14,
    status: "Active",
    image: "/property-3.png",
  },
];

export default function OwnerProperties() {
  const [properties, setProperties] = useState(initialProperties);
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "",
    address: "",
    city: "",
    area: "",
    rooms: "",
    amenities: "",
  });

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    setSaved(false);
    setError("");
  }
  const isDirty = Object.values(form).some(Boolean) || images.length > 0;
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [isDirty]);
  function addImages(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).slice(0, 5);
    setImages(files.map((file) => URL.createObjectURL(file)));
  }
  function dropImages(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, 5);
    setImages(files.map((file) => URL.createObjectURL(file)));
  }
  function handleOpenChange(nextOpen: boolean) {
    if (
      !nextOpen &&
      isDirty &&
      !saved &&
      !window.confirm("You have unsaved changes. Leave without saving?")
    )
      return;
    setOpen(nextOpen);
  }
  function submit() {
    if (
      !form.name ||
      !form.type ||
      !form.address ||
      !form.city ||
      !form.rooms
    ) {
      setError("Complete the required fields before saving.");
      return;
    }
    setProperties((current) => [
      {
        name: form.name,
        location: `${form.area ? `${form.area}, ` : ""}${form.city}`,
        type: form.type,
        rooms: Number(form.rooms),
        available: Number(form.rooms),
        occupied: 0,
        status: "Draft",
        image: images[0] || "/property-1.png",
      },
      ...current,
    ]);
    setSaved(true);
    setTimeout(() => setOpen(false), 700);
  }
  function removeProperty(name: string) {
    setProperties((current) =>
      current.filter((property) => property.name !== name),
    );
  }

  return (
    <main className="min-h-screen bg-muted/30 text-foreground">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div>
            <p className="text-sm text-muted-foreground">
              Owner workspace / Portfolio
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              My Properties
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your listings, rooms, and availability in one place.
            </p>
          </div>
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button>
                <Plus data-icon="inline-start" />
                Add property
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add a new property</DialogTitle>
                <DialogDescription>
                  Create a listing with the details renters need to find the
                  right home.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-6 py-2">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle data-icon="inline-start" />
                    <AlertTitle>Unable to save</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {saved && (
                  <Alert>
                    <Check data-icon="inline-start" />
                    <AlertTitle>Property saved</AlertTitle>
                    <AlertDescription>
                      Your new property is ready to manage.
                    </AlertDescription>
                  </Alert>
                )}
                <FieldSet>
                  <FieldLegend>Basic information</FieldLegend>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="property-name">
                        Property name{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        id="property-name"
                        placeholder="e.g. The Oak House"
                        value={form.name}
                        onChange={(event) => update("name", event.target.value)}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="description">Description</FieldLabel>
                      <Textarea
                        id="description"
                        placeholder="Tell renters what makes this property special..."
                        value={form.description}
                        onChange={(event) =>
                          update("description", event.target.value)
                        }
                      />
                    </Field>
                    <Field>
                      <FieldLabel>
                        Property type{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Select
                        value={form.type}
                        onValueChange={(value) => update("type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Property type</SelectLabel>
                            <SelectItem value="Apartment">Apartment</SelectItem>
                            <SelectItem value="House">House</SelectItem>
                            <SelectItem value="Studio">Studio</SelectItem>
                            <SelectItem value="Duplex">Duplex</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>
                  </FieldGroup>
                </FieldSet>
                <Separator />
                <FieldSet>
                  <FieldLegend>Location</FieldLegend>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="address">
                        Address <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        id="address"
                        placeholder="Street address"
                        value={form.address}
                        onChange={(event) =>
                          update("address", event.target.value)
                        }
                      />
                    </Field>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="city">
                          City <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                          id="city"
                          placeholder="New York"
                          value={form.city}
                          onChange={(event) =>
                            update("city", event.target.value)
                          }
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="area">
                          Area or neighborhood
                        </FieldLabel>
                        <Input
                          id="area"
                          placeholder="e.g. Brooklyn Heights"
                          value={form.area}
                          onChange={(event) =>
                            update("area", event.target.value)
                          }
                        />
                      </Field>
                    </div>
                  </FieldGroup>
                </FieldSet>
                <Separator />
                <FieldSet>
                  <FieldLegend>Property details</FieldLegend>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="rooms">
                        Total rooms <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        id="rooms"
                        type="number"
                        min="1"
                        placeholder="12"
                        value={form.rooms}
                        onChange={(event) =>
                          update("rooms", event.target.value)
                        }
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="amenities">Amenities</FieldLabel>
                      <Input
                        id="amenities"
                        placeholder="Wi-Fi, parking, laundry (separate with commas)"
                        value={form.amenities}
                        onChange={(event) =>
                          update("amenities", event.target.value)
                        }
                      />
                      <FieldDescription>
                        Add the features renters will care about most.
                      </FieldDescription>
                    </Field>
                  </FieldGroup>
                </FieldSet>
                <Separator />
                <FieldSet>
                  <FieldLegend>Images</FieldLegend>
                  <Field>
                    <FieldLabel htmlFor="images" className="sr-only">
                      Upload property images
                    </FieldLabel>
                    <label
                      htmlFor="images"
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={dropImages}
                      className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-muted/30 px-6 py-8 text-center transition-colors hover:bg-muted/60"
                    >
                      <Upload className="text-primary" />
                      <span className="font-medium">
                        Drop images here or browse
                      </span>
                      <span className="text-xs text-muted-foreground">
                        PNG or JPG up to 10MB · up to 5 images
                      </span>
                      <Input
                        id="images"
                        type="file"
                        accept="image/png,image/jpeg"
                        multiple
                        className="sr-only"
                        onChange={addImages}
                      />
                    </label>
                  </Field>
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      {images.map((image, index) => (
                        <div
                          key={image}
                          className="relative aspect-square overflow-hidden rounded-lg"
                        >
                          <Image
                            src={image}
                            alt={`Property preview ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            aria-label={`Remove image ${index + 1}`}
                            className="absolute right-1 top-1 rounded-full bg-background/90 p-1"
                            onClick={() =>
                              setImages((current) =>
                                current.filter((item) => item !== image),
                              )
                            }
                          >
                            <X />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </FieldSet>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={submit}>
                  {saved ? (
                    <>
                      <Check data-icon="inline-start" />
                      Saved
                    </>
                  ) : (
                    "Save property"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <div className="mx-auto max-w-7xl p-5 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Badge variant="secondary">{properties.length} properties</Badge>
          <span className="text-sm text-muted-foreground">
            {properties.reduce((sum, property) => sum + property.rooms, 0)}{" "}
            total rooms
          </span>
          <span className="text-sm text-muted-foreground">
            {properties.reduce((sum, property) => sum + property.available, 0)}{" "}
            available
          </span>
        </div>
        <Card>
          <CardHeader>
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <CardTitle>Property portfolio</CardTitle>
                <CardDescription>
                  Keep your property information and availability up to date.
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Building2 data-icon="inline-start" />
                Export list
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="hidden overflow-x-auto md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Property</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Rooms</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-6 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((property) => (
                    <TableRow key={property.name}>
                      <TableCell className="pl-6">
                        <div className="flex min-w-[280px] items-center gap-3">
                          <div className="relative size-14 overflow-hidden rounded-lg">
                            <Image
                              src={property.image}
                              alt={property.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{property.name}</p>
                            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin />
                              {property.location}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{property.type}</TableCell>
                      <TableCell>{property.rooms}</TableCell>
                      <TableCell>
                        <div className="flex gap-2 text-xs">
                          <span className="font-medium text-primary">
                            {property.available} available
                          </span>
                          <span className="text-muted-foreground">
                            {property.occupied} occupied
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            property.status === "Active"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {property.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="pr-6 text-right">
                        <PropertyActions
                          name={property.name}
                          onDelete={() => removeProperty(property.name)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex flex-col gap-3 p-4 md:hidden">
              {properties.map((property) => (
                <Card key={property.name} className="shadow-none">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={property.image}
                          alt={property.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium">{property.name}</p>
                          <PropertyActions
                            name={property.name}
                            onDelete={() => removeProperty(property.name)}
                          />
                        </div>
                        <p className="mt-1 truncate text-xs text-muted-foreground">
                          {property.location}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                          <Badge variant="outline">{property.type}</Badge>
                          <span className="text-primary">
                            {property.available} available
                          </span>
                          <span className="text-muted-foreground">
                            {property.occupied} occupied
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Changes are saved securely to your owner workspace.
        </p>
      </div>
    </main>
  );
}
function PropertyActions({
  name,
  onDelete,
}: {
  name: string;
  onDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={`Actions for ${name}`}>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Eye data-icon="inline-start" />
          View property
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit3 data-icon="inline-start" />
          Edit details
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Building2 data-icon="inline-start" />
          Manage rooms
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive" onClick={onDelete}>
          <Trash2 data-icon="inline-start" />
          Delete property
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
