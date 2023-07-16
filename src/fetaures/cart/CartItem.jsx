import React from "react";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import Button from "../../ui/Button";
import {
  decreaseItemQuantity,
  getCurrentQuantity,
  increaseItemQuantity,
} from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantity(pizzaId));
  const dispatch = useDispatch();

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:space-x-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <div className="flex gap-1 items-center md:gap-3">
          <Button
            type="round"
            onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
          >
            -
          </Button>
          <span className="text-sm font-medium">{currentQuantity}</span>
          <Button
            type="round"
            onClick={() => dispatch(increaseItemQuantity(pizzaId))}
          >
            +
          </Button>
        </div>
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    pizzaId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
