import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "../../style/style.css";
import getImageUrl from "../../utils/imageGetter";
// import Modal from "../../components/modal/Modal";
import { userAction } from "../../redux/slice/user";

function Login() {
  useEffect(() => {
    document.title = "Login";
  });

  const user = useSelector((state) => state.user);
  const disPatch = useDispatch();

  const [isPassShown, setIsPassShown] = useState(false);
  const showPassHandler = () => {
    setIsPassShown((state) => !state);
  };

  const navigate = useNavigate();

  const SubmitHandler = async (e) => {
    e.preventDefault();

    const body = {
      users_email: e.target.email.value,
      users_password: e.target.password.value,
    };
    const { loginThunk } = userAction;
    disPatch(loginThunk(body)).then((res) => {
      if (res.type == "user/login/fulfilled") {
        if (res.payload.userInfo.roles_id == "1") return navigate("/dashboard");
        if (res.payload.userInfo.roles_id == "2") return navigate("/");
      }
    });
  };

  return (
    <>
      <main className="flex gap-[70px] lg:items-center">
        <aside className="hidden lg:block lg:w-2/5 xl:w-1/3">
          <img
            src={getImageUrl("coffee-2", "webp")}
            alt="hero"
            className="w-full h-full"
          />
        </aside>
        <section className="font-plusJakartaSans w-full h-full py-12 px-5 flex flex-col justify-center gap-y-5 lg:w-3/5 xl:w-2/3 md:py-20 md:px-24 lg:p-0 lg:pr-[130px]">
          <img
            src={getImageUrl("coffee-shop", "webp")}
            alt="logo"
            className="w-32 h-8"
          />
          <header>
            <h1 className="text-lg font-semibold mb-5 md:text-2xl">Login</h1>
            <span className="text-sm md:text-base font-normal">
              Fill out the form correctly
            </span>
          </header>
          <form className="flex flex-col gap-y-5" onSubmit={SubmitHandler}>
            <div className="flex flex-col gap-y-3 relative">
              <label
                htmlFor="email"
                className="text-sm md:text-base font-semibold text-[#0B132A] lg:text-base"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                className={`py-3.5 px-10 border rounded-lg border-[#DEDEDE] text-xs tracking-wide outline-none focus:border-primary${
                  user.err.login ? " border-red-500" : ""
                }`}
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
                htmlFor="password"
                className="text-sm md:text-base font-semibold text-[#0B132A] lg:text-base"
              >
                Password
              </label>
              <input
                type={isPassShown ? "text" : "password"}
                id="password"
                placeholder="Enter Your Password"
                className={`py-3.5 px-10 border rounded-lg border-[#DEDEDE] text-xs tracking-wide outline-none focus:border-primary${
                  user.err.login ? " border-red-500" : ""
                }`}
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
            {user.err.login && (
              <p className="text-sm md:text-base font-medium text-red-500 text-center">
                {user.err.login.message}
              </p>
            )}
            <Link
              to="/forgot-password"
              className="text-sm md:text-base font-medium self-end underline"
            >
              Lupa Password?
            </Link>
            <button
              type="submit"
              className="text-base font-medium text-[#0B132A] bg-primary p-2.5 rounded-md hover:bg-amber-600 active:ring active:ring-orange-300"
            >
              Login
            </button>
          </form>
          <div className="text-center text-sm md:text-base">
            <span>
              No Have An Account?
              <span>
                <Link to="/register" className="font-medium underline">
                  Register
                </Link>
              </span>
            </span>
          </div>
          <div className="flex justify-between items-center">
            <hr className="w-1/3" />
            <span className="1/3">Or</span>
            <hr className="w-1/3" />
          </div>
          <div className="flex justify-center gap-4 text-lg font-normal font-plusJakartaSans text-[#4F5665]">
            <a
              href="#"
              className="p-5 bg-[#FFF] hover:bg-[#ebebeb] rounded drop-shadow-md md:flex md:gap-x-4 md:items-center md:w-full md:justify-center"
            >
              <div>
                <img
                  src={getImageUrl("facebook-circle", "svg")}
                  alt="facebook-icon"
                  className="w-full h-full"
                />
              </div>
              <span className="hidden md:block">Facebook</span>
            </a>
            <a
              href="#"
              className="p-5 bg-[#FFF] hover:bg-[#ebebeb] rounded drop-shadow-md md:flex md:gap-x-4 md:items-center md:w-full md:justify-center"
            >
              <div>
                <img
                  src={getImageUrl("google-circle", "svg")}
                  alt="google-icon"
                  className="w-full h-full"
                />
              </div>
              <span className="hidden md:block">Google</span>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
