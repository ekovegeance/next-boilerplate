import {coerce, object, string} from 'zod';

/**
 * @module zod
 * Default schema using zod for the schema validation
 * @see https://zod.dev/?id=basic-usage
 * example
 * @example
 *
 *```ts
 * import {z} from "zod";
 * const schema = z.object({
 * email: z.string().email("Invalid email address"),})
 *```
 */
// Example
export const createExampleSchema = object({
    name: string().min(3, "Name must be more than 3 characters"),
    age: coerce.number().min(0, "Age must be a positive number"),
    address: string().min(3, "Address must be more than 3 characters"),
});

export const updateExampleSchema = object({
    id: coerce.number(),
    name: string().min(3),
    age: coerce.number().min(0),
    address: string().min(3),
});
// Register
export const registerSchema = object({
    name: string().min(3, "Name must be more than 3 characters"),
    email: string().email("Invalid email"),
    password: string()
        .min(6, "Password must be more than 6 characters")
        .max(32, "Password must be less than 32 characters"),
    confirmPassword: string()
        .min(6, "Password must be more than 6 characters")
        .max(32, "Password must be less than 32 characters"),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

// Login
export const loginSchema = object({
    email: string().email("Invalid email").min(3, "Email must be more than 3 characters"),
    password: string()
        .min(6, "Password must be more than 6 characters")
        .max(32, "Password must be less than 32 characters"),
});

// Forgot Password
export const forgotPasswordSchema = object({
    email: string().email("Invalid email address"),
});

// Settings Profile
export const settingsProfileSchema = object({
    name: string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    email: string({
        required_error: "Please select an email to display.",
    }).email(),

});

// Delete User
export const deleteUserSchema = object({
    password: string().min(6, "Password must be more than 6 characters"),
})

// Update Password
export const updatePasswordSchema = object({
    currentPassword: string().min(6, "Password must be more than 6 characters"),
    newPassword: string()
        .min(6, "Password must be more than 6 characters")
        .max(32, "Password must be less than 32 characters"),
    confirmPassword: string()
        .min(6, "Password must be more than 6 characters")
        .max(32, "Password must be less than 32 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],

})
