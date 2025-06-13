import { LucideIcon } from 'lucide-react';

/**
 * This file contains the TypeScript definitions for the shared data structure
 * @see https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html#interfaces
 */

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


