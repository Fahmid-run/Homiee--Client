"use client";

import { ChangeEvent, DragEvent, useMemo, useState } from "react";
import {
  Archive,
  Download,
  FileImage,
  FileText,
  FolderOpen,
  MoreHorizontal,
  Trash2,
  Upload,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const initialDocs = [
  {
    id: 1,
    name: "Maple Heights lease agreement.pdf",
    type: "Lease agreement",
    date: "Sep 18, 2026",
    property: "Maple Heights Residence",
    tenant: "Alex Johnson",
    size: "2.4 MB",
    kind: "pdf",
  },
  {
    id: 2,
    name: "Move-in inspection checklist.pdf",
    type: "Inspection",
    date: "Sep 12, 2026",
    property: "Maple Heights Residence",
    tenant: "Alex Johnson",
    size: "856 KB",
    kind: "pdf",
  },
  {
    id: 3,
    name: "Utility setup guide.png",
    type: "House guide",
    date: "Sep 08, 2026",
    property: "Riverside Studios",
    tenant: "Maya Chen",
    size: "1.1 MB",
    kind: "image",
  },
];

function FileIcon({ kind, large = false }: { kind: string; large?: boolean }) {
  const Icon = kind === "image" ? FileImage : FileText;
  return (
    <div
      className={`flex ${large ? "size-12" : "size-10"} shrink-0 items-center justify-center rounded-xl ${kind === "image" ? "bg-sky-500/10 text-sky-500" : "bg-rose-500/10 text-rose-500"}`}
    >
      <Icon className={large ? "size-6" : "size-5"} />
      <span className="sr-only">
        {kind === "image" ? "Image file" : "PDF document"}
      </span>
    </div>
  );
}

function UploadPanel({ onUpload }: { onUpload: (file: File) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", description: "" });
  const handleFile = (next: File | undefined) => {
    if (!next) return;
    if (next.size > 10 * 1024 * 1024) {
      setError("Files must be smaller than 10 MB.");
      return;
    }
    setError("");
    setFile(next);
    setForm((current) => ({ ...current, name: current.name || next.name }));
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    handleFile(event.target.files?.[0]);
  const drop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    handleFile(event.dataTransfer.files[0]);
  };
  const submit = () => {
    if (!file || !form.name) {
      setError("Add a document name and file before uploading.");
      return;
    }
    setError("");
    setProgress(35);
    setTimeout(() => setProgress(72), 250);
    setTimeout(() => {
      setProgress(100);
      onUpload(file);
    }, 550);
  };
  return (
    <Card className="border-border/70 bg-card/80 shadow-sm">
      <CardHeader className="border-b border-border/60">
        <CardTitle className="text-lg">Upload Rental Document</CardTitle>
        <CardDescription>
          Add a lease, inspection report, or helpful rental file.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="doc-name">Document name</Label>
            <Input
              id="doc-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Lease agreement"
            />
          </div>
          <div className="grid gap-2">
            <Label>Rental</Label>
            <Select defaultValue="maple">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maple">
                  Maple Heights · Alex Johnson
                </SelectItem>
                <SelectItem value="river">
                  Riverside Studios · Maya Chen
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="description">
              Description{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Add context for the tenant"
              rows={3}
            />
          </div>
        </div>
        <label
          htmlFor="rental-file"
          onDragOver={(e) => e.preventDefault()}
          onDrop={drop}
          className="flex min-h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 px-5 text-center transition-colors hover:bg-primary/10"
        >
          <Upload className="text-primary" />
          <span className="font-medium">
            {file ? file.name : "Drop a file here or browse"}
          </span>
          <span className="text-xs text-muted-foreground">
            PDF, JPG, PNG, or DOCX up to 10 MB
          </span>
          <Input
            id="rental-file"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.docx"
            onChange={handleChange}
            className="sr-only"
          />
        </label>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        {progress > 0 && (
          <div className="grid gap-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Uploading document</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}
        <Button
          onClick={submit}
          disabled={progress > 0 && progress < 100}
          className="w-fit"
        >
          <Upload data-icon="inline-start" />
          {progress === 100 ? "Uploaded" : "Upload document"}
        </Button>
      </CardContent>
    </Card>
  );
}

function DocumentTable({
  docs,
  tenant = false,
  onDelete,
}: {
  docs: typeof initialDocs;
  tenant?: boolean;
  onDelete?: (id: number) => void;
}) {
  if (!docs.length)
    return (
      <Card className="border-border/70 bg-card/80">
        <CardContent className="flex min-h-64 flex-col items-center justify-center gap-3 text-center">
          <FolderOpen className="size-10 text-muted-foreground" />
          <h3 className="font-semibold">No documents yet</h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Rental documents shared with this rental will appear here.
          </p>
        </CardContent>
      </Card>
    );
  return (
    <Card className="border-border/70 bg-card/80 shadow-sm">
      <CardHeader className="border-b border-border/60">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">
              {tenant ? "Documents for your rental" : "Rental documents"}
            </CardTitle>
            <CardDescription>
              {docs.length} files associated with this workspace
            </CardDescription>
          </div>
          <Badge variant="secondary">{docs.length} files</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/60">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col gap-4 px-5 py-4 transition-colors hover:bg-muted/20 lg:grid lg:grid-cols-[minmax(240px,1.6fr)_1fr_1fr_100px_auto] lg:items-center lg:gap-5"
            >
              <div className="flex items-center gap-3">
                <FileIcon kind={doc.kind} />
                <div className="min-w-0">
                  <p className="truncate font-medium">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.size} · Uploaded {doc.date}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Type</p>
                <Badge variant="outline" className="mt-1">
                  {doc.type}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {tenant ? "Owner" : "Property / tenant"}
                </p>
                <p className="mt-1 text-sm">
                  {tenant ? "Jordan Miller" : doc.property}
                </p>
                {!tenant && (
                  <p className="text-xs text-muted-foreground">{doc.tenant}</p>
                )}
              </div>
              <div className="text-sm text-muted-foreground">{doc.size}</div>
              <div className="flex items-center gap-2 lg:justify-end">
                <Button variant="outline" size="sm">
                  <FolderOpen data-icon="inline-start" />
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Download document"
                >
                  <Download />
                </Button>
                {!tenant && (
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Delete ${doc.name}`}
                    onClick={() => onDelete?.(doc.id)}
                  >
                    <Trash2 />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function RentalDocuments() {
  const [docs, setDocs] = useState(initialDocs);
  const [mode, setMode] = useState("owner");
  const visibleDocs = useMemo(
    () =>
      mode === "tenant"
        ? docs.filter((doc) => doc.property === "Maple Heights Residence")
        : docs,
    [docs, mode],
  );
  return (
    <main className="min-h-screen bg-muted/20 text-foreground">
      <header className="border-b border-border/70 bg-background">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8">
          <p className="text-sm text-muted-foreground">
            Homiee workspace / Rental documents
          </p>
          <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Rental documents
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Keep every important rental file in one secure place.
              </p>
            </div>
            <Tabs value={mode} onValueChange={setMode}>
              <TabsList>
                <TabsTrigger value="owner">Owner view</TabsTrigger>
                <TabsTrigger value="tenant">Tenant view</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 p-5 sm:p-8">
        {mode === "owner" && (
          <UploadPanel
            onUpload={(file) =>
              setDocs((current) => [
                {
                  id: Date.now(),
                  name: file.name,
                  type: "Rental document",
                  date: "Today",
                  property: "Maple Heights Residence",
                  tenant: "Alex Johnson",
                  size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
                  kind: file.type.startsWith("image") ? "image" : "pdf",
                },
                ...current,
              ])
            }
          />
        )}
        <DocumentTable
          docs={visibleDocs}
          tenant={mode === "tenant"}
          onDelete={(id) =>
            setDocs((current) => current.filter((doc) => doc.id !== id))
          }
        />
      </div>
    </main>
  );
}

export { FileIcon };
