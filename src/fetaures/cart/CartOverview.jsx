import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartQuantity, getTotalCartPrice } from "./cartSlice";

function CartOverview() {
  const totalCartPrice = useSelector(getTotalCartPrice);
  const totalCartQunatity = useSelector(getTotalCartQuantity);

  if (!totalCartQunatity) {
    return null;
  }
  return (
    <div className="flex justify-between items-center bg-stone-800 text-stone-200 uppercase text-sm md:text-base px-4 py-4 sm:px-6">
      <p className="text-stone-300 space-x-4 sm:space-x-6">
        <span>{totalCartQunatity} pizzas</span>
        <span>${totalCartPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
