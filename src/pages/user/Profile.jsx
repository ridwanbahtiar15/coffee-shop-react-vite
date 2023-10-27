import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import getImageUrl from "../../utils/imageGetter";
import Navbar from "../../components/Navbar";
import DropdownMobile from "../../components/DropdownMobile";
import Modal from "../../components/modal/Modal";
import Footer from "../../components/Footer";

function Profile() {
  useEffect(() => {
    document.title = "Profile";
  });

  const [Message, setMessage] = useState({ msg: null, isError: null });
  const [openModal, setOpenModal] = useState(false);
  const [isDropdownShown, setIsDropdownShow] = useState(false);

  const [isPassShown, setIsPassShown] = useState(false);
  const showPassHandler = () => {
    setIsPassShown((state) => !state);
  };

  const userInfo = useSelector((state) => state.user);
  const token = userInfo.token;
  const url = import.meta.env.VITE_BACKEND_HOST;
  const authAxios = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Barer ${token}`,
    },
  });

  const [user, setUser] = useState({
    users_fullname: "",
    users_email: "",
    users_phone: "",
    users_password: "",
    users_address: "",
    users_image: "",
  });

  useEffect(() => {
    authAxios
      .get("/users/profile")
      .then((res) => {
        setUser({
          users_fullname: res.data.result[0].users_fullname,
          users_email: res.data.result[0].users_email,
          users_phone: res.data.result[0].users_phone,
          users_password: res.data.result[0].users_password,
          users_address: res.data.result[0].users_address,
          users_image: res.data.result[0].users_image,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const dataClone = { ...user };
    dataClone[e.target.name] = e.target.value;
    setUser(dataClone);
  };

  const [image, setImage] = useState("");
  const changeImageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("users_image", image);
    formData.append("users_fullname", e.target.fullname.value);
    formData.append("users_email", e.target.email.value);
    formData.append("users_phone", e.target.phone.value);
    formData.append("users_password", e.target.password.value);
    formData.append("users_address", e.target.address.value);

    console.log(formData);

    authAxios
      .patch("/users/profile/edit", formData)
      .then((res) => {
        setMessage({
          msg: res.data.msg,
          isError: false,
        });
        setOpenModal({ isOpen: true, status: "success" });
      })
      .catch((err) => {
        setMessage({
          msg: err.response.data.msg,
          isError: true,
        });
        setOpenModal({ isOpen: true, status: "error" });
      });
  };

  return (
    <>
      <Navbar
        isClick={() => setIsDropdownShow(true)}
        imageProfile={image}
        isLogoutClick={() => {
          setOpenModal({ isOpen: true, status: "logout" });
          setMessage({ msg: "Are You Sure?" });
        }}
      />
      <header className="pt-10 pb-7 px-5 md:px-24 lg:px-[130px]">
        <h1 className="font-plusJakartaSans text-2xl font-medium text-[#0B0909] md:text-3xl xl:text-5xl">
          Profile
        </h1>
      </header>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <main className="font-plusJakartaSans px-5 md:px-24 lg:px-[130px] flex flex-col gap-y-5 lg:flex-row lg:gap-x-5">
          <section className="border border-[#E8E8E8] rounded-md py-3.5 px-12 flex flex-col gap-y-4 items-center h-full lg:w-1/3">
            <span className="text-lg font-medium text-dark lg:text-xl">
              {user.users_fullname}
            </span>
            <span className="text-sm font-normal text-secondary">
              {user.users_email}
            </span>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="user-image"
                className="w-20 h-20 rounded-full"
                name="users_image"
              />
            ) : (
              <img
                src={user.users_image}
                alt="user-image"
                className="w-20 h-20 rounded-full"
                name="users_image"
              />
            )}

            <input
              type="file"
              id="image"
              name="users_image"
              className="hidden"
              onChange={changeImageHandler}
            />
            <label
              htmlFor="image"
              className="text-sm font-medium text-dark py-3 px-6 bg-primary hover:bg-amber-600 rounded-md w-full lg:text-xs xl:text-sm active:ring active:ring-orange-300 outline-none flex justify-center items-center text-center cursor-pointer"
            >
              Upload New Image
            </label>
            <span className="text-base font-normal text-secondary lg:text-xs xl:text-sm">
              Since <span className="font-medium">20 January 2022</span>
            </span>
          </section>
          <section className="border border-[#E8E8E8] rounded-md py-4 px-2.5 md:py-6 md:px-12 lg:w-2/3">
            <div className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-3 relative">
                <label
                  htmlFor="fullname"
                  className="text-sm md:text-base font-semibold text-dark lg:text-base"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="users_fullname"
                  placeholder="Enter Your Full Name"
                  className="py-3.5 px-10 border rounded-lg border-[#DEDEDE] text-xs tracking-wide outline-none focus:border-primary"
                  value={user.users_fullname}
                  onChange={handleChange}
                />
                <div className="icon-email absolute top-[46px] left-4 md:top-[50px]">
                  <img
                    src={getImageUrl("Profile", "svg")}
                    alt="mail.svg"
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-3 relative">
                <label
                  htmlFor="email"
                  className="text-sm md:text-base font-semibold text-dark lg:text-base"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="users_email"
                  placeholder="Enter Your Email"
                  className="py-3.5 px-10 border rounded-lg border-[#DEDEDE] text-xs tracking-wide outline-none focus:border-primary"
                  value={user.users_email}
                  onChange={handleChange}
                />
                <div className="icon-email absolute top-[46px] left-4 md:top-[50px]">
                  <img
                    src={getImageUrl("mail", "svg")}
                    alt="mail.svg"
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-3 relative">
                <label
                  htmlFor="phone"
                  className="text-sm md:text-base font-semibold text-dark lg:text-base"
                >
                  Phone
                </label>
                <input
                  type="number"
                  id="phone"
                  name="users_phone"
                  placeholder="Enter Your Phone Number"
                  className="py-3.5 px-10 border rounded-lg border-[#DEDEDE] text-xs tracking-wide outline-none focus:border-primary"
                  value={user.users_phone}
                  onChange={handleChange}
                />
                <div className="absolute top-[46px] left-4 md:top-[50px]">
                  <img
                    src={getImageUrl("PhoneCall", "svg")}
                    alt="PhoneCall"
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-3 relative">
                <label
                  htmlFor="password"
                  className="text-sm md:text-base font-semibold text-[#0B132A] lg:text-base"
                >
                  Password
                </label>
                <input
                  type={isPassShown ? "text" : "password"}
                  id="password"
                  placeholder="Enter Your Password"
                  className="py-3.5 px-10 border rounded-lg border-[#DEDEDE] text-xs tracking-wide outline-none focus:border-primary"
                />
                <div className="icon-password absolute top-[46px] left-4 md:top-[50px]">
                  <img
                    src={getImageUrl("Password", "svg")}
                    alt="Password"
                    className="w-full h-full"
                  />
                </div>
                <div
                  className={`absolute top-[46px] right-4 md:top-[50px] ${
                    isPassShown ? " hidden" : "block"
                  }`}
                  id="btnHiddenPassword"
                  onClick={showPassHandler}
                >
                  <img
                    src={getImageUrl("EyeSlash", "svg")}
                    alt="EyeSlash"
                    className="w-full h-full"
                  />
                </div>
                <div
                  className={`absolute top-[45px] right-[15px] md:top-[49px] ${
                    isPassShown ? " block" : " hidden"
                  }`}
                  id="btn-show-password"
                  onClick={showPassHandler}
                >
                  <img
                    src={getImageUrl("eye", "svg")}
                    alt="eye"
                    className="w-[18px] h-[18px]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-3 relative">
                <label
                  htmlFor="address"
                  className="text-sm md:text-base font-semibold text-dark lg:text-base"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="users_address"
                  placeholder="Enter Your Address"
                  className="py-3.5 px-10 border rounded-lg border-[#DEDEDE] text-xs tracking-wide outline-none focus:border-primary"
                  value={user.users_address}
                  onChange={handleChange}
                />
                <div className="absolute top-[46px] left-4 md:top-[50px]">
                  <img
                    src={getImageUrl("Location", "svg")}
                    alt="Location"
                    className="w-full h-full"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-base font-medium text-dark bg-primary p-2.5 rounded-md hover:bg-amber-600 active:ring active:ring-orange-300"
              >
                Update
              </button>
            </div>
          </section>
        </main>
      </form>
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

export default Profile;
