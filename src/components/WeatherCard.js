import React, { useState } from "react";
import clearIcon from "../icons/clearDay.json";
import rainIcon from "../icons/rainDay.json";
import snowIcon from "../icons/snowDay.json";
import hazeIcon from "../icons/hazeDay.json";
import cloudIcon from "../icons/cloudDay.json";
import mistIcon from "../icons/mist.json";
import clearNight from "../icons/clearNight.json";
import rainNight from "../icons/rainNight.json";
import snowNight from "../icons/snowNight.json";
import cloudNight from "../icons/cloudNight.json";
import { useSpring, animated } from "react-spring";
import { useWeather } from "../hooks/useWeather";

import Lottie from "lottie-react";

const Weather = () => {
  const [city, setCity] = useState("");
  const { data, isLoading, refetch, isError } = useWeather(city);

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

  function isDaytime(data) {
    const dt = data.dt;
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    const currentTimestamp = new Date(dt * 1000);
    const sunriseTimestamp = new Date(sunrise * 1000);
    const sunsetTimestamp = new Date(sunset * 1000);
    return (
      currentTimestamp > sunriseTimestamp && currentTimestamp < sunsetTimestamp
    );
  }

  const handleIcon = (weather) => {
    switch (weather) {
      case "Clear":
        return isDaytime(data) ? clearIcon : clearNight;

      case "Rain":
        return isDaytime(data) ? rainIcon : rainNight;

      case "Snow":
        return isDaytime(data) ? snowIcon : snowNight;

      case "Clouds":
        return isDaytime(data) ? cloudIcon : cloudNight;

      case "Haze":
        return isDaytime(data) ? hazeIcon : mistIcon;

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
          className="icon icon-tabler icon-tabler-map-pin"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#2c3e50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
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
        <button type="submit" title="Find">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-search"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#2c3e50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
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
          <Lottie
            className="w-32 h-w-32 mx-auto mt-2"
            animationData={handleIcon(data.weather[0].main)}
          />
          <animated.div style={contentProps} className="flex flex-col">
            <h1 className="text-mainColor text-3xl font-bold">
              {Math.round(data.main.temp)}
              <span className="text-base text-start align-top absolute">
                °C
              </span>
            </h1>
            <h1 className="text-mainColor capitalize font-semibold my-5">
              {data.weather[0].description}
            </h1>
            <div className="flex justify-between mt-14 px-6 ">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-ripple animate-pulse"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                  className="icon icon-tabler icon-tabler-windmill animate-spin"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
