"use client";
import { useForm } from "react-hook-form";
import { json, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import { User, Mail, Lock, Smartphone, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { loginserver } from "./loginFunctionServer";
import { toast, Toaster } from "sonner";
import { signIn } from "next-auth/react";
import PasswordField from "@/app/_mycommponents/PasswordField/PasswordField";
import { useState } from "react";

const schema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
      "Must contain uppercase, lowercase, number and special character",
    ),
});

export type RegisterValues = z.infer<typeof schema>;

export default function login() {
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
  

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (result?.ok) {
      toast.success("Login successful");

      setTimeout(() => {
        redirect("/");
      }, 1500);
    } else {
      toast.error("Invalid Email or Password");
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

          <h1 className="text-3xl font-bold">Login Now</h1>

          <p className="text-muted-foreground mt-2">
            Good Discounts Good Products
          </p>
        </div>

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
        <p className=" text-sm text-muted-foreground mt-2">
          Forgot Password?
          <Link href={"/forgot-password"} className="p-0 ml-1 text-blue-700 ">
            Reset Password
          </Link>
        </p>
        {/* Button */}

        <Button
          type="submit"
          className="w-full h-11 rounded-xl text-base cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Login"
          )}
        </Button>

        {/* Divider */}

        <div className="flex items-center gap-4 my-6">
          <div className="h-px bg-border flex-1" />

          <span className="text-sm text-muted-foreground">OR</span>

          <div className="h-px bg-border flex-1" />
        </div>

        {/* Social Login */}

        <Button
          type="button"
          variant="outline"
          className="w-full mb-3 h-11 rounded-xl"
        >
          Continue with Google
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full h-11 rounded-xl"
        >
          Continue with GitHub
        </Button>

        {/* Footer */}

        <p className="text-center text-sm text-muted-foreground mt-6">
          Dont have an account?
          <Link href={"/register"} className="p-0 ml-2 ">
            {" "}
            Sign up
          </Link>
          <Toaster />
        </p>
      </form>
    </div>
  );
}
