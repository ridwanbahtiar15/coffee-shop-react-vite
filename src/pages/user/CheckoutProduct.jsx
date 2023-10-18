import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import getImageUrl from "../../utils/imageGetter";
import { UseProductContext } from "../../context/ProductContext.jsx";
import NavbarLogin from "../../components/NavbarLogin";
import Footer from "../../components/Footer";
import DropdownMobile from "../../components/DropdownMobile";
import Modal from "../../components/modal/Modal";

// const Product = () => {
//   const { body } = UseProductContext();
//   return (
//     <div className="item-product bg-[#E8E8E84D] flex flex-col gap-y-4 p-4 relative sm:flex-row sm:gap-x-4 sm:items-center">
//       <div className="w-[80%] h-[80%] sm:w-[60%] sm:h-[60%] lg:w-1/3">
//         <img src={body.products_image} alt="coffee" className="w-full h-full" />
//       </div>
//       <div className="product-info flex flex-col items-start gap-y-4 lg:w-2/3">
//         <p className="text-xs text-light bg-[#D00000] p-[10px] rounded-full font-bold">
//           FLASH SALE!
//         </p>
//         <p className="text-lg text-[#0B0909] font-bold">{body.products_name}</p>
//         <div className="text-sm text-secondary font-normal md:text-lg lg:text-base xl:text-lg flex">
//           <p>
//             {body.orders_products_qty} | {body.sizes_name} | {body.hot_or_ice} |
//             DineIn
//           </p>
//         </div>
//         <div className="flex gap-x-4 items-center">
//           <p className="text-xs text-[#D00000] font-medium line-through">
//             {body.products_price}
//           </p>
//           <p className="text-lg text-[#0B0909] font-medium lg:text-[22px]">
//             {body.products_disc}
//           </p>
//         </div>
//       </div>
//       <button type="button" className="absolute top-3 right-3">
//         <img
//           src={getImageUrl("XCircle", "svg")}
//           alt="XCircle"
//           className="w-full h-full"
//         />
//       </button>
//     </div>
//   );
// };

