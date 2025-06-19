import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export function Header({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      className={cn("bg-muted sticky top-0 z-50 border-b shadow-sm", className)}
      {...props}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="Harlekin"
            width={512}
            height={512}
            className="size-10 md:size-16 lg:size-20"
          />
          <div className="text-primary flex flex-col">
            <h1 className="text-2xl font-bold">Harlekin</h1>
            <p className="font-medium">Discorver & Save Places</p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <SignedOut>
            <SignInButton mode="modal">
              <Button>Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <ClerkLoading>
              <Skeleton className="size-8 rounded-full md:size-12" />
            </ClerkLoading>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "!size-8 md:!size-12",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
