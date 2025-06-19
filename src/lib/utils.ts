import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCoordinates(latitude: number, longitude: number) {
  return `${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`;
}

export function extractVideoId(url: string) {
  return /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/.exec(
    url,
  )?.[1];
}

export function getLocationInfo(latitude: number, longitude: number) {
  if (latitude > 35 && latitude < 70 && longitude > -10 && longitude < 40)
    return { name: "Europe", emoji: "🇪🇺", color: "from-red-500 to-red-500" };
  if (latitude > 25 && latitude < 50 && longitude > -125 && longitude < -65)
    return {
      name: "North America",
      emoji: "🌎",
      color: "from-red-500 to-red-600",
    };
  if (latitude > -35 && latitude < 35 && longitude > -20 && longitude < 50)
    return { name: "Africa", emoji: "🌍", color: "from-red-600 to-red-500" };
  if (latitude > -10 && latitude < 60 && longitude > 60 && longitude < 150)
    return { name: "Asia", emoji: "🌏", color: "from-red-500 to-red-700" };
  if (latitude > -50 && latitude < -10 && longitude > 110 && longitude < 180)
    return { name: "Australia", emoji: "🇦🇺", color: "from-red-700 to-red-500" };
  if (latitude > -60 && latitude < 15 && longitude > -85 && longitude < -35)
    return {
      name: "South America",
      emoji: "🇧🇷",
      color: "from-red-500 to-red-500",
    };
  if (latitude < -60)
    return {
      name: "Antarctica",
      emoji: "🧊",
      color: "from-blue-700 to-blue-500",
    };
  return { name: "Ocean", emoji: "🌊", color: "from-red-500 to-red-600" };
}

export function isCreatedToday(epochMillis: number): boolean {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();
  const startOfTomorrow = startOfToday + 24 * 60 * 60 * 1000;

  return epochMillis >= startOfToday && epochMillis < startOfTomorrow;
}

export function isCreatedThisWeek(epochMillis: number): boolean {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();
  const startOfTheLastWeek = startOfToday - 7 * 24 * 60 * 60 * 1000;
  const startOfTomorrow = startOfToday + 24 * 60 * 60 * 1000;

  return epochMillis >= startOfTheLastWeek && epochMillis < startOfTomorrow;
}