function CheckoutProduct() {
  useEffect(() => {
    document.title = "Checkout Product";
  });

  const product = UseProductContext();
  const { wrapBody, deleteData } = product;

  const token = localStorage.getItem("token");
  const [Message, setMessage] = useState({ msg: null, isError: null });
  const [openModal, setOpenModal] = useState({ isOpen: false, status: null });
  const [isDropdownShown, setIsDropdownShow] = useState(false);

  const url = import.meta.env.VITE_BACKEND_HOST;
  const authAxios = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Barer ${token}`,
    },
  });

  const [user, setUser] = useState({
    users_fullname: null,
    users_email: null,
    users_address: null,
  });

  useEffect(() => {
    authAxios
      .get("/users/profile")
      .then((res) => {
        setUser({
          users_fullname: res.data.result[0].users_fullname,
          users_email: res.data.result[0].users_email,
          users_address: res.data.result[0].users_address,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    authAxios
      .get("/deliveries")
      .then((res) => {
        setDeliveries(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  const [setDelivery] = useState("");
  const deliverieHandler = (e) => {
    setDelivery(e.target.id);
  };

  let data = [];
  for (let i = 0; i <= wrapBody.length; i++) {
    data.push(wrapBody[i]);
  }

  const OnSubmitHandler = () => {
    authAxios
      .post("/orders", wrapBody)
      .then((res) => {
        setMessage({
          msg: res.data.msg,
          isError: false,
        });
        setOpenModal({ isOpen: true, status: "checkout" });
      })
      .catch((err) => {
        setMessage({
          msg: err.response.data.msg,
          isError: true,
        });
        setOpenModal(true);
      });
  };

  let price = 0;
  wrapBody.forEach((result) => {
    price += Number(result.products_price) * Number(result.orders_products_qty);
  });

  return (
    <>
      <NavbarLogin
        isClick={() => setIsDropdownShow(true)}
        isLogoutClick={() => {
          setOpenModal({ isOpen: true, status: "logout" });
          setMessage({ msg: "Are you sure?", isError: null });
        }}
        message={Message}
      />
      <header className="font-plusJakartaSans py-8 px-5 md:px-24 lg:py-10 lg:px-[130px] min-[1400px]:pt-[78px] min-[1400px]:pb-[64px]">
        <h1 className="text-2xl font-medium text-dark md:text-3xl xl:text-5xl">
          Payment Details
        </h1>
      </header>
      <main className="font-plusJakartaSans px-5 flex flex-col gap-y-12 md:px-24 lg:px-[130px] lg:flex-row lg:gap-x-5">
        <section className="lg:w-2/3">
          <div className="mb-8">
            <header className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-dark font-medium lg:text-[22px]">
                Your Order
              </h2>
              <Link
                to="/product"
                className="p-[10px] bg-primary hover:bg-amber-600 rounded-md text-dark text-sm font-medium active:ring active:ring-orange-300"
              >
                + Add Menu
              </Link>
            </header>
            <div className="section-body flex flex-col gap-y-4">
              {/* <ProductProvider>
                <Product />
              </ProductProvider> */}
              {wrapBody.map((result, i) => (
                <div
                  className="item-product bg-[#E8E8E84D] flex flex-col gap-y-4 p-4 relative sm:flex-row sm:gap-x-4 sm:items-center"
                  key={i}
                >
                  <div className="w-[80%] h-[80%] sm:w-[60%] sm:h-[60%] lg:w-1/3">
                    <img
                      src={result.products_image}
                      alt="coffee"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="product-info flex flex-col items-start gap-y-4 lg:w-2/3">
                    <p className="text-xs text-light bg-[#D00000] p-[10px] rounded-full font-bold">
                      FLASH SALE!
                    </p>
                    <p className="text-lg text-[#0B0909] font-bold">
                      {result.products_name}
                    </p>
                    <div className="text-sm text-secondary font-normal md:text-lg lg:text-base xl:text-lg flex">
                      <p>
                        {result.orders_products_qty} | {result.sizes_name} |{" "}
                        {result.hot_or_ice} | DineIn
                      </p>
                    </div>
                    <div className="flex gap-x-4 items-center">
                      <p className="text-xs text-[#D00000] font-medium line-through">
                        IDR. 10.000
                      </p>
                      <p className="text-lg text-[#0B0909] font-medium lg:text-[22px]">
                        IDR. {result.products_price}
                      </p>
                    </div>
                  </div>
                  <button type="button" className="absolute top-3 right-3">
                    <img
                      src={getImageUrl("XCircle", "svg")}
                      alt="XCircle"
                      className="w-full h-full"
                      onClick={() => deleteData(i)}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <header className="flex justify-between items-center mb-4">
              <span className="text-xl text-dark font-medium lg:text-[22px]">
                Payment & Info Delivery
              </span>
            </header>
            <form action="" className="flex flex-col gap-y-3">
              <div className="flex flex-col gap-y-3 relative">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-dark lg:text-base"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  className="py-3.5 px-10 border rounded-lg border-[#DEDEDE] text-xs tracking-wide outline-none focus:border-primary"
                  value={user.users_email}
                />
                <div className="icon-email absolute top-[46px] left-4 lg:top-[50px]">
                  <img
                    src={getImageUrl("mail", "svg")}
                    alt="mail.svg"
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-3 relative">
                <label
                  htmlFor="fullname"
                  className="text-sm font-semibold text-dark lg:text-base"
                >
                  Full Name
                </label>
                <input
                  type="fullname"
                  id="fullame"
                  name="fullname"
                  placeholder="Enter your Full Name"
                  className="py-3.5 px-10 border rounded-lg border-[#DEDEDE] text-xs tracking-wide outline-none focus:border-primary"
                  value={user.users_fullname}
                />
                <div className="icon-profile absolute top-[46px] left-4 lg:top-[50px]">
                  <img
                    src={getImageUrl("Profile", "svg")}
                    alt="Profile"
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-3 relative">
                <label
                  htmlFor="address"
                  className="text-sm font-semibold text-dark lg:text-base"
                >
                  Address
                </label>
                <input
                  type="address"
                  id="address"
                  name="address"
                  placeholder="Enter Your Address"
                  className="py-3.5 px-10 border rounded-lg border-[#DEDEDE] text-xs tracking-wide outline-none focus:border-primary"
                  value={user.users_address}
                />
                <div className="icon-location absolute top-[46px] left-4 lg:top-[50px]">
                  <img
                    src={getImageUrl("Location", "svg")}
                    alt="Location.svg"
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="">
                <span className="text-sm font-semibold text-dark lg:text-base">
                  Delivery
                </span>
                <div className="flex justify-between mt-3 gap-x-8">
                  {deliveries.map((result, i) => (
                    <button
                      type="button"
                      className="p-[10px] w-1/3 border rounded-md text-center text-sm font-normal text-secondary focus:outline-none focus:border-primary lg:text-base"
                      key={i}
                      id={result.deliveries_id}
                      onClick={deliverieHandler}
                    >
                      {result.deliveries_name}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </section>
        <section className="lg:w-1/3 lg:mt-2.5">
          <header className="mb-4">
            <span className="text-xl text-dark font-medium lg:text-[22px]">
              Total
            </span>
          </header>
          <div className="section-body bg-[#E8E8E84D] p-[10px] flex flex-col gap-y-5">
            <div className="flex justify-between">
              <span className="text-sm font-bold text-secondary lg:text-lg">
                Order
              </span>
              <span className="text-sm font-bold text-dark lg:text-lg">
                IDR. {price}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-bold text-secondary lg:text-lg">
                Delivery
              </span>
              <span className="text-sm font-bold text-dark lg:text-lg">
                IDR. 0
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-bold text-secondary lg:text-lg">
                Tax
              </span>
              <span className="text-sm font-bold text-dark lg:text-lg">
                IDR. 0
              </span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span className="text-sm font-bold text-secondary lg:text-lg">
                Subtotal
              </span>
              <span className="text-sm font-bold text-dark lg:text-lg">
                IDR. {price}
              </span>
            </div>
            <button
              className="p-[10px] text-sm font-medium rounded-md text-dark bg-primary hover:bg-amber-600 active:ring active:ring-orange-300"
              onClick={OnSubmitHandler}
            >
              Checkout
            </button>
            <div>
              <span className="text-sm lg:text-base">We Accept</span>
              <div className="flex justify-between items-center my-5">
                <div>
                  <img
                    src={getImageUrl("BRI", "svg")}
                    alt="BRI"
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <img
                    src={getImageUrl("dana", "svg")}
                    alt="dana.svg"
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <img
                    src={getImageUrl("BCA", "svg")}
                    alt="BCA.svg"
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <img
                    src={getImageUrl("GoPay", "svg")}
                    alt="GoPay.svg"
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <img
                    src={getImageUrl("OVO", "svg")}
                    alt="OVO.svg"
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <img
                    src={getImageUrl("Paypal", "svg")}
                    alt="Paypal.svg"
                    className="w-full h-full"
                  />
                </div>
              </div>
              <span className="text-sm font-normal text-secondary lg:text-base">
                *Get Discount if you pay with Bank Central Asia
              </span>
            </div>
          </div>
        </section>
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

export default CheckoutProduct;
