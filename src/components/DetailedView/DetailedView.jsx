import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchForecast } from "../../features/forecastSlice";
import styles from "./DetailedView.module.css";

import CurrentSummary from "./CurrentSummary/CurrentSummary";
import StatsGrid from "./StatsGrid/StatsGrid";
import HourlyChart from "./Charts/HourlyChart";
import DailyChart from "./Charts/DailyChart";
import WindChart from "./Charts/WindChart";
import { celsiusToFahrenheit, degToCompass, formatHour, getDayName } from "../../utils/formatters";

export default function DetailedView() {
  const { cityName } = useParams();
  const dispatch = useDispatch();

  const currentUnit = useSelector((state) => state.settings.unit);
  const currentWeather = useSelector((state) => state.weather.data[cityName]);
  const forecastData = useSelector((state) => state.forecast.data[cityName]);
  const forecastStatus = useSelector((state) => state.forecast.status);

  useEffect(() => {
    if (currentWeather && !forecastData) {
      dispatch(
        fetchForecast({
          lat: currentWeather.coord.lat,
          lon: currentWeather.coord.lon,
          cityName: cityName,
        })
      );
    }
  }, [dispatch, currentWeather, forecastData, cityName]);

  const renderContent = () => {
    if (forecastStatus === "loading" || !currentWeather) {
      return <div className={styles.loading}>Loading detailed forecast...</div>;
    }

    if (!forecastData) {
      return <div className={styles.loading}>Preparing data...</div>;
    }

    const unitSymbol = currentUnit === "celsius" ? "°C" : "°F";
    const tempKey = currentUnit === "celsius" ? "tempC" : "tempF";

    const currentTemp =
      currentUnit === "celsius"
        ? currentWeather.main.temp
        : celsiusToFahrenheit(currentWeather.main.temp);

    const feelsLikeTemp =
      currentUnit === "celsius"
        ? currentWeather.main.feels_like
        : celsiusToFahrenheit(currentWeather.main.feels_like);

    const hourlyData = forecastData.list.slice(0, 8).map((item) => {
      const tempC = item.main.temp;
      return {
        time: formatHour(item.dt),
        tempC: tempC,
        tempF: celsiusToFahrenheit(tempC),
      };
    });

    const hourlyWindData = forecastData.list.slice(0, 8).map((item) => {
      return {
        time: formatHour(item.dt),
        speed_ms: item.wind.speed,
        speed_mph: item.wind.speed * 2.237,
        direction_deg: item.wind.deg,
        direction_str: degToCompass(item.wind.deg),
      };
    });

    const dailyData = forecastData.list
      .filter((reading, index) => index % 8 === 0)
      .map((day) => {
        const tempMaxC = day.main.temp_max;
        const tempMinC = day.main.temp_min;
        return {
          day: getDayName(day.dt),
          HighC: tempMaxC,
          HighF: celsiusToFahrenheit(tempMaxC),
          LowC: tempMinC,
          LowF: celsiusToFahrenheit(tempMinC),
          Precipitation: Math.round(day.pop * 100),
        };
      });

    return (
      <div className={styles.detailContainer}>
        <CurrentSummary
          currentWeather={currentWeather}
          forecastData={forecastData}
          currentTemp={currentTemp}
          unitSymbol={unitSymbol}
        />

        <StatsGrid
          currentWeather={currentWeather}
          forecastData={forecastData}
          feelsLikeTemp={feelsLikeTemp}
          currentUnit={currentUnit}
          unitSymbol={unitSymbol}
        />

        <HourlyChart
          hourlyData={hourlyData}
          tempKey={tempKey}
          unitSymbol={unitSymbol}
        />

        <WindChart hourlyWindData={hourlyWindData} currentUnit={currentUnit} />

        <DailyChart
          dailyData={dailyData}
          currentUnit={currentUnit}
          unitSymbol={unitSymbol}
        />
      </div>
    );
  };

  return (
    <div className={styles.detailedView}>
      <Link to="/" className={styles.backLink}>
        &larr; Back to Dashboard
      </Link>
      {renderContent()}
    </div>
  );
}
