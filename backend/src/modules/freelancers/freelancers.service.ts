import { db } from "../../db";
import { freelancers } from "./freelancers.schema";
import { and, eq } from "drizzle-orm";

/** CREATE Freelancer */
export async function createFreelancer(
    userId: string,
    data: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        address: string;
        aadhaar_no: string;
        photo_url: string;
        gigs: string[];
    }
) {
    const [freelancer] = await db
        .insert(freelancers)
        .values({
            ...data,
            owner_user_id: userId,
        })
        .returning();
    return freelancer;
}

/** LIST Freelancers */
export async function listFreelancers(userId: string) {
    return db
        .select()
        .from(freelancers)
        .where(eq(freelancers.owner_user_id, userId))
        .orderBy(freelancers.createdAt);
}

/** GET ONE Freelancer */
export async function getFreelancerById(userId: string, id: string) {
    const [freelancer] = await db
        .select()
        .from(freelancers)
        .where(
            and(
                eq(freelancers.id, id),
                eq(freelancers.owner_user_id, userId)
            )
        );
    return freelancer;
}

/** UPDATE Freelancer */
export async function updateFreelancer(userId: string, id: string, data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    aadhaar_no: string;
    photo_url: string;
    gigs: string[];
}) {
    const [freelancer] = await db
        .update(freelancers)
        .set(data)
        .where(
            and(
                eq(freelancers.id, id),
                eq(freelancers.owner_user_id, userId)
            )
        )
        .returning();
    return freelancer;
}

/** DELETE Freelancer */
export async function deleteFreelancer(userId: string, id: string) {
    const [freelancer] = await db
        .delete(freelancers)
        .where(
            and(
                eq(freelancers.id, id),
                eq(freelancers.owner_user_id, userId)
            )
        )
        .returning();
    return freelancer;
}
