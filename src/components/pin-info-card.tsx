"use client";

import { PinDeleteAlertDialog } from "@/components/pin-delete-alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  cn,
  extractVideoId,
  formatCoordinates,
  getLocationInfo,
} from "@/lib/utils";
import type { PinResponse } from "@/lib/validation/pin";
import { Calendar, MapPin, Navigation, Trash, User } from "lucide-react";
import Link from "next/link";
import * as React from "react";

interface Props extends React.ComponentProps<typeof Card> {
  pin: PinResponse;
  isOwner?: boolean;
}

export function PinInfoCard({ className, pin, isOwner, ...props }: Props) {
  const videoId = React.useMemo(() => extractVideoId(pin.url), [pin.url]);
  const locationInfo = React.useMemo(
    () => getLocationInfo(pin.latitude, pin.longitude),
    [pin.latitude, pin.longitude],
  );

  return (
    <Card
      className={cn(
        "border-t-primary flex-row gap-2 rounded-t-none border-t-4",
        className,
      )}
      {...props}
    >
      <CardHeader className="max-md:hidden">
        <div
          className={cn(
            "bg-primary flex size-10 items-center justify-center rounded-sm",
            isOwner && "bg-accent",
          )}
        >
          <MapPin
            className={cn(
              "text-primary-foreground size-6",
              isOwner && "text-accent-foreground",
            )}
          />
        </div>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-4 overflow-hidden">
        <CardTitle className="overflow-hidden font-bold text-ellipsis">
          {pin.title}
        </CardTitle>
        <div className="flex flex-1 flex-col items-start gap-4 lg:flex-row">
          <Link href={pin.url} target="_blank" className="relative w-fit">
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt="YouTube Video Thumbnail"
              className="w-full max-w-sm rounded-lg shadow"
            />
            <img
              src="/assets/youtube-play.svg"
              alt="Play button"
              className="absolute inset-0 top-1/2 left-1/2 w-24 -translate-x-1/2 -translate-y-1/2 opacity-80"
            />
          </Link>
          <div className="flex h-full flex-col items-start gap-2">
            <div className="bg-primary/10 flex items-center gap-2 rounded-lg p-2">
              <User className="size-4" />
              <span className="font-bold">{pin.userName}</span>
            </div>
            <div className="bg-accent/10 flex items-center gap-1 rounded-lg p-2">
              <span className="text-md">{locationInfo.emoji}</span>
              <span className="font-medium">{locationInfo.name}</span>
            </div>
            <div className="bg-primary text-primary-foreground flex items-center gap-2 rounded-lg p-2">
              <Navigation className="size-4" />
              <span className="font-medium">
                {formatCoordinates(pin.latitude, pin.longitude)}
              </span>
            </div>
            <div className="bg-accent text-accent-foreground flex items-center gap-2 rounded-lg p-2">
              <Calendar className="size-4" />
              <span className="font-medium">
                {new Date(pin.createdAt * 1000).toLocaleString()}
              </span>
            </div>
            {isOwner && (
              <PinDeleteAlertDialog id={pin.id}>
                <Button variant="destructive" className="mt-auto">
                  <Trash className="size-4" />
                  <span>Remove</span>
                </Button>
              </PinDeleteAlertDialog>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
