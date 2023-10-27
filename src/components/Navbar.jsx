/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import getImageUrl from "../utils/imageGetter";

function Navbar(props) {
  const user = useSelector((state) => state.user);
  const token = user.token;
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const [btnArrow, setBtnArrow] = useState(false);
  const btnArrowHandle = () => {
    setBtnArrow((state) => !state);
  };

  const url = import.meta.env.VITE_BACKEND_HOST;
  const authAxios = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Barer ${token}`,
    },
  });

  const [image, setImage] = useState("");

  useEffect(() => {
    authAxios
      .get("/users/profile")
      .then((res) => {
        setImage(res.data.result[0].users_image);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <nav
      className={`w-full flex justify-between py-4 px-5 items-center font-plusJakartaSans  ${
        props.path == "/dashboard" ||
        props.path == "/admin/order" ||
        props.path == "/admin/product" ||
        props.path == "/admin/user"
          ? " bg-light md:px-11 lg:px-11 border-b border-[#E8E8E8]"
          : " bg-[#0B0909] md:px-24 lg:px-[130px]"
      }`}
    >
      <div className="nav-start flex items-center gap-x-[60px] text-sm font-normal">
        {props.path == "/dashboard" ||
        props.path == "/admin/order" ||
        props.path == "/admin/product" ||
        props.path == "/admin/user" ? (
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

        <Link
          to="/"
          className={`hover:border-b-2 hover:border-primary focus:border-b-2 focus:border-primary hidden lg:block ${
            props.path == "/dashboard" ||
            props.path == "/admin/order" ||
            props.path == "/admin/product" ||
            props.path == "/admin/user"
              ? "text-secondary"
              : "text-light"
          }`}
        >
          Home
        </Link>
        <Link
          to="/product"
          className={`hover:border-b-2 hover:border-primary focus:border-b-2 focus:border-primary hidden lg:block ${
            props.path == "/dashboard" ||
            props.path == "/admin/order" ||
            props.path == "/admin/product" ||
            props.path == "/admin/user"
              ? "text-secondary"
              : "text-light"
          }`}
        >
          Product
        </Link>
      </div>
      <div className="nav-end flex gap-x-[22px] items-center">
        <Link to="#" className="icon-search hidden lg:block">
          <img
            src={
              props.path == "/dashboard" ||
              props.path == "/admin/order" ||
              props.path == "/admin/product" ||
              props.path == "/admin/user"
                ? getImageUrl("Search", "svg")
                : getImageUrl("Search-white", "svg")
            }
            alt="Search"
            className="w-full h-full"
          />
        </Link>
        <Link to="#" className="hidden lg:block">
          <img
            src={
              props.path == "/dashboard" ||
              props.path == "/admin/order" ||
              props.path == "/admin/product" ||
              props.path == "/admin/user"
                ? getImageUrl("ShoppingCart", "svg")
                : getImageUrl("ShoppingCart-white", "svg")
            }
            alt="ShoppingCart"
            className="w-full h-full"
          />
        </Link>
        {!isLogin && (
          <Link
            to="/login"
            className="text-light text-sm font-medium py-3 px-[18px] border border-[#ebeaea] hover:bg-light hover:text-dark rounded-md hidden lg:block active:ring active:ring-slate-300"
          >
            Sign In
          </Link>
        )}
        {!isLogin && (
          <Link
            to="/register"
            className="text-dark text-sm font-medium py-3 px-[18px] bg-primary hover:bg-amber-600 rounded-md hidden lg:block active:ring active:ring-orange-300"
          >
            Sign Up
          </Link>
        )}
        {isLogin && (
          <div>
            {props.imageProfile ? (
              <Link to="/profile">
                <img
                  src={URL.createObjectURL(props.imageProfile)}
                  alt="icon-profile"
                  className="rounded-full w-8 h-8 hidden lg:block"
                />
              </Link>
            ) : (
              <Link to="/profile">
                <img
                  src={image}
                  alt="icon-profile"
                  className="rounded-full w-8 h-8 hidden lg:block"
                />
              </Link>
            )}
          </div>
        )}
        {isLogin && (
          <button
            id="dropdown-arrow"
            className={`hidden lg:block cursor-pointer`}
          >
            <img
              src={
                props.path == "/dashboard" ||
                props.path == "/admin/order" ||
                props.path == "/admin/product" ||
                props.path == "/admin/user"
                  ? getImageUrl("down", "svg")
                  : getImageUrl("down-white", "svg")
              }
              alt="down"
              className="w-full h-full"
              onClick={btnArrowHandle}
            />
          </button>
        )}
        {isLogin && (
          <div
            className={`absolute  text-light text-sm font-normal py-2 px-6 max-lg:hidden ${
              btnArrow ? "" : "hidden"
            } ${
              props.path == "/dashboard" ||
              props.path == "/admin/order" ||
              props.path == "/admin/product" ||
              props.path == "/admin/user"
                ? "bg-light border border-[#E8E8E8] top-20 right-10 drop-shadow-md"
                : "bg-[#0B0909] top-20 right-24  lg:right-32 "
            } z-10`}
            id="dropdown-menu"
          >
            <ul className="flex flex-col gap-y-2">
              <li
                className={`p-1  hover:text-[#0B0909]${
                  props.path == "/dashboard" ||
                  props.path == "/admin/order" ||
                  props.path == "/admin/product" ||
                  props.path == "/admin/user"
                    ? " text-secondary"
                    : " text-light hover:bg-light"
                }`}
              >
                <Link to="/history-order">History Order</Link>
              </li>
              <li
                className={`p-1  hover:text-[#0B0909]${
                  props.path == "/dashboard" ||
                  props.path == "/admin/order" ||
                  props.path == "/admin/product" ||
                  props.path == "/admin/user"
                    ? " text-secondary"
                    : " text-light hover:bg-light"
                }`}
              >
                <button onClick={() => props.isLogoutClick()}>Logout</button>
              </li>
            </ul>
          </div>
        )}

        <button className="text-2xl lg:hidden" onClick={() => props.isClick()}>
          <img
            src={
              props.path == "/dashboard" ||
              props.path == "/admin/order" ||
              props.path == "/admin/product" ||
              props.path == "/admin/user"
                ? getImageUrl("burger-menu-dark", "svg")
                : getImageUrl("burger-menu", "svg")
            }
            alt="burger-menu"
            id="burger-menu"
            className="w-full h-full"
          />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
