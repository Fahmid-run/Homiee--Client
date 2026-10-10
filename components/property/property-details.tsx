"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Bath,
  BedDouble,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Dumbbell,
  Home,
  KeyRound,
  MapPin,
  MessageSquare,
  ParkingSquare,
  ShieldCheck,
  Sparkles,
  Users,
  WashingMachine,
  Wifi,
  Utensils,
  Wind,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const gallery = ["/property-1.png", "/property-2.png", "/property-3.png"];
const rooms = [
  {
    name: "Room 204",
    image: "/property-2.png",
    rent: 1250,
    capacity: "1 person",
    status: "Available now",
  },
  {
    name: "Room 307",
    image: "/property-4.png",
    rent: 1390,
    capacity: "1 person",
    status: "Available May 1",
  },
  {
    name: "Room 412",
    image: "/property-5.png",
    rent: 1550,
    capacity: "2 people",
    status: "Available now",
  },
];

interface IRoom {
  roomNumber: string;
  capacity: number;
  monthlyRent: number;
  roomstatus: any;
  roomType: any;
}
export default function PropertyDetails({
  slug,
  data,
}: {
  slug: string;
  data: any;
}) {
  const [activeImage, setActiveImage] = useState(0);

  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const moveImage = (direction: number) =>
    setActiveImage(
      (current) => (current + direction + gallery.length) % gallery.length,
    );

  const submitRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <a href="#properties" className="hover:text-foreground">
            Properties
          </a>
          <span>/</span>
          <span className="text-foreground">{data?.name}</span>
        </div>
        <section className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="relative overflow-hidden rounded-2xl border bg-background shadow-sm">
            <div className="relative aspect-[16/10] bg-muted">
              <Image
                src={gallery[activeImage]}
                alt="Modern Downtown Loft interior"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-5 pt-16">
                <span className="text-sm font-medium text-white">
                  {activeImage + 1} / {gallery.length} photos
                </span>
                <div className="flex gap-2">
                  <Button
                    aria-label="Previous image"
                    size="icon"
                    variant="secondary"
                    onClick={() => moveImage(-1)}
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    aria-label="Next image"
                    size="icon"
                    variant="secondary"
                    onClick={() => moveImage(1)}
                  >
                    <ChevronRight />
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t p-2">
              {gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`relative aspect-[16/9] overflow-hidden rounded-lg ${index === activeImage ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"}`}
                >
                  <Image
                    src={image}
                    alt={`Gallery thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center gap-6">
            <div className="flex flex-wrap gap-2">
              <Badge>Available now</Badge>
              <Badge variant="secondary">Apartment</Badge>
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {data?.name}
              </h1>
              <p className="mt-3 flex items-center gap-2 text-muted-foreground">
                <MapPin /> {data?.address}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border bg-background p-4">
                <BedDouble className="mb-3 text-primary" />
                <p className="text-xs text-muted-foreground">Rooms</p>
                <p className="font-semibold">{data?.totalrooms} available</p>
              </div>
              {/* <div className="rounded-xl border bg-background p-4">
                <Home className="mb-3 text-primary" />
                <p className="text-xs text-muted-foreground">Property</p>
                <p className="font-semibold">Co-living</p>
              </div> */}
              <div className="rounded-xl border bg-background p-4">
                <CalendarDays className="mb-3 text-primary" />
                <p className="text-xs text-muted-foreground">Lease</p>
                <p className="font-semibold">Flexible</p>
              </div>
            </div>
            {/* <div className="rounded-xl border bg-background p-5">
              <p className="text-sm text-muted-foreground">Monthly rent from</p>
              <p className="mt-1 text-3xl font-semibold">
                $1,250{" "}
                <span className="text-base font-normal text-muted-foreground">
                  / month
                </span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Utilities and Wi-Fi included
              </p>
            </div> */}
            <Button
              size="lg"
              className="w-full"
              onClick={() =>
                document
                  .getElementById("visit-request")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Request a Visit
              <CalendarDays data-icon="inline-end" />
            </Button>
          </div>
        </section>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-12">
            <section>
              <div className="mb-5">
                <p className="text-sm font-medium text-primary">THE SPACE</p>
                <h2 className="mt-1 text-2xl font-semibold">Overview</h2>
              </div>
              <p className="max-w-3xl leading-7 text-muted-foreground">
                A bright, thoughtfully designed loft in the heart of Downtown
                District. Enjoy generous shared spaces, floor-to-ceiling
                windows, and a welcoming community close to transit,
                restaurants, and everything the city has to offer.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-sm text-muted-foreground">Built</p>
                  <p className="mt-1 font-medium">2022</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p className="mt-1 font-medium">1,480 sq ft</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Furnished</p>
                  <p className="mt-1 font-medium">Fully furnished</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Minimum stay</p>
                  <p className="mt-1 font-medium">3 months</p>
                </div>
              </div>
            </section>
            <Separator />

            <section>
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <p className="text-sm font-medium text-primary">
                    FIND YOUR ROOM
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold">
                    Available rooms
                  </h2>
                </div>
                <Badge variant="outline">3 options</Badge>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {data?.rooms.map((room: IRoom) => (
                  <Card key={room.roomNumber} className="overflow-hidden py-0">
                    <div className="relative aspect-[4/3]">
                      {/* <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        className="object-cover"
                      /> */}
                    </div>
                    <CardHeader className="gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle>{room.roomNumber}</CardTitle>
                        <Badge variant="secondary">{room.roomstatus}</Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <Users /> {room.capacity}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xl font-semibold">
                        ${room.monthlyRent.toLocaleString()}
                        <span className="text-sm font-normal text-muted-foreground">
                          {" "}
                          / month
                        </span>
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          router.push("/");
                        }}
                      >
                        View room
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
            <Separator />
          </div>
          <aside className="flex flex-col gap-6">
            <Card id="visit-request">
              <CardHeader>
                <CardTitle>Request a visit</CardTitle>
                <CardDescription>
                  Choose a preferred time and we&apos;ll confirm with the owner.
                </CardDescription>
              </CardHeader>
              <form onSubmit={submitRequest}>
                <CardContent>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="visit-date">
                        Preferred date
                      </FieldLabel>
                      <Input
                        id="visit-date"
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="visit-message">
                        Message{" "}
                        <span className="font-normal text-muted-foreground">
                          (optional)
                        </span>
                      </FieldLabel>
                      <Textarea
                        id="visit-message"
                        placeholder="Tell the owner a little about yourself..."
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                      />
                      <FieldDescription>
                        We&apos;ll only share this with the property owner.
                      </FieldDescription>
                    </Field>
                  </FieldGroup>
                </CardContent>
                <CardFooter className="flex-col items-stretch gap-3">
                  <Button type="submit" disabled={submitted}>
                    {submitted ? (
                      <>
                        <Check data-icon="inline-start" /> Request sent
                      </>
                    ) : (
                      <>
                        Send visit request
                        <CalendarDays data-icon="inline-end" />
                      </>
                    )}
                  </Button>
                  {submitted && (
                    <Alert>
                      <Sparkles />
                      <AlertTitle>You&apos;re all set</AlertTitle>
                      <AlertDescription>
                        The owner will respond to your request soon.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardFooter>
              </form>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}

function AmenityIcon() {
  return <Dumbbell />;
}
