import { Fret } from '../../models/Frets';
import { Note } from '../../models/Notes';
import { GuitarString } from '../../models/Strings';
import { generateRandomNote, returnFretForNote, returnNoteForFret } from '../../utils/note-utils';
import { getRandomInt } from '../../utils/number-utils';

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

  
  public static generateRandomQuestion(mode: FretboardQuizMode, strings: GuitarString[]): FretboardQuestion {
    const string = strings[getRandomInt(strings.length - 1)];
    switch (mode) {
      case 'FRET': {
        return this.generateFretQuestion(string);
      }
      case 'NOTE': {
        return this.generateNoteQuestion(string);
      }
      default: {
        return getRandomInt(1) === 0 
          ? this.generateFretQuestion(string)
          : this.generateNoteQuestion(string);
      }
    }
  }

  private static generateFretQuestion(string: GuitarString): FretboardQuestion {
    const fretToGuess = this.getRandomFret(string);
    const noteOnFret = returnNoteForFret(string, fretToGuess);
    this.previousQuestionPieces = {
      string: string,
      fret: fretToGuess,
    };
    return {
      question: `Fret ${fretToGuess} on string ${string}`,
      answer: noteOnFret,
    };
  }

  private static getRandomFret(forString: GuitarString): Fret {
    const fretToGuess = getRandomInt(12) as Fret;
    const {
      fret: prevFret,
      string: prevString,
    } = (this.previousQuestionPieces || {});
    return forString === prevString && fretToGuess === prevFret
      ? this.getRandomFret(forString)
      : fretToGuess;
  }

  private static generateNoteQuestion(string: GuitarString): FretboardQuestion {
    const excludeNotes = this.previousQuestionPieces?.note ? [this.previousQuestionPieces?.note] : [];
    const noteToGuess = generateRandomNote(excludeNotes);
    const fretWithNote = returnFretForNote(string, noteToGuess);
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
