import { RegisterValues } from "./page";

export async function loginserver(values: RegisterValues) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/signin`,
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
