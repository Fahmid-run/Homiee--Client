"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  MapPin,
  MessageSquare,
  X,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Status = "Pending" | "Accepted" | "Rejected";
type Request = {
  id: number;
  tenant: string;
  property: string;
  requested: string;
  created: string;
  owner: string;
  message: string;
  status: Status;
};

const requests: Request[] = [
  {
    id: 1,
    tenant: "Alex Johnson",
    property: "Modern Downtown Loft",
    requested: "Oct 12, 2026 · 2:00 PM",
    created: "Oct 06, 2026",
    owner: "Jordan Lee",
    message:
      "I would love to see the loft and learn more about the lease terms.",
    status: "Pending",
  },
  {
    id: 2,
    tenant: "Maya Chen",
    property: "Maple Heights Residence",
    requested: "Oct 14, 2026 · 11:30 AM",
    created: "Oct 04, 2026",
    owner: "Jordan Lee",
    message: "Is the second bedroom available for a home office?",
    status: "Accepted",
  },
  {
    id: 3,
    tenant: "Sam Rivera",
    property: "Riverside Studios",
    requested: "Sep 28, 2026 · 4:00 PM",
    created: "Sep 22, 2026",
    owner: "Jordan Lee",
    message: "Checking whether pets are allowed in the building.",
    status: "Rejected",
  },
];

function StatusBadge({ status }: { status: Status }) {
  const styles = {
    Pending: "border-amber-300 bg-amber-50 text-amber-800",
    Accepted: "border-emerald-300 bg-emerald-50 text-emerald-800",
    Rejected: "border-rose-300 bg-rose-50 text-rose-800",
  };
  const Icon =
    status === "Pending" ? Clock3 : status === "Accepted" ? Check : X;
  return (
    <Badge variant="outline" className={styles[status]}>
      <Icon data-icon="inline-start" />
      {status}
    </Badge>
  );
}

function EmptyRequests({ owner }: { owner: boolean }) {
  return (
    <Empty className="min-h-[330px] border-0">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CalendarDays />
        </EmptyMedia>
        <EmptyTitle>
          {owner
            ? "No pending visit requests."
            : "You haven't requested any property visits yet."}
        </EmptyTitle>
        <EmptyDescription>
          {owner
            ? "New tenant requests will appear here when someone wants to visit one of your properties."
            : "Browse available properties and request a time that works for you."}
        </EmptyDescription>
      </EmptyHeader>
      {!owner && (
        <Button asChild>
          <Link href="/">Browse properties</Link>
        </Button>
      )}
    </Empty>
  );
}

function TenantRequests() {
  const tenantRequests = requests.filter(
    (request) => request.tenant === "Alex Johnson",
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>My visit requests</CardTitle>
        <CardDescription>
          Track the properties you have asked to visit.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {tenantRequests.length === 0 ? (
          <EmptyRequests owner={false} />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Property</TableHead>
                  <TableHead>Requested date</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Request date</TableHead>
                  <TableHead className="pr-6">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenantRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="pl-6">
                      <Link
                        href="#property"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                      >
                        {request.property}
                        <ExternalLink data-icon="inline-end" />
                      </Link>
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin data-icon="inline-start" />
                        New York, NY
                      </p>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2">
                        <CalendarDays data-icon="inline-start" />
                        {request.requested}
                      </span>
                    </TableCell>
                    <TableCell>{request.owner}</TableCell>
                    <TableCell>{request.created}</TableCell>
                    <TableCell className="pr-6">
                      <StatusBadge status={request.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function OwnerRequests() {
  const [items, setItems] = useState(
    requests.filter((request) => request.status === "Pending"),
  );
  const [rejecting, setRejecting] = useState<Request | null>(null);
  const updateStatus = (id: number, status: Status) =>
    setItems((current) => current.filter((item) => item.id !== id));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending visit requests</CardTitle>
        <CardDescription>
          Review tenant requests and keep your calendar moving.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {items.length === 0 ? (
          <EmptyRequests owner />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Tenant</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Requested date</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Created date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {request.tenant
                              .split(" ")
                              .map((part) => part[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{request.tenant}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link
                        href="#property"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                      >
                        {request.property}
                      </Link>
                    </TableCell>
                    <TableCell>{request.requested}</TableCell>
                    <TableCell className="min-w-[240px] text-muted-foreground">
                      <span className="flex gap-2">
                        <MessageSquare data-icon="inline-start" />
                        {request.message}
                      </span>
                    </TableCell>
                    <TableCell>{request.created}</TableCell>
                    <TableCell>
                      <StatusBadge status={request.status} />
                    </TableCell>
                    <TableCell className="pr-6">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          onClick={() => updateStatus(request.id, "Accepted")}
                        >
                          <Check data-icon="inline-start" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setRejecting(request)}
                        >
                          <X data-icon="inline-start" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      <AlertDialog
        open={Boolean(rejecting)}
        onOpenChange={(open) => !open && setRejecting(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject this visit request?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the request from your pending list. The tenant
              will be notified that the visit was not accepted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep request</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (rejecting) updateStatus(rejecting.id, "Rejected");
                setRejecting(null);
              }}
            >
              Reject request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

export default function VisitRequests() {
  return (
    <main className="min-h-screen bg-muted/30 text-foreground">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-6 sm:px-8">
          <p className="text-sm text-muted-foreground">
            Homiee workspace / Requests
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Property visit requests
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage viewing requests with clear next steps for every home.
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-7xl p-5 sm:p-8">
        <Tabs defaultValue="tenant">
          <TabsList>
            <TabsTrigger value="tenant">Tenant view</TabsTrigger>
            <TabsTrigger value="owner">Owner view</TabsTrigger>
          </TabsList>
          <Separator className="my-6" />
          <TabsContent value="tenant">
            <TenantRequests />
          </TabsContent>
          <TabsContent value="owner">
            <OwnerRequests />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
