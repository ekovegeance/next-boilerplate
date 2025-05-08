
import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import Link from "next/link";
import {Example} from '@prisma/client';
import EditExampleDialog from "@/components/example/edit-example-modal";
import DeleteExampleDialog from "@/components/example/delete-example-modal";
import {auth} from "@/auth"

export default async function CardExample({example}: { example: Example }) {
    const session = await auth();
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Name: {example.name}</CardTitle>
                    <CardTitle>Age: {example.age}</CardTitle>
                    <CardDescription>ID: {example.id}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{example.address}</p>
                </CardContent>
                <CardFooter>
                    {session?.user.id === example.userId && (
                    <div className="flex flex-row gap-4">
                        <Link href={`/examples/${example.id}`}>
                            <Button>Show</Button>
                        </Link>
                        <EditExampleDialog example={example}/>
                        <DeleteExampleDialog exampleId={example.id.toString()}/>
                    </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}