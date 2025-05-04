/* eslint-disable @typescript-eslint/no-unused-vars */
// noinspection JSUnusedGlobalSymbols
"use server";

import {prisma} from "@/lib/prisma";
import {createExampleSchema, updateExampleSchema} from "@/lib/definitions";
import {revalidatePath} from "next/cache";
import {auth} from '@/auth';
import {redirect} from "next/navigation";

/**
 * Example Read, Update, Delete data from Prisma ORM
 * @see https://nextjs.org/docs/app/getting-started/updating-data
 *
 * Create
 * @see https://www.prisma.io/docs/orm/prisma-client/queries/crud#create
 * Update
 * @see https://www.prisma.io/docs/orm/prisma-client/queries/crud#update
 * Delete
 * @see https://www.prisma.io/docs/orm/prisma-client/queries/crud#delete
 */
export async function createExample(prevState: unknown, formData: FormData) {
    // Authentication
    const session = await auth();
    if (!session?.user?.id) {
        redirect('/login');
    }

    // Validation
    const parsed = createExampleSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!parsed.success) {
        console.error('Validation error:', parsed.error.flatten());
        return {
            success: false,
            errors: parsed.error.flatten().fieldErrors,
        };
    }

    // Destructure data
    const {name, age, address} = parsed.data;

    // Update data
    try {
        await prisma.example.create({
            data: {
                name,
                age,
                address,
                userId: session.user.id,
            },
        });
        // Revalidate cache
        revalidatePath('/example');
        return {success: true};
    } catch (error) {
        return {success: false, error: 'Failed to create data'};
    }
}

export async function updateExample(prevState: unknown, formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        return {error: 'Unauthorized'};
    }

    const parsed = updateExampleSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!parsed.success) {
        return {errors: parsed.error.flatten().fieldErrors};
    }

    const {id, name, age, address} = parsed.data;

    try {
        await prisma.example.update({
            where: {id: BigInt(id)},
            data: {
                name,
                age,
                address,
            },
        });

        revalidatePath('/example');
        return {success: true};
    } catch (error) {
        console.error(error);
        return {error: 'Failed to update data'};
    }
}

export async function deleteExample(prevState: unknown, formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        return {error: 'Unauthorized'};
    }

    const id = formData.get('id');
    if (!id) return {error: 'Missing ID'};

    try {
        await prisma.example.delete({
            where: {id: BigInt(id.toString())},
        });

        revalidatePath('/example');
        return {success: true};
    } catch (error) {
        console.error(error);
        return {error: 'Failed to delete data'};
    }
}
