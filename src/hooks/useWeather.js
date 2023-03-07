import { useState } from "react";
import { useQuery } from "react-query";

const API_KEY = "ecfe46ecfbe0861e24ecda0e217e2e8e";

const useWeather = () => {
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
      onError: () => {
        setIsError(true);
      },
    }
  );

  const getWeather = (city) => {
    setCity(city);
    refetch();
  };

  return { data, isLoading, isError, getWeather };
};

export default useWeather;
