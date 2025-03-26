"use client";

import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserInfo } from "@/components/user-info";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";
import { User } from "@prisma/client";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react"

interface UserMenuContentProps {
  user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
  const cleanup = useMobileNavigation();

  return (
    <>
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <UserInfo user={user} showEmail={true} />
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link
            className="block w-full"
            href="/dashboard"
            prefetch
            onClick={cleanup}
          >
            <LayoutDashboard className="mr-2" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            className="block w-full"
            href="/settings/profile"
            prefetch
            onClick={cleanup}
          >
            <Settings className="mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2" />
          Log out
      </DropdownMenuItem>
    </>
  );
}
