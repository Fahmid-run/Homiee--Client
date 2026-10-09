import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import {
  ActivityIcon,
  CircleCheckIcon,
  FileSignatureIcon,
  SendIcon,
  UserCheckIcon,
} from "lucide-react";
import { formatDateTime, type TimelineEvent } from "../rental/rental-data";

const kindConfig: Record<
  TimelineEvent["kind"],
  { icon: typeof CircleCheckIcon; className: string }
> = {
  application: {
    icon: UserCheckIcon,
    className: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  rental: {
    icon: FileSignatureIcon,
    className: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  "payment-initiated": {
    icon: SendIcon,
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  "payment-completed": {
    icon: CircleCheckIcon,
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
};

export function ActivityTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ActivityIcon className="size-4 text-muted-foreground" />
          Activity Timeline
        </CardTitle>
        <CardDescription>Full history of this rental record.</CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="relative flex flex-col">
          {events.map((event, index) => {
            const config = kindConfig[event.kind];
            const Icon = config.icon;
            const isLast = index === events.length - 1;
            return (
              <li key={event.id} className="flex gap-4 pb-6 last:pb-0">
                <div className="relative flex flex-col items-center">
                  <div
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-full",
                      config.className,
                    )}
                  >
                    <Icon className="size-4" />
                  </div>
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="mt-1 w-px flex-1 bg-border"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-0.5 pt-1.5">
                  <p className="text-sm font-medium leading-none">
                    {event.title}
                  </p>
                  <time className="text-xs text-muted-foreground">
                    {formatDateTime(event.date)}
                  </time>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
