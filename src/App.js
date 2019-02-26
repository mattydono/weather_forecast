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
            <div className="App">
                <input placeholder="city,country code" onChange={this.onCityChange}/>
                <button onClick={this.onCitySubscribe}>Subscribe</button>
            </div>
        );
    }

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
        fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + citySubscribe + '&APPID=9447e31ed925167b44b4b37981042924')
            .then( response => response.json())
            .then(data => this.setState(state => ({
                subscribedCities: {
                    ...state.subscribedCities,
                    [data.city.name]: data
                }
            })), console.log(this.state.subscribedCities))
    };
}

export default App;

// ,\n\s+"coord": \{\n.+\n.+\n.+\}
// ^\s+"id":.+,\n

// const ws = new WebSocket('wss://api.coinfloor.co.uk/');  ws.onmessage = message => {   console.log(message); }