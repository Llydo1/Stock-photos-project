import React from "react";
import { FaSearch } from "react-icons/fa";
import { useGlobalContext } from "../context";
const Search = () => {
  const { handleSubmit, inputContainer } = useGlobalContext();
  return (
    <section className="search">
      <form action="" className="search-form">
        <input
          type="text"
          className="form-input"
          placeholder="search"
          ref={inputContainer}
        />
        <button className="submit-btn" onClick={handleSubmit}>
          <FaSearch />
        </button>
      </form>
    </section>
  );
};

export default Search;
