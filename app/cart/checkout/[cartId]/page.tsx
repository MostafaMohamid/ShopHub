"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import {
  MapPin,
  Phone,
  Building2,
  CreditCard,
  Banknote,
  Loader2,
} from "lucide-react";
import { redirect, useParams } from "next/navigation";
import { cashCheckOut, visaCheckOut } from "../../cart.actions";
import { toast } from "sonner";

const schema = z.object({
  details: z.string().min(10, "Please enter a valid address"),

  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),

  city: z.string().min(2, "City is required"),
});

export type CheckoutValues = z.infer<typeof schema>;

export default function CheckoutPage() {
  const { cartId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(schema),
  });

  async function cashCheckout(values: CheckoutValues) {
    const cashresult = await cashCheckOut(cartId as string, values);
    if (cashresult == true) {
      toast.success("Order Sumbited");

      setTimeout(() => {
        redirect("/allorders");
      }, 1500);
    } else {
      toast.error("Something went wrong");
    }
    // await cashCheckoutAction(values)
  }

  async function visaCheckout(values: CheckoutValues) {
    const visaresult = await visaCheckOut(cartId as string, values);
    if (visaresult) {
      toast.success("Order Sumbited");

      setTimeout(() => {
        redirect(`${visaresult}`);
      }, 1500);
    } else {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10 transition-colors">
      <form className="w-full max-w-xl rounded-3xl border border-border bg-card text-card-foreground shadow-2xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Checkout</h1>

          <p className="mt-2 text-muted-foreground">
            Enter your shipping address then choose a payment method.
          </p>
        </div>

        {/* Address */}

        <Field className="mb-5 space-y-2">
          <FieldLabel>Address Details</FieldLabel>

          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

            <Input
              {...register("details")}
              placeholder="Street, Building, Floor..."
              className="h-12 rounded-xl border-border bg-background pl-10"
            />
          </div>

          {errors.details && <FieldError errors={[errors.details]} />}
        </Field>

        {/* Phone */}

        <Field className="mb-5 space-y-2">
          <FieldLabel>Phone Number</FieldLabel>

          <div className="relative">
            <Phone className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

            <Input
              {...register("phone")}
              placeholder="01XXXXXXXXX"
              className="h-12 rounded-xl border-border bg-background pl-10"
            />
          </div>

          {errors.phone && <FieldError errors={[errors.phone]} />}
        </Field>

        {/* City */}

        <Field className="mb-8 space-y-2">
          <FieldLabel>City</FieldLabel>

          <div className="relative">
            <Building2 className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

            <Input
              {...register("city")}
              placeholder="Cairo"
              className="h-12 rounded-xl border-border bg-background pl-10"
            />
          </div>

          {errors.city && <FieldError errors={[errors.city]} />}
        </Field>

        <div className="space-y-4">
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit(cashCheckout)}
            className=" cursor-pointer h-12 w-full rounded-xl bg-emerald-600 text-white transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Banknote className="mr-2 h-5 w-5" />
                Cash On Delivery
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={handleSubmit(visaCheckout)}
            className="cursor-pointer h-12 w-full rounded-xl border-2 border-border bg-background text-foreground transition-all duration-300 hover:scale-[1.02] hover:bg-accent hover:text-accent-foreground"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-5 w-5" />
                Pay with Visa
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
