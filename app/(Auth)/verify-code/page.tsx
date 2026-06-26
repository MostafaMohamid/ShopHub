"use client";

import { VerifyCodeType, verifyCodeSchema } from "./verifyCode.schema";

import { verifyResetCode } from "./verifyCode.action";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";

import { Loader2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function VerifyCodePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<VerifyCodeType>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  async function onSubmit(values: VerifyCodeType) {
    const data = await verifyResetCode(values.resetCode);

    if (data.status === "Success") {
      toast.success("Code verified successfully.");
      setTimeout(() => {
          router.push(`/reset-password?email=${encodeURIComponent(email ?? "")}`);
    }, 1500);
    } else {
      toast.error(data.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-2xl">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-10 w-10 text-primary" />
          </div>
        </div>

        <h1 className="text-center text-3xl font-bold">Verify Reset Code</h1>

        <p className="mt-3 text-center text-muted-foreground">
          Enter the 6-digit code sent to your email.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
          <Controller
            control={control}
            name="resetCode"
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
              >
                <InputOTPGroup className="mx-auto">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />

          <Button
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl text-base cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Didn't receive the code?
          <Button variant="link" className="pl-1">
            Resend
          </Button>
        </div>
      </div>
    </div>
  );
}
