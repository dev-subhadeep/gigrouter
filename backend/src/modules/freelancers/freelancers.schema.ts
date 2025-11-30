import {
    pgTable,
    uuid,
    varchar,
    text,
    timestamp,
    integer,
    boolean
} from "drizzle-orm/pg-core";

import { users } from "../auth/auth.schema";

export const freelancers = pgTable("freelancers", {
    id: uuid("id").primaryKey().defaultRandom(),

    owner_user_id: uuid("owner_user_id").notNull().references(() => users.id),

    first_name: varchar("first_name", { length: 255 }).notNull(),
    last_name: varchar("last_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }),
    phone: varchar("phone", { length: 255 }).notNull(),
    address: varchar("address", { length: 255 }).notNull(),

    aadhaar_no: varchar("aadhaar_no", { length: 255 }).notNull(),

    photo_url: text("photo_url"),

    gigs: text("gigs").array().notNull(),

    createdAt: timestamp("created_at").defaultNow(),
});