/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@/lib/prisma';
import { User } from '@/types';





export const getUsers = async (): Promise<User[]> => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                name: true,
                email: true,
                avatar: true,
                role: true,
            },
        });
        return users || [];
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};

export const getUserById = async (id: string) => {
    try {
        return await prisma.user.findUnique({
            where: { id },

        });
    } catch (error) {
        throw new Error('Failed to fetch user');
    }

}

// get user by username
export const getUserByUsername = async (username: string) => {
    try {
        return await prisma.user.findUnique({
            where: { username },

        });
    } catch (error) {
        throw new Error('Failed to fetch user');
    }

}