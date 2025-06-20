"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { PendingPin } from "@/components/world-map";
import { useCreatePinMutation } from "@/hooks/api/use-create-pin-mutation";
import { pinCreateSchema, type PinCreate } from "@/lib/validation/pin";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { MapPin, Navigation, Sparkles } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props extends React.ComponentProps<typeof Dialog> {
  pendingPin: PendingPin | null;
}

export function PinAddDialog({ children, pendingPin, ...props }: Props) {
  const { mutateAsync: createPin } = useCreatePinMutation();

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<PinCreate>({
    resolver: zodResolver(pinCreateSchema),
    defaultValues: { title: "", url: "", latitude: 0, longitude: 0 },
  });

  const onSubmit = async (data: PinCreate) => {
    if (pendingPin) {
      setIsLoading(true);
      const toastId = toast.loading("Creating pin...");
      createPin({
        ...data,
        latitude: pendingPin.latitude,
        longitude: pendingPin.longitude,
      })
        .then(() => {
          toast.success("Pin created successfully!", {
            id: toastId,
          });

          props.onOpenChange?.(false);
          form.reset();
        })
        .catch(() => {
          toast.error("Failed to create pin!", {
            id: toastId,
          });
        });
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    props.onOpenChange?.(false);
  };

  return (
    <Dialog {...props}>
      <Form {...form}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3 text-xl">
                <div className="bg-primary flex size-10 shrink-0 items-center justify-center rounded-sm">
                  <MapPin className="text-primary-foreground size-6" />
                </div>
                <span className="text-primary font-bol d">Add new pin</span>
              </DialogTitle>
            </DialogHeader>
            {pendingPin && (
              <div className="border-primary/30 bg-primary/5 rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <Navigation className="text-primary size-4" />
                  <p className="text-primary text-sm font-bold">
                    {formatCoordinates(
                      pendingPin.latitude,
                      pendingPin.longitude,
                    )}
                  </p>
                </div>
              </div>
            )}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What makes this place special?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Amazing sunset spot, Best coffee in town, Dream destination..."
                      maxLength={pinCreateSchema.shape.title.maxLength!}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube video link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://youtube.com/watch?v=XXXXXXXXXX"
                      maxLength={128}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="gap-y-2">
              <Button
                variant="outline"
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button disabled={isLoading}>
                <Sparkles className="size-4" />
                Add pin
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}

function formatCoordinates(latitude: number, longitude: number) {
  return `${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`;
}
