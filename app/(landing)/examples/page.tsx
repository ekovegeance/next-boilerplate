import CardExample from '@/components/example/card-example';
import React from 'react';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ExampleCreateModal from '@/components/example/create-example-modal';
import {paginate} from '@/lib/paginate'
import SimplePaginate from '@/components/shared/simple-paginate';
import {Example} from "@prisma/client";

/**
 * Read
 * Example Read data from Prisma ORM
 * @see https://nextjs.org/docs/app/getting-started/fetching-data#with-an-orm-or-database
 * @see https://www.prisma.io/docs/orm/prisma-client/queries/crud#read
 */
export default async function ExamplePage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const params = await searchParams
    const page = Number(params.page || 1);

    const examples = await paginate(prisma.example, {
        page,
        perPage: 9,
        orderBy: { id: 'desc' },
    });

    return (
        <div className="pt-4 md:pt-24">
            <h2 className="text-lg font-semibold mb-4">Example Read Data</h2>
            <div className="flex flex-row gap-2 mb-4">
                <Link href="/examples/create">
                    <Button>Create With Page</Button>
                </Link>
                <ExampleCreateModal />
            </div>
            {examples.data.length === 0 && (
                <div className="md:pt-24 flex flex-col gap-2 justify-center items-center">
                    <h2>Examples Read Data not found</h2>
                </div>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">
                {examples.data.map((example: Example) => (
                    <CardExample key={example.id} example={example} />
                ))}
            </div>
            <div className="my-2">
                <SimplePaginate currentPage={examples.current_page} totalPages={examples.last_page}/>
            </div>
        </div>
    );
}