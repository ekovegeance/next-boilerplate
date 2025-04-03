/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import {
  settingsProfileSchema,
  deleteUserSchema,
  updatePasswordSchema,
} from "@/lib/zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { compareSync, hashSync } from "bcrypt-ts";


export const updateProfile = async (prevState: unknown, formData: FormData) => {
  const session = await auth();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const validate = settingsProfileSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validate.success) {
    return { errors: validate.error.flatten().fieldErrors };
  }

  const { name, email } = validate.data;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { name, email },
    });
    return { success: "Profile updated successfully!", user: updatedUser };
  } catch (error) {
    return { error: "Email already exists" };
  }
}

export const deleteUser = async (prevState: unknown, formData: FormData) => {
  const session = await auth();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const validate = deleteUserSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validate.success) {
    return { errors: validate.error.flatten().fieldErrors };
  }

  const { password } = validate.data;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, password: true },
  });

  if (!user || !user.password) {
    return { error: "passwords do not match" };
  }

  const passwordMatch = compareSync(password, user.password);

  if (!passwordMatch) return { error: "The password is incorrect." };

  try {
    await prisma.user.delete({
      where: { id: user.id },
    });

    return { success: "Account deleted successfully" };
  } catch (error) {
    return { error: "Failed to delete account" };
  }
}

export const updatePassword = async (prevState: unknown, formData: FormData) => {
  const session = await auth();
  console.log("Log formData dari action",formData)

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const falidate = updatePasswordSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!falidate.success) {
    return { errors: falidate.error.flatten().fieldErrors };
  }

  const { currentPassword, newPassword } = falidate.data;
  const hashedNewPassword = hashSync(newPassword, 10);

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, password: true },
  });

  if (!user || !user.password) {
    return { error: "passwords do not match" };
  }

  const passwordMatch = compareSync(currentPassword, user.password);

  if (!passwordMatch) return { error: "The password is incorrect." };

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    });

    return { success: "Password update successfully" };
  } catch (error) {
    return { error: "Failed to update password" };
  }
}
