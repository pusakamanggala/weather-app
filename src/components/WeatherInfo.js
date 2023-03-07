import React, { useState } from "react";
import icon from "./clear.gif";
import { useQuery } from "react-query";

const API_KEY = "ecfe46ecfbe0861e24ecda0e217e2e8e";

const Weather = () => {
  const [city, setCity] = useState("");
  const [isError, setIsError] = useState(false);

  const { data, isLoading, refetch } = useQuery(
    ["weather", city],
    async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Unable to fetch data.");
      }
      const data = await response.json();
      setIsError(false);
      return data;
    },
    {
      enabled: false,
      retry: 1,
      onError: () => {
        setIsError(true);
      },
    }
  );

  const getWeather = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleUserInput = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className=" border rounded-2xl bg-white flex-row p-5 justify-center">
      <form onSubmit={getWeather} className="w-80 flex justify-between">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-map-pin"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="12" cy="11" r="3" />
          <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
        </svg>
        <input
          className="text-mainColor font-semibold text-xl w-60 focus:outline-none outline-none placeholder:font-normal placeholder:normal-case uppercase "
          type="text"
          value={city}
          placeholder="Where are you ? "
          onChange={handleUserInput}
          required
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-search"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#2c3e50"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
          </svg>
        </button>
      </form>
      {}
      {isLoading && <p className="text-red-500">Loading...</p>}
      {isError && <p className="text-red-500">Location unavailable</p>}
      {data && (
        <div>
          <img className="w-20 h-20 mx-auto" src={icon} alt="My GIF Image" />
          <h className="text-mainColor">{data.main.temp}°C</h>
          <h className="text-mainColor">{data.weather[0].description}</h>
          <h className="text-mainColor">{data.main.humidity}</h>
          <h className="text-mainColor">{data.wind.speed}</h>
        </div>
      )}
    </div>
  );
};

export default Weather;
