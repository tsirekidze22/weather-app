"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";

import "../styles/main.scss";
import WeatherInfo from "./components/WeatherInfo";

export default function Home() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [locationError, setLocationError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchData = async (cityName: string) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.API_KEY}`
      );

      const { lat, lon } = response.data[0];

      setCity(response.data[0].name);
      setCountry(response.data[0].country);

      try {
        if (lat && lon) {
          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
          );
          const weatherInfo = weatherResponse;
          setWeatherData(weatherInfo.data);
        }
        setLocationError("");
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    } catch (error) {
      setLocationError(`Error - fetching location data for ${cityName}`);
    }
  };

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY}`
              );
              setCity(response.data.name);
              setCountry(response.data.sys.country);
              setWeatherData(response.data);
              fetchData(response.data.name);
              setLocationError("");
            },
            (error) => {
              setLocationError(
                "On our magnificent Earth, the weather dances like an ever-changing symphony of elements. It paints the skies with hues of temperature, sprinkles the land with raindrops, and whispers secrets through gentle breezes. It's a masterpiece of nature's artistry. - ChatGPT"
              );
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getCurrentLocation();
  }, []);

  const handleClick = () => {
    if (inputRef.current) {
      const city = inputRef.current?.value.trim();
      fetchData(city);
      inputRef.current.value = "";
    }
  };
  return (
    <main>
      <div className="d-flex">
        <div className="search-section py-5">
          <div className="background"></div>
          <header className="d-flex justify-content-between">
            <h3 className="logo">Forecast</h3>
            <div className="location-info">
              <h5>Current Location</h5>
              {city !== "" ? (
                <h4>
                  {city}, {country}
                </h4>
              ) : (
                <h4>Earth, Milky Way</h4>
              )}
            </div>
          </header>

          <div className="search-main d-flex flex-column justify-content-center align-items-center">
            <h2 className="mb-0">The Only Weather Forecast You Need</h2>
            <div className="divider my-4" />
            <div className="input-wrapper">
              <input
                ref={inputRef}
                type="text"
                placeholder="Enter location"
                className="location-input"
              />
              <Image
                src="/assets/icons/search.svg"
                width={20}
                height={20}
                alt="search location"
                className="search-icon"
                onClick={handleClick}
              />
            </div>
          </div>
        </div>
        {weatherData && (
          <WeatherInfo
            weatherData={weatherData}
            locationError={locationError}
          />
        )}
      </div>
    </main>
  );
}
