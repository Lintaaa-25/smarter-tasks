import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Ensure that the parsed value is an array, or use the initial value
      const parsedValue = item ? JSON.parse(item) : initialValue;
      return Array.isArray(parsedValue) ? parsedValue : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
