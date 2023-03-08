import React, { useState } from "react";
import clearIcon from "../icons/clear.gif";
import rainIcon from "../icons/rain.gif";
import snowIcon from "../icons/snow.gif";
import hazeIcon from "../icons/haze.gif";
import cloudIcon from "../icons/cloud.gif";
import mistIcon from "../icons/mist.gif";
import { useQuery } from "react-query";
import { useSpring, animated } from "react-spring";

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

  //animations
  const contentProps = useSpring({
    from: { scale: 1 },
    to: { scale: data ? 1.1 : 1 },
    config: { duration: 1000 },
  });

  const handleIcon = (weather) => {
    switch (weather) {
      case "Clear":
        return clearIcon;

      case "Rain":
        return rainIcon;

      case "Snow":
        return snowIcon;

      case "Clouds":
        return cloudIcon;

      case "Haze":
        return hazeIcon;

      case "Mist":
        return mistIcon;

      default:
        return "";
    }
  };

  return (
    <div className=" border rounded-2xl bg-white flex-row p-8 justify-center">
      <form onSubmit={getWeather} className="w-72 flex justify-between">
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
          className="text-mainColor font-semibold text-xl w-52 focus:outline-none outline-none placeholder:font-normal placeholder:normal-case uppercase "
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
      {isLoading && <p className="text-black">Loading...</p>}
      {isError && <p className="text-red-500">Location unavailable</p>}
      {data && (
        <div className="h-auto">
          <img
            type="image"
            alt="weather icon"
            className="w-32 h-w-32 mx-auto mt-2"
            src={handleIcon(data.weather[0].main)}
          />
          <animated.div style={contentProps} className="flex flex-col">
            <h className="text-mainColor text-3xl font-bold">
              {Math.round(data.main.temp)}
              <span className="text-base text-start align-top">°C</span>
            </h>
            <h className="text-mainColor capitalize font-semibold my-5">
              {data.weather[0].description}
            </h>
            <div className="flex justify-between mt-14 px-6 ">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-ripple animate-pulse"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 7c3 -2 6 -2 9 0s6 2 9 0" />
                  <path d="M3 17c3 -2 6 -2 9 0s6 2 9 0" />
                  <path d="M3 12c3 -2 6 -2 9 0s6 2 9 0" />
                </svg>
                <div>
                  <h1 className="text-mainColor text-start font-bold">
                    {data.main.humidity}%
                  </h1>
                  <h1 className="text-mainColor font-semibold text-sm">
                    Humidity
                  </h1>
                </div>
              </div>
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-windmill"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style={{ animation: "spin 3s linear infinite" }}
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12c2.76 0 5 -2.01 5 -4.5s-2.24 -4.5 -5 -4.5v9z" />
                  <path d="M12 12c0 2.76 2.01 5 4.5 5s4.5 -2.24 4.5 -5h-9z" />
                  <path d="M12 12c-2.76 0 -5 2.01 -5 4.5s2.24 4.5 5 4.5v-9z" />
                  <path d="M12 12c0 -2.76 -2.01 -5 -4.5 -5s-4.5 2.24 -4.5 5h9z" />
                </svg>
                <div>
                  <h1 className="text-mainColor text-start font-bold">
                    {data.wind.speed} Km/h
                  </h1>
                  <h1 className="text-mainColor font-semibold text-sm">
                    Wind Speed
                  </h1>
                </div>
              </div>
            </div>
          </animated.div>
        </div>
      )}
    </div>
  );
};

export default Weather;
