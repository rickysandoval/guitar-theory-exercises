import { ALL_CHORD_TYPE, Chord, ChordType } from '../models/Chords';
import { ENHARMONIC_NOTES, FLAT, Note, SHARP } from '../models/Notes';
import { getNotePlusInterval, getNotePlusIntervalNonAccidental } from './note-utils';
import { getRandomInt } from './number-utils';
import * as _ from 'underscore';

export function getStartingNotesForChordType(chordType: ChordType): Note[] {
  switch (chordType) {
    case 'major': {
      return ['A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'G♯'];
    }
    case 'minor': {
      return ['A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'G♯'];
    }
    case 'diminished': {
      return ['A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'G♯'];
    }
  }
}

export function generateRandomChord(exclude: Note[] = [], chordTypes: ChordType[] = ALL_CHORD_TYPE): Chord {
  const chordType = chordTypes[getRandomInt(chordTypes.length - 1)];
  const availableNotes = _.difference(getStartingNotesForChordType(chordType), exclude);
  const startingNote = availableNotes[getRandomInt(availableNotes.length - 1)];

  const startingNoteNonAccidental = startingNote.replace(FLAT, '').replace(SHARP, '') as Note;
  const secondNoteNonAccidental = getNotePlusIntervalNonAccidental(startingNoteNonAccidental, 2);
  const thirdNoteNonAccidental = getNotePlusIntervalNonAccidental(secondNoteNonAccidental, 2);

  let secondNote: Note;
  let thirdNote: Note;
  switch (chordType) {
    case 'major': {
      const secondNoteRaw = getNotePlusInterval(startingNote, 4);
      secondNote = secondNoteRaw.includes(secondNoteNonAccidental) ? secondNoteRaw : ENHARMONIC_NOTES[secondNoteRaw];
      const thirdNoteRaw = getNotePlusInterval(secondNoteRaw, 3);
      thirdNote = thirdNoteRaw.includes(thirdNoteNonAccidental) ? thirdNoteRaw : ENHARMONIC_NOTES[thirdNoteRaw];
      break;
    }
    case 'minor': {
      const secondNoteRaw = getNotePlusInterval(startingNote, 3);
      secondNote = secondNoteRaw.includes(secondNoteNonAccidental) ? secondNoteRaw : ENHARMONIC_NOTES[secondNoteRaw];
      const thirdNoteRaw = getNotePlusInterval(secondNoteRaw, 4);
      thirdNote = thirdNoteRaw.includes(thirdNoteNonAccidental) ? thirdNoteRaw : ENHARMONIC_NOTES[thirdNoteRaw];
      break;
    }
    case 'diminished': {
      const secondNoteRaw = getNotePlusInterval(startingNote, 3);
      secondNote = secondNoteRaw.includes(secondNoteNonAccidental) ? secondNoteRaw : ENHARMONIC_NOTES[secondNoteRaw];
      const thirdNoteRaw = getNotePlusInterval(secondNoteRaw, 3);
      thirdNote = thirdNoteRaw.includes(thirdNoteNonAccidental) ? thirdNoteRaw : ENHARMONIC_NOTES[thirdNoteRaw];
      break;
    }
  }
  return {
    type: chordType,
    notes: [startingNote, secondNote, thirdNote],
  };
}
