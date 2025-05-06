import CardExample from '@/components/example/card-example';
import React from 'react';
import { prisma } from '@/lib/prisma';
import { Example } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ExampleCreateModal from '@/components/example/create-example-modal';

/**
 * Read
 * Example Read data from Prisma ORM
 * @see https://nextjs.org/docs/app/getting-started/fetching-data#with-an-orm-or-database
 * @see https://www.prisma.io/docs/orm/prisma-client/queries/crud#read
 */
export default async function ExamplePage() {
    const examples: Example[] = await prisma.example.findMany();

    return (
        <div className="pt-4 md:pt-24">
            <h2 className="text-lg font-semibold mb-4">Example Read Data</h2>
            <div className="flex flex-row gap-2 mb-4">
                <Link href="/example/create">
                    <Button>Create With Page</Button>
                </Link>
                <ExampleCreateModal />
            </div>
            {examples.length === 0 && (
                <div className="md:pt-24 flex flex-col gap-2 justify-center items-center">
                    <h2>Examples Read Data not found</h2>
                </div>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">
                {examples.map((example) => (
                    <CardExample key={example.id} example={example} />
                ))}
            </div>
        </div>
    );
}