import React, { useEffect } from 'react';
import Select from 'react-select';
import styled, { css } from 'styled-components/macro';
import { Fret } from '../models/Frets';
import { ALL_NOTES } from '../models/Notes';
import { ALL_STRINGS, GuitarString } from '../models/Strings';
import { getRandomInt, returnFretForNote, returnNoteForFret } from '../utils';
import { Button, ResponsiveContext, Box, Text, Heading } from 'grommet';


type Mode = 'NOTE' | 'FRET' | 'MIX';

interface Question {
  question: string;
  answer: string;
}

const MODE_OPTIONS = [{
  label: 'Note',
  value: 'NOTE' as Mode
}, {
  label: 'Fret',
  value: 'FRET' as Mode,
}, {
  label: 'Mix',
  value: 'MIX' as Mode
}];

const STRING_OPTIONS = ALL_STRINGS.map(s => ({
  value: s,
  label: s,
}));


const Wrapper = styled(Box)`
  height: 100%;
`

const Main = styled(Box)`
  flex-grow: 1;
  align-items: middle;
`

const Settings = styled(Box)`
  display: flex;
  justify-content: flex-start;
`

const QuestionWrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`

const QuestionCard = styled(Box)`
  padding: 4rem 2rem;
  border-radius: 4px;
  display: inline-block;
  white-space: nowrap;
  text-align: center;
  background: white;
  height: 250px;
  min-width: 350px;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
`

const QuestionText = styled.div`
  white-space: nowrap;
  font-size: 1.75rem;
  font-weight: bold;

  &:first-child {
    margin-bottom: 3rem;
  }
`

const GenerateQuestionWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export default function LearningTheFretboard() {

  const [mode, setMode] = React.useState<Mode>('MIX')
  const [strings, setStrings] = React.useState<GuitarString[]>([6]);
  const [question, setQuestion] = React.useState<Question>();
  const [showingAnswer, setShowingAnswer] = React.useState(false);

  const generateNewQuestion = React.useCallback(() => {
    setShowingAnswer(false);
    const newQuestion = generateQuestion(mode, strings);
    setQuestion(newQuestion)
  }, [mode, strings])

  useEffect(() => {
    if (!question) {
      generateNewQuestion()
    }
  }, [question, generateNewQuestion])

  useEffect(() => {
    setShowingAnswer(false);
    setQuestion(generateQuestion(mode, strings))
  }, [mode, strings])

  useEffect(() => {
    function keyListener(e: KeyboardEvent) {
      if (e.target === document.body) {
        if (!showingAnswer) {
          setShowingAnswer(true);
        } else {
          generateNewQuestion()
        }
      }
    }
    document.addEventListener('keypress', keyListener);
    return () => {
      document.removeEventListener('keypress', keyListener);
    }
  }, [showingAnswer, generateNewQuestion])

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Wrapper direction={size === 'small' ? 'column' : 'row'}>
          <Main pad={{ top: 'large' }}>
            <QuestionWrapper>
              {question && (
                <QuestionCard 
                  elevation="small"
                  onClick={() => {
                    if (!showingAnswer) {
                      setShowingAnswer(true);
                    } else {
                      generateNewQuestion();
                    }
                  }}
                >
                  <QuestionText>{question.question}</QuestionText>
                    {
                      showingAnswer 
                      ? (<QuestionText>{question.answer}</QuestionText>) 
                      : (<Button 
                          primary 
                          label="Show"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowingAnswer(true)
                          }} />)
                    }
                </QuestionCard>
              )}
            </QuestionWrapper>
            <GenerateQuestionWrapper>
              <Button onClick={generateNewQuestion} label="Generate Question" secondary />
            </GenerateQuestionWrapper>
          </Main>
          <Settings 
            pad="small" 
            gap="medium"
            border={size === 'small' ? 'top' : 'left'}
          >
            <Heading level="4" size="small" margin={{ top: "small", right: "xlarge", bottom: "none" }}>Settings</Heading>
            <Box 
              gap="medium"
              direction={size === 'small' ? 'row' : 'column'}
            >
              <Box>
                <Text >String</Text>
                <Select
                  options={STRING_OPTIONS}
                  isMulti
                  value={STRING_OPTIONS.filter(option => strings.includes(option.value))}
                  isSearchable={false}
                  onChange={(newStrings) => {
                    if (newStrings.length) {
                      setStrings(newStrings.map(({ value }) => value))
                    }
                  }}
                  isClearable={false}
                />
              </Box>
              <Box>
                <Text>Mode</Text>
                <Select
                  options={MODE_OPTIONS}
                  value={MODE_OPTIONS.find(option => option.value === mode)}
                  onChange={(newMode) => {
                    if (newMode) {
                      setMode(newMode.value);
                    }
                  }}
                  isSearchable={false}
                  isClearable={false}
                />
              </Box>
            </Box>
          </Settings>
        </Wrapper>
      )}
    </ResponsiveContext.Consumer>
  )
}

function generateQuestion(mode: Mode, strings: GuitarString[]): Question {
  const string = strings[getRandomInt(strings.length - 1)];
  switch (mode) {
    case 'FRET': {
      return generateFretQuestion(string);
    }
    case 'NOTE': {
      return generateNoteQuestion(string);
    }
    default: {
      return getRandomInt(1) === 0 
        ? generateFretQuestion(string)
        : generateNoteQuestion(string);
    }
  }
}

function generateFretQuestion(string: GuitarString): Question {
  const fretToGuess = getRandomInt(12) as Fret;
  const noteOnFret = returnNoteForFret(string, fretToGuess);
  return {
    question: `Fret ${fretToGuess} on string ${string}`,
    answer: noteOnFret,
  }
}

function generateNoteQuestion(string: GuitarString): Question {
  const noteToGuess = ALL_NOTES[getRandomInt(11)];
  const fretWithNote = returnFretForNote(string, noteToGuess);

  return {
    question: `Where is ${noteToGuess} on string ${string}`,
    answer: String(fretWithNote),
  }
}

