/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import getImageUrl from "../utils/imageGetter";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function DropdownMobile(props) {
  const user = useSelector((state) => state.user);
  const token = user.token;
  const roles_id = user.userInfo.roles_id;
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
      <div
        className={`fixed left-0 top-0  w-screen h-screen pt-4 px-5 ${
          roles_id == 1
            ? "md:px-11 lg:px-11 bg-light"
            : "md:px-24 lg:px-[130px] bg-[#0B0909]"
        }`}
      >
        <div className="mb-5 flex justify-between">
          {roles_id == 1 ? (
            <img
              src={getImageUrl("coffee-shop", "svg")}
              alt="logo"
              className="w-32 h-8"
            />
          ) : (
            <img
              src={getImageUrl("coffee-shop-white", "svg")}
              alt="logo"
              className="w-32 h-8"
            />
          )}
          <button className="lg:hidden" onClick={() => props.isClick()}>
            <img
              src={
                roles_id == 1
                  ? getImageUrl("close-dark", "svg")
                  : getImageUrl("close", "svg")
              }
              alt="x"
              className="w-6 h-6"
            />
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
          <li
            className={`p-1 text-light hover:bg-light hover:text-[#0B0909] hover:font-medium${
              roles_id == 1 ? " hidden text-light" : ""
            }`}
          >
            <Link to="/">Home</Link>
          </li>
          <li
            className={`p-1 text-light hover:bg-light hover:text-[#0B0909] hover:font-medium${
              roles_id == 1 ? " hidden" : ""
            }`}
          >
            <Link to="/product">Product</Link>
          </li>
          <li
            className={`p-1 text-light hover:bg-light hover:text-[#0B0909] hover:font-medium${
              roles_id == 1
                ? " text-secondary hover:bg-secondary hover:text-light"
                : " text-light hover:bg-light hover:text-[#0B0909]"
            }`}
          >
            <Link to="/cart">Cart</Link>
          </li>

          {!isLogin && (
            <li className="p-1 text-light hover:bg-light hover:text-[#0B0909] hover:font-medium">
              <Link to="/login">Sign In</Link>
            </li>
          )}
          {!isLogin && (
            <li className="p-1 text-light hover:bg-light hover:text-[#0B0909] hover:font-medium">
              <Link to="/register">Sign Up</Link>
            </li>
          )}
          {isLogin && (
            <li
              className={`p-1 hover:font-medium${
                roles_id == 1
                  ? " text-secondary hover:bg-secondary hover:text-light"
                  : " text-light hover:bg-light hover:text-[#0B0909]"
              }`}
            >
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {roles_id == 1 && (
            <li className="p-1 hover:font-medium text-secondary hover:bg-secondary hover:text-light">
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
          {roles_id == 1 && (
            <li className="p-1 hover:font-medium text-secondary hover:bg-secondary hover:text-light">
              <Link to="/admin/product">Product</Link>
            </li>
          )}
          {roles_id == 1 && (
            <li className="p-1 hover:font-medium text-secondary hover:bg-secondary hover:text-light">
              <Link to="/admin/order">Order</Link>
            </li>
          )}
          {roles_id == 1 && (
            <li className="p-1 hover:font-medium text-secondary hover:bg-secondary hover:text-light">
              <Link to="/admin/user">User</Link>
            </li>
          )}
          {isLogin && (
            <li
              className={`p-1 hover:font-medium${
                roles_id == 1
                  ? " text-secondary hover:bg-secondary hover:text-light"
                  : " text-light hover:bg-light hover:text-[#0B0909]"
              }`}
            >
              <button>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default DropdownMobile;
