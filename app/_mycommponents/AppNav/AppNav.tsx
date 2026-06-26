"use client";

import { useTheme } from "next-themes";

import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  Bell,
  Search,
  ShoppingBag,

  Settings,


  Moon,
  Sun,
} from "lucide-react";
import {


  DropdownMenuLabel,
  DropdownMenuSeparator,

} from "@/components/ui/dropdown-menu";

import { User, Package, LogOut, LockKeyhole, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { getUserCart } from "@/app/cart/cart.actions";

export default function AppNav({ cartCount }: { cartCount: number }) {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();


  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    if (pathname !== "/") return;

    const timer = setTimeout(() => {
      if (search.trim()) {
        router.replace(`/?search=${search}`);
      } else {
        router.replace("/");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search, pathname]);

  const navLinks = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Brands",
      href: "/brands",
    },
    {
      title: "Categories",
      href: "/categories",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-4 transition hover:opacity-90"
          >
            <div className="rounded-2xl bg-blue-600 p-3 text-white shadow-md">
              <ShoppingBag className="h-6 w-6" />
            </div>

            <span className="text-3xl font-black tracking-tight text-blue-600">
              ShopHub
            </span>
          </Link>

          {/* Navigation */}

          <nav className="hidden items-center gap-10 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "relative text-[15px] font-medium transition-all duration-300",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                {item.title}

                {pathname === item.href && (
                  <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side */}

          <div className="flex items-center">
            {status === "unauthenticated" ? (
              <div className="flex items-center gap-3">
                <Button variant="ghost" asChild className="cursor-pointer">
                  <Link href="/login">Sign In</Link>
                </Button>

                <Button asChild className="cursor-pointer">
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            ) : (
              <>
                {/* Theme */}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="mr-1 h-10 w-10 rounded-full transition hover:bg-accent cursor-pointer"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 transition-all hover:rotate-180 cursor-pointer" />
                  ) : (
                    <Moon className="h-5 w-5 transition-all hover:-rotate-12 cursor-pointer" />
                  )}
                </Button>

                {/* Wishlist */}

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full hover:bg-accent cursor-pointer"
                >
                  <Heart className="h-5 w-5" />
                </Button>

                {/* Cart */}

                <Link href="/cart">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="relative ml-1 h-10 w-10 rounded-full shadow-sm hover:scale-105 transition-all cursor-pointer"
                  >
                    <ShoppingCart className="h-5 w-5" />

                    <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                      {cartCount}
                    </span>
                  </Button>
                </Link>

                {/* Divider */}

                <div className="mx-4 h-8 w-px bg-border" />

                {/* Avatar */}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-11 w-11 cursor-pointer ring-2 ring-primary/15 transition-all hover:ring-primary hover:scale-105">
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white">
                        {session?.user?.name
                          ?.split(" ")
                          .map((x) => x[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-72 rounded-2xl p-2 shadow-2xl"
                  >
                    {/* User Header */}

                    <DropdownMenuLabel className="p-0">
                      <div className="rounded-xl bg-primary/5 p-4">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                          Welcome Back 👋
                        </p>

                        <h3 className="mt-1 text-lg font-bold">
                          {session?.user?.name}
                        </h3>

                        <p className="truncate text-sm text-muted-foreground">
                          {session?.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    {/* Profile */}

                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer rounded-xl py-3"
                    >
                      <Link
                        href="/profile"
                        className="flex w-full items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5" />
                          <span>My Profile</span>
                        </div>

                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </DropdownMenuItem>

                    {/* Orders */}

                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer rounded-xl py-3"
                    >
                      <Link
                        href="/allorders"
                        className="flex w-full items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Package className="h-5 w-5" />
                          <span>My Orders</span>
                        </div>

                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </DropdownMenuItem>

                    {/* Change Password */}

                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer rounded-xl py-3"
                    >
                      <Link
                        href="/change-password"
                        className="flex w-full items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <LockKeyhole className="h-5 w-5" />
                          <span>Change Password</span>
                        </div>

                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* Logout */}

                    <DropdownMenuItem
                      onClick={() =>
                        signOut({
                          callbackUrl: "/login",
                        })
                      }
                      className="cursor-pointer rounded-xl py-3 text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950"
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>

        {/* Search */}

        {pathname === "/" && (
          <div className="pb-6">
            <div className="relative mx-auto max-w-3xl">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />

              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for products..."
                className="h-12 rounded-full border pl-12 pr-20 shadow-sm"
              />

              <div className="absolute right-3 top-2 rounded-lg border bg-muted px-3 py-1 text-xs text-muted-foreground">
                ⌘ K
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
