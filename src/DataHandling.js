import styled from '@emotion/styled';
import React, { Component } from 'react';

const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

const CityContainer = styled.div`
    display:flex;
    flex-direction: row;
    overflow: auto;
    width: 75%;
`;

const CityNameDiv = styled.div`
    border: black solid 1px;: red;
    display: flex;
    flex-direction: column;
    min-width: 150px;
`;

export class DataHandling extends Component {
    render() {
        const { subscribedCities } = this.props;
        return (
            <DataContainer>
                {Object.values(subscribedCities).map(this.renderCityData)}
            </DataContainer>
        )
    }

    renderCityData = data => {
        const cityName = data.city.name;
        return (
            <CityContainer key={cityName}>
                <button onClick={() => this.props.unsubscribe(cityName)}>❌</button>
                {data.list.map(datum => (
                <CityNameDiv>
                    <div>{cityName}</div>
                    <div>Date: {datum.dt_txt}</div>
                    <div>Temp: {(datum.main.temp - 273.15).toFixed(1)}ºC</div>
                    <div>Humidity: {datum.main.humidity}%</div>
                    <div>{datum.weather[0].description.toLocaleUpperCase()}</div>
                    <div>Wind Speed: {(datum.wind.speed * 2.236936).toFixed(1)}mph</div>
                </CityNameDiv>
                )
              )}
            </CityContainer>
        )
    };
}
