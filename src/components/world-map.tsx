"use client";

import { PinAddDialog } from "@/components/pin-add-dialog";
import { PinInfo } from "@/components/pin-info";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllPinsQuery } from "@/hooks/api/use-get-all-pins-query";
import { cn } from "@/lib/utils";
import { useAuth, useClerk } from "@clerk/nextjs";
import type L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Globe } from "lucide-react";
import dynamic from "next/dynamic";
import * as React from "react";
import { useMapEvents } from "react-leaflet";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export interface PendingPin {
  latitude: number;
  longitude: number;
}

export function WorldMap({ className, ...props }: React.ComponentProps<"div">) {
  const { data: pins } = useGetAllPinsQuery({});
  const { userId, isSignedIn } = useAuth();
  const clerk = useClerk();

  const [showDialog, setShowDialog] = React.useState(false);
  const [pendingPin, setPendingPin] = React.useState<PendingPin | null>(null);
  const [isReady, setIsReady] = React.useState(false);
  const [Leaflet, setLeaflet] = React.useState<typeof L | null>(null);
  const [icon, setIcon] = React.useState<L.Icon | L.DivIcon | undefined>(
    undefined,
  );
  const [iconOwned, setIconOwned] = React.useState<
    L.Icon | L.DivIcon | undefined
  >(undefined);

  React.useEffect(() => {
    const loadLeaflet = async () => {
      const leafletModule = await import("leaflet");
      setLeaflet(leafletModule);

      const icon = new leafletModule.Icon({
        iconUrl: "/assets/marker-icon-red.png",
        shadowUrl: "/assets/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      setIcon(icon);

      const iconOwned = new leafletModule.Icon({
        iconUrl: "/assets/marker-icon-blue.png",
        shadowUrl: "/assets/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      setIconOwned(iconOwned);
    };
    void loadLeaflet();
    setIsReady(true);
  }, []);

  const handleMapClick = (latitude: number, longitude: number) => {
    if (!isSignedIn) {
      clerk.openSignIn();
      return;
    }

    setPendingPin({ latitude, longitude });
    setShowDialog(true);
  };

  if (!isReady || !Leaflet || !pins) {
    return (
      <Skeleton
        className={cn(
          "bg-accent/15 flex h-full flex-col items-center justify-center gap-4 rounded-none text-center",
          className,
        )}
        {...props}
      >
        <div className="bg-primary flex size-16 items-center justify-center rounded-sm">
          <Globe className="text-primary-foreground size-8" />
        </div>
        <p className="text-primary text-xl font-bold">Loading World Map...</p>
      </Skeleton>
    );
  }

  return (
    <>
      <div className={cn("relative h-full w-full overflow-hidden", className)}>
        <MapContainer
          center={[42.7389, 25.2342]}
          zoom={7}
          style={{ height: "100%", width: "100%" }}
          className="z-0 rounded-b-xl"
          maxBounds={[
            [-90, -180],
            [90, 180],
          ]}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            noWrap={true}
          />
          <MapClickHandler onMapClick={handleMapClick} />
          {pins.map((pin) => (
            <Marker
              key={pin.id}
              position={[pin.latitude, pin.longitude]}
              icon={pin.userId === userId ? iconOwned : icon}
            >
              <Popup className="min-w-[16rem]">
                <PinInfo pin={pin} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <PinAddDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        pendingPin={pendingPin}
      />
    </>
  );
}

interface MapClickHandlerProps {
  onMapClick: (latitude: number, longitude: number) => void;
}

function MapClickHandler({ onMapClick }: MapClickHandlerProps) {
  useMapEvents({
    click: (e: L.LeafletMouseEvent) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}
