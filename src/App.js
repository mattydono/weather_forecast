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
                    <input placeholder="city,country code" onChange={this.onCityChange}/>
                    <button onClick={this.onCitySubscribe}>Subscribe</button>
                    <button onClick={this.onPrint}>Print</button>
                </div>
                    {Object.entries(this.state.subscribedCities).map(([city, data]) => this.renderCityData(city, data))}
            </div>
        );
    }

    onPrint = () => {
        console.log(this.state.subscribedCities);
    };

    renderCityData = (city, data) => {
        return data.list.map( datum => {
            return (
                <div>{city}
                    <div key={city + 'Date'}>Date: {datum.dt_txt}</div>
                    <div key={city + 'temp'}>Temp: {(datum.main.temp - 273.15).toFixed(1)}ºC</div>
                    <div key={city + 'humidity'}>Humidity: {datum.main.humidity}%</div>
                    <div key={city + 'description'}>{datum.weather[0].description.toLocaleUpperCase()}</div>
                    <div key={city + 'wind'}>Wind Speed: {(datum.wind.speed * 2.236936).toFixed(1)}mph</div>
                </div>
            )}
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