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
import { useCreateProperty } from "@/hooks/properties.hook";
import { useForm } from "@tanstack/react-form-nextjs";
import { toast } from "../ui/toast";
import { getErrorMessage } from "@/lib/getErrorMessage";

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
  const [status, setStatus] = useState<"idle" | "error" | "success" | String>(
    "idle",
  );

  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState<string[]>([]);

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

  const { mutate: createProperty, isPending } = useCreateProperty();

  const form = useForm({
    defaultValues: {
      name: "",
      address: "",
      description: "",
      city: "",
      totalrooms: "",
    },
    validators: {},
    onSubmitInvalid: ({ value, formApi }) => {
      console.log("Error>>", value, formApi.state.errors);
    },
    onSubmit: async ({ value }) => {
      const propertyData = {
        name: value.name,
        address: value.address,
        description: value.description,
        city: value.city,
        totalrooms: value.totalrooms,
      };

      setLoading(true);

      try {
        createProperty(propertyData, {
          onSuccess: (res) => {
            setStatus("success");
            toast.add({
              title: "Property Created successfully",
              type: "success",
            });
          },
          onError: (err) => {
            setStatus(getErrorMessage(err));
          },
        });
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    },
  });

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
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
        </div>
      </header>
      {/* <div className="mx-auto max-w-7xl p-5 sm:p-8">
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
                        <PropertyActions name={property.name} />
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
                          <PropertyActions name={property.name} />
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
      </div> */}
    </main>
  );
}

function PropertyActions({ name }: { name: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Actions for ${name}`}
          ></Button>
        }
      >
        <MoreHorizontal />
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
        <DropdownMenuItem className="text-destructive">
          <Trash2 data-icon="inline-start" />
          Delete property
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
