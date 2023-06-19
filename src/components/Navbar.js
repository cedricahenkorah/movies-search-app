import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full h-20 flex justify-between items-center px-10 lg:px-20">
      <div>
        <Link to="/">
          <h1 className="text-amber-400 font-bold text-lg lg:text-2xl">
            CarrotFlix
          </h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
