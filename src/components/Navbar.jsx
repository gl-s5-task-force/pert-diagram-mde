import React from "react";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <div className="navbar">
      {/* <img src={logo} alt="Google logo" /> */}
      <p className="logo">I 🖤 PERT</p>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  );
}

export default Navbar;
