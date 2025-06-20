"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeletePinMutation } from "@/hooks/api/use-delete-pin-mutation";
import { Trash } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

interface Props extends React.ComponentProps<typeof AlertDialog> {
  id: string;
}

export function PinDeleteAlertDialog({ children, id, ...props }: Props) {
  const { mutateAsync: deletePin } = useDeletePinMutation({ id });

  const [isLoading, setIsLoading] = React.useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Deleting pin...");
    await deletePin()
      .then(() => {
        toast.warning("Pin deleted successfully!", {
          id: toastId,
        });

        props.onOpenChange?.(false);
      })
      .catch(() => {
        toast.error("Failed to delete pin!", {
          id: toastId,
        });
      });
    setIsLoading(false);
  };

  return (
    <AlertDialog {...props}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will remove the selected pin and
            it will not be displayed on the map.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            <Trash className="size-4" />
            Remove
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
