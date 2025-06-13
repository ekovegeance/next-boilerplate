'use client';

import React, {useActionState, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {deleteExample} from '@/actions/example.action';

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {toast} from "sonner";
import ButtonSubmit from "@/components/shared/button-submit";

// const initialState = {success: false, error: null};
export default function DeleteExampleDialog({exampleId}: { exampleId: string }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const [state, action, pending] = useActionState(deleteExample, null);

    useEffect(() => {
        if (state?.success) {
            setOpen(false);
            toast.success(`Example deleted successfully`);
        }
    }, [state?.success, router]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>

                <form action={action}>
                    <input type="hidden" name="id" value={exampleId}/>
                    <p className="text-sm text-muted-foreground mb-4">
                        This action cannot be undone. This will permanently delete the data.
                    </p>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <ButtonSubmit variant="destructive" submit="Delete" submitting="Deleting" pending={pending} />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
