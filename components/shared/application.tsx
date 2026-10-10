"use client";

import { useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  Check,
  ChevronRight,
  Home,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Plus,
  UserRound,
  X,
} from "lucide-react";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/toast";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useForm } from "@tanstack/react-form-nextjs";

type Status = "Pending" | "Accepted" | "Rejected";
type Application = {
  id: number;
  tenant: string;
  initials: string;
  email: string;
  phone: string;
  property: string;
  room: string;
  date: string;
  rent: number;
  status: Status;
  message: string;
  details: string;
};

const applications: Application[] = [
  {
    id: 1,
    tenant: "Maya Thompson",
    initials: "MT",
    email: "maya.thompson@email.com",
    phone: "+1 (555) 014-2840",
    property: "Maple Court",
    room: "Room 2 · Ensuite",
    date: "Oct 18, 2026",
    rent: 850,
    status: "Pending",
    message:
      "I am a quiet, tidy professional looking for a comfortable home close to work. I would love to learn more about the room and the house rules.",
    details: "Product designer at Northstar Labs · Non-smoker · No pets",
  },
  {
    id: 2,
    tenant: "Jordan Lee",
    initials: "JL",
    email: "jordan.lee@email.com",
    phone: "+1 (555) 019-8301",
    property: "Oak House",
    room: "Room 1 · Garden view",
    date: "Oct 12, 2026",
    rent: 780,
    status: "Accepted",
    message:
      "The location and shared spaces look like a great fit for me. I am excited about the possibility of moving in.",
    details: "Graduate student · Non-smoker · No pets",
  },
  {
    id: 3,
    tenant: "Sam Rivera",
    initials: "SR",
    email: "sam.rivera@email.com",
    phone: "+1 (555) 011-4920",
    property: "Maple Court",
    room: "Room 4 · Balcony",
    date: "Oct 08, 2026",
    rent: 920,
    status: "Rejected",
    message:
      "I am looking for a friendly shared home with a flexible move-in date.",
    details: "Marketing manager · Smoker · One small dog",
  },
];

function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge
      variant={
        status === "Accepted"
          ? "default"
          : status === "Rejected"
            ? "destructive"
            : "secondary"
      }
    >
      {status}
    </Badge>
  );
}

