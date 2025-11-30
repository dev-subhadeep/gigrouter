import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { clients } from "./clients.schema";


export async function createClient(userId: string, data: {
    owner_user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
}) {
    const [client] = await db.insert(clients).values({ ...data, owner_user_id: userId }).returning();
    return client;
}

export async function listClients(userId: string) {
    return db
        .select()
        .from(clients)
        .where(eq(clients.owner_user_id, userId))
        .orderBy(clients.createdAt);
}

export async function getClientById(userId: string, id: string) {
    const [client] = await db
        .select().from(clients)
        .where(
            and(
                eq(clients.id, id),
                eq(clients.owner_user_id, userId)
            )
        );
    return client;
}

export async function updateClient(userId: string, id: string, data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
}) {
    const [client] = await db
        .update(clients)
        .set(data)
        .where(
            and(
                eq(clients.id, id),
                eq(clients.owner_user_id, userId)
            )
        )
        .returning();
    return client;
}

export async function deleteClient(userId: string, id: string) {
    const [client] = await db
        .delete(clients)
        .where(
            and(
                eq(clients.id, id),
                eq(clients.owner_user_id, userId)
            )
        )
        .returning();
    return client;
}
