import React, { useContext, useEffect } from "react";
import { weathercontext } from "../context/Context";
import UpArrow from "../Images/UpArrow.svg";
import DownArrow from "../Images/DownArrow.svg";
const TodayWeather = () => {
  const { data } = useContext(weathercontext);
  useEffect(() => {
    console.log(data);
  }, []);
  if (!data || !data.DailyForecasts || data.DailyForecasts.length === 0) {
    return <div>Loading...</div>;
  }
  // sunSet and unRise calc
  const riseEpoch = data.DailyForecasts[1].Sun.EpochRise;
  const setEpoch = data.DailyForecasts[1].Sun.EpochSet;
  const sunRiseTime = new Date(riseEpoch * 1000);
  const sunSetTime = new Date(setEpoch * 1000);
  // ------------------------------

  // moon Rise and Moon set calculation
  const MoonRiseEpoch = data.DailyForecasts[1].Moon.EpochRise;
  const MoonRiseTime = new Date(MoonRiseEpoch * 1000);
  const MoonSetEpoch = data.DailyForecasts[1].Moon.EpochSet;
  const MoonSetTime = new Date(MoonSetEpoch * 1000);
  // ------------------------------

  return (
    <div className="p-6 grid sm:grid-cols-3 grid-cols-1 gap-y-5 gap-x-2">
      <div className="w-full bg-blue-400 px-6 py-2 rounded-lg ">
        <p className="text-xl">WIND</p>
        <span className="text-2xl">
          {data && data.DailyForecasts[0].Day.Wind.Speed.Value}{" "}
          {data && data.DailyForecasts[0].Day.Wind.Speed.Unit}
        </span>
        <p>{data && data.DailyForecasts[0].Day.Wind.Direction.Localized}</p>
      </div>

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
            {data && data.DailyForecasts[0].RealFeelTemperature.Maximum.Phrase}
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
        <p className="text-xl">SUNRISE</p>
        <span className="text-xl">{sunRiseTime.toLocaleTimeString()}</span>
      </div>
      <div className=" w-full bg-blue-400 px-6 py-2 rounded-lg">
        <p className="text-xl">SUNSET</p>
        <span className="text-xl"> {sunSetTime.toLocaleTimeString()}</span>
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
        <p className="text-xl">MOON</p>
        <span className="text-l">{MoonRiseTime.toLocaleTimeString()}</span>
        <br />
        <span className="text-l">{MoonSetTime.toLocaleTimeString()}</span>
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
    </div>
  );
};

export default TodayWeather;
