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