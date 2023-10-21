/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getImageUrl from "../utils/imageGetter";

function Navbar(props) {
  const token = localStorage.getItem("token");
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

  return (
    <nav className="w-full flex justify-between py-4 px-5 items-center font-plusJakartaSans bg-[#0B0909] md:px-24 lg:px-[130px]">
      <div className="nav-start flex items-center gap-x-[60px] text-sm font-normal">
        <img
          src={getImageUrl("coffee-shop-white", "svg")}
          alt="logo"
          className="w-32 h-8"
        />
        <Link
          to="/home"
          className="text-light hover:border-b-2 border-primary border-b-2 hidden lg:block"
        >
          Home
        </Link>
        <Link
          to="/product"
          className="text-light hover:border-b-2 hover:border-primary focus:border-b-2 focus:border-primary hidden lg:block"
        >
          Product
        </Link>
      </div>
      <div className="nav-end flex gap-x-[22px] items-center">
        <Link to="#" className="icon-search hidden lg:block">
          <img
            src={getImageUrl("Search-white", "svg")}
            alt="Search"
            className="w-full h-full"
          />
        </Link>
        <Link to="#" className="hidden lg:block">
          <img
            src={getImageUrl("ShoppingCart-white", "svg")}
            alt="ShoppingCart"
            className="w-full h-full"
          />
        </Link>
        {!isLogin && (
          <Link
            to="/"
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
          <Link to="/profile" className="hidden lg:block">
            <img
              src={getImageUrl("profile", "jpg")}
              alt="icon-profile"
              className="rounded-full w-8 h-8"
            />
          </Link>
        )}
        {isLogin && (
          <button
            id="dropdown-arrow"
            className="hidden lg:block cursor-pointer"
          >
            <img
              src={getImageUrl("down-white", "svg")}
              alt="down"
              className="w-full h-full"
              onClick={btnArrowHandle}
            />
          </button>
        )}
        {isLogin && (
          <div
            className={`absolute top-20 right-24 bg-[#0B0909] text-light text-sm font-normal py-2 px-6 ${
              btnArrow ? "" : "hidden"
            } lg:right-32 max-lg:hidden`}
            id="dropdown-menu"
          >
            <ul className="flex flex-col gap-y-2">
              <li className="p-1 text-light hover:bg-light hover:text-[#0B0909] hover:font-medium">
                <Link to="/history-order">History Order</Link>
              </li>
              <li className="p-1 text-light hover:bg-light hover:text-[#0B0909] hover:font-medium">
                {/*  eslint-disable-next-line react/prop-types */}
                <button onClick={() => props.isLogoutClick()}>Logout</button>
              </li>
            </ul>
          </div>
        )}

        <button className="text-2xl lg:hidden" onClick={() => props.isClick()}>
          <img
            src={getImageUrl("burger-menu", "svg")}
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
