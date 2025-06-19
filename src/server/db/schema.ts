import IdPrefix, { generateId } from "@/lib/ids";
import { sql } from "drizzle-orm";
import {
  customType,
  integer,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";

const numericAsNumber = customType<{
  data: number;
  driverData: string;
  config: { precision?: number; scale?: number };
}>({
  dataType(config) {
    const precision = config?.precision ?? 10;
    const scale = config?.scale ?? 2;
    return `numeric(${precision}, ${scale})`;
  },
  fromDriver(value) {
    return parseFloat(value);
  },
  toDriver(value) {
    return value.toString();
  },
});

export const pins = pgTable("pins", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .$default(() => generateId(IdPrefix.PIN)),
  title: varchar("title", { length: 100 }).notNull(),
  url: text("url"),
  latitude: numericAsNumber("latitude", { precision: 6, scale: 4 }).notNull(),
  longitude: numericAsNumber("longitude", { precision: 7, scale: 4 }).notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  userName: varchar("user_name", { length: 256 }).notNull(),
  createdAt: integer("created_at")
    .default(sql`(EXTRACT(EPOCH FROM NOW()))`)
    .notNull(),
});
