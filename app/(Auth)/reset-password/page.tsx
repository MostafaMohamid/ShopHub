"use client";

import { resetPassword } from "./resetPassword.action";
import { resetPasswordSchema, ResetPasswordType } from "./resetPassword.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";

import { Lock, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

export default function ResetPasswordPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),

    defaultValues: {
      email,
    },
  });

  async function onSubmit(values: ResetPasswordType) {
    const data = await resetPassword(values.email, values.newPassword);

    if (data.token) {
      toast.success("Password changed successfully.");
      setTimeout(() => {
        router.replace("/login");
      }, 1500);
    } else {
      toast.error(data.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg rounded-3xl border bg-card p-8 shadow-2xl">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-10 w-10 text-primary" />
          </div>
        </div>

        <h1 className="text-center text-3xl font-bold">Reset Password</h1>

        <p className="mt-3 text-center text-muted-foreground">
          Create your new password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <Field>
            <FieldLabel>Email</FieldLabel>

            <Input
              {...register("email")}
              readOnly
              className="h-12 rounded-xl"
            />

            {errors.email && <FieldError errors={[errors.email]} />}
          </Field>

          <Field>
            <FieldLabel>New Password</FieldLabel>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />

              <Input
                type={showPassword ? "text" : "password"}
                {...register("newPassword")}
                className="h-12 rounded-xl pl-10 pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.newPassword && <FieldError errors={[errors.newPassword]} />}
          </Field>

          <Field>
            <FieldLabel>Confirm Password</FieldLabel>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />

              <Input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className="h-12 rounded-xl pl-10 pr-10"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.confirmPassword && (
              <FieldError errors={[errors.confirmPassword]} />
            )}
          </Field>

          <Button disabled={isSubmitting} className="h-12 w-full rounded-xl">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
