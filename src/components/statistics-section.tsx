"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllPinsQuery } from "@/hooks/api/use-get-all-pins-query";
import { cn, isCreatedThisWeek, isCreatedToday } from "@/lib/utils";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Calendar, Clock, MapPin } from "lucide-react";
import React from "react";

export function StatisticsSection({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const { user, isLoaded } = useUser();

  const { data: pins } = useGetAllPinsQuery({});

  const totalPins = React.useMemo(() => {
    if (!pins) return 0;
    if (!isLoaded || !user) return pins.length;
    return pins.filter((pin) => pin.userId === user.id).length;
  }, [isLoaded, user, pins]);
  const addedPinsToday = React.useMemo(() => {
    if (!pins) return 0;
    if (!isLoaded || !user)
      return pins.filter((pin) => isCreatedToday(pin.createdAt * 1000)).length;
    return pins.filter(
      (pin) => pin.userId === user.id && isCreatedToday(pin.createdAt * 1000),
    ).length;
  }, [isLoaded, user, pins]);
  const addedPinsLastWeek = React.useMemo(() => {
    if (!pins) return 0;
    if (!isLoaded || !user)
      return pins.filter((pin) => isCreatedThisWeek(pin.createdAt * 1000))
        .length;
    return pins.filter(
      (pin) =>
        pin.userId === user.id && isCreatedThisWeek(pin.createdAt * 1000),
    ).length;
  }, [isLoaded, user, pins]);

  return (
    <section className={cn("", className)} {...props}>
      <div className="container mx-auto grid gap-4 text-center max-md:grid-rows-3 md:grid-cols-3 md:gap-6">
        <Card className="bg-primary/5">
          <CardContent className="flex flex-col items-center gap-6">
            <div className="bg-primary flex size-16 items-center justify-center rounded-sm">
              <MapPin className="text-primary-foreground size-10" />
            </div>
            <div className="flex flex-col items-center gap-1">
              {pins ? (
                <span className="text-3xl font-bold">{totalPins}</span>
              ) : (
                <Skeleton className="h-9 w-16" />
              )}
              <span className="text-lg font-medium">
                <SignedOut>Saved locations</SignedOut>
                <SignedIn>My locations</SignedIn>
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-accent/5">
          <CardContent className="flex flex-col items-center gap-6">
            <div className="bg-primary flex size-16 items-center justify-center rounded-sm">
              <Clock className="text-primary-foreground size-10" />
            </div>
            <div className="flex flex-col items-center gap-1">
              {pins ? (
                <span className="text-3xl font-bold">{addedPinsToday}</span>
              ) : (
                <Skeleton className="h-9 w-16" />
              )}
              <span className="text-lg font-medium">
                <SignedOut>Added today</SignedOut>
                <SignedIn>My added today</SignedIn>
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-primary/5">
          <CardContent className="flex flex-col items-center gap-6">
            <div className="bg-primary flex size-16 items-center justify-center rounded-sm">
              <Calendar className="text-primary-foreground size-10" />
            </div>
            <div className="flex flex-col items-center gap-1">
              {pins ? (
                <span className="text-3xl font-bold">{addedPinsLastWeek}</span>
              ) : (
                <Skeleton className="h-9 w-16" />
              )}
              <span className="text-lg font-medium">
                <SignedOut>Added last week</SignedOut>
                <SignedIn>My added last week</SignedIn>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
