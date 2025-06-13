'use client';

import {createExample} from '@/actions/example.action';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import ButtonSubmit from "@/components/shared/button-submit";
import {useActionState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import InputError from "@/components/shared/input-error";

export function CreateExampleForm() {
    const router = useRouter();
    const [state, action] = useActionState(createExample, null);
    useEffect(() => {
        if (state?.success) {
            router.push('/example');
        }
    }, [state?.success, router]);

    return (
        <form action={action} className="space-y-4 max-w-md">
            <div className="flex flex-col gap-2">
                <Label htmlFor="name">
                    Name
                </Label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                />
                <InputError message={state?.errors?.name}/>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="age" className="block font-medium">
                    Age
                </Label>
                <Input
                    id="age"
                    name="age"
                    type="number"
                />
                <InputError message={state?.errors?.age}/>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="address">
                    Address
                </Label>
                <Input
                    id="address"
                    name="address"
                    type="text"
                />
                <InputError message={state?.errors?.address}/>
            </div>

            {state?.error && (
                <p className="text-sm text-destructive">{state.error}</p>
            )}
            {state?.success && (
                <p className="text-sm text-green-600">{state.success}</p>
            )}

            <ButtonSubmit submit="Create" submitting="Creating"/>
        </form>
    );
}
