import { cn } from "@/lib/utils";
import * as React from "react";

export function HeroSection({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("", className)} {...props}>
      <div className="container mx-auto flex flex-col items-center gap-4 text-center">
        <h2 className="text-primary text-3xl font-bold lg:text-6xl">
          Explore the World, One Pin at a Time
        </h2>
        <p className="text-muted-foreground max-w-3xl text-lg font-medium lg:max-w-5xl lg:text-3xl">
          Join the global map of the Arlekin Festival 🌍 and share your artistic
          spirit with the world 🎭 by choosing your location 📍 placing a pin on
          the interactive map 🗺️ and adding a link to your video participation.
          🎥 Show where are you from and let your creativity shine. 🌟 Become
          part of a worldwide community of performers dreamers and storytellers.
          🌐 Each pin tells a story, 📖 share it and inspire others across the
          globe! 🌎
        </p>
      </div>
    </section>
  );
}
