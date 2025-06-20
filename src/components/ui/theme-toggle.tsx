"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

export function ThemeToggle({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("size-8 rounded-full md:size-12", className)}
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
      {...props}
    >
      <Sun className="size-4 scale-100 rotate-0 transition-all md:size-6 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-4 scale-0 rotate-90 transition-all md:size-6 dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
