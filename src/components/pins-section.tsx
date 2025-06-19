"use client";

import { PinInfoCard } from "@/components/pin-info-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllPinsQuery } from "@/hooks/api/use-get-all-pins-query";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { MapPin } from "lucide-react";
import React from "react";

export function PinsSection({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const { user, isLoaded } = useUser();

  const { data: pins } = useGetAllPinsQuery({});
  const myPins = React.useMemo(() => {
    if (!isLoaded || !user || !pins) return [];
    return pins.filter((pin) => pin.userId === user.id) ?? [];
  }, [isLoaded, user, pins]);

  if (!pins)
    return (
      <section className={className} {...props}>
        <Card className="bg-primary/10 container mx-auto overflow-hidden pb-0">
          <CardHeader className="flex items-center gap-4">
            <div className="bg-primary flex size-12 shrink-0 items-center justify-center rounded-sm">
              <MapPin className="text-primary-foreground size-8" />
            </div>
            <div className="flex flex-col gap-1">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-6 w-48" />
            </div>
          </CardHeader>
          <CardContent className="bg-card h-96 py-4 lg:h-[36rem]">
            <Skeleton className="bg-accent/15 flex h-full flex-col items-center justify-center gap-4 rounded-xl text-center">
              <div className="bg-primary flex size-16 animate-none items-center justify-center rounded-sm">
                <MapPin className="text-primary-foreground size-8" />
              </div>
              <p className="text-primary text-xl font-bold">Loading pins...</p>
            </Skeleton>
          </CardContent>
        </Card>
      </section>
    );

  return (
    <section className={className} {...props}>
      <Card className="bg-primary/10 container mx-auto overflow-hidden pb-0">
        <CardHeader className="flex items-center gap-4">
          <div className="bg-primary flex size-12 shrink-0 items-center justify-center rounded-sm">
            <MapPin className="text-primary-foreground size-8" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">
              <SignedOut>Newest pins</SignedOut>
              <SignedIn>My pins</SignedIn>
            </CardTitle>
            <SignedIn>
              <CardDescription className="text-lg font-medium">
                {myPins.length} saved locations
              </CardDescription>
            </SignedIn>
          </div>
        </CardHeader>
        <CardContent className="bg-card h-96 overflow-y-auto py-4 lg:h-[36rem]">
          {(user && myPins.length === 0) || pins.length === 0 ? (
            <div className="bg-accent/15 flex h-full flex-col items-center justify-center gap-4 rounded-xl text-center">
              <div className="bg-primary flex size-16 items-center justify-center rounded-sm">
                <MapPin className="text-primary-foreground size-8" />
              </div>
              <p className="text-primary text-xl font-bold">No pins yet</p>
              <p className="text-primary text-lg">
                Start your journey by clicking on the map
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <SignedOut>
                {pins.slice(0, 10).map((pin) => (
                  <PinInfoCard
                    key={pin.id}
                    className="even:bg-primary/5"
                    pin={pin}
                  />
                ))}
              </SignedOut>
              <SignedIn>
                {myPins.map((pin) => (
                  <PinInfoCard
                    key={pin.id}
                    className="even:bg-primary/5"
                    pin={pin}
                    isOwner={true}
                  />
                ))}
              </SignedIn>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
