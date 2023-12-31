import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import getImageUrl from "../../utils/imageGetter";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Modal from "../../components/modal/Modal";
import DropdownMobile from "../../components/DropdownMobile";

function HistoryOrder() {
  useEffect(() => {
    document.title = "History Order";
  });

  // eslint-disable-next-line no-unused-vars
  const [Message, setMessage] = useState({ msg: null, isError: null });
  const [openModal, setOpenModal] = useState({ isOpen: false, status: null });
  const [isDropdownShown, setIsDropdownShow] = useState(false);

  const user = useSelector((state) => state.user);
  const token = user.token;
  const id = user.userInfo.users_id;
  const url = import.meta.env.VITE_BACKEND_HOST;
  const authAxios = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Barer ${token}`,
    },
  });

  const [productByUser, setProductByUser] = useState([]);
  useEffect(() => {
    authAxios
      .get("/orders/" + id)
      .then((res) => {
        setProductByUser(res.data.result);
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
    return `${date} ${month} ${year}`;
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
      <header className="font-plusJakartaSans py-8 px-5 md:px-24 lg:py-10 lg:px-[130px] min-[1400px]:pt-[78px] min-[1400px]:pb-[64px] flex justify-between items-end md:justify-normal md:gap-7">
        <h1 className="text-2xl font-medium text-dark md:text-3xl xl:text-5xl">
          History Order
        </h1>
        <div className="p-1 w-8 h-8 box-border text-center bg-[#E8E8E8] tex-xs font-normal text-dark md:text-sm">
          2
        </div>
      </header>
      <main className="font-plusJakartaSans px-5 flex flex-col gap-y-12 sm:px-5 md:px-24 lg:px-[130px] xl:flex-row xl:gap-x-5">
        <section className="font-plusJakartaSans flex flex-col gap-y-8 xl:w-2/3">
          <header className="flex flex-col gap-y-4 md:flex-row md:justify-between">
            <section className="md:order-last">
              <input
                type="date"
                className="text-sm font-medium text-dark p-[10px] bg-[#F1F1F1] w-full md:p-4 md:text-sm lg:text-base"
                id="date"
              />
            </section>
            <section className="bg-[#F1F1F1] p-[10px] text-xs md:text-sm lg:text-base font-medium text-dark flex justify-between md:w-2/3">
              <button
                type="button"
                className="py-2 px-3 bg-light focus:bg-light"
              >
                On Progress
              </button>
              <button type="button" className="py-2 px-3 focus:bg-light">
                Sending Goods
              </button>
              <button type="button" className="py-2 px-3 focus:bg-light">
                Finish Order
              </button>
            </section>
          </header>
          <section className="flex flex-col gap-y-5">
            {productByUser.map((result, i) => (
              <div
                className="flex flex-col items-center gap-y-4 bg-[#E8E8E84D] py-7 px-2 sm:flex-row sm:gap-x-4 md:items-center"
                key={i}
              >
                <div className="w-[70%] sm:w-2/5 md:w-1/5">
                  <img
                    src={getImageUrl("image31", "webp")}
                    alt="product-image"
                    className="w-full h-full"
                  />
                </div>
                <div className="flex flex-wrap gap-y-9 md:gap-y-4 md:w-full">
                  <div className="w-1/2 md:w-1/4 text-center sm:text-left">
                    <div className="flex gap-x-2 mb-[10px] items-center justify-center sm:justify-start">
                      <div>
                        <img
                          src={getImageUrl("u_glass-tea", "svg")}
                          alt="u_glass-tea"
                          className="w-full h-full"
                        />
                      </div>
                      <span className="text-sm font-medium text-secondary">
                        No. Order
                      </span>
                    </div>
                    <span className="text-sm font-bold text-dark">
                      #{result.orders_id}
                    </span>
                  </div>
                  <div className="w-1/2 md:w-1/4 text-center sm:text-left">
                    <div className="flex gap-x-2 mb-[10px] items-center justify-center sm:justify-start">
                      <div>
                        <img
                          src={getImageUrl("Calendar", "svg")}
                          alt="Calendar"
                          className="w-full h-full"
                        />
                      </div>
                      <span className="text-sm font-medium text-secondary">
                        Date
                      </span>
                    </div>
                    <span className="text-sm font-bold text-dark">
                      {dateHandler(result.created_at)}
                    </span>
                  </div>
                  <div className="w-1/2 md:w-1/4 text-center sm:text-left">
                    <div className="flex gap-x-2 mb-[10px] items-center justify-center sm:justify-start">
                      <div>
                        <img
                          src={getImageUrl("Repeat", "svg")}
                          alt="Repeat.svg"
                          className="w-full h-full"
                        />
                      </div>
                      <span className="text-sm font-medium text-secondary">
                        Total
                      </span>
                    </div>
                    <span className="text-sm font-bold text-dark">
                      IDR. {result.orders_total}
                    </span>
                  </div>
                  <div className="w-1/2 md:w-1/4 text-center sm:text-left">
                    <div className="flex gap-x-2 mb-[10px] items-center justify-center sm:justify-start">
                      <div>
                        <img
                          src={getImageUrl("u_process", "svg")}
                          alt="u_process"
                          className="w-full h-full"
                        />
                      </div>
                      <span className="text-sm font-medium text-secondary">
                        Status
                      </span>
                    </div>
                    <div className="flex">
                      {(() => {
                        switch (result.orders_status) {
                          case "Pending":
                            return (
                              <p className="text-xs text-[#D00000] font-bold py-2 px-4 rounded-full bg-[#D0000033]">
                                {result.orders_status}
                              </p>
                            );
                            // eslint-disable-next-line no-unreachable
                            break;
                          case "On Progress/Paid":
                            return (
                              <p className="text-xs text-primary font-bold py-2 px-4 rounded-full bg-[#FF890633] text-center">
                                {result.orders_status}
                              </p>
                            );
                            // eslint-disable-next-line no-unreachable
                            break;
                          case "Done":
                            return (
                              <p className="text-xs text-[#00A700] font-bold py-2 px-4 rounded-full bg-[#00A70033]">
                                {result.orders_status}
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
                  </div>
                  <Link
                    to={`/detail-order/${result.orders_id}`}
                    className="text-sm font-medium text-primary underline underline-offset-2 max-sm:w-full text-center sm:text-left"
                  >
                    Views Order Detail
                  </Link>
                </div>
              </div>
            ))}
          </section>
          <section className="flex justify-center gap-x-4">
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
          </section>
        </section>
        <aside className="font-plusJakartaSans xl:w-1/3">
          <section className="bg-[#FFF] border border-[#E8E8E8] p-5 flex flex-col gap-y-2.5">
            <div className="self-start">
              <img
                src={getImageUrl("message", "svg")}
                alt="message.svg"
                className="w-full h-full"
              />
            </div>
            <span className="text-lg font-bold text-secondary">
              Send Us Message
            </span>
            <span className="text-base font-normal text-secondary">
              if your unable to find answer or find your product quickly, please
              describe your problem and tell us. we will give you solution.
            </span>
            <button
              type="button"
              className="text-sm font-medium text-dark p-2.5 bg-primary hover:bg-[#db8625] rounded-md active:ring active:ring-orange-300"
            >
              Send Message
            </button>
          </section>
        </aside>
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

export default HistoryOrder;
