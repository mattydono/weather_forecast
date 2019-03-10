import React, { useCallback } from 'react';

export const DataHandling = ({ subscribedCities, onUnsubscribe }) => {
  const renderCityData = useCallback(
    data => {
      const cityName = data.city.name;
      return (
        <div key={cityName}>
          <button onClick={() => onUnsubscribe(cityName)}>
            <span role='img' aria-label='Unsubscribe'>
              ❌
            </span>
          </button>
          {data.list.map(datum => (
            <div key={datum.dt}>
              <div>{cityName}</div>
              <div>Date: {datum.dt_txt}</div>
              <div>Temp: {(datum.main.temp - 273.15).toFixed(1)}ºC</div>
              <div>Humidity: {datum.main.humidity}%</div>
              <div>{datum.weather[0].description.toLocaleUpperCase()}</div>
              <div>
                Wind Speed: {(datum.wind.speed * 2.236936).toFixed(1)}mph
              </div>
            </div>
          ))}
        </div>
      );
    },
    [onUnsubscribe],
  );

  return <div>{Object.values(subscribedCities).map(renderCityData)}</div>;
};
