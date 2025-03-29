"use server";

import { prisma } from "@/lib/prisma";
import { settingsProfileSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export const updateProfile = async (prevState: unknown, formData: FormData) => {

    const session = await auth();
    const validatedFields = settingsProfileSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email } = validatedFields.data;

  try {
     await prisma.user.update({
      where: {
        id: session?.user.id ?? "",
      },
      data: {
        name,
        email,
      },
    });
    revalidatePath("/settings/profile");
    return { success: "updated"};

  } catch (error) {
    console.error("Prisma Update Error:", error);
    return { message: "An error occurred while updating the user." };
  }
};

