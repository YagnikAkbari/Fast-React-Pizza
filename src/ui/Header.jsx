import { Link } from "react-router-dom";
import SearchOrder from "./SearchOrder";
import Username from "./Username";

function Header() {
  return (
    <header className="flex items-center justify-between bg-yellow-400 uppercase py-3 px-4 border-b-2 border-stone-400 sm:px-6 ">
      <Link to="/" className="tracking-widest font-medium">
        react fast pizza co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
