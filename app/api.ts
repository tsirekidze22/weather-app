import axios from "axios";

interface WeatherData {
  [key: string]: any; // Define the type for weatherData as any for flexibility
}

interface FetchDataResponse {
  city: string;
  country: string;
  weatherData: WeatherData;
  locationError: string;
}

export const fetchData = (cityName: string): Promise<FetchDataResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.API_KEY}`
      )
      .then((response) => {
        const { lat, lon } = response.data[0];
        const city = response.data[0].name;
        const country = response.data[0].country;

        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
          )
          .then((weatherResponse) => {
            const weatherInfo = weatherResponse.data;
            resolve({
              city,
              country,
              weatherData: weatherInfo,
              locationError: "",
            });
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
            reject(error);
          });
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
        resolve({
          city: "",
          country: "",
          weatherData: {},
          locationError: `Error - Could not fetching location data for ${cityName}`,
        });
      });
  });
};
