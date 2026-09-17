import Image from "next/image";
import { ArrowUpRight, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Property {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
  price: number;
  availableRooms: number;
  amenities: string[];
  propertyType: string;
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Card className="group overflow-hidden border-border/70 bg-card py-0 transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <Badge
            variant="secondary"
            className="bg-background/90 backdrop-blur-sm"
          >
            {property.propertyType}
          </Badge>
          <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
            Available
          </Badge>
        </div>
      </div>
      <CardContent className="flex flex-col gap-3 p-5">
        <div>
          <h2 className="truncate text-lg font-semibold tracking-tight">
            {property.name}
          </h2>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5" />
            {property.location}
          </div>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
          {property.description}
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="size-4" />
          <span>
            {property.availableRooms} available room
            {property.availableRooms === 1 ? "" : "s"}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {property.amenities.map((amenity) => (
            <Badge key={amenity} variant="outline" className="font-normal">
              {amenity}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-end justify-between border-t bg-muted/20 px-5 py-4">
        <div>
          <p className="text-xs text-muted-foreground">Starting from</p>
          <p className="mt-0.5 text-xl font-semibold">
            ${property.price.toLocaleString()}
            <span className="text-sm font-normal text-muted-foreground">
              {" "}
              / month
            </span>
          </p>
        </div>
        <Button size="sm" variant="outline">
          View property
          <ArrowUpRight data-icon="inline-end" />
        </Button>
      </CardFooter>
    </Card>
  );
}
