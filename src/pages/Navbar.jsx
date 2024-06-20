import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center gap-6">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${
            isActive ? "text-2xl text-red-500" : "text-xl text-black"
          } transition-all duration-500`
        }
      >
        Today
      </NavLink>

      <NavLink
        to="/tomorrow"
        className={({ isActive }) =>
          `${
            isActive ? "text-2xl text-red-500" : "text-xl text-black"
          } transition-all`
        }
      >
        Tommorow
      </NavLink>
    </div>
  );
};

export default Navbar;
