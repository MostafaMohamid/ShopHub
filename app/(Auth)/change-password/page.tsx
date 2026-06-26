"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  changePasswordSchema,
  ChangePasswordType,
} from "./changePassword.schema";

import { changePassword } from "./changePassword.action";

import { toast } from "sonner";

import { Eye, EyeOff, Lock, Loader2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import PasswordField from "@/app/_mycommponents/PasswordField/PasswordField";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
  });

  async function onSubmit(values: ChangePasswordType) {
    const data = await changePassword(values);

    if (data.message === "success") {
      toast.success("Password updated successfully.");

      router.refresh();
    } else {
      toast.error(data.message);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl border bg-card p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-10 w-10 text-primary" />
          </div>

          <h1 className="text-3xl font-bold">Change Password</h1>

          <p className="mt-2 text-muted-foreground">
            Keep your account secure by using a strong password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Current Password */}

          <PasswordField
            label="Current Password"
            visible={showCurrent}
            toggle={() => setShowCurrent(!showCurrent)}
            register={register("currentPassword")}
            error={errors.currentPassword?.message}
          />

          {/* New Password */}

          <PasswordField
            label="New Password"
            visible={showPassword}
            toggle={() => setShowPassword(!showPassword)}
            register={register("password")}
            error={errors.password?.message}
          />

          {/* Confirm */}

          <PasswordField
            label="Confirm Password"
            visible={showRePassword}
            toggle={() => setShowRePassword(!showRePassword)}
            register={register("rePassword")}
            error={errors.rePassword?.message}
          />

          <Button
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl text-base"
          >
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
