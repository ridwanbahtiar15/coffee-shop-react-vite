// import React from "react";
import { Link } from "react-router-dom";

import getImageUrl from "../utils/imageGetter";

// eslint-disable-next-line react/prop-types
function ItemProduct({ id, img, name, desc, price }) {
  return (
    <div className="flex flex-col items-center">
      <img src={img} alt="product" className="w-full h-full" />
      <div className="w-[95%] flex flex-col gap-y-3 p-[10px] bg-light drop-shadow-md relative bottom-10 xl:bottom-14">
        <span className="text-xl font-medium text-dark lg:text-[22px]">
          {name}
        </span>
        <p className="text-sm font-normal text-dark">{desc}</p>
        <p className="text-lg font-medium text-dark lg:text-[22px]">
          Rp.{price}
        </p>
        <div className="flex flex-col gap-y-2 md:flex-row md:justify-between md:gap-x-2">
          <Link
            to={`/detail-product?id=${id}`}
            className="text-sm xl:text-base font-medium text-dark bg-primary p-2 rounded-md hover:bg-amber-600 active:ring active:ring-orange-300 md:w-3/4 text-center"
          >
            Buy
          </Link>
          <button
            type="button"
            className="text-base font-medium border border-primary text-dark bg-light p-2 rounded-md hover:bg-slate-200 active:ring active:ring-orange-300 flex justify-center items-center md:w-1/4"
          >
            <div>
              <img
                src={getImageUrl("ShoppingCartOrange", "svg")}
                alt="cart"
                className="w-full h-full"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemProduct;
