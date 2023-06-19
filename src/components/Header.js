import React from "react";

// components
import Navbar from "./Navbar";

// assets
import header from "../assets/NL-en-20230306-popsignuptwoweeks-perspective_alpha_website_medium.jpg";

const Header = ({ searchTitle, handleChange }) => {
  return (
    <div className="h-60 w-full bg-cover bg-center bg-no-repeat">
      {/* header background */}
      <img
        className="block absolute w-full h-60 object-cover"
        src={header}
        alt="signup"
      />
      <div className="bg-black/50 absolute top-0 left-0 w-full h-60"></div>

      <div className="absolute w-full h-60 z-50">
        {/* navbar */}
        <Navbar />

        {/* search bar */}
        <div className="text-white h-40 flex justify-center items-center px-10 lg:px-20">
          <input
            type="search"
            value={searchTitle}
            onChange={handleChange}
            placeholder="search for a movie..."
            className="mb-5 mt-2 p-3 rounded-md border border-gray-400 focus:border-amber-400 focus:outline-none text-black w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
