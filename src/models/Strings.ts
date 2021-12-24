import { Note } from './Notes';

export type GuitarString = 1 | 2 | 3 | 4 | 5 | 6;

export const stringToNoteMap: {
  [key in GuitarString]: Note;
} = {
  1: 'E',
  2: 'B',
  3: 'G',
  4: 'D',
  5: 'A',
  6: 'E',
};

export const ALL_STRINGS: GuitarString[] = [1, 2, 3, 4, 5, 6];
