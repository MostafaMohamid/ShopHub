import { getuserOrders } from "./allorders.action";

export default function AllOrders() {
  getuserOrders();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-5xl font-bold text-red-500">ALL ORDERS PAGE</h1>
    </div>
  );
}
