import { useState } from "react";
import getImageUrl from "../../utils/imageGetter";

function Modal({ closeModal, errorMsg }) {
  return (
    <div
      className={`bg-gray-200 justify-center items-center h-screen opacity-100 absolute`}
      id="logoutModal"
    >
      <div className="fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center px-[10px] md:px-0">
        <div className="bg-white rounded shadow-md p-6 w-full flex justify-center items-center flex-col gap-y-8 md:w-[55%] lg:w-[35%]">
          <div className="flex items-center gap-x-4">
            <img src={getImageUrl("x-circle", "svg")} alt="x-circle" />

            <h1 className="text-xl font-medium text-dark">{errorMsg}</h1>
          </div>
          <div className="flex gap-x-6">
            <button
              className="p-[10px] px-4 bg-light border-2 hover:bg-slate-200 rounded-md text-dark text-base font-medium active:ring active:ring-slate-300"
              onClick={() => closeModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
