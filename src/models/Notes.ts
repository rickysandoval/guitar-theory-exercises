import * as _ from 'underscore';

export const FLAT = '♭';

export const SHARP = '♯';

export type Note = 'A' | 'A♯' | 'B♭' | 'B' | 'C' | 'C♯' | 'D♭' | 'D' | 'D♯' | 'E♭' | 'E' | 'F' | 'F♯' | 'G♭' | 'G' |  'G♯' | 'A♭' ;

export const ENHARMONIC_NOTES: {
  [key in Note]: Note
} = {
  'A': 'A',
  'A♯': 'B♭',
  'B♭': 'A♯',
  'B': 'B',
  'C': 'C',
  'C♯': 'D♭',
  'D♭': 'C♯',
  'D': 'D',
  'D♯': 'E♭',
  'E♭': 'D♯',
  'E': 'E',
  'F': 'F',
  'F♯': 'G♭',
  'G♭': 'F♯',
  'G': 'G',
  'G♯': 'A♭',
  'A♭': 'G♯',
};


export const ALL_NOTES: Note[] = ['A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G',  'G♯'];

const isSharpOrFlat = (note: Note) => note.includes(SHARP) || note.includes(FLAT);

export const ALL_NON_ACCIDENTAL_NOTES: Note[] = ALL_NOTES.filter(note => !isSharpOrFlat(note));

export const ALL_ACCIDENTALS = _.uniq([
  ...ALL_NOTES,
  ...ALL_NOTES.map(note => ENHARMONIC_NOTES[note]),
]).filter(isSharpOrFlat);

export const SHARPABLE_NOTES: Note[] = ['A', 'C', 'D', 'F', 'G'];

export const FLATTABLE_NOTES: Note[] = ['A', 'B', 'D', 'E', 'G'];
