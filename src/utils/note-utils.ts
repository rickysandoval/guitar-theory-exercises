import { Fret } from '../models/Frets';
import { ALL_NON_ACCIDENTAL_NOTES, ALL_NOTES, ENHARMONIC_NOTES, FLAT, Note, SHARP } from '../models/Notes';
import { GuitarString, stringToNoteMap } from '../models/Strings';
import { getRandomInt } from './number-utils';
import * as _ from 'underscore';

export function getNotePlusInterval(startingNote: Note, interval: number): Note {
  const indexOfNote = ALL_NOTES.indexOf(startingNote) >= 0
    ? ALL_NOTES.indexOf(startingNote)
    : ALL_NOTES.indexOf(ENHARMONIC_NOTES[startingNote]);

  const endingNote = ALL_NOTES[(indexOfNote + interval) % 12];
  return endingNote;
}

export function getNotePlusIntervalNonAccidental(startingNote: Note, interval: number): Note {
  const startingNoteNonAccidental = startingNote.replace(FLAT, '').replace(SHARP, '') as Note;
  const indexOfNote = ALL_NON_ACCIDENTAL_NOTES.indexOf(startingNoteNonAccidental);
    
  const endingNote = ALL_NON_ACCIDENTAL_NOTES[(indexOfNote + interval) % 7];
  return endingNote;
}

/**
 * returns a note for a given string and fret
 */
export function returnNoteForFret(string: GuitarString, fret: Fret): Note {
  const stringNote = stringToNoteMap[string];
  return getNotePlusInterval(stringNote, fret);
}

/**
 * returns a fret for a given string and note
 */
export function returnFretForNote(string: GuitarString, note: Note): Fret {
  const stringNote = stringToNoteMap[string];
  const offset = 12 - ALL_NOTES.indexOf(stringNote);

  const fretWithNote = (offset + ALL_NOTES.indexOf(note)) % 12;
  return fretWithNote as Fret;
}

export function generateRandomNote(excludeNotes: Note[] = []): Note {
  const allowedNotes = _.difference(ALL_NOTES, excludeNotes);
  return allowedNotes[getRandomInt(allowedNotes.length - 1)];
}

export const isSharpOrFlat = (note: Note) => note.includes(SHARP) || note.includes(FLAT);
