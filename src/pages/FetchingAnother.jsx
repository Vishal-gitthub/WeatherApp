import React, { useEffect, useState } from "react";

const FetchingAnother = () => {
  const [weatherData, setWeatherData] = useState();
  const ApiKey = "z1zrS8DdGEG9inp49wDOtpnyf1xVltzi";
  useEffect(() => {
    const getLocationKey = async (lat, lon) => {
      try {
        const apiFetch = await fetch(
          `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${ApiKey}&q=${lat}%2C${lon}`
        );
        const apiKeyRes = await apiFetch.json();

        if (apiKeyRes && apiKeyRes.Key) {
          return apiKeyRes.Key;
        } else {
          throw new Error("location not found");
        }
      } catch (err) {
        console.error("fetching key got error", err);
      }
    };

    const getLocationData = async (locationKey) => {
      try {
        const apiFetch = await fetch(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${ApiKey}&details=true&metric=true`
        );
        const WeatherRes = await apiFetch.json();
        console.log(WeatherRes);
        setWeatherData(WeatherRes);
      } catch (err) {
        console.error("fetching data got error", err);
      }
    };
    const FetchWeather = () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const locationKey = await getLocationKey(latitude, longitude);
        if (locationKey) {
          await getLocationData(locationKey);
        }
      });
    };
    FetchWeather();
  }, []);

  return <div></div>;
};

export default FetchingAnother;
