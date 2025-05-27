

import { useState, useEffect } from "react";

const getStoredValue = <T>(key: string, defaultValue: T): T => {
  try {
    const savedItem = localStorage.getItem(key);
    if (savedItem) {
      const parsed = JSON.parse(savedItem);
      if (Array.isArray(parsed)) {
        return parsed;
      } else {
        console.warn(`Invalid data for key "${key}". Expected array, got:`, parsed);
      }
    }
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
  }
  return defaultValue;
};

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    return getStoredValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

