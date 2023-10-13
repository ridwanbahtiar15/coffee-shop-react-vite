import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import getImageUrl from "../../utils/imageGetter";
import "../../style/style.css";

function ForgotPassword() {
  return (
    <main className="flex gap-[70px] lg:items-center">
      <aside className="hidden lg:block lg:w-2/6 xl:h-screen">
        <img
          src={getImageUrl("coffee-3", "webp")}
          alt="hero"
          className="w-full h-full"
        />
      </aside>
      <section className="font-plusJakartaSans w-full h-full py-12 px-5 flex flex-col justify-center gap-y-5 lg:w-3/6 xl:w-full md:py-20 md:px-24 lg:p-0 lg:pr-[130px]">
        <img
          src={getImageUrl("coffee-shop", "webp")}
          alt="logo"
          className="w-32 h-8"
        />
        <header>
          <p className="text-sm md:text-base font-normal">
            Fill out the form correctly
          </p>
        </header>
        <form className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-3 relative">
            <label
              htmlFor="email"
              className="text-sm md:text-base font-semibold text-[#0B132A] lg:text-base"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              className="py-3.5 px-10 border rounded-lg border-[#DEDEDE] text-xs tracking-wide outline-none focus:border-primary text-[#4F5665]"
            />
            <div className="icon-email absolute top-[46px] left-4 md:top-[50px]">
              <img
                src={getImageUrl("mail", "svg")}
                alt="mail.svg"
                className="w-full h-full"
              />
            </div>
          </div>
          <button
            type="button"
            className="text-base font-medium text-[#0B132A] bg-primary p-2.5 rounded-md hover:bg-amber-600 active:ring active:ring-orange-300 outline-orange-300"
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}

export default ForgotPassword;
