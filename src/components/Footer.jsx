import React from "react";
import getImageUrl from "../utils/imageGetter";

function Footer() {
  return (
    <footer className="font-plusJakartaSans p-5 mt-5 flex flex-wrap gap-y-8 sm:px-5 md:px-24 pt md:pt-10 md:pb-20 md:mt-10 lg:px-[130px] bg-[#F8F8F8]">
      <section className="flex flex-col gap-y-6 w-full lg:self-end lg:w-2/5 lg:pr-16">
        <img
          src={getImageUrl("coffee-shop", "webp")}
          alt="logo"
          className="w-32 h-8"
        />
        <span className="text-base font-normal text-secondary">
          Coffee Shop is a store that sells some good meals, and especially
          coffee. We provide high quality beans
        </span>
        <span className="font-rubik text-base font-semibold text-dark">
          &copy;2020CoffeeStore
        </span>
      </section>
      <section className="flex flex-col gap-y-5 w-full sm:w-1/3 md:1/3 lg:w-1/5">
        <p className="text-base font-medium text-dark">Product</p>
        <p className="text-sm font-normal text-secondary">Our Product</p>
        <p className="text-sm font-normal text-secondary">Pricing</p>
        <p className="text-sm font-normal text-secondary">Locations</p>
        <p className="text-sm font-normal text-secondary">Countries</p>
        <p className="text-sm font-normal text-secondary">Blog</p>
      </section>
      <section className="flex flex-col gap-y-5 w-full sm:w-1/3 md:1/3 lg:w-1/5">
        <p className="text-base font-medium text-dark">Engage</p>
        <p className="text-sm font-normal text-secondary">Partner</p>
        <p className="text-sm font-normal text-secondary">FAQ</p>
        <p className="text-sm font-normal text-secondary">About Us</p>
        <p className="text-sm font-normal text-secondary">Provice Policy</p>
        <p className="text-sm font-normal text-secondary">Term of Services</p>
      </section>
      <section className="social-media w-full sm:w-1/3 md:1/3 lg:w-1/5">
        <p className="text-base font-medium text-dark mb-4">Social Media</p>
        <div className="flex">
          <div>
            <img
              src={getImageUrl("Facebook", "svg")}
              alt="Facebook"
              className="w-full h-full"
            />
          </div>
          <div>
            <img
              src={getImageUrl("Twitter", "svg")}
              alt="Twitter"
              className="w-full h-full"
            />
          </div>
          <div>
            <img
              src={getImageUrl("Instagram", "svg")}
              alt="Instagram"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
