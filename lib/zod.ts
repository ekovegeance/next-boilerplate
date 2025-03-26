import { object, string } from 'zod';


/**
 * @module zod
 * Default schema using zod for the schema validation
 * example 
 * @example
 * 
 *```ts
 * import {z} from "zod";
 * const schema = z.object({
 * email: z.string().email("Invalid email address"),})
 *```
 */
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
}).refine((data) => data.password === data.confirmPassword, {
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

// Profile
export const profileSchema = object({
  username: string().min(2, "username must be at least 2 characters"),
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
  phone: string().min(2, { message: "Phone number must be at least 2 characters." }),
  address: string().min(2, { message: "Address must be at least 2 characters." }),
  password: string({
    required_error: "Please select an password to display.",
  }),

});