function ApplicationDetail({
  application,
  role,
  onClose,
  onStatusChange,
}: {
  application: Application;
  role: "owner" | "tenant";
  onClose: () => void;
  onStatusChange: (status: Status) => void;
}) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
              {application.initials}
            </div>
            <div>
              <DialogTitle>{application.tenant}</DialogTitle>
              <DialogDescription>
                {application.property} · {application.room}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="grid gap-6 pt-2 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col gap-5">
            <section className="rounded-xl border p-4">
              <h3 className="font-semibold">Tenant information</h3>
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Mail />
                  {application.email}
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Phone />
                  {application.phone}
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <UserRound />
                  {application.details}
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays />
                  Applied {application.date}
                </p>
              </div>
            </section>
            <section className="rounded-xl border p-4">
              <h3 className="flex items-center gap-2 font-semibold">
                <MessageSquare />
                Application message
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {application.message}
              </p>
            </section>
          </div>
          <aside className="flex flex-col gap-4 rounded-xl bg-muted/50 p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Current status
              </p>
              <div className="mt-3 flex items-center justify-between">
                <StatusBadge status={application.status} />
                {application.status === "Accepted" && (
                  <Check className="text-primary" />
                )}
              </div>
            </div>
            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground">Monthly rent</p>
              <p className="mt-1 text-3xl font-semibold">
                ${application.rent}
                <span className="text-sm font-normal text-muted-foreground">
                  {" "}
                  / month
                </span>
              </p>
            </div>
            {role == "owner" && application.status === "Pending" && (
              <div className="flex flex-col gap-2 pt-2">
                <Button onClick={() => onStatusChange("Accepted")}>
                  <Check data-icon="inline-start" />
                  Accept application
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onStatusChange("Rejected")}
                >
                  <X data-icon="inline-start" />
                  Reject application
                </Button>
              </div>
            )}
            {role == "owner" && application.status === "Accepted" && (
              <div className="rounded-lg border border-primary/20 bg-primary/10 p-3 text-sm text-primary">
                Application accepted. This application is ready for rental
                creation.
              </div>
            )}
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ApplicationManagement({ role }: { role: "owner" | "tenant" }) {
  const [selected, setSelected] = useState<Application | null>(null);
  const [items, setItems] = useState(applications);

  const [open, setOpen] = useState(false);

  const updateStatus = (status: Status) => {
    if (!selected) return;
    const next = { ...selected, status };
    setItems((current) =>
      current.map((item) => (item.id === selected.id ? next : item)),
    );
    setSelected(next);
  };

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
  }

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "TENANT",
    },
    validators: {
      onSubmit: ({ value }) => {
        // const result = schema.safeParse(value);
        // if (!result.success) {
        //   return result.error.issues.map((issue) => issue.message).join(", ");
        // }
      },
    },
    onSubmitInvalid: ({ value, formApi }) => {
      toast.add({
        title: getErrorMessage(formApi.state.errors),
        type: "error",
      });
    },
    onSubmit: async ({ value }) => {
      try {
      } catch (error) {
        console.log(error);

        console.log(error);
      } finally {
      }
    },
  });
  return (
    <main className="min-h-svh bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:py-12">
        <header className="flex flex-col gap-5 border-b pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Homiee · Applications
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Find the right fit.
            </h1>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Review rental applications, keep conversations organized, and move
              great tenants into their new home.
            </p>
          </div>
        </header>

        {role == "owner" ? (
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Application review</CardTitle>
                <CardDescription>
                  Review prospective tenants and manage their application
                  status.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {items.map((application) => (
                <button
                  key={application.id}
                  type="button"
                  onClick={() => setSelected(application)}
                  className="flex flex-col gap-4 rounded-xl border p-4 text-left transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {application.initials}
                    </div>
                    <div>
                      <p className="font-medium">{application.tenant}</p>
                      <p className="text-sm text-muted-foreground">
                        {application.property} · {application.room}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-5 sm:justify-end">
                    <div className="text-sm sm:text-right">
                      <p className="font-medium">${application.rent}/mo</p>
                      <p className="text-muted-foreground">
                        Applied {application.date}
                      </p>
                    </div>
                    <StatusBadge status={application.status} />
                    <ChevronRight className="text-muted-foreground" />
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className="flex justify-between items-center">
              <div>
                <CardTitle>Your applications</CardTitle>
                <CardDescription>
                  Track the progress of your rental applications.
                </CardDescription>
              </div>

              <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogTrigger render={<Button />}>
                  <Plus data-icon="inline-start" />
                  Add property
                </DialogTrigger>
                <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add a new property</DialogTitle>
                    <DialogDescription>
                      Create a listing with the details renters need to find the
                      right home.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      // form.handleSubmit();
                    }}
                  >
                    <form.Field name="email">
                      {(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field>
                            <FieldLabel htmlFor="email">
                              Email address
                            </FieldLabel>
                            <div className="relative">
                              <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="pl-10"
                                value={field.state.value}
                                aria-invalid={status === "error"}
                                onBlur={field.handleBlur}
                                autoComplete="off"
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                              />
                            </div>
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    </form.Field>

                    <Button type="submit" className="mt-2 w-full">
                      test
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {items.map((application) => (
                <div
                  key={application.id}
                  className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Home />
                    </div>
                    <div>
                      <p className="font-medium">{application.property}</p>
                      <p className="text-sm text-muted-foreground">
                        {application.room} · Applied {application.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium">${application.rent}/mo</p>
                    <StatusBadge status={application.status} />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelected(application)}
                    >
                      View details <ChevronRight data-icon="inline-end" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        {selected && (
          <ApplicationDetail
            role={role}
            application={selected}
            onClose={() => setSelected(null)}
            onStatusChange={updateStatus}
          />
        )}
      </div>
    </main>
  );
}
