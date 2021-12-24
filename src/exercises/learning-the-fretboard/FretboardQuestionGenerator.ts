import { Fret } from '../../models/Frets';
import { ALL_NOTES, Note } from '../../models/Notes';
import { GuitarString } from '../../models/Strings';
import { getRandomInt, returnFretForNote, returnNoteForFret } from '../../utils';

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
    const noteToGuess = this.getRandomNote(string);
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


  private static getRandomNote(forString: GuitarString): Note {
    const noteToGuess = ALL_NOTES[getRandomInt(11)];
    const {
      note: prevNote,
      string: prevString,
    } = (this.previousQuestionPieces || {});
    return forString === prevString && noteToGuess === prevNote 
      ? this.getRandomNote(forString)
      : noteToGuess;
  }
}
