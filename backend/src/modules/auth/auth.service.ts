// src/modules/auth/auth.service.ts
import argon2 from "argon2";
import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function registerUser(payload: { email: string; password: string; full_name: string; role: string }) {
    const existing = await db.select().from(users).where(eq(users.email, payload.email));
    if (existing.length) throw new Error("Email already registered");

    const hash = await argon2.hash(payload.password);
    const [created] = await db
        .insert(users)
        .values({
            email: payload.email,
            password_hash: hash,
            full_name: payload.full_name,
            role: payload.role
        })
        .returning();
    return created;
}

export async function verifyUser(email: string, password: string) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) return null;
    const valid = await argon2.verify(user.password_hash, password);
    if (!valid) return null;
    return user;
}

export async function findById(id: string) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || null;
}
