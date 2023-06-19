import React from "react";

// components
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";

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
        <Searchbar searchTitle={searchTitle} handleChange={handleChange} />
      </div>
    </div>
  );
};

export default Header;
