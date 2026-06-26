"use server"
import { RegisterValues } from "./page";

export async function ServerREgister(values: RegisterValues) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/signup`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    },
  );
  const data = await response.json();
  if (data.message == "success") {
    return true;
  }
  return data.message;
}
