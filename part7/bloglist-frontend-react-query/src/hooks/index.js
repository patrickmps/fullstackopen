import { useState } from 'react';

export const useField = (type, name, placeholder) => {
  const [value, setValue] = useState('');
  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onReset = () => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    onReset,
    name,
    placeholder
  };
};
