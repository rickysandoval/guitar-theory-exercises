import { KeyboardEvent, useCallback } from 'react';
import { Fret } from '../models/Frets';

export default function useFretKeyboardInput(
  value: Fret | undefined,
  onChange: (fret: Fret | undefined) => void,
) {
  const onKeyPress = useCallback((e: KeyboardEvent) => {
    const key = e.key;
    switch (key) {
      case 'Backspace': {
        onChange(undefined);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        
        if (value && value <= 12) {
          onChange(value + 1 as Fret);
        }
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        if (value && value >= 0) {
          onChange(value - 1 as Fret);
        }
        break;
      }
      default: {
        const inputNumber = Number(key.toUpperCase());
        if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(inputNumber as Fret)) {
          onChange(inputNumber as Fret);
        }
      }
    }
  }, [onChange, value]);

  
  return onKeyPress;
}
