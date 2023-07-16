import { useState } from "react";
import { Form, redirect, useNavigation, useActionData } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCart, clearCart, getTotalCartPrice } from "../cart/cartSlice";
import store from "../../store";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../../fetaures/user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();

  const {
    username,
    address: userAddress,
    position,
    error: errorAddress,
    status: addressStatus,
  } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const isLoadingAddress = addressStatus === "pending";
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="py-3 px-4">
      <h2 className="text-xl font-semibold mb-8">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="post">
        <div className="mb-5 flex flex-col sm:items-center gap-2 sm:flex sm:flex-row">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            className="input grow"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col sm:items-center gap-2 sm:flex sm:flex-row">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required />
            {formErrors?.phone && (
              <p className="text-xs rounded-md bg-red-100 text-red-700 p-2 mt-2">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col sm:items-center gap-2 relative  sm:flex sm:flex-row">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              disabled={isLoadingAddress}
              defaultValue={userAddress}
            />
            {addressStatus === "error" && (
              <p className="text-xs rounded-md bg-red-100 text-red-700 p-2 mt-2">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.longitude && !position.latitude && (
            <span className="absolute top-[34px] right-0 mr-[5px] z-50 sm:top-[2.5px] md:top-[5px] ">
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 outline-yellow-400 focus:outline-none accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="postion"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting || isLoadingAddress
              ? "Placing Order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "please enter a number we might need it to contact you.";
  if (Object.keys(errors).length > 0) {
    return errors;
  }
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
