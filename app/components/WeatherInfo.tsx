import React from "react";
import Image from "next/image";
import "../../styles/main.scss";

type Props = {
  weatherData: any;
  locationError: string;
};

const WeatherInfo: React.FC<Props> = ({ weatherData, locationError }) => {
  const visibility =
    (weatherData as { visibility: number }).visibility > 1000
      ? `${(weatherData as { visibility: number }).visibility / 1000} km`
      : `${(weatherData as { visibility: number }).visibility} m`;
  const feelsLike = Math.floor(weatherData.main?.feels_like - 273.15);
  const humidity = weatherData.main?.humidity;
  const temInCelsius = Math.floor(weatherData.main?.temp - 273.15);
  const wind = Math.floor(weatherData.wind?.speed * 3.6);
  const weather = weatherData.weather?.length ? weatherData.weather[0] : "";
  const today = new Date();
  const formattedDate = today.toDateString();

  return (
    <div className="info-section p-5">
      <h1 className="info-title mt-4">Today</h1>
      {Object.keys(weatherData).length !== 0 && (
        <div className="weather-info-card px-4 py-5 d-flex mt-5">
          <div className="weather-info">
            <h2 className="temperature">{temInCelsius}°</h2>
            <div className="d-flex">
              <div>
                <h2 className="weather-title mb-0">{weather.main}</h2>
                <p className="weather-desc">{weather.description}</p>
              </div>
              <Image
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                width={60}
                height={60}
                alt="img"
              />
            </div>
            <h6 className="date">{formattedDate}</h6>
          </div>
          <div className="divider mx-4" />
          <div className="weather-details">
            <h4 className="detail">Real Feel: {feelsLike}°</h4>
            <h4 className="detail">Humidity: {humidity}%</h4>
            <h4 className="detail">Wind Speed: {wind}km/h</h4>
            <h4 className="detail">Visibility: {visibility}</h4>
          </div>
        </div>
      )}
      {locationError && (
        <div className="mt-5 error-message">{locationError}</div>
      )}
    </div>
  );
};

export default WeatherInfo;
