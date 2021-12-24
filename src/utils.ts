import { Fret } from './models/Frets';
import { ALL_NOTES, Note } from './models/Notes';
import { GuitarString, stringToNoteMap } from './models/Strings';

/**
 * returns a fret for a given string and note
 */
export function returnFretForNote(string: GuitarString, note: Note): Fret {
  const stringNote = stringToNoteMap[string];
  const offset = 12 - ALL_NOTES.indexOf(stringNote);

  const fretWithNote = (offset + ALL_NOTES.indexOf(note)) % 12;
  return fretWithNote as Fret;
}

/**
 * returns a note for a given string and fret
 */
export function returnNoteForFret(string: GuitarString, fret: Fret): Note {
  const stringNote = stringToNoteMap[string];
  const noteOnFret = ALL_NOTES[(ALL_NOTES.indexOf(stringNote) + fret) % 12];
  return noteOnFret;
}


/**
 * Returns random number between 0 and max, including max
 */
export function getRandomInt(max: number) {
  return Math.floor(Math.random() * (max + 1));
}
