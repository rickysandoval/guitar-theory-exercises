import { Note } from './Notes';

export type ChordType = 'minor' | 'major' | 'diminished';

export const ALL_CHORD_TYPE: ChordType[] = ['major', 'minor', 'diminished'];

export interface Chord {
  type: ChordType;
  notes: [Note, Note, Note]
}
