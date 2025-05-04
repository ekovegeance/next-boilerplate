'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {deleteExample} from '@/actions/example.action';

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import InputError from "@/components/stocks/input-error";
import {toast} from "sonner";
import {useFormState} from "react-dom";

export default function DeleteExampleDialog({exampleId}: { exampleId: string }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    // const initialState = { success: false, error: '' };
    const [state, action] = useFormState(deleteExample, null);

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
                    <InputError message={state?.error ? [state.error] : undefined}/>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="destructive">
                            Delete
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
