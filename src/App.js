import React, { Component } from 'react';
import './App.css';
import cities from './cities.json'

class App extends Component {
    state = {
        selectedCity: '',
        subscribedCities: {}
    };

    render() {
        return (
            <div>
                <div className="App">
                    <input placeholder="city,country code" onChange={this.onCityChange} value={this.state.selectedCity}/>
                    <button onClick={this.onCitySubscribe}>Subscribe</button>
                    <button onClick={this.onPrint}>Print</button>
                </div>
                    {Object.values(this.state.subscribedCities).map(this.renderCityData)}
            </div>
        );
    }

    onPrint = () => {
        console.log(this.state.subscribedCities);
    };

    renderCityData = data => {
        const cityName = data.city.name
        return data.list.map(datum => (
                <div key={cityName}>
                    <div>{cityName}</div>
                    <div>Date: {datum.dt_txt}</div>
                    <div>Temp: {(datum.main.temp - 273.15).toFixed(1)}ºC</div>
                    <div>Humidity: {datum.main.humidity}%</div>
                    <div>{datum.weather[0].description.toLocaleUpperCase()}</div>
                    <div>Wind Speed: {(datum.wind.speed * 2.236936).toFixed(1)}mph</div>
                </div>
            )
        )
    };

    onCityChange = event => {
        this.setState({selectedCity: event.currentTarget.value})
    };

    validateCity = (cities) => {
        for(let i=0; i < cities.length; i++) {
            if(this.state.selectedCity === cities[i].name) {
                return cities[i].name + ',' + cities[i].country;
            }
        }
    };

    onCitySubscribe = () => {
        const citySubscribe = this.validateCity(cities);
        if(citySubscribe !== null) {
            fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + citySubscribe + '&APPID=9447e31ed925167b44b4b37981042924')
                .then(response => response.json())
                .then(data => this.setState(state => ({
                    subscribedCities: {
                        ...state.subscribedCities,
                        [data.city.name]: data
                     },
                })))
        }
    };
}

export default App;

// ,\n\s+"coord": \{\n.+\n.+\n.+\}
// ^\s+"id":.+,\n

// const ws = new WebSocket('wss://api.coinfloor.co.uk/');  ws.onmessage = message => {   console.log(message); }