import {
    pgTable,
    uuid,
    varchar,
    text,
    timestamp,
    integer,
    boolean
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password_hash: varchar("password_hash").notNull(),
    full_name: varchar("full_name", { length: 255 }).notNull(),
    role: varchar("role", { length: 50 }).notNull(),
    is_active: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").defaultNow(),
});

export const clients = pgTable("clients", {
    id: uuid("id").primaryKey().defaultRandom(),
    owner_user_id: uuid("owner_user_id").notNull().references(() => users.id),
    first_name: varchar("first_name", { length: 255 }).notNull(),
    last_name: varchar("last_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).unique(),
    phone: varchar("phone", { length: 255 }).notNull(),
    address: varchar("address", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});