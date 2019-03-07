import React, { Component } from 'react';
import styled from '@emotion/styled';

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  margin-top: 10px;
`;

const CityRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  border: solid black 1px;
`;

const CityContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 900px;
  overflow: auto;
`;

const CityDiv = styled.div`
  border: black solid 1px;
  :red ;
  display: flex;
  flex-direction: column;
  min-width: 150px;
`;

const Button = styled.button`
  width: 5%;
`;

export class DataHandling extends Component {
  render() {
    const { subscribedCities } = this.props;
    return (
      <DataContainer>
        {Object.values(subscribedCities).map(this.renderCityData)}
      </DataContainer>
    );
  }

  renderCityData = data => {
    const cityName = data.city.name;

    const cityDays = data.list.reduce((acc, item) => {
      const day = item.date.getDay();
      acc[day] = acc[day] || [];
      acc[day].push(item);
      return acc;
    }, {});

    return (
      <CityRow>
        <Button onClick={() => this.props.unsubscribe(cityName)}>❌</Button>
        <CityContainer key={cityName}>
          {Object.entries(cityDays).map(datum => {
            return (
              <CityDiv key={datum.dt_txt}>
                <div>{cityName}</div>
                <div>Date: {datum.dt_txt}</div>
                <div>Temp: {(datum.main.temp - 273.15).toFixed(1)}ºC</div>
                <div>Humidity: {datum.main.humidity}%</div>
                <div>{datum.weather[0].description.toLocaleUpperCase()}</div>
                <div>
                  Wind Speed: {(datum.wind.speed * 2.236936).toFixed(1)}mph
                </div>
              </CityDiv>
            );
          })}
        </CityContainer>
      </CityRow>
    );
  };
}
