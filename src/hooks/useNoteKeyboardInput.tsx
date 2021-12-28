import { KeyboardEvent, useCallback } from 'react';
import { ALL_NON_ACCIDENTAL_NOTES, FLAT, FLATTABLE_NOTES, Note, SHARP, SHARPABLE_NOTES } from '../models/Notes';

export default function useNoteKeyboardInput(
  value: Note | undefined,
  onChange: (note: Note | undefined) => void,
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
        
        if (value) {
          if (SHARPABLE_NOTES.includes(value)) {
            onChange(value + SHARP as Note);
          } else if (value.includes(FLAT)) {
            onChange(value.replace(FLAT, '') as Note);
          }
        }
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        if (value) {
          if (FLATTABLE_NOTES.includes(value)) {
            onChange(value + FLAT as Note);
          } else if (value.includes(SHARP)) {
            onChange(value.replace(SHARP, '') as Note);
          }
        }
        break;
      }
      default: {
        const keyUppercase = key.toUpperCase();
        if (ALL_NON_ACCIDENTAL_NOTES.includes(keyUppercase as Note)) {
          onChange(keyUppercase as Note);
        }
      }
    }
  }, [onChange, value]);

  
  return onKeyPress;
}
