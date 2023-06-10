import React from "react";
import Image from "next/image";
import "../../styles/main.scss";

type Props = {
  weatherData: any;
};

const weather = [{ description: "hjsdbhsdcb", name: "gsdvc" }];
const WeatherInfo: React.FC<Props> = ({ weatherData }) => {
  const visibility =
    (weatherData as { visibility: number }).visibility > 1000
      ? `${(weatherData as { visibility: number }).visibility / 1000} km`
      : `${(weatherData as { visibility: number }).visibility} m`;
  const feelsLike = weatherData.main?.feels_like;
  const humidity = weatherData.main?.humidity;
  const temInCelsius = Math.floor(weatherData.main?.temp - 273.15);
  const wind = weatherData.wind;
  const weather = weatherData.weather?.length ? weatherData.weather[0] : "";
  const today = new Date();
  const formattedDate = today.toDateString();

  //  const { main } = weatherData;
  console.log(weatherData.main);
  console.log("wind", wind);
  {
    console.log("weather", weather);
  }
  return (
    <div className="info-section p-5">
      <h1 className="info-title mt-4">Today</h1>

      <div className="weather-info-card px-4 py-3 d-flex mt-5">
        <div className="weather-info">
          <h2 className="temperature">{temInCelsius}°</h2>
          <div className="d-flex">
            <h2 className="weather-title">{weather.main}</h2>
            <Image
              src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              width={60}
              height={60}
              alt="img"
            />
          </div>
          <h6 className="date">{formattedDate}</h6>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
