"use client";

import * as React from "react";
import {Suspense} from "react";
import Link from "next/link";
import {Menu, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useSession} from "next-auth/react";
import NavUserSkeleton from "@/components/shared/nav-user-skeleton";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {UserMenuContent} from "@/components/user-menu-content";
import {useInitials} from "@/hooks/use-initials";
import {User} from "@prisma/client";
import AppLogoIcon from "@/components/app-logo-icon";
import AppearanceToggleDropdown from "@/components/appearance-dropdown";
import {usePathname} from "next/navigation";
import clsx from "clsx";

const navLinks = [
  { name: "Home", href: "/" },
  {name: "Example CRUD", href: "/examples"},
  // { name: "Users", href: "/users" },
  // { name: "Etc", href: "/etc" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const auth = session;

  const pathname = usePathname();
  const getInitials = useInitials();

  return (
    <nav className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 right-0 left-0 z-50 border-b backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <AppLogoIcon className="size-4 text-primary-foreground" />
                </div>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium",
                    pathname === link.href
                      ? " text-primary"
                      : " text-zinc-500 hover:text-primary"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Suspense fallback={<NavUserSkeleton />}>
              {status === "authenticated" && session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="size-10 rounded-full p-1"
                    >
                      <Avatar className="size-8 overflow-hidden rounded-full">
                        <AvatarImage
                          src={auth?.user.image ?? ""}
                          alt={auth?.user.name ?? ""}
                        />
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                          {getInitials(auth?.user.name ?? "")}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 ms-4"
                    align="end"
                    forceMount
                  >
                    <UserMenuContent user={auth?.user as User} />
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center px-4 gap-2">
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="mr-2 w-full justify-center"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full justify-center">Sign Up</Button>
                  </Link>
                </div>
              )}
            </Suspense>
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden min-h-svh">
          <div className="pt-2 pb-3 px-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={clsx(
                  "block pl-3 pr-4 py-2 text-base font-medium",
                  pathname === link.href
                    ? " text-primary"
                    : " text-zinc-500 hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-primary-foreground">
            <Suspense fallback={<NavUserSkeleton />}>
              <div className="flex items-center px-4 gap-2">
                {status === "authenticated" && session?.user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="size-10 rounded-full p-1"
                      >
                        <Avatar className="size-8 overflow-hidden rounded-full">
                          <AvatarImage
                            src={auth?.user.image ?? ""}
                            alt={auth?.user.name ?? ""}
                          />
                          <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            {getInitials(auth?.user.name ?? "")}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56 ms-4"
                      align="end"
                      forceMount
                    >
                      <UserMenuContent user={auth?.user as User} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      {" "}
                      <Button
                        variant="outline"
                        className="mr-2 w-full justify-center"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                      {" "}
                      <Button className="w-fÌull justify-center">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
              <div className="border-y border-primary-foreground py-3 mt-8 px-4 flex justify-between items-center gap-2">
                <p>Theme</p>
                <AppearanceToggleDropdown />
              </div>
            </Suspense>
          </div>
        </div>
      )}
    </nav>
  );
}
