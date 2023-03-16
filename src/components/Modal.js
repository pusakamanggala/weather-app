import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const [modalClasses, setModalClasses] = useState(
    "fixed inset-0 z-10 overflow-y-auto hidden"
  );

  useEffect(() => {
    // Add or remove the "hidden" class based on the isOpen prop
    if (isOpen) {
      setModalClasses("fixed inset-0 z-10 overflow-y-auto");
    } else {
      setModalClasses("fixed inset-0 z-10 overflow-y-auto hidden");
    }
  }, [isOpen]);

  return (
    <div className={modalClasses}>
      <div className="flex items-center justify-center min-h-screen text-black">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-96 relative">
          {children}
          <button
            className="absolute top-0 right-0 m-3"
            onClick={onClose}
            title="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
