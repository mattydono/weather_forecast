import cities from './cities';

const isValidCity = cityName => cities.some(c => c.name === cityName);

const mapCityToQuery = cityName => {
  const city = cities.find(c => c.name === cityName);
  if (city === undefined) {
    throw new Error(`${cityName} does not exist`);
  }
  return `${city.name},${city.country}`;
};

export const subscribe = cityName => {
  const isValid = isValidCity(cityName);
  if (isValid) {
    const cityQuery = mapCityToQuery(cityName);
    return fetch(
      'https://api.openweathermap.org/data/2.5/forecast?q=' +
        cityQuery +
        '&APPID=9447e31ed925167b44b4b37981042924',
    ).then(response => response.json());
  }
  return Promise.reject(`${cityName} does not exist`);
};
