import { NextPage } from "next";
import React from "react";

const styles = {};

const Navbar: NextPage = () => {
  return (
    <div>
      <div>Logo</div>
      <nav>
        <ul>
          <li>Home</li>
          <li>Categories</li>
          <li>Events</li>
          <li>Teams</li>
          <li>Profiles</li>
        </ul>
      </nav>
      <div>
        <button>Login</button>
      </div>
    </div>
  );
};

export default Navbar;
