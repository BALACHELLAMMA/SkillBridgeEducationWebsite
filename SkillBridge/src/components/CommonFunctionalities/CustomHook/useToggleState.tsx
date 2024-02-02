import { useState } from 'react';

function useBooleanState(initialValue: boolean): [boolean, () => void] {
  const [value, setValue] = useState(initialValue);

  const toggleValue = (): void => {
    setValue((prevValue) => !prevValue);
  };

  return [value, toggleValue];
}

export default useBooleanState;
