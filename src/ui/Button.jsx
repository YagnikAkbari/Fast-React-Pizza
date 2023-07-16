import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Button({ disabled, children, to, type, onClick }) {
  const base =
    "bg-yellow-400 text-sm text-stone-800 inline-block rounded-full font-semibold uppercase tracking-wide hover:bg-yellow-300 disabled:cursor-not-allowed transition-colors  duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2";
  const style = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-2 text-xs md:px-5 md:py-2.5",
    round: base + " px-2.5 py-1 text-sm md:px-3.5 md:py-2",
    secondary:
      "text-stone-400 text-sm border-2 border-stone-300 inline-block rounded-full font-semibold uppercase tracking-wide hover:bg-stone-300 hover:text-stone-800 focus: text-stone-800 disabled:cursor-not-allowed transition-colors  duration-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 px-4 py-2.5 md:px-6 md:py-3.5",
  };
  if (to) {
    return (
      <Link to={to} className={style[type]}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} disabled={disabled} className={style[type]}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={style[type]}>
      {children}
    </button>
  );
}

Button.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
