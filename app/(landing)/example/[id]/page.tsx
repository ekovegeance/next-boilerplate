import {prisma} from '@/lib/prisma';
import {Example} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {ArrowLeftIcon} from "lucide-react";
import Link from 'next/link';

/**
 * Show
 * Example Show data from Prisma ORM
 * @see https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
 * @see https://www.prisma.io/docs/orm/prisma-client/queries/crud#get-record-by-id-or-unique-identifier
 */
export default async function Page({params}: { params: Promise<{ id: bigint }> }) {

    const {id} = await params;

    const example: Example | null = await prisma.example.findUnique({
        where: {
            id: id,
        },
    });

    if (!example) {
        return <div className="md:pt-24">Example Show Data not found</div>;
    }

    return (
        <div className="pt-4 md:pt-24">
            <div className="flex flex-col gap-2">
                <Link href="/example">
                    <Button variant="outline" size="icon">
                        <ArrowLeftIcon/>
                    </Button>
                </Link>
                <h2 className="text-lg font-semibold">Example Show Data</h2>
                <p className="text-xl font-semibold">ID: {example.id}</p>
                <p>Name: {example.name}</p>
                <p>Age: {example.age}</p>
                <p>Address: {example.address}</p>
            </div>
        </div>
    );

}