"use client";

import Image from "next/image";
import {
  ArrowRight,
  Building2,
  CalendarCheck2,
  Check,
  ChevronDown,
  FileText,
  Home,
  KeyRound,
  ListChecks,
  Menu,
  Receipt,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";

const lifecycle = [
  {
    icon: Search,
    title: "Discover a property",
    text: "Browse homes that fit your budget and lifestyle.",
  },
  {
    icon: CalendarCheck2,
    title: "Request a visit",
    text: "See the space and meet your future home.",
  },
  {
    icon: FileText,
    title: "Apply for a room",
    text: "Send your details in a few simple steps.",
  },
  {
    icon: Check,
    title: "Get approved",
    text: "Track your application from request to move-in.",
  },
  {
    icon: WalletCards,
    title: "Pay rent",
    text: "Keep payments simple, clear, and on time.",
  },
  {
    icon: Receipt,
    title: "Split shared bills",
    text: "Share household costs without the awkwardness.",
  },
];

const tenantFeatures = [
  "Property discovery",
  "Visit requests",
  "Room applications",
  "Rent payments",
  "Shared bills",
  "Rental documents",
];
const ownerFeatures = [
  "Property management",
  "Room management",
  "Tenant applications",
  "Rental management",
  "Bill management",
  "Document management",
];

export function HomieeLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [searched, setSearched] = useState(false);
  const { data, isPending, isError } = useGetMe();

  const router = useRouter();
  if (isPending) {
    return <h1>Loading...</h1>;
  }

  function redirectToPage() {
    router.push("/properties");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <a
          href="#"
          className="flex items-center gap-2 font-semibold tracking-tight"
          aria-label="Homiee home"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Home data-icon="inline-start" />
          </span>
          <span className="text-xl">homiee</span>
        </a>
        <nav
          className="hidden items-center gap-8 text-sm text-muted-foreground md:flex"
          aria-label="Main navigation"
        >
          <a
            href="#how-it-works"
            className="transition-colors hover:text-foreground"
          >
            How it works
          </a>
          <a
            href="#tenants"
            className="transition-colors hover:text-foreground"
          >
            For tenants
          </a>
          <a href="#owners" className="transition-colors hover:text-foreground">
            For owners
          </a>
        </nav>

        {data && Object.keys(data?.data).length == 0 && (
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost">Log in</Button>
            <Button>
              Get started <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </header>
      {menuOpen && (
        <nav
          className="mx-5 flex flex-col gap-3 rounded-2xl border bg-card p-4 text-sm md:hidden"
          aria-label="Mobile navigation"
        >
          <a href="#how-it-works">How it works</a>
          <a href="#tenants">For tenants</a>
          <a href="#owners">For owners</a>
          <Button>Get started</Button>
        </nav>
      )}

      <section
        id="top"
        className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-28 lg:pt-20"
      >
        <div>
          <Badge
            variant="secondary"
            className="mb-6 gap-2 rounded-full px-3 py-1"
          >
            <Sparkles data-icon="inline-start" /> Rental living, made clearer
          </Badge>
          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Find your place.
            <br />
            <span className="text-muted-foreground">Manage your rental.</span>
            <br />
            Live easier.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
            Homiee helps tenants discover properties, apply for rooms, manage
            rent, split shared bills, and keep every rental document in one
            place.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={redirectToPage}>
              Find a Property <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="outline">
              List Your Property <Building2 data-icon="inline-end" />
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              <span className="grid size-8 place-items-center rounded-full border-2 border-background bg-secondary text-xs font-medium">
                AT
              </span>
              <span className="grid size-8 place-items-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                JM
              </span>
              <span className="grid size-8 place-items-center rounded-full border-2 border-background bg-accent text-xs font-medium">
                SK
              </span>
            </div>
            <span>Made for the way people rent today.</span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-5 rounded-[2rem] bg-secondary/60 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border bg-card p-3 shadow-2xl shadow-primary/10">
            <Image
              src="/modern-apartment-building-exterior.png"
              alt="Modern apartment building exterior"
              width={1200}
              height={900}
              priority
              className="h-[440px] w-full rounded-[1.4rem] object-cover"
            />
            <div className="absolute bottom-8 left-8 right-8 rounded-2xl border bg-background/90 p-4 shadow-lg backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Featured home</p>
                  <p className="mt-1 font-semibold">Maple Court, Room 2</p>
                  <p className="text-sm text-muted-foreground">
                    Brighton · Ensuite room
                  </p>
                </div>
                <span className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">
                  £680/mo
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="property-search"
        className="border-y bg-muted/40 px-5 py-8 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Start exploring
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Search for your next place
              </h2>
            </div>
            <span className="hidden text-sm text-muted-foreground sm:block">
              Thousands of rooms, one easier search.
            </span>
          </div>
          <form
            className="grid gap-3 rounded-2xl border bg-background p-3 shadow-sm md:grid-cols-[1.4fr_1fr_0.8fr_1fr_auto]"
            onSubmit={(event) => {
              event.preventDefault();
              setSearched(true);
            }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-3.5 text-muted-foreground" />
              <Input
                aria-label="Location"
                placeholder="Location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="h-12 pl-10"
              />
            </div>
            <select
              aria-label="Property type"
              className="h-12 rounded-md border bg-background px-3 text-sm"
            >
              <option>Property type</option>
              <option>Room</option>
              <option>Apartment</option>
              <option>House</option>
            </select>
            <select
              aria-label="Number of rooms"
              className="h-12 rounded-md border bg-background px-3 text-sm"
            >
              <option>Rooms</option>
              <option>1 room</option>
              <option>2 rooms</option>
              <option>3+ rooms</option>
            </select>
            <select
              aria-label="Price range"
              className="h-12 rounded-md border bg-background px-3 text-sm"
            >
              <option>Any price</option>
              <option>Under £600</option>
              <option>£600–£900</option>
              <option>£900+</option>
            </select>
            <Button type="submit" size="lg">
              Search <ArrowRight data-icon="inline-end" />
            </Button>
          </form>
          {searched && (
            <p className="mt-3 text-sm text-muted-foreground">
              Showing the best matches{location ? ` near ${location}` : ""}.
            </p>
          )}
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground">
            The rental lifecycle
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            From first search to settled in.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to move with confidence, without jumping between
            disconnected tools.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {lifecycle.map(({ icon: Icon, title, text }, index) => (
            <div key={title} className="relative">
              <div className="mb-5 grid size-11 place-items-center rounded-2xl bg-secondary">
                <Icon />
              </div>
              <p className="text-xs font-medium text-muted-foreground">
                0{index + 1}
              </p>
              <h3 className="mt-2 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="tenants"
        className="bg-secondary/60 px-5 py-20 lg:px-8 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge variant="outline" className="rounded-full">
              For tenants
            </Badge>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              A calmer way to rent your home.
            </h2>
            <p className="mt-5 max-w-lg leading-7 text-muted-foreground">
              Keep the moving parts of renting together. Find a place, stay on
              top of payments, and always know where your documents are.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {tenantFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-sm">
                  <span className="grid size-6 place-items-center rounded-full bg-background">
                    <Check data-icon="inline-start" />
                  </span>
                  {feature}
                </div>
              ))}
            </div>
            <Button className="mt-9">
              Explore properties <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
          <Card className="overflow-hidden border-0 shadow-xl">
            <CardContent className="p-0">
              <div className="flex items-center justify-between border-b bg-background px-5 py-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Tenant dashboard
                  </p>
                  <p className="font-semibold">Good morning, Alex</p>
                </div>
                <span className="size-9 rounded-full bg-secondary" />
              </div>
              <div className="grid gap-4 bg-muted/40 p-5 sm:grid-cols-2">
                <div className="rounded-xl border bg-background p-4">
                  <p className="text-xs text-muted-foreground">Next payment</p>
                  <p className="mt-2 text-2xl font-semibold">£680</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Due 1 October
                  </p>
                </div>
                <div className="rounded-xl border bg-background p-4">
                  <p className="text-xs text-muted-foreground">Shared bills</p>
                  <p className="mt-2 text-2xl font-semibold">£42.80</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Your balance
                  </p>
                </div>
                <div className="rounded-xl border bg-background p-4 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Maple Court, Room 2</p>
                    <Badge variant="secondary">Active tenancy</Badge>
                  </div>
                  <div className="mt-5 h-2 rounded-full bg-secondary">
                    <div className="h-2 w-3/4 rounded-full bg-primary" />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>Documents complete</span>
                    <span>75%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section
        id="owners"
        className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28"
      >
        <div className="order-2 lg:order-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between border-b pb-5">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Owner dashboard
                  </p>
                  <p className="font-semibold">Your portfolio</p>
                </div>
                <Badge>4 active properties</Badge>
              </div>
              <div className="mt-5 grid gap-3">
                <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-background">
                      <Building2 />
                    </span>
                    <div>
                      <p className="text-sm font-medium">Maple Court</p>
                      <p className="text-xs text-muted-foreground">
                        8 rooms · Brighton
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">£5,440/mo</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-background">
                      <Users />
                    </span>
                    <div>
                      <p className="text-sm font-medium">Applications</p>
                      <p className="text-xs text-muted-foreground">
                        3 need your review
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">Review</Badge>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-background">
                      <Receipt />
                    </span>
                    <div>
                      <p className="text-sm font-medium">Bills this month</p>
                      <p className="text-xs text-muted-foreground">
                        All reconciled
                      </p>
                    </div>
                  </div>
                  <Check />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="order-1 lg:order-2">
          <Badge variant="outline" className="rounded-full">
            For owners
          </Badge>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            Run your rental, your way.
          </h2>
          <p className="mt-5 max-w-lg leading-7 text-muted-foreground">
            A clear view of every property, room, application, payment, and
            document—so managing tenants feels less like admin.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {ownerFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-sm">
                <span className="grid size-6 place-items-center rounded-full bg-secondary">
                  <Check data-icon="inline-start" />
                </span>
                {feature}
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-9">
            List your property <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </section>

      <section className="border-y bg-muted/40 px-5 py-16 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-background">
              <ShieldCheck />
            </span>
            <div>
              <h2 className="font-semibold">
                Built around clarity and control.
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
                Your rental information stays organized, transparent, and easy
                to access when you need it.
              </p>
            </div>
          </div>
          <Button variant="outline">
            Learn about Homiee <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 text-center lg:px-8 lg:py-28">
        <p className="text-sm font-medium text-muted-foreground">
          Start your next chapter
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Ready to find your next place?
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
          Make renting feel a little more like home.
        </p>
        <Button size="lg" className="mt-8" onClick={redirectToPage}>
          Explore Properties <ArrowRight data-icon="inline-end" />
        </Button>
      </section>

      <footer className="border-t px-5 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#top" className="flex items-center gap-2 font-semibold">
              <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Home data-icon="inline-start" />
              </span>
              homiee
            </a>
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              The simpler way to find, manage, and live in your rental.
            </p>
          </div>
          <div>
            <p className="font-medium">Product</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="#property-search">Find a property</a>
              <a href="#tenants">For tenants</a>
              <a href="#owners">For owners</a>
            </div>
          </div>
          <div>
            <p className="font-medium">Resources</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="#how-it-works">How it works</a>
              <a href="#owners">List your property</a>
              <a href="#top">API documentation</a>
            </div>
          </div>
          <div>
            <p className="font-medium">Account</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="#top">Log in</a>
              <a href="#top">Create an account</a>
              <a href="#top">Contact us</a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col justify-between gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
          <span>© 2026 homiee. All rights reserved.</span>
          <span>Built for better rental living.</span>
        </div>
      </footer>
    </main>
  );
}

export default HomieeLanding;
