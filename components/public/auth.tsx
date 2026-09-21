"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Home,
  Loader2,
  LockKeyhole,
  Mail,
  UserRound,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [role, setRole] = useState("tenant");

  function submit() {
    setStatus("idle");
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setStatus("success");
    }, 700);
  }

  function switchMode(nextMode: "login" | "register") {
    setMode(nextMode);
    setStatus("idle");
    setShowPassword(false);
  }

  return (
    <main className="min-h-screen bg-muted/30 lg:grid lg:grid-cols-[0.9fr_1.1fr]">
      <section className="relative hidden overflow-hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div
          className="absolute -right-28 -top-28 size-80 rounded-full bg-primary-foreground/10"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-36 -left-20 size-96 rounded-full border border-primary-foreground/10"
          aria-hidden="true"
        />
        <div className="relative flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground text-primary">
            <Home data-icon="inline-start" />
          </div>
          <span className="text-xl font-semibold tracking-tight">homiee</span>
        </div>
        <div className="relative max-w-lg pb-10">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground/60">
            Renting, made human
          </p>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight xl:text-6xl">
            A better place to call home.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-primary-foreground/70">
            One simple space for renters and property owners to manage homes,
            payments, and everything in between.
          </p>
        </div>
        <p className="relative text-xs text-primary-foreground/50">
          © 2026 Homiee. Built for better living.
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Home />
            </div>
            <span className="text-lg font-semibold">homiee</span>
          </div>
          <Card className="border-border/70 shadow-sm">
            <CardHeader className="gap-5 pb-4">
              <div
                className="flex items-center rounded-lg bg-muted p-1"
                role="tablist"
                aria-label="Authentication mode"
              >
                <Button
                  type="button"
                  variant={mode === "login" ? "secondary" : "ghost"}
                  className="flex-1"
                  onClick={() => switchMode("login")}
                  role="tab"
                  aria-selected={mode === "login"}
                >
                  Log in
                </Button>
                <Button
                  type="button"
                  variant={mode === "register" ? "secondary" : "ghost"}
                  className="flex-1"
                  onClick={() => switchMode("register")}
                  role="tab"
                  aria-selected={mode === "register"}
                >
                  Create account
                </Button>
              </div>
              <div>
                <CardTitle className="text-2xl">
                  {mode === "login" ? "Welcome back" : "Create your account"}
                </CardTitle>
                <CardDescription className="mt-2">
                  {mode === "login"
                    ? "Log in to continue to your Homiee dashboard."
                    : "Join Homiee and make renting feel simple."}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {status !== "idle" && (
                <Alert
                  className="mb-5"
                  variant={status === "error" ? "destructive" : "default"}
                >
                  <div className="flex items-start gap-2">
                    {status === "success" ? (
                      <CheckCircle2 className="mt-0.5" />
                    ) : (
                      <AlertCircle className="mt-0.5" />
                    )}
                    <AlertDescription>
                      {status === "success"
                        ? mode === "login"
                          ? "You are logged in. Redirecting to your dashboard."
                          : "Account created successfully. Welcome to Homiee."
                        : "We could not complete that request. Check your details and try again."}
                    </AlertDescription>
                  </div>
                </Alert>
              )}
              <div className="flex flex-col gap-4">
                {mode === "register" && (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Full name</Label>
                    <div className="relative">
                      <UserRound className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Olivia Martin"
                        className="pl-10"
                      />
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      aria-invalid={status === "error"}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    {mode === "login" && (
                      <Button
                        type="button"
                        variant="link"
                        className="h-auto p-0 text-xs"
                        onClick={() => setStatus("success")}
                      >
                        Forgot password?
                      </Button>
                    )}
                  </div>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                </div>
                {mode === "register" && (
                  <>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="confirm-password">Confirm password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Re-enter your password"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="role">I am joining as</Label>
                      <Select value={role} onValueChange={setRole}>
                        <SelectTrigger id="role">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tenant">Tenant</SelectItem>
                          <SelectItem value="owner">Owner</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-xs leading-5 text-muted-foreground">
                      By creating an account, you agree to Homiee&apos;s{" "}
                      <Button variant="link" className="h-auto p-0 text-xs">
                        Terms
                      </Button>{" "}
                      and{" "}
                      <Button variant="link" className="h-auto p-0 text-xs">
                        Privacy Policy
                      </Button>
                      .
                    </p>
                  </>
                )}
                <Button
                  type="button"
                  className="mt-2 w-full"
                  onClick={submit}
                  disabled={loading}
                >
                  {loading && (
                    <Loader2
                      className="animate-spin"
                      data-icon="inline-start"
                    />
                  )}
                  {mode === "login" ? "Log in" : "Create account"}
                </Button>
                {mode === "login" && (
                  <>
                    <div className="relative my-1">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-card px-3 text-xs text-muted-foreground">
                          or continue with
                        </span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setStatus("success")}
                    >
                      Continue with Google
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? "New to Homiee?" : "Already have an account?"}{" "}
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 font-medium"
              onClick={() =>
                switchMode(mode === "login" ? "register" : "login")
              }
            >
              {mode === "login" ? "Create an account" : "Log in"}
            </Button>
          </p>
        </div>
      </section>
    </main>
  );
}

export { Auth };
