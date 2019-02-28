import React, {Component} from 'react';

export class DataHandling extends Component {
    render() {
        const { subscribedCities } = this.props;
        return (
            <div>
                {Object.values(subscribedCities).map(this.renderCityData)}
            </div>
        )
    }

    renderCityData = data => {
        const cityName = data.city.name;
        return data.list.map(datum => (
            <div key={cityName}>
                <div>{cityName}</div>
                <div>Date: {datum.dt_txt}</div>
                <div>Temp: {(datum.main.temp - 273.15).toFixed(1)}ºC</div>
                <div>Humidity: {datum.main.humidity}%</div>
                <div>{datum.weather[0].description.toLocaleUpperCase()}</div>
                <div>Wind Speed: {(datum.wind.speed * 2.236936).toFixed(1)}mph</div>
            </div>
        ))
    };
}