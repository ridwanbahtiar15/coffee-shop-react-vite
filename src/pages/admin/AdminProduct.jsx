/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import Navbar from "../../components/Navbar";
import DropdownMobile from "../../components/DropdownMobile";
import Modal from "../../components/modal/Modal";
import getImageUrl from "../../utils/imageGetter";

function Order(props) {
  useEffect(() => {
    document.title = "Product";
  });

  // eslint-disable-next-line no-unused-vars
  const [Message, setMessage] = useState({ msg: null, isError: null });
  const [openModal, setOpenModal] = useState({
    isOpen: false,
    status: null,
  });
  const [isDropdownShown, setIsDropdownShow] = useState(false);
  const [formAddProduct, setFormAddProduct] = useState(false);
  const [formUpdateProduct, setFormUpdateProduct] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCategory, setIsCategory] = useState(false);
  const linkRef = useRef(null);
  const navigate = useNavigate();

  const goto = (ref) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
    });
  };

  const user = useSelector((state) => state.user);
  const token = user.token;
  const url = import.meta.env.VITE_BACKEND_HOST;
  const authAxios = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Barer ${token}`,
    },
  });

  const [product, setProduct] = useState([]);
  const [meta, setMeta] = useState([]);
  useEffect(() => {
    authAxios
      .get("/products?" + searchParams.toString())
      .then((res) => {
        setProduct(res.data.result);
        setMeta(res.data.meta);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          setMessage({
            msg: err.response.data.msg,
            isError: true,
          });
          setOpenModal({ isOpen: true, status: "401" });
        }
      });
  }, [searchParams]);

  const pagination = (page) => {
    if (page !== meta.page) {
      navigate("?page=" + page);
    }
  };

  const renderButtons = () => {
    return Array.from({ length: meta.totalPage }, (_, index) => (
      <button
        onClick={() => {
          pagination(index + 1);
        }}
        key={index}
        className={`${
          index + 1 == meta.page ? "text-primary" : "text-secondary"
        }`}
      >
        {index + 1}
      </button>
    ));
  };

  const onSearchHandler = (e) => {
    e.preventDefault();

    let urlProduct = `/products`;

    if (e.target.search.value == "") {
      setSearchParams((prev) => ({
        ...prev,
      }));
      urlProduct = `/products`;
      authAxios
        .get(urlProduct)
        .then((res) => setProduct(res.data.result))
        .catch(() => {
          setProduct([]);
          setMeta([]);
        });
      return;
    }

    if (e.target.search.value) {
      setSearchParams((prev) => ({
        ...prev,
        name: e.target.search.value,
      }));
      urlProduct = `/products?name=${e.target.search.value.toLowerCase()}`;
      authAxios
        .get(urlProduct)
        .then((res) => setProduct(res.data.result))
        .catch(() => {
          setProduct([]);
          setMeta([]);
        });
    }
  };

  const [productById, setProductById] = useState([]);
  const handleChange = (e) => {
    const dataClone = { ...productById };
    dataClone[e.target.name] = e.target.value;
    setProductById(dataClone);
  };

  const [image, setImage] = useState("");
  const changeImageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const [category, setCategory] = useState({
    name: "Select Category",
    id: null,
  });

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    authAxios
      .get("/categories")
      .then((res) => {
        setCategories(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  const GetProductHandler = (id) => {
    setSearchParams((prev) => ({
      ...prev,
      id: id,
    }));

    setFormUpdateProduct(true);
    authAxios
      .get("/products/" + id)
      .then((res) => {
        setProductById(res.data.result[0]);
        setCategory({
          name: res.data.result[0].categories_name,
          id: res.data.result[0].categories_id,
        });
      })
      .catch((err) => {
        if (err.response.status == 401) {
          setMessage({
            msg: err.response.data.msg,
            isError: true,
          });
          setOpenModal({ isOpen: true, status: "401" });
        }
      });
  };

  const OnAddHandler = (e) => {
    e.preventDefault();

    setMessage({
      msg: "Loading...",
      isError: false,
    });

    setOpenModal({ isOpen: true, status: false });

    const formData = new FormData();
    formData.append("products_image", image);
    formData.append("products_name", e.target.products_name.value);
    formData.append("products_price", e.target.products_price.value);
    formData.append("products_desc", e.target.products_desc.value);
    formData.append("products_stock", e.target.products_stock.value);
    formData.append("categories_id", category.id);

    authAxios
      .post("/products", formData)
      .then((res) => {
        setFormAddProduct(false);
        setImage("");
        goto(linkRef.current);
        setMessage({
          msg: res.data.msg,
          isError: false,
        });
        setOpenModal({ isOpen: true, status: "addProduct" });
        authAxios
          .get("/products")
          .then((res) => setProduct(res.data.result))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        setMessage({
          msg: err.response.data.msg,
          isError: true,
        });
        setOpenModal({ isOpen: true, status: "error" });
      });
  };

  const OnUpdateHandler = (e) => {
    e.preventDefault();

    setMessage({
      msg: "Loading...",
      isError: false,
    });

    setOpenModal({ isOpen: true, status: false });

    const formData = new FormData();
    formData.append("products_image", image);
    formData.append("products_name", e.target.products_name.value);
    formData.append("products_price", e.target.products_price.value);
    formData.append("products_desc", e.target.products_desc.value);
    formData.append("products_stock", e.target.products_stock.value);
    formData.append("categories_id", category.id);

    authAxios
      .patch("/products/" + searchParams.get("id"), formData)
      .then((res) => {
        setSearchParams((prev) => ({
          ...prev,
        }));
        setFormUpdateProduct(false);
        setImage("");
        setMessage({
          msg: res.data.msg,
          isError: false,
        });
        setOpenModal({
          isOpen: true,
        });
        authAxios
          .get("/products")
          .then((res) => setProduct(res.data.result))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        setMessage({
          msg: err.response.data.msg,
          isError: true,
        });
        setOpenModal({ isOpen: true, status: "error" });
      });
  };

  const DeleteProductHandler = (id, imageUrl) => {
    setMessage({
      msg: "Loading...",
      isError: false,
    });
    setOpenModal({ isOpen: true, status: false });

    authAxios.delete(`/products?id=${id}&imageUrl=${imageUrl}`).then((res) => {
      setMessage({
        msg: res.data.msg,
        isError: false,
        status: null,
      });
      setOpenModal({
        isOpen: true,
      });
      authAxios
        .get("/products")
        .then((res) => setProduct(res.data.result))
        .catch((err) => console.log(err));
    });
  };

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
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.5134 20.5H6.16555C3.09919 20.5 0.746786 19.3925 1.41498 14.9348L2.19301 8.89363C2.60491 6.66937 4.02367 5.81812 5.26852 5.81812H15.447C16.7102 5.81812 18.0466 6.73345 18.5225 8.89363L19.3006 14.9348C19.8681 18.8891 17.5797 20.5 14.5134 20.5Z"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/admin/order" ? "#0B132A" : "#4F5665"
                    }
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.6502 5.59848C14.6502 3.21241 12.716 1.27812 10.3299 1.27812V1.27812C9.18088 1.27325 8.07727 1.72628 7.26308 2.53703C6.44889 3.34778 5.9912 4.44947 5.99121 5.59848H5.99121"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/admin/order" ? "#0B132A" : "#4F5665"
                    }
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.296 10.102H13.2502"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/admin/order" ? "#0B132A" : "#4F5665"
                    }
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.46492 10.102H7.41916"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/admin/order" ? "#0B132A" : "#4F5665"
                    }
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.59102 13.2068C11.28 13.2068 14.433 13.7658 14.433 15.9988C14.433 18.2318 11.301 18.8068 7.59102 18.8068C3.90102 18.8068 0.749023 18.2528 0.749023 16.0188C0.749023 13.7848 3.88002 13.2068 7.59102 13.2068Z"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/admin/user" ? "#0B132A" : "#4F5665"
                    }
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.59108 10.0198C5.16908 10.0198 3.20508 8.05676 3.20508 5.63476C3.20508 3.21276 5.16908 1.24976 7.59108 1.24976C10.0121 1.24976 11.9761 3.21276 11.9761 5.63476C11.9851 8.04776 10.0351 10.0108 7.62208 10.0198H7.59108Z"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/admin/user" ? "#0B132A" : "#4F5665"
                    }
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.4824 8.88153C16.0834 8.65653 17.3164 7.28253 17.3194 5.61953C17.3194 3.98053 16.1244 2.62053 14.5574 2.36353"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/admin/user" ? "#0B132A" : "#4F5665"
                    }
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.5947 12.7322C18.1457 12.9632 19.2287 13.5072 19.2287 14.6272C19.2287 15.3982 18.7187 15.8982 17.8947 16.2112"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/admin/user" ? "#0B132A" : "#4F5665"
                    }
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="max-xl:hidden">User</p>
            </Link>
            <button
              className={`flex items-center gap-x-2 py-2 px-4 hover:bg-primary rounded-md outline-none text-sm font-normal${
                // eslint-disable-next-line react/prop-types
                props.path == "/logout"
                  ? " text-[#0B132A] bg-primary"
                  : " text-[#4F5665]"
              }`}
              onClick={() => {
                setOpenModal({ isOpen: true, status: "logout" });
                setMessage({ msg: "Are You Sure?" });
              }}
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
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 14L1.44194 11.4419C1.19786 11.1979 1.19786 10.8021 1.44194 10.5581L4 8"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/logout" ? "#0B132A" : "#4F5665"
                    }
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 11L2 11"
                    stroke={
                      // eslint-disable-next-line react/prop-types
                      props.path == "/logout" ? "#0B132A" : "#4F5665"
                    }
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="max-xl:hidden">Logout</p>
            </button>
          </div>
        </aside>
        <section className="w-full py-5 px-5 md:px-10 xl:w-4/5 lg:py-6 lg:px-10 text-light flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-4 md:gap-x-5">
            <header className="flex flex-col gap-y-4 lg:flex-row justify-between w-full">
              <div className="flex justify-between lg:flex-col lg:gap-y-5">
                <p className="text-2xl font-medium text-[#0B0909]">
                  Product List
                </p>
                <button
                  className="p-3 bg-primary hover:bg-amber-600 rounded-md text-dark text-sm font-medium active:ring active:ring-orange-300"
                  onClick={() => {
                    setFormAddProduct(true);
                  }}
                >
                  + Add Product
                </button>
              </div>
              <form
                className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-3 lg:items-end"
                onSubmit={onSearchHandler}
              >
                <div className="font-medium text-secondary relative">
                  <p className="text-xs mb-3">Search Product</p>
                  <input
                    type="text"
                    id="search"
                    className="text-sm p-3 border border-[#E8E8E8] rounded-md w-full lg:w-[340px] font-medium text-secondary placeholder:font-medium placeholder:text-secondary outline-none focus:border focus:border-primary"
                    placeholder="Enter Product Name"
                  />
                  <div className="absolute top-10 right-3">
                    <img
                      src={getImageUrl("Search", "svg")}
                      alt="Search"
                      className="w-5 h-5"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex gap-x-2 p-3 bg-primary hover:bg-amber-600 rounded-md text-dark text-sm font-medium active:ring active:ring-orange-300 max-md:w-full justify-center items-center"
                  >
                    <div>
                      <img src={getImageUrl("Filter3", "svg")} alt="Filter3" />
                    </div>
                    <p>Filter</p>
                  </button>
                </div>
              </form>
            </header>
            <section className="py-4 px-3 border border-[#E8E8E8] rounded-md">
              <div className="text-xs min-[1440px]:text-sm font-medium text-secondary overflow-x-scroll">
                <table className="table-auto w-full">
                  <thead className="">
                    <tr className="border-b border-[#E8E8E84D]">
                      <th className="p-6 text-center">No</th>
                      <th className="p-6 text-center">Image</th>
                      <th className="p-6 text-center">Product Name</th>
                      <th className="p-6 text-center">Price</th>
                      <th className="p-6 text-center">Desc</th>
                      <th className="p-6 text-center">Stock</th>
                      <th className="p-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.map((result, i) => (
                      <tr
                        className={`border-b border-[#E8E8E84D] ${
                          i % 2 == 0 ? "bg-[#F9FAFB]" : ""
                        }`}
                        key={i}
                      >
                        <td className="p-6 text-center">{i + 1}</td>
                        <td className="p-6">
                          <div className="flex justify-center">
                            <img
                              src={result.products_image}
                              alt="product"
                              className="w-12 rounded-md"
                            />
                          </div>
                        </td>
                        <td className="p-6 text-center">
                          {result.products_name}
                        </td>
                        <td className="p-6 text-center">
                          IDR {result.products_price}
                        </td>
                        <td className="p-6 text-center text-xs">
                          {result.products_desc}
                        </td>
                        <td className="p-6 text-center">
                          {result.products_stock}
                        </td>
                        <td className="p-6 text-center">
                          <div className="flex flex-col gap-y-2 items-center xl:flex-row md:gap-x-2 justify-center">
                            <div
                              className="p-1 bg-[#FF89061A] rounded-full cursor-pointer"
                              onClick={() =>
                                GetProductHandler(result.products_id)
                              }
                            >
                              <img
                                src={getImageUrl("fi_edit-3", "svg")}
                                alt="fi_edit-3"
                                className="w-4"
                              />
                            </div>
                            <div
                              className="p-1 bg-[#D000001A] rounded-full cursor-pointer"
                              onClick={() =>
                                DeleteProductHandler(
                                  result.products_id,
                                  result.products_image
                                )
                              }
                            >
                              <img
                                src={getImageUrl("Delete", "svg")}
                                alt="Delete"
                                className="w-4"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between text-xs font-medium text-secondary mt-6 mb-2">
                <p>
                  Show {meta.totalData <= 5 ? meta.totalData : meta.limit}{" "}
                  product of {meta.totalData} product
                </p>
                <div className="flex gap-x-4">{renderButtons()}</div>
              </div>
            </section>
            <div ref={linkRef}></div>
          </div>
        </section>
      </main>
      {formAddProduct && (
        <div className="font-plusJakartaSans fixed top-0 left-0 right-0 bg-black bg-opacity-50 h-full">
          <div className="bg-light w-full flex flex-col gap-y-6 p-7 md:w-[60%] lg:w-[50%] xl:w-[35%] absolute right-0 top-0 h-screen overflow-y-scroll">
            <header className="flex justify-between items-center">
              <p className="text-2xl font-medium text-[#0B0909]">Add Product</p>
              <button
                type="button"
                className="outline-none"
                onClick={() => {
                  setFormAddProduct(false);
                }}
              >
                <img
                  src={getImageUrl("XCircle", "svg")}
                  alt="XCircle"
                  className="w-6 h-6"
                />
              </button>
            </header>
            <section>
              <section className="text-sm">
                <form
                  className="flex flex-col gap-y-6"
                  encType="multipart/form-data"
                  onSubmit={OnAddHandler}
                >
                  <div className="flex flex-col gap-y-2">
                    <label htmlFor="image" className="text-dark font-semibold">
                      Photo Product
                    </label>
                    {image ? (
                      <div className="self-baseline rounded-md">
                        <img
                          src={URL.createObjectURL(image)}
                          alt="image"
                          className="w-14 rounded-md"
                        />
                      </div>
                    ) : (
                      <div className="p-4 bg-[#E8E8E8] self-baseline rounded-md">
                        <img
                          src={getImageUrl("Image", "svg")}
                          alt="image"
                          className="w-6"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      name="products_image"
                      id="products-image"
                      className="hidden"
                      onChange={changeImageHandler}
                    />
                    <label
                      type="button"
                      className="py-2 px-5 bg-primary self-baseline rounded-md text-xs font-medium hover:bg-amber-600 active:ring active:ring-orange-300 cursor-pointer"
                      htmlFor="products-image"
                    >
                      Upload
                    </label>
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <label
                      htmlFor="products_name"
                      className="font-semibold text-dark"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="products_name"
                      name="products_name"
                      className="text-xs text-secondary border border-[#DEDEDE] p-3 rounded-lg tracking-wide placeholder:text-xs placeholder:text-secondary placeholder:tracking-wide outline-none focus:border focus:border-primary"
                      placeholder="Enter Product Name"
                    />
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <label
                      htmlFor="products_price"
                      className="font-semibold text-dark"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      id="products_price"
                      name="products_price"
                      className="text-xs text-secondary border border-[#DEDEDE] p-3 rounded-lg tracking-wide placeholder:text-xs placeholder:text-secondary placeholder:tracking-wide outline-none focus:border focus:border-primary"
                      placeholder="Enter Product Price"
                    />
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <label
                      htmlFor="products_desc"
                      className="font-semibold text-dark"
                    >
                      Description
                    </label>
                    <textarea
                      type="number"
                      rows="6"
                      id="products_desc"
                      name="products_desc"
                      className="text-xs text-secondary border border-[#DEDEDE] p-3 rounded-lg tracking-wide placeholder:text-xs placeholder:text-secondary placeholder:tracking-wide outline-none focus:border focus:border-primary"
                      placeholder="Enter Product Description"
                    ></textarea>
                  </div>
                  <div className="flex flex-col gap-y-4 text-secondary">
                    <p className="text-sm font-semibold text-dark">Category</p>
                    <div
                      className={`flex justify-between w-full p-3 border border-bg[#4F5665] rounded-md cursor-pointer tracking-wider ${
                        isCategory ? "border-primary" : ""
                      }`}
                      onClick={() => setIsCategory((state) => !state)}
                    >
                      <p className="text-xs">{category.name}</p>
                      <div>
                        <img
                          src={getImageUrl("down", "svg")}
                          alt="down"
                          className="w-4"
                        />
                      </div>
                    </div>
                    {isCategory && (
                      <div className="flex flex-col w-fullbg-[#FCFDFE] border border-bg[#4F5665] rounded-md">
                        {categories.map((result, i) => (
                          <div
                            className="hover:bg-primary hover:text-dark hover:rounded-md p-3 cursor-pointer"
                            onClick={() => {
                              setCategory({
                                name: result.categories_name,
                                id: result.categories_id,
                              });
                              setIsCategory((state) => !state);
                            }}
                            key={i}
                          >
                            {result.categories_name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <label
                      htmlFor="products_stock"
                      className="font-semibold text-dark"
                    >
                      Stock
                    </label>
                    <input
                      type="number"
                      id="products_stock"
                      name="products_stock"
                      className="text-xs text-secondary border border-[#DEDEDE] p-3 rounded-lg tracking-wide placeholder:text-xs placeholder:text-secondary placeholder:tracking-wide outline-none focus:border focus:border-primary"
                      placeholder="Enter Product Stock"
                    />
                  </div>
                  <button
                    type="submit"
                    className="p-3 bg-primary hover:bg-amber-600 rounded-md text-dark text-sm font-medium active:ring active:ring-orange-300"
                  >
                    Save Product
                  </button>
                </form>
              </section>
            </section>
          </div>
        </div>
      )}
      {formUpdateProduct && (
        <div className="font-plusJakartaSans fixed top-0 left-0 right-0 bg-black bg-opacity-50 h-full">
          <div className="bg-light w-full flex flex-col gap-y-6 p-7 md:w-[60%] lg:w-[50%] xl:w-[35%] absolute right-0 top-0 h-screen overflow-y-scroll">
            <header className="flex justify-between items-center">
              <p className="text-2xl font-medium text-[#0B0909]">
                Edit Product
              </p>
              <button
                type="button"
                className="outline-none"
                onClick={() => {
                  setImage("");
                  setFormUpdateProduct(false);
                  setSearchParams((prev) => ({
                    ...prev,
                  }));
                }}
              >
                <img
                  src={getImageUrl("XCircle", "svg")}
                  alt="XCircle"
                  className="w-6 h-6"
                />
              </button>
            </header>
            <section>
              <section className="text-sm">
                <form
                  className="flex flex-col gap-y-6"
                  encType="multipart/form-data"
                  onSubmit={OnUpdateHandler}
                >
                  <div className="flex flex-col gap-y-2">
                    <label htmlFor="image" className="text-dark font-semibold">
                      Photo Product
                    </label>
                    {image ? (
                      <div className="self-baseline rounded-md">
                        <img
                          src={URL.createObjectURL(image)}
                          alt="image"
                          className="w-14 rounded-md"
                        />
                      </div>
                    ) : (
                      <div className="self-baseline rounded-md">
                        <img
                          src={productById.products_image}
                          alt="image"
                          className="w-14 rounded-md"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      name="products_image"
                      id="products-image"
                      className="hidden"
                      onChange={changeImageHandler}
                    />
                    <label
                      type="button"
                      className="py-2 px-5 bg-primary self-baseline rounded-md text-xs font-medium hover:bg-amber-600 active:ring active:ring-orange-300 cursor-pointer"
                      htmlFor="products-image"
                    >
                      Upload
                    </label>
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <label
                      htmlFor="products_name"
                      className="font-semibold text-dark"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="products_name"
                      name="products_name"
                      className="text-xs text-secondary border border-[#DEDEDE] p-3 rounded-lg tracking-wide placeholder:text-xs placeholder:text-secondary placeholder:tracking-wide outline-none focus:border focus:border-primary"
                      placeholder="Enter Product Name"
                      value={productById.products_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <label
                      htmlFor="products_price"
                      className="font-semibold text-dark"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      id="products_price"
                      name="products_price"
                      className="text-xs text-secondary border border-[#DEDEDE] p-3 rounded-lg tracking-wide placeholder:text-xs placeholder:text-secondary placeholder:tracking-wide outline-none focus:border focus:border-primary"
                      placeholder="Enter Product Price"
                      value={productById.products_price}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <label
                      htmlFor="products_desc"
                      className="font-semibold text-dark"
                    >
                      Description
                    </label>
                    <textarea
                      type="number"
                      rows="6"
                      id="products_desc"
                      name="products_desc"
                      className="text-xs text-secondary border border-[#DEDEDE] p-3 rounded-lg tracking-wide placeholder:text-xs placeholder:text-secondary placeholder:tracking-wide outline-none focus:border focus:border-primary"
                      placeholder="Enter Product Description"
                      value={productById.products_desc}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="flex flex-col gap-y-4 text-xs text-secondary">
                    <p className="font-semibold text-dark">Category</p>
                    <div
                      className={`flex justify-between w-full p-3 border border-bg[#4F5665] rounded-md cursor-pointer tracking-wider ${
                        isCategory ? "border-primary" : ""
                      }`}
                      onClick={() => setIsCategory((state) => !state)}
                    >
                      <p>{category.name}</p>
                      <div>
                        <img
                          src={getImageUrl("down", "svg")}
                          alt="down"
                          className="w-4"
                        />
                      </div>
                    </div>
                    {isCategory && (
                      <div className="flex flex-col w-full bg-[#FCFDFE] border border-bg[#4F5665] rounded-md">
                        {categories.map((result, i) => (
                          <div
                            className="hover:bg-primary hover:text-dark hover:rounded-md p-3 cursor-pointer"
                            onClick={() => {
                              setCategory({
                                name: result.categories_name,
                                id: result.categories_id,
                              });
                              setIsCategory((state) => !state);
                            }}
                            key={i}
                          >
                            {result.categories_name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <label
                      htmlFor="products_stock"
                      className="font-semibold text-dark"
                    >
                      Stock
                    </label>
                    <input
                      type="number"
                      id="products_stock"
                      name="products_stock"
                      className="text-xs text-secondary border border-[#DEDEDE] p-3 rounded-lg tracking-wide placeholder:text-xs placeholder:text-secondary placeholder:tracking-wide outline-none focus:border focus:border-primary"
                      placeholder="Enter Product Stock"
                      value={productById.products_stock}
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="p-3 bg-primary hover:bg-amber-600 rounded-md text-dark text-sm font-medium active:ring active:ring-orange-300"
                  >
                    Edit Product
                  </button>
                </form>
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
