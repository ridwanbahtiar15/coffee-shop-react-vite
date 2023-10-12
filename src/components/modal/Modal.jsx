import React from "react";

function Modal(props) {
  return (
    <div
      className={`bg-gray-200 justify-center items-center h-screen opacity-100 duration-200 transition-opacity absolute ${props.isHidden}`}
      id="logoutModal"
    >
      <div className="fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center px-[10px] md:px-0">
        <div className="bg-white rounded shadow-md p-8 w-full flex justify-center items-center flex-col gap-y-8 md:w-[50%] lg:w-[30%]">
          <h1 className="text-xl font-medium text-dark">Are you sure?</h1>
          <div className="flex gap-x-6">
            <button className="p-[10px] bg-primary hover:bg-amber-600 rounded-md text-dark text-base font-medium active:ring active:ring-orange-300">
              Confirm
            </button>
            <button className="p-[10px] bg-light border-2 hover:bg-slate-200 rounded-md text-dark text-base font-medium active:ring active:ring-slate-300">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
