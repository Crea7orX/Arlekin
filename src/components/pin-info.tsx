import { cn, extractVideoId, formatCoordinates } from "@/lib/utils";
import type { PinResponse } from "@/lib/validation/pin";
import { Calendar, MapPinned, Navigation, User } from "lucide-react";
import Link from "next/link";
import * as React from "react";

interface Props extends React.ComponentProps<"div"> {
  pin: PinResponse;
}

export function PinInfo({ className, pin, ...props }: Props) {
  const videoId = React.useMemo(() => extractVideoId(pin.url), [pin.url]);

  return (
    <div
      className={cn("mx-auto flex flex-col items-center gap-4", className)}
      {...props}
    >
      <div className="flex w-full flex-col items-center gap-1">
        <div className="flex w-full items-center justify-center gap-1">
          <MapPinned className="size-5 shrink-0" />
          <h3 className="overflow-hidden font-semibold text-ellipsis">
            {pin.title}
          </h3>
        </div>
        <div className="flex w-full items-center justify-center gap-1">
          <User className="size-5 shrink-0" />
          <h3 className="overflow-hidden font-semibold text-ellipsis">
            {pin.userName}
          </h3>
        </div>
      </div>
      <Link href={pin.url} target="_blank" className="relative w-fit">
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt="YouTube Video Thumbnail"
          className="w-full max-w-md rounded-lg shadow"
        />
        <img
          src="/assets/youtube-play.svg"
          alt="Play button"
          className="absolute inset-0 top-1/2 left-1/2 w-16 -translate-x-1/2 -translate-y-1/2 opacity-80"
        />
      </Link>
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center justify-center gap-1">
          <Navigation className="size-4" />
          <span>{formatCoordinates(pin.latitude, pin.longitude)}</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <Calendar className="size-4" />
          <span>{new Date(pin.createdAt * 1000).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
