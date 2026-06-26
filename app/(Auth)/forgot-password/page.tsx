"use client";

import { forgotPassword } from "./forgotPassword.action";
import {
  forgotPasswordSchema,
  ForgotPasswordType,
} from "./forgotPassword.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Mail, Loader2, ArrowRight, ShieldCheck } from "lucide-react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(values: ForgotPasswordType) {
    const data = await forgotPassword(values.email);

    if (data.statusMsg === "success") {
      toast.success("Verification code sent successfully.");
      setTimeout(() => {
        router.push(`/verify-code?email=${encodeURIComponent(values.email)}`);
      }, 1500);
    } else {
      toast.error(data.message);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-3xl border bg-card p-8 shadow-2xl">
        {/* Icon */}

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <ShieldCheck className="h-10 w-10 text-primary" />
        </div>

        {/* Heading */}

        <div className="text-center">
          <h1 className="text-3xl font-bold">Forgot Password?</h1>

          <p className="mt-3 text-muted-foreground">
            Enter your email address and we'll send you a verification code to
            reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <Field>
            <FieldLabel>Email Address</FieldLabel>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />

              <Input
                {...register("email")}
                placeholder="example@gmail.com"
                className="h-12 rounded-xl pl-11"
              />
            </div>

            {errors.email && <FieldError errors={[errors.email]} />}
          </Field>

          <Button
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl text-base cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Verification Code
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Remember your password?
          <Button
            variant="link"
            className="p-0 pl-1"
            onClick={() => router.push("/login")}
          >
            Sign In
          </Button>
        </p>
      </div>
    </div>
  );
}
