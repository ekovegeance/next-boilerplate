import {PrismaClient, Prisma} from '@/app/generated/prisma'
import {hashSync} from "bcrypt-ts";

const prisma = new PrismaClient();

const hashedPassword = hashSync("password", 10);
const userData: Prisma.UserCreateInput[] = [
    {
        name: "Eko Saputra",
        email: "me@ekovegeance.com",
        password: hashedPassword,
    }
]

export async function main() {
    for (const u of userData) {
        await prisma.user.create({
            data: u,
        });
    }
}

main()