import { User} from '@/types/user';

/**
 * This file contains the TypeScript definitions for the shared data structure
 * @see https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html#interfaces
 */
export interface Example {
    id: number;
    name: string;
    age: number;
    address: string;
    user: User;
}