import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full h-20 flex justify-between items-center px-10 lg:px-20">
      <div>
        {/* brand name */}
        <Link to="/">
          <h1 className="text-amber-400 font-bold text-xl lg:text-2xl">
            CarrotFlix
          </h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
