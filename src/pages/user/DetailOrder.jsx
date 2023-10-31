import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import getImageUrl from "../../utils/imageGetter";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DropdownMobile from "../../components/DropdownMobile";
import Modal from "../../components/modal/Modal";

function DetailOrder() {
  useEffect(() => {
    document.title = "History Order";
  });

  // eslint-disable-next-line no-unused-vars
  const [Message, setMessage] = useState({ msg: null, isError: null });
  const [openModal, setOpenModal] = useState({ isOpen: false, status: null });
  const [isDropdownShown, setIsDropdownShow] = useState(false);

  const userInfo = useSelector((state) => state.user);
  const token = userInfo.token;
  const params = useParams();
  const paramsId = params.id;
  const url = import.meta.env.VITE_BACKEND_HOST;
  const authAxios = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Barer ${token}`,
    },
  });

  const [user, setUser] = useState([]);
  useEffect(() => {
    authAxios
      .get("/orders/users/" + paramsId)
      .then((res) => {
        setUser(res.data.result[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const [order, setOrder] = useState([]);
  useEffect(() => {
    authAxios
      .get("/orders/detail/" + paramsId)
      .then((res) => {
        setOrder(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateHandler = (value) => {
    const newDate = new Date(value);
    const date = newDate.getDate();
    const month = monthNames[newDate.getMonth()];
    const year = newDate.getFullYear();
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const format = newDate.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
    });
    return `${date} ${month} ${year} ${hours}:${minutes} ${format}`;
  };

  return (
    <>
      <Navbar
        isClick={() => setIsDropdownShow(true)}
        isLogoutClick={() => {
          setOpenModal({ isOpen: true, status: "logout" });
          setMessage({ msg: "Are You Sure?" });
        }}
      />
      <header className="font-plusJakartaSans py-8 px-5 md:px-24 lg:py-10 lg:px-[130px] min-[1400px]:pt-[78px] min-[1400px]:pb-[64px]">
        <h1 className="text-2xl font-medium text-dark md:text-3xl lg:text-3xl xl:text-5xl">
          Order <span className="font-bold">#{paramsId}</span>
        </h1>
        <p className="text-base font-normal text-secondary mt-2">
          {dateHandler(user.created_at)}
        </p>
      </header>
      <main className="font-plusJakartaSans px-5 flex flex-col gap-y-12 md:px-24 lg:px-[130px] lg:flex-row lg:gap-x-5 justify-between">
        <section className="lg:w-1/2">
          <header className="mb-4">
            <h2 className="text-xl text-dark font-medium lg:text-[22px]">
              Order Information
            </h2>
          </header>
          <section className="text-sm md:text-base">
            <div className="flex gap-x-3 items-center border-b border-[#e8e8e8e8] py-5 px-3.5">
              <div className="flex-none">
                <img
                  src={getImageUrl("Profile", "svg")}
                  alt="profile"
                  className="w-full h-full"
                />
              </div>
              <p className="flex-1 text-secondary font-medium">Fullname</p>
              <p className="flex-1 text-dark font-bold text-right">
                {user.users_fullname}
              </p>
            </div>
            <div className="flex gap-x-3 items-center border-b border-[#e8e8e8e8] py-5 px-3.5">
              <div className="flex-none">
                <img
                  src={getImageUrl("Location", "svg")}
                  alt="Location"
                  className="w-full h-full"
                />
              </div>
              <p className="flex-1 text-secondary font-medium">Address</p>
              <p className="flex-1 text-dark font-bold text-right">
                {user.users_address}
              </p>
            </div>
            <div className="flex gap-x-3 items-center border-b border-[#e8e8e8e8] py-5 px-3.5">
              <div className="flex-none">
                <img
                  src={getImageUrl("PhoneCall", "svg")}
                  alt="PhoneCall"
                  className="w-full h-full"
                />
              </div>
              <p className="flex-1 text-secondary font-medium">Phone</p>
              <p className="flex-1 text-dark font-bold text-right">
                {user.users_phone}
              </p>
            </div>
            <div className="flex gap-x-3 items-center border-b border-[#e8e8e8e8] py-5 px-3.5">
              <div className="flex-none">
                <img
                  src={getImageUrl("u_postcard", "svg")}
                  alt="u_postcard"
                  className="w-full h-full"
                />
              </div>
              <p className="flex-1 text-secondary font-medium">
                {user.payment_methods_name}
              </p>
              <p className="flex-1 text-dark font-bold text-right">Cash</p>
            </div>
            <div className="flex gap-x-3 items-center border-b border-[#e8e8e8e8] py-5 px-3.5">
              <div className="flex-none">
                <img
                  src={getImageUrl("truck", "svg")}
                  alt="truck"
                  className="w-full h-full"
                />
              </div>
              <p className="flex-1 text-secondary font-medium">Shipping</p>
              <p className="flex-1 text-dark font-bold text-right">
                {user.deliveries_name}
              </p>
            </div>
            <div className="flex gap-x-3 items-center border-b border-[#e8e8e8e8] py-5 px-3.5">
              <div className="flex-none">
                <img
                  src={getImageUrl("u_process", "svg")}
                  alt="u_process"
                  className="w-full h-full"
                />
              </div>
              <p className="flex-1 text-secondary font-medium">Status</p>
              {(() => {
                switch (user.orders_status) {
                  case "Pending":
                    return (
                      <p className="text-sm text-[#D00000] font-bold py-2 px-4 rounded-full bg-[#D0000033]">
                        {user.orders_status}
                      </p>
                    );
                    // eslint-disable-next-line no-unreachable
                    break;
                  case "On Progress/Paid":
                    return (
                      <p className="text-sm text-primary font-bold py-2 px-4 rounded-full bg-[#FF890633]">
                        {user.orders_status}
                      </p>
                    );
                    // eslint-disable-next-line no-unreachable
                    break;
                  case "Done":
                    return (
                      <p className="text-sm text-[#00A700] font-bold py-2 px-4 rounded-full bg-[#00A70033]">
                        {user.orders_status}
                      </p>
                    );
                    // eslint-disable-next-line no-unreachable
                    break;

                  default:
                    return null;
                    // eslint-disable-next-line no-unreachable
                    break;
                }
              })()}
            </div>
            <div className="flex gap-x-3 items-center justify-between py-5 px-3.5">
              <p className="text-secondary font-medium">Total Transaction</p>
              <p className="text-primary font-bold">IDR {user.orders_total}</p>
            </div>
          </section>
        </section>
        <section className="lg:w-1/2">
          <header className="mb-4">
            <h2 className="text-xl text-dark font-medium lg:text-[22px]">
              Your Order
            </h2>
          </header>
          <section className="flex flex-col gap-y-4">
            {order.map((result, i) => (
              <div
                className="bg-[#E8E8E84D] flex flex-col gap-y-4 p-4 sm:flex-row sm:gap-x-4 sm:items-center"
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
                  {/* <p className="text-xs text-light bg-[#D00000] p-[10px] rounded-full font-bold">
                    FLASH SALE!
                  </p> */}
                  <p className="text-lg text-[#0B0909] font-bold">
                    {result.products_name}
                  </p>
                  <div className="text-sm text-secondary font-normal md:text-lg lg:text-base xl:text-lg flex">
                    <div className="flex gap-x-2">
                      <p>{result.orders_products_qty} Pcs</p>
                      <p>|</p>
                      <p>{result.sizes_name}</p>
                      <p>|</p>
                      <p>{result.hot_or_ice}</p>
                    </div>
                  </div>
                  <div className="flex gap-x-4 items-center">
                    {/* <p className="text-xs text-[#D00000] font-medium line-through">
                      IDR10.000
                    </p> */}
                    <p className="text-lg text-primary font-medium lg:text-[22px]">
                      IDR {result.products_price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </section>
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

export default DetailOrder;
