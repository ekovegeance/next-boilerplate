"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { settingsProfileSchema } from "@/lib/zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateProfile(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }
  const validationFields = settingsProfileSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validationFields.success) {
    return { errors: validationFields.error.flatten().fieldErrors };
  }

  const { name, email } = validationFields.data;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { name, email },
    });

    return { success: "Profile updated successfully!", user: updatedUser };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: "Email already exists" };
  }
}
