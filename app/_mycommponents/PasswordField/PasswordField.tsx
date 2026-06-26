import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

interface PasswordFieldProps {
  label: string;
  register: any;
  visible: boolean;
  toggle: () => void;
  error?: string;
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
}

export default function PasswordField({
  label,
  register,
  visible,
  toggle,
  error,
  className,
  inputClassName,
  iconClassName,
}: PasswordFieldProps) {
  return (
    <Field className={className}>
      <FieldLabel>{label}</FieldLabel>

      <div className="relative">
        <Lock
          className={`absolute left-3 top-3.5 text-muted-foreground ${iconClassName ?? "h-5 w-5"}`}
        />

        <Input
        placeholder="**********"
          {...register}
          type={visible ? "text" : "password"}
          className={`pl-10 pr-10 h-12 rounded-xl ${inputClassName ?? ""}`}
        />

        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-3 cursor-pointer"
        >
          {visible ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      {error && <FieldError errors={[{ message: error } as any]} />}
    </Field>
  );
}
