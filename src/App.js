import React, { Component } from 'react';
import { DataHandling } from './DataHandling';
import { Input } from './Input';
import { subscribe } from './SubscriptionService';

class App extends Component {
  state = {
    data: {},
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <Input
          onSubscribe={this.onSubscribe}
          subscribedCities={Object.keys(data)}
        />
        <DataHandling data={data} unsubscribe={this.onUnsubscribe} />
      </div>
    );
  }

  onSubscribe = selectedCity => {
    subscribe(selectedCity).then(data =>
      this.setState(state => ({
        data: {
          ...state.data,
          [data.city.name]: data,
        },
      })),
    );
  };

  onUnsubscribe = cityName => {
    this.setState(state => {
      const data = { ...state.data };
      delete data[cityName];
      return { data };
    });
  };
}

export default App;
