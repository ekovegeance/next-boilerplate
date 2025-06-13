/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"

import {hashSync} from "bcrypt-ts";
import {prisma} from "@/lib/prisma";
import {AuthError} from "next-auth";
import {signIn, signOut} from "@/auth";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {registerSchema, loginSchema, forgotPasswordSchema} from "@/lib/schemas/auth";


/**
 * Registers a new user.
 *
 * @param prevState - The previous state (not used in this function).
 * @param formData - The form data submitted by the user for registration.
 * @returns An object containing errors if validation or registration fails.
 */
export const registerCredentials = async (prevState: unknown, formData: FormData) => {
    const validated = registerSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validated.success) {
        return {
            error: validated.error.flatten().fieldErrors
        };
    }

    const {name, email, password} = validated.data;
    const hashedPassword = hashSync(password, 10);

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });
        revalidatePath("/users");
    } catch (error) {
        return {message: "An error occurred while creating the user."};
    }
    redirect("/dashboard");
};

/**
 * Logs in a user using their credentials.
 *
 * @param prevState - The previous state (not used in this function).
 * @param formData - The form data submitted by the user for login.
 * @returns An object containing errors if validation or login fails.
 */
export const loginCredentials = async (prevState: unknown, formData: FormData) => {
    const validated = loginSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validated.success) {
        return {
            error: validated.error.flatten().fieldErrors
        };
    }

    const {email, password} = validated.data;

    try {
        await signIn("credentials", {email, password, redirectTo: "/dashboard"});
    } catch (error) {
        if (error instanceof AuthError) {
            // @ts-ignore
            switch (error.type) {
                default:
                    return {message: "An error occurred while signing in."};
            }
        }
        throw error;
    }
};

/**
 * Logs out the user and redirects them to the login page.
 *
 * @returns Nothing is returned.
 */
export async function SignOut() {
    await signOut({redirectTo: "/login"});
}

/**
 * Processes the forgot password request.
 *
 * @param prevState - The previous state (not used in this function).
 * @param formData - The form data containing the user's email address.
 * @returns An object containing success or error depending on the email sending process.
 */
export const forgotPassword = async (prevState: unknown, formData: FormData) => {
    const validated = forgotPasswordSchema.safeParse({
        email: formData.get('email'),
    });

    if (!validated.success) {
        return {error: validated.error.flatten().fieldErrors};
    }

    const {email} = validated.data;

    try {
        // Simulate API call for sending a password reset email
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Password reset email sent to:', email);
        return {success: true};
    } catch (error) {
        return {error: 'Failed to send reset email. Please try again.'};
    }
}
