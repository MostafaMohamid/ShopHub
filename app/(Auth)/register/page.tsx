"use client";

import { useForm } from "react-hook-form";
import { json, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import { User, Mail, Lock, Smartphone, Loader2 } from "lucide-react";
import Link from "next/link";
import { ServerREgister } from "./Regusterfunction";

import { redirect } from "next/navigation";
import PasswordField from "@/app/_mycommponents/PasswordField/PasswordField";
import { useState } from "react";

const schema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Minimum 3 characters")
      .max(20, "Maximum 20 characters"),

    email: z.string().nonempty("Email is required").email("Invalid email"),

    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
        "Must contain uppercase, lowercase, number and special character",
      ),

    rePassword: z.string(),

    phone: z
      .string()
      .regex(/^(?:\+20|0)?1[0125]\d{8}$/, "Invalid Egyptian phone number"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

export type RegisterValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(schema),
  });

  async function registerData(values: RegisterValues) {
    const registerBoolen = await ServerREgister(values);

    if (registerBoolen == true) {
      toast.success("Register Done", {
        duration: 3000,
        position: "bottom-center",
        richColors: true,
      });
      setTimeout(() => {
        redirect("/login");
      }, 3000);
    } else {
      toast.error(registerBoolen, {
        duration: 3000,
        position: "bottom-center",
        richColors: true,
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-6">
      <form
        onSubmit={handleSubmit(registerData)}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border p-8"
      >
        {/* Header */}

        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-bold">
            F
          </div>

          <h1 className="text-3xl font-bold">Create Account</h1>

          <p className="text-muted-foreground mt-2">Join Shop Hub </p>
        </div>

        {/* Name */}

        <Field className="space-y-2 mb-5">
          <FieldLabel>Name</FieldLabel>

          <div className="relative">
            <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

            <Input
              {...register("name")}
              placeholder="John Doe"
              className="pl-10 h-11 rounded-xl"
            />
          </div>

          {errors.name && <FieldError errors={[errors.name]} />}
        </Field>

        {/* Email */}

        <Field className="space-y-2 mb-5">
          <FieldLabel>Email</FieldLabel>

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

            <Input
              {...register("email")}
              placeholder="example@email.com"
              className="pl-10 h-11 rounded-xl"
            />
          </div>

          {errors.email && <FieldError errors={[errors.email]} />}
        </Field>

        {/* Password */}

        {/* <Field className="space-y-2 mb-5">
          <FieldLabel>Password</FieldLabel>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

            <Input
              {...register("password")}
              type="password"
              placeholder="********"
              className="pl-10 h-11 rounded-xl"
            />
          </div>

          {errors.password && <FieldError errors={[errors.password]} />}
        </Field> */}
        <PasswordField
          label="Password"
          register={register("password")}
          visible={showPassword}
          toggle={() => setShowPassword(!showPassword)}
          error={errors.password?.message}
          className="space-y-2 mb-5"
          inputClassName="h-11 rounded-xl"
          iconClassName="h-4 w-4"
        />

        {/* Confirm Password */}
        <PasswordField
          label="Confirm Password"
          register={register("rePassword")}
          visible={showRePassword}
          toggle={() => setShowRePassword(!showRePassword)}
          error={errors.rePassword?.message}
          className="space-y-2 mb-5"
          inputClassName="h-11 rounded-xl"
          iconClassName="h-4 w-4"
        />
        {/* <Field className="space-y-2 mb-5">
          <FieldLabel>Confirm Password</FieldLabel>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

            <Input
              {...register("rePassword")}
              type="password"
              placeholder="********"
              className="pl-10 h-11 rounded-xl"
            />
          </div>

          {errors.rePassword && <FieldError errors={[errors.rePassword]} />}
        </Field> */}

        {/* Phone */}

        <Field className="space-y-2 mb-6">
          <FieldLabel>Phone</FieldLabel>

          <div className="relative">
            <Smartphone className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

            <Input
              {...register("phone")}
              placeholder="01012345678"
              className="pl-10 h-11 rounded-xl"
            />
          </div>

          {errors.phone && <FieldError errors={[errors.phone]} />}
        </Field>

        {/* Button */}

        <Button
          type="submit"
          className="w-full h-11 rounded-xl text-base cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Account"
          )}
        </Button>

        {/* Divider */}

        <div className="flex items-center gap-4 my-6">
          <div className="h-px bg-border flex-1" />

          <span className="text-sm text-muted-foreground">OR</span>

          <div className="h-px bg-border flex-1" />
        </div>

        {/* Social Login */}

        <Button variant="outline" className="w-full mb-3 h-11 rounded-xl">
          Continue with Google
        </Button>

        <Button variant="outline" className="w-full h-11 rounded-xl">
          Continue with GitHub
        </Button>

        {/* Footer */}

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?
          {/* <Button variant="link" className="p-0 ml-2 ">
            Sign In
          </Button> */}
          <Link href={"/login"} className="p-0 ml-2 ">
            {" "}
            Sign In
          </Link>
        </p>
        <Toaster />
      </form>
    </div>
  );
}
