/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import DropdownMobile from "../../components/DropdownMobile";
import Modal from "../../components/modal/Modal";
import getImageUrl from "../../utils/imageGetter";

function Order(props) {
  useEffect(() => {
    document.title = "Order";
  });

  // eslint-disable-next-line no-unused-vars
  const [Message, setMessage] = useState({ msg: null, isError: null });
  const [openModal, setOpenModal] = useState(false);
  const [isDropdownShown, setIsDropdownShow] = useState(false);
  const [detailOrder, setDetailOrder] = useState(false);

  return (
    <>
      <Navbar
        isClick={() => setIsDropdownShow(true)}
        path={props.path}
        isLogoutClick={() => {
          setOpenModal({ isOpen: true, status: "logout" });
          setMessage({ msg: "Are You Sure?" });
        }}
      />
      <main className="flex w-full font-plusJakartaSans justify-between">
        <aside className="xl:w-1/5 border-r border-[#E8E8E8] py-6 px-11 hidden lg:block">
          <div className="flex flex-col gap-y-4">
            <Link
              to="/dashboard"
              className={`flex items-center gap-x-2 py-2 px-4 hover:bg-primary rounded-md outline-none text-base font-bold${
                // eslint-disable-next-line react/prop-types
                props.path == "/dashboard"
                  ? " text-[#0B132A] bg-primary"
                  : " text-[#4F5665]"
              }`}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M10 13H4C3.73478 13 3.48043 13.1054 3.29289 13.2929C3.10536 13.4804 3 13.7348 3 14V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21H10C10.2652 21 10.5196 20.8946 10.7071 20.7071C10.8946 20.5196 11 20.2652 11 20V14C11 13.7348 10.8946 13.4804 10.7071 13.2929C10.5196 13.1054 10.2652 13 10 13ZM9 19H5V15H9V19ZM20 3H14C13.7348 3 13.4804 3.10536 13.2929 3.29289C13.1054 3.48043 13 3.73478 13 4V10C13 10.2652 13.1054 10.5196 13.2929 10.7071C13.4804 10.8946 13.7348 11 14 11H20C20.2652 11 20.5196 10.8946 20.7071 10.7071C20.8946 10.5196 21 10.2652 21 10V4C21 3.73478 20.8946 3.48043 20.7071 3.29289C20.5196 3.10536 20.2652 3 20 3ZM19 9H15V5H19V9ZM20 16H18V14C18 13.7348 17.8946 13.4804 17.7071 13.2929C17.5196 13.1054 17.2652 13 17 13C16.7348 13 16.4804 13.1054 16.2929 13.2929C16.1054 13.4804 16 13.7348 16 14V16H14C13.7348 16 13.4804 16.1054 13.2929 16.2929C13.1054 16.4804 13 16.7348 13 17C13 17.2652 13.1054 17.5196 13.2929 17.7071C13.4804 17.8946 13.7348 18 14 18H16V20C16 20.2652 16.1054 20.5196 16.2929 20.7071C16.4804 20.8946 16.7348 21 17 21C17.2652 21 17.5196 20.8946 17.7071 20.7071C17.8946 20.5196 18 20.2652 18 20V18H20C20.2652 18 20.5196 17.8946 20.7071 17.7071C20.8946 17.5196 21 17.2652 21 17C21 16.7348 20.8946 16.4804 20.7071 16.2929C20.5196 16.1054 20.2652 16 20 16ZM10 3H4C3.73478 3 3.48043 3.10536 3.29289 3.29289C3.10536 3.48043 3 3.73478 3 4V10C3 10.2652 3.10536 10.5196 3.29289 10.7071C3.48043 10.8946 3.73478 11 4 11H10C10.2652 11 10.5196 10.8946 10.7071 10.7071C10.8946 10.5196 11 10.2652 11 10V4C11 3.73478 10.8946 3.48043 10.7071 3.29289C10.5196 3.10536 10.2652 3 10 3ZM9 9H5V5H9V9Z"
                    // eslint-disable-next-line react/prop-types
                    fill={props.path == "/dashboard" ? "#0B132A" : "#4F5665"}
                  />
                </svg>
              </div>
              <p className="max-xl:hidden">Dashboard</p>
            </Link>
            <Link
              to="/admin/product"
              className={`flex items-center gap-x-2 py-2 px-4 hover:bg-primary rounded-md outline-none text-sm font-normal${
                // eslint-disable-next-line react/prop-types
                props.path == "/admin/product"
                  ? " text-[#0B132A] bg-primary"
                  : " text-[#4F5665]"
              }`}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19.0001 3.00006C18.7194 2.68621 18.3758 2.43497 17.9916 2.26268C17.6074 2.09039 17.1912 2.00091 16.7701 2.00006H7.23013C6.80679 1.99749 6.3877 2.08454 6.00041 2.25551C5.61311 2.42647 5.26639 2.67747 4.98303 2.992C4.69967 3.30653 4.48609 3.67747 4.35632 4.08044C4.22656 4.48341 4.18355 4.90928 4.23013 5.33006L5.79013 19.3301C5.87169 20.0672 6.22343 20.748 6.77744 21.2411C7.33146 21.7342 8.04848 22.0046 8.79013 22.0001H15.2101C15.9518 22.0046 16.6688 21.7342 17.2228 21.2411C17.7768 20.748 18.1286 20.0672 18.2101 19.3301L19.7701 5.33006C19.8133 4.90935 19.767 4.48428 19.6343 4.08272C19.5016 3.68117 19.2855 3.31221 19.0001 3.00006ZM16.2001 19.1101C16.1729 19.3558 16.0557 19.5827 15.871 19.7471C15.6863 19.9114 15.4473 20.0016 15.2001 20.0001H8.79013C8.54291 20.0016 8.3039 19.9114 8.11923 19.7471C7.93456 19.5827 7.81732 19.3558 7.79013 19.1101L6.78013 10.0001H17.2201L16.2001 19.1101ZM17.4401 8.00006H6.56013L6.24013 5.11006C6.22438 4.96976 6.23851 4.82772 6.2816 4.69328C6.32469 4.55885 6.39576 4.43506 6.49013 4.33006C6.58362 4.22646 6.69776 4.14358 6.82521 4.08675C6.95265 4.02992 7.09058 4.00039 7.23013 4.00006H16.7701C16.9097 4.00039 17.0476 4.02992 17.175 4.08675C17.3025 4.14358 17.4166 4.22646 17.5101 4.33006C17.6045 4.43506 17.6756 4.55885 17.7186 4.69328C17.7617 4.82772 17.7759 4.96976 17.7601 5.11006L17.4401 8.00006ZM14.0001 18.0001C14.2653 18.0001 14.5197 17.8947 14.7072 17.7072C14.8948 17.5196 15.0001 17.2653 15.0001 17.0001V13.0001C15.0001 12.7348 14.8948 12.4805 14.7072 12.2929C14.5197 12.1054 14.2653 12.0001 14.0001 12.0001C13.7349 12.0001 13.4806 12.1054 13.293 12.2929C13.1055 12.4805 13.0001 12.7348 13.0001 13.0001V17.0001C13.0001 17.2653 13.1055 17.5196 13.293 17.7072C13.4806 17.8947 13.7349 18.0001 14.0001 18.0001ZM10.0001 18.0001C10.2653 18.0001 10.5197 17.8947 10.7072 17.7072C10.8948 17.5196 11.0001 17.2653 11.0001 17.0001V13.0001C11.0001 12.7348 10.8948 12.4805 10.7072 12.2929C10.5197 12.1054 10.2653 12.0001 10.0001 12.0001C9.73491 12.0001 9.48056 12.1054 9.29302 12.2929C9.10548 12.4805 9.00013 12.7348 9.00013 13.0001V17.0001C9.00013 17.2653 9.10548 17.5196 9.29302 17.7072C9.48056 17.8947 9.73491 18.0001 10.0001 18.0001Z"
                    fill={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/admin/product" ? "#0B132A" : "#4F5665"
                    }
                  />
                </svg>
              </div>
              <p className="max-xl:hidden">Product</p>
            </Link>
            <Link
              to="/admin/order"
              className={`flex items-center gap-x-2 py-2 px-4 hover:bg-primary rounded-md outline-none text-sm font-normal${
                // eslint-disable-next-line react/prop-types
                props.path == "/admin/order"
                  ? " text-[#0B132A] bg-primary"
                  : " text-[#4F5665]"
              }`}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="22"
                  viewBox="0 0 21 22"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.5134 20.5H6.16555C3.09919 20.5 0.746786 19.3925 1.41498 14.9348L2.19301 8.89363C2.60491 6.66937 4.02367 5.81812 5.26852 5.81812H15.447C16.7102 5.81812 18.0466 6.73345 18.5225 8.89363L19.3006 14.9348C19.8681 18.8891 17.5797 20.5 14.5134 20.5Z"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/admin/order" ? "#0B132A" : "#4F5665"
                    }
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.6502 5.59848C14.6502 3.21241 12.716 1.27812 10.3299 1.27812V1.27812C9.18088 1.27325 8.07727 1.72628 7.26308 2.53703C6.44889 3.34778 5.9912 4.44947 5.99121 5.59848H5.99121"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/admin/order" ? "#0B132A" : "#4F5665"
                    }
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.296 10.102H13.2502"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/admin/order" ? "#0B132A" : "#4F5665"
                    }
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.46492 10.102H7.41916"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/admin/order" ? "#0B132A" : "#4F5665"
                    }
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <p className="max-xl:hidden">Order</p>
            </Link>
            <Link
              to="/admin/user"
              className={`flex items-center gap-x-2 py-2 px-4 hover:bg-primary rounded-md outline-none text-sm font-normal${
                // eslint-disable-next-line react/prop-types
                props.path == "/admin/user"
                  ? " text-[#0B132A] bg-primary"
                  : " text-[#4F5665]"
              }`}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.59102 13.2068C11.28 13.2068 14.433 13.7658 14.433 15.9988C14.433 18.2318 11.301 18.8068 7.59102 18.8068C3.90102 18.8068 0.749023 18.2528 0.749023 16.0188C0.749023 13.7848 3.88002 13.2068 7.59102 13.2068Z"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/admin/user" ? "#0B132A" : "#4F5665"
                    }
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.59108 10.0198C5.16908 10.0198 3.20508 8.05676 3.20508 5.63476C3.20508 3.21276 5.16908 1.24976 7.59108 1.24976C10.0121 1.24976 11.9761 3.21276 11.9761 5.63476C11.9851 8.04776 10.0351 10.0108 7.62208 10.0198H7.59108Z"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/admin/user" ? "#0B132A" : "#4F5665"
                    }
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.4824 8.88153C16.0834 8.65653 17.3164 7.28253 17.3194 5.61953C17.3194 3.98053 16.1244 2.62053 14.5574 2.36353"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/admin/user" ? "#0B132A" : "#4F5665"
                    }
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.5947 12.7322C18.1457 12.9632 19.2287 13.5072 19.2287 14.6272C19.2287 15.3982 18.7187 15.8982 17.8947 16.2112"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/admin/user" ? "#0B132A" : "#4F5665"
                    }
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <p className="max-xl:hidden">User</p>
            </Link>
            <Link
              to="/logout"
              className={`flex items-center gap-x-2 py-2 px-4 hover:bg-primary rounded-md outline-none text-sm font-normal${
                // eslint-disable-next-line react/prop-types
                props.path == "/logout"
                  ? " text-[#0B132A] bg-primary"
                  : " text-[#4F5665]"
              }`}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M12 6.625L12 4C12 2.34315 13.3431 1 15 1L18 1C19.6569 1 21 2.34315 21 4L21 18C21 19.6569 19.6569 21 18 21L15 21C13.3431 21 12 19.6569 12 18L12 16"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/logout" ? "#0B132A" : "#4F5665"
                    }
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M4 14L1.44194 11.4419C1.19786 11.1979 1.19786 10.8021 1.44194 10.5581L4 8"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/logout" ? "#0B132A" : "#4F5665"
                    }
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M9 11L2 11"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/logout" ? "#0B132A" : "#4F5665"
                    }
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <p className="max-xl:hidden">Logout</p>
            </Link>
          </div>
        </aside>
        <section className="w-full py-5 px-5 md:px-10 xl:w-4/5 lg:py-6 lg:px-10 text-light flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-4 md:gap-x-5">
            <header className="flex flex-col gap-y-4 lg:flex-row justify-between w-full">
              <div className="flex justify-between lg:flex-col lg:gap-y-5">
                <p className="text-2xl font-medium text-[#0B0909]">
                  Order List
                </p>
                <button className="p-3 bg-primary hover:bg-amber-600 rounded-md text-dark text-sm font-medium active:ring active:ring-orange-300">
                  + Add Order
                </button>
              </div>
              <div className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-3 lg:items-end">
                <div className="font-medium text-secondary">
                  <p className="text-xs mb-4">Status</p>
                  <div className="flex p-3 lg:w-[240px] justify-between rounded-md border border-[#E8E8E8]">
                    <p className="text-sm">All</p>
                    <div>
                      <img
                        src={getImageUrl("down", "svg")}
                        alt="down"
                        className="w-5 h-5"
                      />
                    </div>
                  </div>
                </div>
                <div className="font-medium text-secondary">
                  <p className="text-xs mb-4">Search Order</p>
                  <div className="flex p-3 lg:w-[240px] justify-between rounded-md border border-[#E8E8E8]">
                    <p className="text-sm">Enter Order Number</p>
                    <div>
                      <img
                        src={getImageUrl("Search", "svg")}
                        alt="Search"
                        className="w-5 h-5"
                      />
                    </div>
                  </div>
                </div>
                <div className="">
                  <button
                    type="button"
                    className="flex gap-x-2 p-3 bg-primary hover:bg-amber-600 rounded-md text-dark text-sm font-medium active:ring active:ring-orange-300 max-md:w-full justify-center items-center"
                  >
                    <div>
                      <img src={getImageUrl("Filter3", "svg")} alt="Filter3" />
                    </div>
                    <p>Filter</p>
                  </button>
                </div>
              </div>
            </header>
            <section className="py-4 px-3 border border-[#E8E8E8] rounded-md">
              <div className="text-xs font-medium text-secondary overflow-x-scroll">
                <table className="table-auto w-full">
                  <thead className="">
                    <tr className="border-b border-[#E8E8E84D]">
                      <th className="p-6 text-left">
                        <div className="p-2 border border-[#E8E8E8] w-2 rounded-sm"></div>
                      </th>
                      <th className="p-6 text-center">No. Order</th>
                      <th className="p-6 text-center">Date</th>
                      <th className="p-6 text-center">Order</th>
                      <th className="p-6 text-center">Status</th>
                      <th className="p-6 text-center">Total</th>
                      <th className="p-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E8E8E84D] bg-[#F9FAFB]">
                      <td className="p-6 text-left">
                        <div className="p-2 border border-[#E8E8E8] w-2 rounded-sm"></div>
                      </td>
                      <td className="p-6 text-center">#12354-09893</td>
                      <td className="p-6 text-center">26 January 2023</td>
                      <td className="p-6 flex flex-col items-center">
                        <ul className="list-disc">
                          <li>Hazelnut Latte R1x</li>
                          <li>Caramel Machiato L1x</li>
                        </ul>
                      </td>
                      <td className="p-6 text-center">
                        <p className="text-xs text-[#00A700] font-bold py-2 px-2 rounded-full bg-[#00A70033]">
                          Done
                        </p>
                      </td>
                      <td className="p-6 text-center">IDR. 40.000</td>
                      <td className="p-6 text-center">
                        <div className="flex flex-col gap-y-2 items-center xl:flex-row md:gap-x-2">
                          <div className="p-1 bg-[#8E64471A] rounded-full">
                            <img
                              src={getImageUrl("view-list", "svg")}
                              alt="view-list"
                              className="w-4 h-4"
                            />
                          </div>
                          <div className="p-1 bg-[#FF89061A] rounded-full">
                            <img
                              src={getImageUrl("fi_edit-3", "svg")}
                              alt="fi_edit-3"
                              className="w-4 h-4"
                            />
                          </div>
                          <div className="p-1 bg-[#D000001A] rounded-full">
                            <img
                              src={getImageUrl("Delete", "svg")}
                              alt="Delete"
                              className="w-4 h-4"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#E8E8E84D]">
                      <td className="p-6 text-left">
                        <div className="p-2 border border-[#E8E8E8] w-2 rounded-sm"></div>
                      </td>
                      <td className="p-6 text-center">#12354-09893</td>
                      <td className="p-6 text-center">26 January 2023</td>
                      <td className="p-6 flex flex-col items-center">
                        <ul className="list-disc">
                          <li>Hazelnut Latte R1x</li>
                          <li>Caramel Machiato L1x</li>
                        </ul>
                      </td>
                      <td className="p-6 text-center">
                        <p className="text-xs text-[#D00000] font-bold py-2 px-2 rounded-full bg-[#D0000033]">
                          Pending
                        </p>
                      </td>
                      <td className="p-6 text-center">IDR. 40.000</td>
                      <td className="p-6 text-center">
                        <div className="flex flex-col gap-y-2 items-center xl:flex-row md:gap-x-2">
                          <div
                            className="p-1 bg-[#8E64471A] rounded-full cursor-pointer"
                            onClick={() => setDetailOrder(true)}
                          >
                            <img
                              src={getImageUrl("view-list", "svg")}
                              alt="view-list"
                              className="w-4 h-4"
                            />
                          </div>
                          <div className="p-1 bg-[#FF89061A] rounded-full">
                            <img
                              src={getImageUrl("fi_edit-3", "svg")}
                              alt="fi_edit-3"
                              className="w-4 h-4"
                            />
                          </div>
                          <div className="p-1 bg-[#D000001A] rounded-full">
                            <img
                              src={getImageUrl("Delete", "svg")}
                              alt="Delete"
                              className="w-4 h-4"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#E8E8E84D] bg-[#F9FAFB]">
                      <td className="p-6 text-left">
                        <div className="p-2 border border-[#E8E8E8] w-2 rounded-sm"></div>
                      </td>
                      <td className="p-6 text-center">#12354-09893</td>
                      <td className="p-6 text-center">26 January 2023</td>
                      <td className="p-6 flex flex-col items-center">
                        <ul className="list-disc">
                          <li>Hazelnut Latte R1x</li>
                          <li>Caramel Machiato L1x</li>
                        </ul>
                      </td>
                      <td className="p-6 text-center">
                        <p className="text-xs text-secondary font-bold py-2 px-2 rounded-full bg-[#4F566533]">
                          Waiting
                        </p>
                      </td>
                      <td className="p-6 text-center">IDR. 40.000</td>
                      <td className="p-6 text-center">
                        <div className="flex flex-col gap-y-2 items-center xl:flex-row md:gap-x-2">
                          <div className="p-1 bg-[#8E64471A] rounded-full">
                            <img
                              src={getImageUrl("view-list", "svg")}
                              alt="view-list"
                              className="w-4 h-4"
                            />
                          </div>
                          <div className="p-1 bg-[#FF89061A] rounded-full">
                            <img
                              src={getImageUrl("fi_edit-3", "svg")}
                              alt="fi_edit-3"
                              className="w-4 h-4"
                            />
                          </div>
                          <div className="p-1 bg-[#D000001A] rounded-full">
                            <img
                              src={getImageUrl("Delete", "svg")}
                              alt="Delete"
                              className="w-4 h-4"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#E8E8E84D]">
                      <td className="p-6 text-left">
                        <div className="p-2 border border-[#E8E8E8] w-2 rounded-sm"></div>
                      </td>
                      <td className="p-6 text-center">#12354-09893</td>
                      <td className="p-6 text-center">26 January 2023</td>
                      <td className="p-6 flex flex-col items-center">
                        <ul className="list-disc">
                          <li>Hazelnut Latte R1x</li>
                          <li>Caramel Machiato L1x</li>
                        </ul>
                      </td>
                      <td className="p-6 text-center">
                        <p className="text-xs text-primary font-bold py-2 px-2 w-full rounded-full bg-[#FF890633]">
                          On Progress
                        </p>
                      </td>
                      <td className="p-6 text-center">IDR. 40.000</td>
                      <td className="p-6 text-center">
                        <div className="flex flex-col gap-y-2 items-center xl:flex-row md:gap-x-2">
                          <div className="p-1 bg-[#8E64471A] rounded-full">
                            <img
                              src={getImageUrl("view-list", "svg")}
                              alt="view-list"
                              className="w-4 h-4"
                            />
                          </div>
                          <div className="p-1 bg-[#FF89061A] rounded-full">
                            <img
                              src={getImageUrl("fi_edit-3", "svg")}
                              alt="fi_edit-3"
                              className="w-4 h-4"
                            />
                          </div>
                          <div className="p-1 bg-[#D000001A] rounded-full">
                            <img
                              src={getImageUrl("Delete", "svg")}
                              alt="Delete"
                              className="w-4 h-4"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </section>
      </main>
      {detailOrder && (
        <div className="font-plusJakartaSans fixed top-0 left-0 right-0 bg-black bg-opacity-50 h-full">
          <div className="bg-light w-full flex flex-col gap-y-6 p-7 md:w-[60%] lg:w-[50%] xl:w-[35%] absolute right-0 top-0 h-screen overflow-y-scroll">
            <header className="flex justify-between items-center">
              <p className="text-2xl font-medium text-[#0B0909]">
                Order #12345-09343
              </p>
              <button
                type="button"
                className="outline-none"
                onClick={() => setDetailOrder(false)}
              >
                <img
                  src={getImageUrl("XCircle", "svg")}
                  alt="XCircle"
                  className="w-6 h-6"
                />
              </button>
            </header>
            <section>
              <header className="mb-4">
                <h2 className="text-xl text-dark font-medium lg:text-[22px]">
                  Order Information
                </h2>
              </header>
              <section className="text-sm">
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
                    Ridwan Bahtiar
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
                    Bekasi
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
                    08127343343
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
                  <p className="flex-1 text-secondary font-medium">Dine In</p>
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
                    Ridwan
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
                  <p className="flex-1 text-dark font-medium">Status</p>
                  <div className="flex items-center justify-center gap-x-2 p-2 bg-[#F1F1F1] rounded-md">
                    <p>On Progress</p>
                    <div>
                      <img
                        src={getImageUrl("down-dark", "svg")}
                        alt="down"
                        className="w-4 h-4"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-3 items-center justify-between py-5 px-3.5">
                  <p className="text-secondary font-medium">
                    Total Transaction
                  </p>
                  <p className="text-primary font-bold">IDR. 40.000</p>
                </div>
              </section>
            </section>
            <section>
              <header className="mb-4">
                <h2 className="text-xl text-dark font-medium lg:text-[22px]">
                  Your Order
                </h2>
              </header>
              <section className="flex flex-col gap-y-4">
                <div className="bg-[#E8E8E84D] flex flex-col gap-y-4 p-4 sm:flex-row sm:gap-x-4 sm:items-center">
                  <div className="w-full md:w-1/3">
                    <img
                      src={getImageUrl("image31", "webp")}
                      alt="coffee"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="product-info flex flex-col items-start gap-y-4 md:w-2/3">
                    <p className="text-sm text-[#0B0909] font-bold">
                      Hazelnut Latte
                    </p>
                    <div className="text-xs text-secondary font-normal flex">
                      <div className="flex gap-x-2">
                        <p>2 Pcs</p>
                        <p>|</p>
                        <p>Regular</p>
                        <p>|</p>
                        <p>Ice</p>
                      </div>
                    </div>
                    <div className="flex gap-x-4 items-center">
                      <p className="text-xs text-[#D00000] font-medium line-through">
                        IDR10.000
                      </p>
                      <p className="text-sm text-primary font-medium">
                        IDR. 40.000
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#E8E8E84D] flex flex-col gap-y-4 p-4 sm:flex-row sm:gap-x-4 sm:items-center">
                  <div className="w-full md:w-1/3">
                    <img
                      src={getImageUrl("image31", "webp")}
                      alt="coffee"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="product-info flex flex-col items-start gap-y-4 md:w-2/3">
                    <p className="text-sm text-[#0B0909] font-bold">
                      Hazelnut Latte
                    </p>
                    <div className="text-xs text-secondary font-normal flex">
                      <div className="flex gap-x-2">
                        <p>2 Pcs</p>
                        <p>|</p>
                        <p>Regular</p>
                        <p>|</p>
                        <p>Ice</p>
                      </div>
                    </div>
                    <div className="flex gap-x-4 items-center">
                      <p className="text-xs text-[#D00000] font-medium line-through">
                        IDR10.000
                      </p>
                      <p className="text-sm text-primary font-medium">
                        IDR. 40.000
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </div>
        </div>
      )}
      {isDropdownShown && (
        <DropdownMobile isClick={() => setIsDropdownShow(false)} />
      )}
      {openModal.isOpen && (
        <Modal modal={openModal} closeModal={setOpenModal} message={Message} />
      )}
    </>
  );
}

export default Order;
