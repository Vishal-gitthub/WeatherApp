import React, { useContext, useEffect, useState } from "react";
import { weathercontext } from "../context/Context";
import DownArrow from "../Images/DownArrow.svg";
import UpArrow from "../Images/UpArrow.svg";

const TomorrowWeather = () => {
  const { data } = useContext(weathercontext);
  const [day, setDay] = useState("");
  useEffect(() => {
    if (data && data.DailyForecasts[1].Date && data.DailyForecasts.length > 1) {
      const timeStamp = data.DailyForecasts[1].Date;
      const date = new Date(timeStamp);
      const weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayName = weekDays[date.getUTCDay()];
      setDay(dayName);
      console.log(dayName);
    }
  }, [data]);

  return (
    <div>
      <div className="flex items-center justify-around  bg-blue-400 m-5 rounded-lg">
        <h1 className="text-3xl">{day}</h1>
        <span className="text-6xl">
          {data && data.DailyForecasts[1].Temperature.Maximum.Value}ºC
        </span>
      </div>
      <div className="p-6 grid sm:grid-cols-3 grid-cols-1 gap-y-5 gap-x-2">
        <div className="w-full bg-blue-400 px-6 py-2 rounded-lg ">
          <p className="text-xl">HUMIDITY</p>
          <span className="text-2xl">
            {data && data.DailyForecasts[0].Day.RelativeHumidity.Maximum} %
          </span>
        </div>
        <div className=" w-full bg-blue-400 px-6 py-2 rounded-lg">
          <p className="text-xl">REAL FEEL</p>
          <span className="text-2xl">
            {data && data.DailyForecasts[0].RealFeelTemperature.Maximum.Value}
            <p className="text-sm font-semibold ">
              {data &&
                data.DailyForecasts[0].RealFeelTemperature.Maximum.Phrase}
            </p>
          </span>
        </div>
        <div className=" w-full bg-blue-400 px-6 py-2 rounded-lg">
          <p className="text-xl">
            {data && data.DailyForecasts[0].AirAndPollen[5].Name}
          </p>
          <p className="text-2xl">
            {data && data.DailyForecasts[0].AirAndPollen[5].Value}
            <br />
            <span className="text-sm">
              {data && data.DailyForecasts[0].AirAndPollen[5].Category}
            </span>
          </p>
        </div>
        <div className=" w-full bg-blue-400 px-6 py-2 rounded-lg">
          <p className="text-xl">Chances Of Rain</p>
          <span className="text-2xl">
            {data && data.DailyForecasts[0].Day.RainProbability} %
          </span>
        </div>
        <div className=" w-full bg-blue-400 px-6 py-2 rounded-lg">
          <p className="text-xl">Temprature History</p>

          <div className="text-xl">
            <div className="flex items-center">
              <img src={UpArrow} alt="" className="w-6 h-6" />
              {data && data.DailyForecasts[0].Temperature.Maximum.Value}
            </div>
            <div className="flex items-center ">
              <img src={DownArrow} alt="" className="w-6 h-6" />
              {data && data.DailyForecasts[0].Temperature.Minimum.Value}
            </div>
          </div>
        </div>
        <div className=" w-full bg-blue-400 px-6 py-2 rounded-lg">
          <p className="text-xl">
            {data && data.DailyForecasts[0].AirAndPollen[0].Name}
          </p>
          <span className="text-2xl">
            {data && data.DailyForecasts[0].AirAndPollen[0].Category}
          </span>
        </div>
        <div className=" w-full bg-blue-400 px-6 py-2 rounded-lg">
          <p className="text-xl">Thunder Storm</p>
          <span className="text-xl">
            {data && data.DailyForecasts[0].Day.ThunderstormProbability} %
          </span>
        </div>
        <div className=" w-full bg-blue-400 px-6 py-2 rounded-lg">
          <p className="text-xl">HEADLINE</p>
          <span className="text-l">{data && data.Headline.Category}</span>
          <p className="text-xs font-semibold tracking-wide">
            {data && data.Headline.Text}
          </p>
        </div>
        <div className=" w-full bg-blue-400 px-6 py-2 rounded-lg">
          <p className="text-xl">WIND</p>
          <span className="text-2xl">
            {data && data.DailyForecasts[1].Day.Wind.Speed.Value}
          </span>
          <p className="text-l font-semibold tracking-wide">
            {data && data.DailyForecasts[1].Day.Wind.Speed.Unit}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TomorrowWeather;
