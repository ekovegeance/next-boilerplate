import React from 'react';
import {CreateExampleForm} from "@/components/example/create-example-form";

export default function ExampleCreatePage() {
    return (
        <div className="pt-4 md:pt-24">
            <h2 className="text-lg font-semibold mb-8">Example Create Data</h2>

            <div className="mx-auto">
                <CreateExampleForm/>
            </div>
        </div>
    );
}