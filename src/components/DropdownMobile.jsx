import React, { useState, useEffect } from "react";
import getImageUrl from "../utils/imageGetter";
import { Link } from "react-router-dom";

function DropdownMobile(props) {
  const token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, []);

  return (
    <div
      id="dropdownMobile"
      className="w-screen font-plusJakartaSans lg:hidden"
    >
      <div className="fixed left-0 top-0 bg-[#0B0909] w-screen h-screen pt-4 px-5 md:px-24 lg:px-[130px]">
        <div className="mb-5 flex justify-between">
          <img
            src={getImageUrl("coffee-shop-white", "svg")}
            alt="logo"
            className="w-32 h-8"
          />
          <button className="lg:hidden" onClick={() => props.isClick()}>
            <img src={getImageUrl("x", "svg")} alt="x" />
          </button>
        </div>
        <ul className="flex flex-col gap-y-2 w-full">
          <li className="relative">
            <input
              type="text"
              placeholder="Find Product"
              className="w-full border-2 rounded-md py-3.5 px-10 text-xs text-[#4F5665] font-normal tracking-wider outline-none focus:border-2 focus:border-primary"
            />
            <div className="absolute top-3.5 left-4 md:top-3.5 md:left-4">
              <img
                src={getImageUrl("Search-product", "svg")}
                alt="Search-product"
                className="w-full h-full"
              />
            </div>
          </li>
          <li className="p-1 text-light hover:bg-light hover:text-[#0B0909] hover:font-medium">
            <Link to="/home">Home</Link>
          </li>
          <li className="p-1 text-light hover:bg-light hover:text-[#0B0909] hover:font-medium">
            <Link to="/product">Product</Link>
          </li>
          <li className="p-1 text-light hover:bg-light hover:text-[#0B0909] hover:font-medium">
            <Link to="/cart">Cart</Link>
          </li>
          {!isLogin && (
            <li className="p-1 text-light hover:bg-light hover:text-[#0B0909] hover:font-medium">
              <Link to="/">Sign In</Link>
            </li>
          )}
          {!isLogin && (
            <li className="p-1 text-light hover:bg-light hover:text-[#0B0909] hover:font-medium">
              <Link to="/register">Sign Up</Link>
            </li>
          )}
          {isLogin && (
            <li className="p-1 text-light hover:bg-light hover:text-[#0B0909] hover:font-medium">
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLogin && (
            <li className="p-1 text-light hover:bg-light hover:text-[#0B0909] hover:font-medium">
              <button>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default DropdownMobile;
