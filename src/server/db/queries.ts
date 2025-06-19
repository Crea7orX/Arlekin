import "server-only";

import type { PinCreate } from "@/lib/validation/pin";
import { db } from "@/server/db";
import { pins } from "@/server/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";

interface pinInsertProps {
  create: PinCreate;
  userId: string;
}

export async function pinInsert({ create, userId }: pinInsertProps) {
  const user = await currentUser();

  return (
    await db
      .insert(pins)
      .values({
        title: create.title.trim(),
        url: create.url.trim(),
        latitude: create.latitude,
        longitude: create.longitude,
        userId,
        userName: user?.fullName ?? "Unknown",
      })
      .returning()
  )[0];
}

export async function pinsGetAll() {
  return db.select().from(pins).orderBy(desc(pins.createdAt));
}

interface pinDeleteProps {
  id: string;
  userId: string;
}

export async function pinDelete({ id, userId }: pinDeleteProps) {
  return (
    await db
      .delete(pins)
      .where(
        and(
          eq(pins.userId, userId), // Ensure ownership
          eq(pins.id, id),
        ),
      )
      .returning()
  )[0];
}
