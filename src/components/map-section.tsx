import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WorldMap } from "@/components/world-map";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import * as React from "react";

export function MapSection({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("", className)} {...props}>
      <Card className="bg-primary/10 container mx-auto overflow-hidden pb-0">
        <CardHeader className="flex items-center gap-4">
          <div className="bg-primary flex size-12 shrink-0 items-center justify-center rounded-sm">
            <Globe className="text-primary-foreground size-8" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">
              Interactive World Map
            </CardTitle>
            <CardDescription className="text-lg font-medium">
              Click anywhere on the map to add a pin. Each pin represents a
              special place in your or others journey.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="bg-card h-80 px-0 lg:h-[36rem]">
          <WorldMap />
        </CardContent>
      </Card>
    </section>
  );
}
