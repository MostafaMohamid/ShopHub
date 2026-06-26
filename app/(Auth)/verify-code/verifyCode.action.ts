"use server";

export async function verifyResetCode(resetCode: string) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resetCode,
      }),
    }
  );

  return await res.json();
}