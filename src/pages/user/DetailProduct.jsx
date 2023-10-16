import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UseProductContext } from "../../context/ProductContext";

import getImageUrl from "../../utils/imageGetter";
import NavbarLogin from "../../components/NavbarLogin";
import Footer from "../../components/Footer";
import DropdownMobile from "../../components/DropdownMobile";
import Modal from "../../components/modal/Modal";

function DetailProduct() {
  useEffect(() => {
    document.title = "Product";
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isDropdownShown, setIsDropdownShow] = useState(false);

  const [searchParams] = useSearchParams();
  const url = import.meta.env.VITE_BACKEND_HOST;
  const paramsId = searchParams.get("id");
  const authAxios = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Barer ${token}`,
    },
  });

  const [Message, setMessage] = useState({ msg: null, isError: null });
  const [openModal, setOpenModal] = useState(false);

  const [productById, setProductById] = useState([]);
  useEffect(() => {
    authAxios
      .get("/products/" + paramsId)
      .then((res) => {
        setProductById(res.data.result[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const [sizes, setSizes] = useState([]);
  useEffect(() => {
    authAxios
      .get("/sizes")
      .then((res) => {
        // console.log(res.data.result);
        setSizes(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  const [count, setCount] = useState(1);
  const setCountHandler = (e) => {
    e.target.id == "minus" && count != 0
      ? setCount((count) => count - 1)
      : setCount((count) => count + 1);
    // console.log(e);
  };

  const [size, setSize] = useState({ id: null, name: null });
  const choseSizeHandler = (e) => {
    // console.log(e.target.id);
    setSize({ id: e.target.id, name: e.target.name });
  };

  const [hotIce, setHotice] = useState("Hot");
  const choseHoticeHandler = (e) => {
    // console.log(e.target.innerText);
    setHotice(e.target.innerText);
  };

  const { changeBody } = UseProductContext();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      products_id: paramsId,
      products_name: productById.products_name,
      sizes_id: size.id,
      sizes_name: size.name,
      orders_products_qty: count,
      hot_or_ice: hotIce,
      products_image: productById.products_image,
      products_price: productById.products_price,
    };

    changeBody(data);

    navigate("/checkout-product");
  };

  return (
    <>
      <NavbarLogin
        isClick={() => setIsDropdownShow(true)}
        isLogoutClick={() => {
          setOpenModal(true);
          setMessage({ msg: "Are you sure?", isError: null });
        }}
        message={Message}
      />
      <main className="font-plusJakartaSans px-5 lg:px-[130px] md:px-24 mt-5 md:mt-[87px]">
        <section className="flex flex-col lg:flex-row gap-x-5">
          <section className="w-full flex flex-col gap-y-4 md:flex-row max-lg:justify-between lg:gap-y-7 lg:flex-col lg:w-3/5 xl:1/2">
            <div className="w-full md:w-[73%] lg:w-full">
              <figure>
                <img
                  src={productById.products_image}
                  alt="coffe-1"
                  className="w-full h-full"
                />
              </figure>
            </div>
            <div className="w-full md:w-[23%] lg:w-full flex justify-between gap-x-4 md:flex-col md:gap-y-3 lg:flex-row lg:gap-x-7">
              <figure>
                <img
                  src={getImageUrl("image32", "webp")}
                  alt="coffe-1"
                  className="w-full h-full"
                />
              </figure>
              <figure>
                <img
                  src={getImageUrl("image33", "webp")}
                  alt="coffe-1"
                  className="w-full h-full"
                />
              </figure>
              <figure>
                <img
                  src={getImageUrl("image34", "webp")}
                  alt="coffe-1"
                  className="w-full h-full"
                />
              </figure>
            </div>
          </section>
          <aside className="w-full lg:w-2/5 max-lg:mt-5 xl:w-1/2 flex flex-col items-start gap-y-4">
            <p className="text-light text-sm font-bold bg-[#D00000] p-[10px] rounded-full lg:text-lg">
              FLASH SALE!
            </p>
            <h1 className="text-2xl lg:text-3xl xl:text-5xl font-medium text-[#0B0909]">
              {productById.products_name}
            </h1>
            <div className="flex gap-x-3 items-center">
              <p className="text-xs font-medium line-through text-[#D00000]">
                IDR 20.000
              </p>
              <p className="text-[22px] font-bold text-dark">
                Rp.{productById.products_price}
              </p>
            </div>
            <div>
              <img
                src={getImageUrl("star", "webp")}
                alt="star"
                className="w-full h-full"
              />
            </div>
            <div className="text-secondary flex gap-x-4 w-full text-sm xl:text-lg items-center">
              <p>200+ Review</p>
              <p>|</p>
              <p>Recomendation</p>
              <div>
                <img
                  src={getImageUrl("ThumbsUp", "svg")}
                  alt="ThumbsUp"
                  className="w-full h-full"
                />
              </div>
            </div>
            <p className="text-sm xl:text-base font-normal text-secondary">
              {productById.products_desc}
            </p>
            <div className="flex relative">
              <div
                className="p-[9px] border border-primary bg-light rounded absolute top-0 left-0 flex items-center justify-center"
                onClick={setCountHandler}
                id="minus"
              >
                <img
                  src={getImageUrl("minus", "svg")}
                  alt="minus"
                  className="w-full h-full"
                  id="minus"
                />
              </div>
              <div className="text-sm md:text-lg font-bold text-dark py-2 md:py-1 px-14 border rounded">
                {count}
              </div>
              <div
                className="p-[9px] border border-primary bg-primary rounded absolute top-0 right-0 flex items-center justify-center"
                onClick={setCountHandler}
                id="plus"
              >
                <img
                  src={getImageUrl("plus", "svg")}
                  alt="plus"
                  className="w-full h-full"
                  id="plus"
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-sm md:text-lg font-bold text-[#0B0909] mb-4">
                Chose Size
              </p>
              <div className="text-sm flex flex-wrap justify-between md:text-base font-normal text-[#0B0909] gap-4 lg:gap-x-2">
                {sizes.map((result, i) => (
                  <button
                    type="button"
                    className="border focus:border-primary py-2 w-[47%] md:w-[48%] flex justify-center"
                    onClick={choseSizeHandler}
                    key={i}
                    name={result.sizes_name}
                    id={result.sizes_id}
                  >
                    {result.sizes_name}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full">
              <p className="text-sm md:text-lg font-bold text-[#0B0909] mb-4">
                Hot/Ice?
              </p>
              <div className="flex justify-between text-sm md:text-base font-normal text-[#0B0909] gap-x-4 min-[1400px]:gap-x-10">
                <button
                  type="button"
                  className="p-2 border focus:border-primary w-1/2"
                  onClick={choseHoticeHandler}
                >
                  Hot
                </button>
                <button
                  type="button"
                  className="p-2 border focus:border-primary w-1/2"
                  onClick={choseHoticeHandler}
                >
                  Ice
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col gap-y-2 md:flex-row justify-between gap-x-4 lg:mt-4 min-[1400px]:mt-11">
              <button
                type="button"
                className="text-sm font-medium p-2 bg-primary w-full md:w-1/2 rounded-md border border-primary hover:bg-amber-600 active:ring active:ring-orange-300"
                onClick={onSubmitHandler}
              >
                Buy
              </button>
              <button
                type="button"
                className="text-sm font-medium p-2 bg-light border border-primary w-full md:w-1/2 flex justify-center rounded-md hover:bg-slate-200 active:ring active:ring-orange-300"
              >
                <div>
                  <img
                    src={getImageUrl("ShoppingCartOrange", "svg")}
                    alt="ShoppingCartOrange"
                    className="w-full h-full"
                  />
                </div>
              </button>
            </div>
          </aside>
        </section>
        <section className="mt-14 xl:mt-16">
          <header>
            <h1 className="text-2xl text-center lg:text-left md:text-3xl xl:text-5xl font-medium text-[#0B0909]">
              Recomendation <span className="text-[#8E6447]"> For You</span>
            </h1>
          </header>
          <div className="mt-6 flex flex-col gap-y-6 md:flex-row md:flex-wrap md:justify-between xl:flex-nowrap xl:gap-x-5">
            <div className="flex flex-col items-center md:w-[48%] xl:w-full">
              <img
                src={getImageUrl("image30", "webp")}
                alt="product"
                className="w-full h-full"
              />
              <div className="w-[95%] flex flex-col gap-y-3 p-[10px] bg-light drop-shadow-md relative bottom-16">
                <span className="text-xl font-medium text-dark lg:text-[22px]">
                  Hazelnut Latte
                </span>
                <p className="text-sm font-normal text-dark">
                  You can explore the menu that we provide with fun and have
                  their own taste and make your day better.
                </p>
                <p className="text-lg font-medium text-dark lg:text-[22px]">
                  IDR 20.000
                </p>
                <div className="flex flex-col gap-y-2 md:flex-row md:justify-between md:gap-x-2">
                  <button
                    type="button"
                    className="text-sm md:text-base font-medium text-dark bg-primary p-2 rounded-md hover:bg-amber-600 active:ring active:ring-orange-300 md:w-3/4"
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    className="text-sm md:text-base font-medium border border-primary text-dark bg-light p-2 rounded-md hover:bg-slate-200 active:ring active:ring-orange-300 flex justify-center items-center md:w-1/4"
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
            <div className="flex flex-col items-center md:w-[48%] xl:w-full">
              <img
                src={getImageUrl("image31", "webp")}
                alt="product"
                className="w-full h-full"
              />
              <div className="w-[95%] flex flex-col gap-y-3 p-[10px] bg-light drop-shadow-md relative bottom-16">
                <span className="text-xl font-medium text-dark lg:text-[22px]">
                  Hazelnut Latte
                </span>
                <p className="text-sm font-normal text-dark">
                  You can explore the menu that we provide with fun and have
                  their own taste and make your day better.
                </p>
                <p className="text-lg font-medium text-dark lg:text-[22px]">
                  IDR 20.000
                </p>
                <div className="flex flex-col gap-y-2 md:flex-row md:justify-between md:gap-x-2">
                  <button
                    type="button"
                    className="text-sm md:text-base font-medium text-dark bg-primary p-2 rounded-md hover:bg-amber-600 active:ring active:ring-orange-300 md:w-3/4"
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    className="text-sm md:text-base font-medium border border-primary text-dark bg-light p-2 rounded-md hover:bg-slate-200 active:ring active:ring-orange-300 flex justify-center items-center md:w-1/4"
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
            <div className="flex flex-col items-center md:w-[48%] xl:w-full">
              <img
                src={getImageUrl("image31", "webp")}
                alt="product"
                className="w-full h-full"
              />
              <div className="w-[95%] flex flex-col gap-y-3 p-[10px] bg-light drop-shadow-md relative bottom-16">
                <span className="text-xl font-medium text-dark lg:text-[22px]">
                  Hazelnut Latte
                </span>
                <p className="text-sm font-normal text-dark">
                  You can explore the menu that we provide with fun and have
                  their own taste and make your day better.
                </p>
                <p className="text-lg font-medium text-dark lg:text-[22px]">
                  IDR 20.000
                </p>
                <div className="flex flex-col gap-y-2 md:flex-row md:justify-between md:gap-x-2">
                  <button
                    type="button"
                    className="text-sm md:text-base font-medium text-dark bg-primary p-2 rounded-md hover:bg-amber-600 active:ring active:ring-orange-300 md:w-3/4"
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    className="text-sm md:text-base font-medium border border-primary text-dark bg-light p-2 rounded-md hover:bg-slate-200 active:ring active:ring-orange-300 flex justify-center items-center md:w-1/4"
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
          </div>
        </section>
      </main>
      {isDropdownShown && (
        <DropdownMobile isClick={() => setIsDropdownShow(false)} />
      )}
      <Footer />
      {openModal && <Modal closeModal={setOpenModal} message={Message} />}
    </>
  );
}

export default DetailProduct;
