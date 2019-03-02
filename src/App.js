import React, {Component} from 'react';
import {DataHandling} from "./DataHandling";
import {subscribe} from "./SubscriptionService";
import {Input} from "./Input";
import styled from '@emotion/styled';

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: lightskyblue;
    position: absolute;
    width: 100%;
    height: 100%;
`;

class App extends Component {
  state = {
    subscribedCities: {},
  };

    render() {
        const {subscribedCities} = this.state;
        return (
                <AppContainer>
                    <InputField onSubscribe={this.onSubscribe}/>
                    <DataHandling subscribedCities={subscribedCities} unsubscribe={this.onUnsubscribe}/>
                </AppContainer>
        );
    }

  onSubscribe = selectedCity => {
    subscribe(selectedCity).then(data =>
      this.setState(state => ({
        subscribedCities: {
          ...state.subscribedCities,
          [data.city.name]: data,
        },
      })),
    );
  };

  onUnsubscribe = cityName => {
    this.setState(state => {
      const subscribedCities = { ...state.subscribedCities };
      delete subscribedCities[cityName];
      return { subscribedCities };
    });
  };
}

export default App;
