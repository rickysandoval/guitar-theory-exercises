import { Fret } from '../../models/Frets';
import { ALL_NON_ACCIDENTAL_NOTES, ALL_NOTES, FLAT, Note, SHARP } from '../../models/Notes';
import { GuitarString } from '../../models/Strings';
import { generateRandomNote, returnFretForNote, returnNoteForFret } from '../../utils/note-utils';
import { getRandomInt } from '../../utils/number-utils';
import * as _ from 'underscore';

export interface FretboardQuestion {
  question: string;
  answer: string;
}

export type FretboardQuizMode = 'NOTE' | 'FRET' | 'MIX';


export default class FretboardQuestionGenerator {

  private static previousQuestionPieces: {
    string: GuitarString;
    fret?: Fret;
    note?: Note;
  } | null = null;

  
  public static generateRandomQuestion(
    mode: FretboardQuizMode, 
    strings: GuitarString[],
    fretRange: [Fret, Fret],
    includeAccidentals: boolean,
  ): FretboardQuestion {
    const string = strings[getRandomInt(strings.length - 1)];
    switch (mode) {
      case 'FRET': {
        return this.generateFretQuestion(string, fretRange, includeAccidentals);
      }
      case 'NOTE': {
        return this.generateNoteQuestion(string, fretRange, includeAccidentals);
      }
      default: {
        return getRandomInt(1) === 0 
          ? this.generateFretQuestion(string, fretRange, includeAccidentals)
          : this.generateNoteQuestion(string, fretRange, includeAccidentals);
      }
    }
  }

  private static generateFretQuestion(string: GuitarString, fretRange: [Fret, Fret], includeAccidentals: boolean): FretboardQuestion {
    const fretToGuess = this.getRandomFret(string, fretRange);
    const noteOnFret = returnNoteForFret(string, fretToGuess);
    if (!includeAccidentals && (noteOnFret.includes(SHARP) || noteOnFret.includes(FLAT))) {
      return this.generateFretQuestion(string, fretRange, includeAccidentals);
    }
    this.previousQuestionPieces = {
      string: string,
      fret: fretToGuess,
    };
    return {
      question: `Fret ${fretToGuess} on string ${string}`,
      answer: noteOnFret,
    };
  }

  private static getRandomFret(forString: GuitarString, fretRange: [Fret, Fret]): Fret {
    const [min, max] = fretRange;
    const rangeOffset = max - min;
    const fretToGuess = getRandomInt(rangeOffset) + min as Fret;
    const {
      fret: prevFret,
      string: prevString,
    } = (this.previousQuestionPieces || {});
    return forString === prevString && fretToGuess === prevFret
      ? this.getRandomFret(forString, fretRange)
      : fretToGuess;
  }

  private static generateNoteQuestion(string: GuitarString, fretRange: [Fret, Fret], includeAccidentals: boolean): FretboardQuestion {
    const [minFret, maxFret] = fretRange;
    const excludeNotes = includeAccidentals
      ? []
      : _.difference(ALL_NOTES, ALL_NON_ACCIDENTAL_NOTES);
    if (this.previousQuestionPieces?.note) {
      excludeNotes.push(this.previousQuestionPieces.note);
    }

    const noteToGuess = generateRandomNote(excludeNotes);
    const fretWithNote = returnFretForNote(string, noteToGuess);
    if (fretWithNote < minFret || fretWithNote > maxFret) {
      return this.generateNoteQuestion(string, fretRange, includeAccidentals);
    }
    this.previousQuestionPieces = {
      string: string,
      note: noteToGuess,
    };
    return {
      question: `Where is ${noteToGuess} on string ${string}`,
      answer: String(fretWithNote),
    };
  }
}
