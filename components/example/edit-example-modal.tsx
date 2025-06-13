'use client';

import {useActionState, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {updateExample} from '@/actions/example.action';

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Example} from "@prisma/client";
import InputError from "@/components/shared/input-error";
import {toast} from "sonner";
import ButtonSubmit from "@/components/shared/button-submit";

export default function EditExampleDialog({example}: { example: Example }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const [state, action, pending] = useActionState(updateExample, null);

    useEffect(() => {
        if (state?.success) {
            setOpen(false);
            toast.success(`Example updated successfully`);
        }
    }, [state?.success, router]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary">Edit</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Example</DialogTitle>
                </DialogHeader>

                <form action={action} className="space-y-4">
                    <input type="hidden" name="id" value={example.id.toString()}/>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input name="name" defaultValue={example.name}/>
                        <InputError message={state?.errors?.name}/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="age">Age</Label>
                        <Input name="age" type="number" defaultValue={example.age}/>
                        <InputError message={state?.errors?.age}/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Input name="address" defaultValue={example.address}/>
                        <InputError message={state?.errors?.address}/>
                    </div>

                    {state?.error && <p className=" text-destructive">{state?.error}</p>}

                    <DialogFooter>
                        <ButtonSubmit submit="Update" submitting="Updating" pending={pending}/>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
