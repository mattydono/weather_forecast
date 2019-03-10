import React, { useCallback, useReducer } from 'react';
import { DataHandling } from './DataHandling';
import { Input } from './Input';
import { subscribe } from './SubscriptionService';

const subscribedCitiesReducer = (state, { type, payload }) => {
  switch (type) {
    case 'subscribe':
      return { ...state, [payload.city.name]: payload };
    case 'unsubscribe':
      const { [payload]: _, ...newState } = state;
      return newState;
    default:
      throw new Error();
  }
};

const App = () => {
  const [subscribedCities, dispatch] = useReducer(subscribedCitiesReducer, {});

  const onSubscribe = useCallback(
    selectedCity => {
      subscribe(selectedCity).then(data =>
        dispatch({ type: 'subscribe', payload: data }),
      );
    },
    [dispatch],
  );

  const onUnsubscribe = useCallback(
    cityName => {
      dispatch({ type: 'unsubscribe', payload: cityName });
    },
    [dispatch],
  );

  return (
    <div>
      <Input onSubscribe={onSubscribe} />
      <DataHandling
        subscribedCities={subscribedCities}
        onUnsubscribe={onUnsubscribe}
      />
    </div>
  );
};

export default App;
