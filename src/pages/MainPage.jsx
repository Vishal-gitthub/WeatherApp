// MainPage.js
import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import DayImg from "../Images/DayTime.svg";
import NightImg from "../Images/NightTime.svg";
import { Routes, Route } from "react-router-dom";
import TodayWeather from "../pages/TodayWeather";
import TomorrowWeather from "../pages/TommorowWeather";
import { weathercontext } from "../context/Context";
import { gsap } from "gsap";

const MainPage = () => {
  const [weatherData, setWeatherData] = useState();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dayTime, setDayTime] = useState("");
  const { setData } = useContext(weathercontext);
  const imgRef = useRef(null);
  const leftSecRef = useRef(null);

  useEffect(() => {
    gsap.from(imgRef.current, {
      x: "-100%",
      duration: 1,
      ease: "power3.inOut",
    });
    gsap.from(leftSecRef.current, {
      x: "-100%",
      duration: 1,
      ease: "power3.inOut",
    });
  }, []);
  useEffect(() => {
    const MonthsName = [
      "jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dateGet = new Date();
    const day = dateGet.getDate();
    const month = MonthsName[dateGet.getMonth()];
    const year = dateGet.getFullYear();
    setDate(`${day} - ${month} - ${year}`);
  }, []);
  useEffect(() => {
    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const updateTime = () => {
      const Time = new Date();
      const WeekDay = weekDays[Time.getDay()]; //this will return weekDays names starting from Sunday
      const hours = Time.getHours();
      const minutes = Time.getMinutes();
      const seconds = Time.getSeconds();
      setTime(`${WeekDay} | ${hours}:${minutes}:${seconds}`);
      if (hours >= 6 && hours < 12) {
        setDayTime("Morning");
      } else if (hours >= 12 && hours <= 16) {
        setDayTime("Afternoon");
      } else if (hours >= 16 && hours <= 19) {
        setDayTime("Evening");
      } else {
        setDayTime("Night");
      }
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const ApiKey = "s8AG5WhnZngHdTkG8DQDVSgZar4ICATF";
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
        // console.log(WeatherRes);
        setWeatherData(WeatherRes);
        setData(WeatherRes);
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

  return (
    <div className="w-full h-screen sm:flex-row flex-col items-center flex bg-cover">
      {/* left Section  */}
      <div className="sm:w-2/5 w-full  text-center bg-white">
        <h1 className="text-4xl">TODAY WEATHER</h1>

        <div className="text-center mt-9" ref={leftSecRef}>
          <div className="flex items-center justify-center">
            <img
              ref={imgRef}
              className="w-52 h-52 "
              src={dayTime === "Night" ? NightImg : DayImg}
              alt=""
            />
          </div>
          <div>
            <div className="text-6xl my-6">
              <span className="text-xs text-gray-600 font-light">temp</span>
              {weatherData &&
                weatherData.DailyForecasts[0].Temperature.Maximum.Value.toFixed(
                  0
                )}
              ºC
              <div className="text-2xl font-bold">
                <span className="text-xs text-gray-600 font-light">sky</span>
                {weatherData && weatherData.DailyForecasts[0].Day.IconPhrase}
                <br />
                <span className="text-sm font-medium ml-2">
                  {weatherData && weatherData.DailyForecasts[0].Day.LongPhrase}
                </span>
              </div>
            </div>
            <hr />
            <div className="text-xl">{date}</div>
            <div className="text-xl">{time}</div>
            <div className="text-xl">{dayTime}</div>{" "}
          </div>
        </div>
      </div>
      {/* right section  */}
      <div className="sm:w-3/5 w-full sm:auto h-screen  bg-slate-300">
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<TodayWeather />} />
            <Route path="/tomorrow" element={<TomorrowWeather />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
