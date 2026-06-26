import { getUserCart } from "@/app/cart/cart.actions";
import AppNav from "./AppNav";

export default async function Navbar() {
  const cart = await getUserCart();


  return <AppNav cartCount={cart?.numOfCartItems ?? 0} />;
}
