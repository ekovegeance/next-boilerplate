'use client';

import {useRouter} from 'next/navigation';
import React, {useActionState, useEffect, useState} from 'react';
import {createExample} from '@/actions/example.action';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import InputError from "@/components/shared/input-error";
import ButtonSubmit from "@/components/shared/button-submit";
import {toast} from 'sonner';

// const initialState = {
//     errors: {},
//     error: '',
//     success: false,
// };

export default function CreateExampleDialog() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [state, action, pending] = useActionState(createExample, null);

    useEffect(() => {
        if (state?.success) {
            setOpen(false);
            toast.success(`Example created successfully`);
        }
    }, [state?.success, router]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create With Dialog</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Data with Dialog</DialogTitle>
                    <DialogDescription>
                        Lorem ipsum dolor sit amet, consectetur radicalising elit.
                    </DialogDescription>
                </DialogHeader>

                <form action={action} className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input name="name"/>
                        <InputError message={state?.errors?.name}/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="age">Age</Label>
                        <Input name="age" type="number"/>
                        <InputError message={state?.errors?.age}/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Input name="address"/>
                        <InputError message={state?.errors?.address}/>
                    </div>

                    {state?.error && <p className=" text-destructive">{state.error}</p>}

                    <DialogFooter>
                        <ButtonSubmit submit="Create" submitting="Creating" pending={pending}/>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}