import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Search order #"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="py-3 px-4 bg-yellow-100 w-28 text-sm inline-block font-medium uppercase tracking-wide sm:focus:w-72 focus:ring focus:outline-none focus:ring-yellow-500 focus:ring-opacity-50 rounded-full transition- duration-300 sm:w-64 placeholder:text-stone-400 "
      />
    </form>
  );
}

export default SearchOrder;
