"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfile } from "@/actions/example.action";

const UpdateForm = () => {
  const { data: session, update } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");

  if (!session?.user) return null;

  const handleUpdate = async () => {
    const result = await updateProfile(name, email);

    if (result?.success) {
      await update({ user: { ...session.user, name: result?.user?.name } });
    }
    console.log("Session updated successfully:", session);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Update Profile</h2>
      <div className="flex items-center w-full max-w-sm space-x-2">
        <Input
          type="text"
          placeholder="New name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="New name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleUpdate} type="button">
          Save
        </Button>
      </div>
    </div>
  );
};

export default UpdateForm;