import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import "../../style/style.css";
import getImageUrl from "../../utils/imageGetter";
import Navbar from "../../components/Navbar";
import DropdownMobile from "../../components/DropdownMobile";
import Footer from "../../components/Footer";
import PromoCard from "../../components/PromoCard";
import ItemProduct from "../../components/ItemProduct";
import Modal from "../../components/modal/Modal";

function Product() {
  useEffect(() => {
    document.title = "Product";
  });

  // eslint-disable-next-line no-unused-vars
  const [Message, setMessage] = useState({
    msg: null,
    isError: null,
  });
  const [openModal, setOpenModal] = useState({ isOpen: false, status: null });
  const [isDropdownShown, setIsDropdownShow] = useState(false);

  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_BACKEND_HOST;
  const authAxios = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Barer ${token}`,
    },
  });

  const [product, setProduct] = useState([]);
  useEffect(() => {
    authAxios
      .get("/products")
      .then((res) => {
        setProduct(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState();
  const [category, setCategory] = useState();

  const setSearchHandler = (e) => {
    setSearch(e.target.value);
  };
  const setCategoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const [rangeOne, setRangeOne] = useState(10000);
  const [rangeTwo, setRangeTwo] = useState(99000);

  const rangeOneHandler = (e) => {
    setRangeOne(e.target.value);
  };
  const rangeTwoHandler = (e) => {
    setRangeTwo(e.target.value);
  };

  const OnSubmitHandler = (e) => {
    e.preventDefault();

    console.log(rangeOne);
    console.log(rangeTwo);

    let urlProduct = `/products`;
    if (rangeOne && rangeTwo) {
      setSearchParams((prev) => ({
        ...prev,
        minrange: rangeOne,
        maxrange: rangeTwo,
      }));
      urlProduct = `/products?minrange=${rangeOne}&maxrange=${rangeTwo}`;
    }

    if (search) {
      setSearchParams((prev) => ({
        ...prev,
        name: search,
        minrange: rangeOne,
        maxrange: rangeTwo,
      }));
      urlProduct = `/products?name=${search.toLowerCase()}&minrange=${rangeOne}&maxrange=${rangeTwo}`;
    }

    if (category) {
      setSearchParams((prev) => ({
        ...prev,
        category: category,
        minrange: rangeOne,
        maxrange: rangeTwo,
      }));
      urlProduct = `/products?category=${category.toLowerCase()}&minrange=${rangeOne}&maxrange=${rangeTwo}`;
    }

    if (search && category) {
      setSearchParams((prev) => ({
        ...prev,
        name: search,
        category: category,
        minrange: rangeOne,
        maxrange: rangeTwo,
      }));
      urlProduct = `/products?name=${search.toLowerCase()}&category=${category.toLowerCase()}&minrange=${rangeOne}&maxrange=${rangeTwo}`;
    }

    // if (!search && !category) {
    //   setSearchParams((prev) => ({
    //     ...prev,
    //   }));
    //   urlProduct = `/products`;
    // }
    authAxios
      .get(urlProduct)
      .then((res) => setProduct(res.data.result))
      .catch(() => setProduct([]));
  };

  return (
    <>
      <Navbar isClick={() => setIsDropdownShow(true)} />
      <header className="hidden md:w-full md:h-[305px] md:bg-[url('/src/assets/img/Rectangle299.webp')] md:flex md:items-center md:px-24 lg:px-[130px] bg-no-repeat bg-cover">
        <h1 className="font-plusJakartaSans text-5xl font-medium w-[80%] text-light leading-tight">
          We Provide Good Coffee and Healthy Meals
        </h1>
      </header>
      <section>
        <div className="font-plusJakartaSans py-6 px-5 md:pt-12 md:pb-6 md:px-24 lg:px-[127px] flex justify-between items-center">
          <h1 className="text-2xl md:text-5xl font-medium text-[#0B0909]">
            Today <span className="text-[#8E6447]">Promo</span>
          </h1>
          <div className="hidden md:flex gap-x-3">
            <button type="button">
              <img
                src={getImageUrl("arrow-left-grey", "svg")}
                alt="arrow-left"
                className="w-full h-full"
              />
            </button>
            <button type="button">
              <img
                src={getImageUrl("arrow-right-2", "svg")}
                alt="arrow-right"
                className="w-full h-full"
              />
            </button>
          </div>
        </div>
        <div
          className="w-full md:pt-6 md:pb-8 flex gap-x-12 overflow-x-scroll no-scrollbar"
          id="promo-card"
        >
          <PromoCard name="promo-card1" />
          <PromoCard name="promo-card1" />
          <PromoCard name="promo-card1" />
          <PromoCard name="promo-card2" />
          <PromoCard name="promo-card2" />
          <PromoCard name="promo-card1" />
        </div>
        <div className="pt-8 px-5 md:px-24 lg:px-[127px]">
          <img
            src={getImageUrl("paginate", "svg")}
            alt="paginate"
            className="w-[76px] h-full"
          />
        </div>
      </section>
      <section className="font-plusJakartaSans py-6 px-5 md:pt-12 md:pb-6 md:px-24 lg:px-[127px]">
        <h1 className="text-2xl md:text-5xl font-medium text-[#0B0909]">
          Our <span className="text-[#8E6447]">Product</span>
        </h1>
      </section>
      <main className="font-plusJakartaSans px-5 md:pb-6 md:px-24 lg:px-[127px] flex flex-col lg:flex-row justify-between gap-x-5">
        <div className="flex justify-between items-center pb-6 relative lg:hidden">
          <input
            type="text"
            placeholder="Find Product"
            className="w-[80%] border border-[#DEDEDE] rounded-md py-3.5 px-10 text-xs text-[#4F5665] font-normal tracking-wider outline-none focus:border focus:border-primary"
          />
          <div className="absolute top-3.5 left-4 md:top-3.5 md:left-4">
            <img
              src={getImageUrl("Search-product", "svg")}
              alt="Search-product"
              className="w-full h-full"
            />
          </div>
          <button>
            <img
              src={getImageUrl("sorting-menu", "svg")}
              alt="sorting-menu"
              className="w-full h-full"
            />
          </button>
        </div>
        <section className="xl:w-2/6 hidden lg:flex flex-col h-full gap-y-4 bg-[#0B0909] text-light py-[34px] px-[30px] rounded-2xl">
          <div className="flex justify-between">
            <span className="text-[22px] font-semibold">Filter</span>
            <span className="text-[18px] font-bold">Reset Filter</span>
          </div>
          <div className="flex flex-col gap-y-3.5">
            <span className="text-lg font-bold">Search</span>
            <input
              type="text"
              name="name"
              placeholder="Search Your Product"
              className="py-4 px-5 text-normal font-normal text-[#696F79] rounded tracking-wider outline-none"
              value={search}
              onChange={setSearchHandler}
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <span className="text-lg font-bold">Category</span>
            <div className="flex flex-col gap-y-4 text-lg font-normal">
              <div className="flex gap-3.5 items-center">
                <input
                  type="radio"
                  id="coffee"
                  name="category"
                  className="appearance-none w-[24px] h-[24px] bg-none border border-[#a0a3bd] rounded-lg flex items-center justify-center after:font-awesome after:content-['\f00c'] after:font-black after:text-normal after:text-[#0b0909] after:hidden checked:bg-primary checked:border-none checked:after:block"
                  value="coffee"
                  onChange={setCategoryHandler}
                />
                <label htmlFor="coffee">Coffee</label>
              </div>
              <div className="flex gap-3.5 items-center">
                <input
                  type="radio"
                  id="non-coffee"
                  name="category"
                  className="appearance-none w-[24px] h-[24px] bg-none border border-[#a0a3bd] rounded-lg flex items-center justify-center after:font-awesome after:content-['\f00c'] after:font-black after:text-normal after:text-[#0b0909] after:hidden checked:bg-primary checked:border-none checked:after:block"
                  value="non-coffee"
                  onChange={setCategoryHandler}
                />
                <label htmlFor="non-coffee">Non Coffee</label>
              </div>
              <div className="flex gap-3.5 items-center">
                <input
                  type="radio"
                  id="milk"
                  name="category"
                  className="appearance-none w-[24px] h-[24px] bg-none border border-[#a0a3bd] rounded-lg flex items-center justify-center after:font-awesome after:content-['\f00c'] after:font-black after:text-normal after:text-[#0b0909] after:hidden checked:bg-primary checked:border-none checked:after:block"
                  value="milk"
                  onChange={setCategoryHandler}
                />
                <label htmlFor="milk">Milk</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <span className="text-lg font-bold">Sort By</span>
            <div className="flex flex-col gap-y-4 text-lg font-normal">
              <div className="flex gap-3.5 items-center">
                <input
                  type="checkbox"
                  id="buy-one-get-one"
                  checked
                  className="appearance-none w-[24px] h-[24px] bg-none border border-[#a0a3bd] rounded-lg flex items-center justify-center after:font-awesome after:content-['\f00c'] after:font-black after:text-normal after:text-[#0b0909] after:hidden checked:bg-primary checked:border-none checked:after:block"
                />
                <label htmlFor="buy-one-get-one">Buy 1 get 1</label>
              </div>
              <div className="flex gap-3.5 items-center">
                <input
                  type="checkbox"
                  id="flashsale"
                  className="appearance-none w-[24px] h-[24px] bg-none border border-[#a0a3bd] rounded-lg flex items-center justify-center after:font-awesome after:content-['\f00c'] after:font-black after:text-normal after:text-[#0b0909] after:hidden checked:bg-primary checked:border-none checked:after:block"
                />
                <label htmlFor="flashsale">Flash sale</label>
              </div>
              <div className="flex gap-3.5 items-center">
                <input
                  type="checkbox"
                  id="birthday-package"
                  className="appearance-none w-[24px] h-[24px] bg-none border border-[#a0a3bd] rounded-lg flex items-center justify-center after:font-awesome after:content-['\f00c'] after:font-black after:text-normal after:text-[#0b0909] after:hidden checked:bg-primary checked:border-none checked:after:block"
                />
                <label htmlFor="birthday-package">Birthday Package</label>
              </div>
              <div className="flex gap-3.5 items-center">
                <input
                  type="checkbox"
                  id="cheap"
                  className="appearance-none w-[24px] h-[24px] bg-none border border-[#a0a3bd] rounded-lg flex items-center justify-center after:font-awesome after:content-['\f00c'] after:font-black after:text-normal after:text-[#0b0909] after:hidden checked:bg-primary checked:border-none checked:after:block"
                />
                <label htmlFor="cheap">Cheap</label>
              </div>
            </div>
          </div>
          <div className="range">
            <span className="text-lg font-bold">Range Price</span>
            <div className="h-2 rounded mt-5 ">
              <div className="h-2 left-[18%] right-[70%] rounded bg-light"></div>
            </div>
            <div className="relative">
              <input
                type="range"
                className="w-full h-[8px] absolute top-[-6px] pointer-events-none appearance-none rounded"
                min="0"
                max="120000"
                onChange={rangeOneHandler}
                defaultValue={rangeOne}
              />
              <input
                type="range"
                className="w-full h-[8px] absolute top-[-6px] right-0 pointer-events-none appearance-none rounded"
                min="0"
                max="120000"
                onChange={rangeTwoHandler}
                defaultValue={rangeTwo}
              />
            </div>
            <div className="flex w-full gap-x-5">
              <div className="w-1/2 bg-light h-10 mt-6 rounded-md text-dark font-bold flex justify-center items-center">
                Idr. {rangeOne}
              </div>
              <div className="w-1/2 bg-light h-10 mt-6 rounded-md text-dark font-bold flex justify-center items-center">
                Idr. {rangeTwo}
              </div>
            </div>
          </div>
          <button
            className="text-sm font-medium text-[#0B0909] py-3 px-4 bg-primary text-center rounded-md hover:bg-amber-600 active:ring active:ring-orange-300 mt-4"
            type="button"
            onClick={OnSubmitHandler}
          >
            Apply Filter
          </button>
        </section>
        {product.length > 0 ? (
          <section className="xl:w-4/6">
            <div className="w-full grid grid-cols-1 md:grid-cols-product md:gap-x-5">
              {product.map((result, i) => (
                <ItemProduct
                  key={i}
                  id={result.products_id}
                  img={result.products_image}
                  name={result.products_name}
                  desc={result.products_desc}
                  price={result.products_price}
                />
              ))}
            </div>
            <div className="flex justify-center gap-x-4">
              <img
                src={getImageUrl("paginate-1", "svg")}
                alt="paginate-1"
                className="w-10 h-10"
              />
              <img
                src={getImageUrl("paginate-2", "svg")}
                alt="paginate-2"
                className="w-10 h-10"
              />
              <img
                src={getImageUrl("paginate-3", "svg")}
                alt="paginate-3"
                className="w-10 h-10"
              />
              <img
                src={getImageUrl("paginate-4", "svg")}
                alt="paginate-4"
                className="w-10 h-10"
              />
              <img
                src={getImageUrl("arrow-right", "svg")}
                alt="arrow-right"
                className="w-10 h-10"
              />
            </div>
          </section>
        ) : (
          <section className="xl:w-4/6">
            <div className="w-full">
              <h1 className="text-5xl text-center">Products Not Found!</h1>
            </div>
          </section>
        )}
      </main>
      <Footer />
      {isDropdownShown && (
        <DropdownMobile isClick={() => setIsDropdownShow(false)} />
      )}
      {openModal.isOpen && (
        <Modal modal={openModal} closeModal={setOpenModal} message={Message} />
      )}
    </>
  );
}

export default Product;
