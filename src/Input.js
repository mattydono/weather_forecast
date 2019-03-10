import React, { useCallback, useState } from 'react';

export const Input = ({ subscribedCities, onSubscribe }) => {
  const [value, setValue] = useState('');

  const onRefresh = useCallback(() => {
    Object.keys(subscribedCities).map(onSubscribe);
  }, [subscribedCities, onSubscribe]);

  const onCityChange = useCallback(
    event => setValue(event.currentTarget.value),
    [setValue],
  );

  return (
    <div>
      <input
        placeholder='city,country code'
        onChange={onCityChange}
        value={value}
      />
      <button onClick={() => onSubscribe(value)}>Subscribe</button>
      <button onClick={onRefresh}>Refresh</button>
    </div>
  );
};
