import { Fret } from '../../models/Frets';
import { Note } from '../../models/Notes';
import { GuitarString } from '../../models/Strings';
import { isSharpOrFlat, returnNoteForFret } from '../../utils/note-utils';
import * as _ from 'underscore';
import { choseRandomMember } from '../../utils/utils';
import { ISettings } from './LearningTheFretboardSettings';

export type FretboardQuizMode = 'NOTE' | 'FRET' | 'MIX';

export interface FretboardQuestion {
  string: GuitarString;
  note: Note;
  fret: Fret;
  mode: Exclude<FretboardQuizMode, 'MIX'>;
}

const allQuestionForString = _.memoize((string: GuitarString) => new Array(13)
  .fill(null)
  .map((v, idx) => {
    const fret = idx as Fret;
    const note = returnNoteForFret(string, fret);
    return {
      string,
      fret,
      note,
    };
  }));

export default class FretboardQuestionGenerator {

  private static previousQuestionPieces: {
    string: GuitarString;
    fret: Fret;
    note: Note;
  } | null = null;

  
  // public static generateRandomQuestion(
  //   mode: FretboardQuizMode, 
  //   strings: GuitarString[],
  //   fretRange: [Fret, Fret],
  //   includeAccidentals: boolean,
  // ): FretboardQuestion {
  //   const string = strings[getRandomInt(strings.length - 1)];

  //   switch (mode) {
  //     case 'FRET': {
  //       return this.generateFretQuestion(string, fretRange, includeAccidentals);
  //     }
  //     case 'NOTE': {
  //       return this.generateNoteQuestion(string, fretRange, includeAccidentals);
  //     }
  //     default: {
  //       return getRandomInt(1) === 0 
  //         ? this.generateFretQuestion(string, fretRange, includeAccidentals)
  //         : this.generateNoteQuestion(string, fretRange, includeAccidentals);
  //     }
  //   }
  // }

  public static generateRandomQuestion({
    strings,
    mode,
    fretRange,
    includeAccidentals,
  }: ISettings): FretboardQuestion {
    const [minFret, maxFret] = fretRange;
    let possibleQuestions = _.flatten(
      strings.map(string => allQuestionForString(string).filter(({ fret }) => fret >= minFret && fret <= maxFret)),
    );
    if (!includeAccidentals) {
      possibleQuestions = possibleQuestions.filter(({ note }) => !isSharpOrFlat(note));
    }
    if (this.previousQuestionPieces && possibleQuestions.length > 1) {
      const { string: prevString, fret: prevFret } = this.previousQuestionPieces;
      possibleQuestions = possibleQuestions.filter(({ fret, string }) => !(fret === prevFret && string === prevString));
    }

    const nextQuestion = choseRandomMember(possibleQuestions);
    this.previousQuestionPieces = nextQuestion;

    return {
      ...nextQuestion,
      mode: mode === 'MIX' ? choseRandomMember(['NOTE', 'FRET']) : mode,
    };

  }

  // private static generateFretQuestion(string: GuitarString, fretRange: [Fret, Fret], includeAccidentals: boolean): FretboardQuestion {
  //   const fretToGuess = this.getRandomFret(string, fretRange);
  //   const noteOnFret = returnNoteForFret(string, fretToGuess);
  //   if (!includeAccidentals && (noteOnFret.includes(SHARP) || noteOnFret.includes(FLAT))) {
  //     return this.generateFretQuestion(string, fretRange, includeAccidentals);
  //   }
  //   this.previousQuestionPieces = {
  //     string: string,
  //     fret: fretToGuess,
  //   };
  //   return {
  //     question: `Fret ${fretToGuess} on string ${string}`,
  //     answer: noteOnFret,
  //   };
  // }

  // private static getRandomFret(forString: GuitarString, fretRange: [Fret, Fret]): Fret {
  //   const [min, max] = fretRange;
  //   const rangeOffset = max - min;
  //   const fretToGuess = getRandomInt(rangeOffset) + min as Fret;
  //   const {
  //     fret: prevFret,
  //     string: prevString,
  //   } = (this.previousQuestionPieces || {});
  //   return forString === prevString && fretToGuess === prevFret
  //     ? this.getRandomFret(forString, fretRange)
  //     : fretToGuess;
  // }

  // private static generateNoteQuestion(string: GuitarString, fretRange: [Fret, Fret], includeAccidentals: boolean): FretboardQuestion {
  //   const [minFret, maxFret] = fretRange;
  //   const questionChoicees = new Array(maxFret + 1 - minFret)
  //     .fill(null)
  //     .map((v, i) => {
  //       const fret = i + minFret as Fret;
  //       return {
  //         fret,
  //         note: returnNoteForFret(string, fret),
  //       };
  //     });
  //   const excludeNotes = includeAccidentals
  //     ? []
  //     : _.difference(ALL_NOTES, ALL_NON_ACCIDENTAL_NOTES);
  //   console.log('exclude: ', excludeNotes);
  //   console.log('all notes: ', ALL_NOTES);
  //   if (this.previousQuestionPieces?.fret && fretChoices.length > 1) {
  //     excludeNotes.push(this.previousQuestionPieces.note);
  //   }


  //   const noteToGuess = generateRandomNote(excludeNotes);
  //   const fretWithNote = returnFretForNote(string, noteToGuess);
  //   if (fretWithNote < minFret || fretWithNote > maxFret) {
  //     return this.generateNoteQuestion(string, fretRange, includeAccidentals);
  //   }
  //   this.previousQuestionPieces = {
  //     string: string,
  //     note: noteToGuess,
  //   };
  //   return {
  //     question: `Where is ${noteToGuess} on string ${string}`,
  //     answer: String(fretWithNote),
  //   };
  // }
}
