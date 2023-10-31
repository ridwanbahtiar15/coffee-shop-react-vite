/* eslint-disable no-unused-vars */
import { useNavigate, Link } from "react-router-dom";
import { userAction } from "../../redux/slice/user";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Modal({
  /*  eslint-disable-next-line react/prop-types */
  modal: { isOpen, status },
  /*  eslint-disable-next-line react/prop-types */
  closeModal,
  /*  eslint-disable-next-line react/prop-types */
  message: { msg },
}) {
  const navigate = useNavigate();
  const disPatch = useDispatch();

  // const user = useSelector((state) => state.user);
  // const token = user.token;
  // const url = import.meta.env.VITE_BACKEND_HOST;
  // const authAxios = axios.create({
  //   baseURL: url,
  //   headers: {
  //     Authorization: `Barer ${token}`,
  //   },
  // });
  const user = useSelector((state) => state.user);
  const token = user.token;

  const LogoutHandler = () => {
    console.log("ok");
    const { logoutThunk } = userAction;
    disPatch(logoutThunk(token)).then(() => navigate("/login"));

    // authAxios.delete("/auth/logout");
  };

  return (
    <div
      className="bg-gray-200 justify-center items-center h-screen opacity-100 absolute z-10"
      id="logoutModal"
    >
      <div className="fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center px-[10px] md:px-0">
        <div className="bg-white rounded shadow-md p-6 w-full flex justify-center items-center flex-col gap-y-8 md:w-[55%] lg:w-[35%]">
          <div className="flex items-start gap-x-4">
            <h1 className="text-xl font-medium text-dark text-center">{msg}</h1>
          </div>
          {status != "logout" ? (
            <div className="flex gap-x-6">
              <button
                className="p-[10px] px-4 bg-light border-2 hover:bg-slate-200 rounded-md text-dark text-base font-medium active:ring active:ring-slate-300"
                onClick={() => {
                  switch (status) {
                    case "checkout":
                      closeModal({ isOpen: false, status: null });
                      navigate("/history-order");
                      break;
                    case "register":
                      closeModal({ isOpen: false, status: null });
                      navigate("/login");
                      break;
                    case "401":
                      closeModal({ isOpen: false, status: null });
                      navigate("/login");
                      break;
                    default:
                      closeModal({ isOpen: false, status: null });
                      break;
                  }
                }}
              >
                OK
              </button>
            </div>
          ) : (
            <div className="flex gap-x-6">
              <button
                type="button"
                className="p-[10px] bg-primary hover:bg-amber-600 rounded-md text-dark text-base font-medium active:ring active:ring-orange-300"
                onClick={LogoutHandler}
              >
                Confirm
              </button>
              <button
                className="p-[10px] bg-light border-2 hover:bg-slate-200 rounded-md text-dark text-base font-medium active:ring active:ring-slate-300"
                onClick={() => closeModal({ isOpen: false, status: null })}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
