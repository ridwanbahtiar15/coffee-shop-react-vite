import getImageUrl from "../../utils/imageGetter";

/*  eslint-disable-next-line react/prop-types */
function Modal({ closeModal, message: { msg, isError } }) {
  return (
    <div
      className={`bg-gray-200 justify-center items-center h-screen opacity-100 absolute`}
      id="logoutModal"
    >
      <div className="fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center px-[10px] md:px-0">
        <div className="bg-white rounded shadow-md p-6 w-full flex justify-center items-center flex-col gap-y-8 md:w-[55%] lg:w-[35%]">
          <div className="flex items-center gap-x-4">
            {isError ? (
              <img
                src={getImageUrl("x-circle", "svg")}
                alt="x-circle"
                className="w-6 h-6"
              />
            ) : (
              <img
                src={getImageUrl("success", "svg")}
                alt="success"
                className="w-6 h-6"
              />
            )}

            <h1 className="text-xl font-medium text-dark">{msg}</h1>
          </div>
          {msg != "Are you sure?" ? (
            <div className="flex gap-x-6">
              <button
                className="p-[10px] px-4 bg-light border-2 hover:bg-slate-200 rounded-md text-dark text-base font-medium active:ring active:ring-slate-300"
                onClick={() => closeModal(false)}
              >
                OK
              </button>
            </div>
          ) : (
            <div className="flex gap-x-6">
              <button className="p-[10px] bg-primary hover:bg-amber-600 rounded-md text-dark text-base font-medium active:ring active:ring-orange-300">
                Confirm
              </button>
              <button
                className="p-[10px] bg-light border-2 hover:bg-slate-200 rounded-md text-dark text-base font-medium active:ring active:ring-slate-300"
                onClick={() => closeModal(false)}
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
