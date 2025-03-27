import {
  UserCog,
  ChevronsUpDown,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { SignOut } from "@/actions/auth.action";

export function NavUser({
  user,
}: {
  user: {
    id?: string;
    username?: string;
    name?: string;
    email?: string;
    image?: string;
  };
}) {
  const handlesignOut = async () => {
    await SignOut();
  };

  const displayName = user?.name || "Anonymous";
  const displayEmail = user?.email || "No email";
  const displayImage = user?.image || "/placeholder.svg?height=32&width=32";

  return (
    <div>
      <div className=" sm:ml-6 sm:flex sm:items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-12 w-full rounded-lg">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={displayImage} alt={displayName} />
                <AvatarFallback className="rounded-lg">
                  {displayName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 ms-4" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={displayImage} alt={displayName} />
                  <AvatarFallback className="rounded-lg">
                    {displayName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{displayName}</span>
                  <span className="truncate text-xs">{displayEmail}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="w-full cursor-pointer">
              <Link href="/dashboard">
                <LayoutDashboard />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="w-full cursor-pointer">
              <Link href={`/users/${user.username}`}>
                <User />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="w-full cursor-pointer">
              <Link href="/dashboard/account">
                <UserCog />
                Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handlesignOut} className="w-full cursor-pointer text-destructive">
              <LogOut />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
