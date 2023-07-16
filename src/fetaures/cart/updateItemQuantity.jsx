import Button from "../../ui/Button";
import PropTypes from "prop-types";

function updateItemQuantity({ pizzaId }) {
  console.log(pizzaId);
  return (
    <>
      <Button type="round">-</Button>
      <Button type="round">+</Button>
    </>
  );
}
updateItemQuantity.propTypes = {
  pizzaId: PropTypes.number.isRequired,
};

export default updateItemQuantity;
