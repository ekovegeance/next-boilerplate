import React from 'react';
import {ExampleCreateForm} from "@/components/example/example-create-form";

export default function ExampleCreatePage() {
    return (
        <div className="pt-4 md:pt-24">
            <h2 className="text-lg font-semibold mb-8">Example Create Data</h2>

            <div className="mx-auto">
                <ExampleCreateForm/>
            </div>
        </div>
    );
}