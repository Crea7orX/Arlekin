import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";

export function Footer({
  className,
  ...props
}: React.ComponentProps<"footer">) {
  return (
    <footer className={cn("bg-muted border-t shadow-sm", className)} {...props}>
      <div className="container mx-auto flex min-h-12 items-center justify-between">
        <span className="text-muted-foreground font-bold">
          Made by students of{" "}
          <Link
            href="https://itpg-varna.bg"
            className="hover:text-primary underline"
          >
            ITPG
          </Link>{" "}
          &copy; {new Date().getFullYear()}
        </span>
        <Link
          href="https://github.com/Crea7orX/arlekin"
          className="text-muted-foreground hover:text-primary font-bold"
        >
          GitHub
        </Link>
      </div>
    </footer>
  );
}
