import React, { Component } from 'react';
import './App.css';
import cities from './cities.json'
import {DataHandling} from "./DataHandling";

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
                    <DataHandling
                        subscribedCities={this.state.subscribedCities}
                    />
            </div>
        );
    }

    onPrint = () => {
        console.log(this.state.subscribedCities);
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