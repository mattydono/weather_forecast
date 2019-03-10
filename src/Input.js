import React, { Component } from 'react';
import { isValidCity } from './SubscriptionService';

export class Input extends Component {
  state = {
    selectedCity: '',
    isValid: false,
  };

  render() {
    const { subscribedCities } = this.props;
    const { selectedCity, isValid } = this.state;
    const alreadySubscribed = subscribedCities.some(
      city => city === selectedCity,
    );
    return (
      <div>
        <input
          placeholder='city,country code'
          onChange={this.onCityChange}
          value={selectedCity}
        />
        <span role='img' aria-label={isValid ? 'Valid City' : 'Invalid City'}>
          ️{isValid ? '✔️' : '❌'}
        </span>
        <button
          onClick={this.onSubscribe}
          disabled={!isValid || alreadySubscribed}>
          Subscribe
        </button>
        <button onClick={this.onRefresh}>Refresh</button>
      </div>
    );
  }

  onRefresh = () => {
    this.props.subscribedCities.forEach(this.props.onSubscribe);
  };

  onSubscribe = () => {
    this.props.onSubscribe(this.state.selectedCity);
  };

  onCityChange = event => {
    const { value: selectedCity } = event.currentTarget;
    this.setState({ selectedCity, isValid: isValidCity(selectedCity) });
  };
}
