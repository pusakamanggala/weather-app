import React, { useState } from "react";
import Modal from "./Modal";

const About = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="absolute bottom-0 right-0 m-5">
      <button onClick={openModal} title="About this app">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      </button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h1>Weather App</h1>
        <div className="m-5">
          <p>
            Created by{" "}
            <a
              className="text-blue-800"
              href="https://pusakamanggala.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              Pusaka Manggala
            </a>
          </p>
          <p>Bandung, Indonesia 2023</p>
        </div>

        <a
          className="text-blue-800"
          href="https://github.com/pusakamanggala/weather-app.git"
          target="_blank"
          rel="noreferrer"
        >
          Repository
        </a>
      </Modal>
    </div>
  );
};

export default About;
