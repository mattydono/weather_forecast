import React, {Component} from 'react';
import {DataHandling} from "./DataHandling";
import {subscribe} from "./SubscriptionService";
import {Input} from "./Input";

class App extends Component {
    state = {
        subscribedCities: {}
    };

    render() {
        const {subscribedCities} = this.state;
        return (
            <div>
                <Input onSubscribe={this.onSubscribe}/>
                <DataHandling
                    subscribedCities={subscribedCities}
                    unsubscribe={this.onUnsubscribe}
                />
            </div>
        )
    }

    onSubscribe = (selectedCity) => {
        subscribe(selectedCity)
            .then(data => this.setState(state => ({
                subscribedCities: {
                    ...state.subscribedCities,
                    [data.city.name]: data
                },
            })));
    };

    onUnsubscribe = cityName => {
        this.setState(state => {
            const subscribedCities = { ...state.subscribedCities };
            delete subscribedCities[cityName];
            return { subscribedCities };
        });
    }
}

export default App;