"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function updateProfile(name: string, email: string) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  try {
    const exitingUser = await prisma.user.findUnique({ where: { email } });

    if (exitingUser && exitingUser.id !== session.user.id){
      return {success: false, error: "Email already in use"};
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { name, email },
    });

    console.log("Updated user:", updatedUser);
    return { success: true, user: updatedUser };

  } catch (error) {
    console.error("Failed to update profile", error);
    return { error: "Failed to update profile" };
  }
}
