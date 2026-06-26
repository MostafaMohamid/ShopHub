"use client";

import Link from "next/link";

import {
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const shopLinks = [
    { title: "All Products", href: "/" },
    { title: "Brands", href: "/brands" },
    { title: "Categories", href: "/categories" },
  ];

  const accountLinks = [
    { title: "My Orders", href: "/allorders" },
    { title: "Cart", href: "/cart" },
    { title: "Change Password", href: "/change-password" },
  ];

  const supportLinks = [
    { title: "Contact Us", href: "#" },
    { title: "Shipping", href: "#" },
    { title: "Returns", href: "#" },
    { title: "FAQ", href: "#" },
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      desc: "Orders over 500 EGP",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      desc: "14-day return policy",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      desc: "100% protected checkout",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      desc: "Always here to help",
    },
  ];

  const socials = [FaFacebookF, FaInstagram, FaGithub, FaLinkedinIn];
  return (
    <footer className="relative mt-20 overflow-hidden border-t bg-background">
      {/* FEATURES */}

      <div className="border-b bg-muted/40 ">
        <div className="container mx-auto grid gap-5 py-8 md:grid-cols-2 lg:grid-cols-4  ">
          {features.map((feature) => (
            <div
              key={feature.title}
              className=" cursor-pointer flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
            >
              <div className="rounded-xl  p-3 bg-blue-600  ">
                <feature.icon className="h-6 w-6 text-white" />
              </div>

              <div>
                <h4 className="font-semibold">{feature.title}</h4>

                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN */}

      <div className="container mx-auto py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* LOGO */}

          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-blue-600 p-3 text-white shadow-md">
                <ShoppingBag className="h-6 w-6" />
              </div>

              <span className="text-3xl font-black tracking-tight text-blue-600">
                ShopHub
              </span>
            </Link>

            <p className="max-w-md leading-7 text-muted-foreground">
              ShopHub brings you the latest products, premium brands, and
              unbeatable prices. Enjoy a seamless shopping experience with fast
              delivery and secure payments.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" />
                +20 100 123 4567
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                support@shophub.com
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                Cairo, Egypt
              </div>
            </div>

            {/* SOCIAL */}

            <div className="mt-8 flex gap-3">
              {socials.map((Icon, index) => (
                <Button
                  key={index}
                  size="icon"
                  variant="outline"
                  className="rounded-full hover:scale-110 hover:bg-primary hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* SHOP */}

          <div>
            <h3 className="mb-6 text-lg font-bold">Shop</h3>

            <div className="space-y-4">
              {shopLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex items-center gap-2 text-muted-foreground transition hover:text-primary"
                >
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-2" />

                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* ACCOUNT */}

          <div>
            <h3 className="mb-6 text-lg font-bold">Account</h3>

            <div className="space-y-4">
              {accountLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex items-center gap-2 text-muted-foreground transition hover:text-primary"
                >
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-2" />

                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* SUPPORT + NEWSLETTER */}

          <div className="space-y-10">
            {/* Support */}

            <div>
              <h3 className="mb-6 text-xl font-bold">Support</h3>

              <div className="space-y-4">
                {supportLinks.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group flex items-center justify-between rounded-xl px-3 py-2 transition-all hover:bg-primary/5"
                  >
                    <span className="flex items-center gap-3 text-muted-foreground group-hover:text-primary">
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      {item.title}
                    </span>

                    <ArrowRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}

            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="mb-5">
                <h4 className="text-lg font-bold">Stay Updated ✨</h4>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Subscribe to receive exclusive offers, discounts, and new
                  arrivals directly to your inbox.
                </p>
              </div>

              <div className="space-y-3">
                <Input
                  placeholder="Enter your email..."
                  className="h-12 rounded-xl border-border"
                />

                <Button
                  className="
          h-12
          w-full
          rounded-xl
          font-semibold
          shadow-md
          transition-all
          hover:scale-[1.02]
          hover:shadow-lg
        "
                >
                  Subscribe Now
                </Button>
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}

      <div className="border-t bg-muted/30 backdrop-blur-sm">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 py-6 md:flex-row">
          {/* Copyright */}

          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()}{" "}
              <span className="font-bold text-foreground">ShopHub</span>. All
              rights reserved.
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Crafted with ❤️ by{" "}
              <span className="font-semibold text-primary">Omar Ismail</span>
            </p>
          </div>

          {/* Payment Methods */}

          <div className="flex items-center gap-5 rounded-2xl border bg-card px-6 py-3 shadow-md transition-all hover:shadow-xl">
            <FaCcVisa className="h-10 w-10 text-blue-700 transition hover:scale-110" />

            <FaCcMastercard className="h-10 w-10 text-orange-500 transition hover:scale-110" />

            <FaCcPaypal className="h-10 w-10 text-sky-500 transition hover:scale-110" />
          </div>
        </div>
      </div>
    </footer>
  );
}
