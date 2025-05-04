import { LucideIcon } from 'lucide-react';

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
export interface User {
    id: string;
    name: string | null | undefined;
    email: string | null | undefined;
    avatar?: string | null | undefined;
    email_verified_at?: string | null;
    created_at?: string;
    updated_at?: string;
    [key: string]: unknown; // This allows for additional properties...
}
export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}


