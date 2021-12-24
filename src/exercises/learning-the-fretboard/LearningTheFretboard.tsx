/* eslint-disable @typescript-eslint/no-use-before-define */
import { Button, Flex, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components/macro';
import SettingsPanel from '../../components/SettingsPanel';
import { ALL_STRINGS, GuitarString } from '../../models/Strings';
import FretboardQuestionGenerator, { FretboardQuestion, FretboardQuizMode } from './FretboardQuestionGenerator';

const MODE_LOCAL_STORAGE_KEY = 'FRETBOARD_QUESTION_MODE';
const STRINGS_LOCAL_STORAGE_KEY = 'FRETBOARD_STRINGS';

const MODE_OPTIONS = [{
  label: 'Note',
  value: 'NOTE' as FretboardQuizMode,
}, {
  label: 'Fret',
  value: 'FRET' as FretboardQuizMode,
}, {
  label: 'Mix',
  value: 'MIX' as FretboardQuizMode,
}];

const STRING_OPTIONS = ALL_STRINGS.map(s => ({
  value: s,
  label: s,
}));

const QuestionWrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;

const QuestionCard = styled(Flex)`
  padding: 4rem 2rem;
  border-radius: 4px;
  display: inline-flex;
  flex-direction: column;
  white-space: nowrap;
  text-align: center;
  background: white;
  height: 250px;
  min-width: 350px;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
`;

const QuestionText = styled.div`
  white-space: nowrap;
  font-size: 1.75rem;
  font-weight: bold;

  &:first-child {
    margin-bottom: 3rem;
  }
`;

const GenerateQuestionWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default function LearningTheFretboard() {

  const [mode, setMode] = useState<FretboardQuizMode>(getInitialMode());
  const [strings, setStrings] = useState<GuitarString[]>(getInitialStrings());
  const [question, setQuestion] = useState<FretboardQuestion>();
  const [showingAnswer, setShowingAnswer] = useState(false);

  const generateNewQuestion = useCallback(() => {
    setShowingAnswer(false);
    const newQuestion = FretboardQuestionGenerator
      .generateRandomQuestion(mode, strings);
    setQuestion(newQuestion);
  }, [mode, strings]);

  useEffect(() => {
    if (!question) {
      generateNewQuestion();
    }
  }, [question, generateNewQuestion]);

  useEffect(() => {
    setShowingAnswer(false);
    setQuestion(FretboardQuestionGenerator.generateRandomQuestion(mode, strings));
  }, [mode, strings]);

  useEffect(() => {
    function keyListener(e: KeyboardEvent) {
      if (e.target === document.body) {
        if (!showingAnswer) {
          setShowingAnswer(true);
        } else {
          generateNewQuestion();
        }
      }
    }
    document.addEventListener('keypress', keyListener);
    return () => {
      document.removeEventListener('keypress', keyListener);
    };
  }, [showingAnswer, generateNewQuestion]);

  return (
    <Flex height="100%">
      <Flex flex="1" direction="column" pt="7">
        <QuestionWrapper>
          {question && (
            <QuestionCard
              boxShadow="base"
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
                    : (
                    <Button 
                      colorScheme={'brand'}
                      variant="solid"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowingAnswer(true);
                      }}>
                        Show Answer
                      </Button>
                    )
                }
            </QuestionCard>
          )}
        </QuestionWrapper>
        <GenerateQuestionWrapper>
          <Button  
            colorScheme={'brand'}
            variant="outline" 
            bg="white"
            onClick={generateNewQuestion}
          >Generate Question</Button>
        </GenerateQuestionWrapper>
      </Flex>
      <SettingsPanel>
        <Flex 
          direction={'column'}
          >
            <Flex>
              <Text >String</Text>
              <Select
                options={STRING_OPTIONS}
                isMulti
                value={STRING_OPTIONS.filter(option => strings.includes(option.value))}
                isSearchable={false}
                onChange={(stringValues) => {
                  if (stringValues.length) {
                    const newStrings = stringValues.map(({ value }) => value);
                    setLocalStrings(newStrings);
                    setStrings(newStrings);
                  }
                }}
                isClearable={false}
              />
            </Flex>
            <Flex>
              <Text>Mode</Text>
              <Select
                options={MODE_OPTIONS}
                value={MODE_OPTIONS.find(option => option.value === mode)}
                onChange={(modeOption) => {
                  if (modeOption) {
                    setLocalModal(modeOption.value);
                    setMode(modeOption.value);
                  }
                }}
                isSearchable={false}
                isClearable={false}
              />
            </Flex>
          </Flex>
      </SettingsPanel>
    </Flex>
  );
}

function getInitialMode() {
  return localStorage.getItem(MODE_LOCAL_STORAGE_KEY) as FretboardQuizMode || 'MIX';
}

function setLocalModal(mode: FretboardQuizMode) {
  localStorage.setItem(MODE_LOCAL_STORAGE_KEY, mode); 
}

function getInitialStrings(): GuitarString[] {
  const defaultReturn: GuitarString[] = [6];
  try {
    const localStoredList = localStorage.getItem(STRINGS_LOCAL_STORAGE_KEY);
    const storedStrings = localStoredList?.split(',')
      .map((s) => Number(s))
      .filter(n => !Number.isNaN(n))
      .filter(n => ALL_STRINGS.includes(n as GuitarString));
    return storedStrings && storedStrings?.length > 0
      ? storedStrings as GuitarString[]
      : defaultReturn;
  } catch (e) {
    return defaultReturn;
  }
}

function setLocalStrings(strings: GuitarString[]) {
  localStorage.setItem(STRINGS_LOCAL_STORAGE_KEY, strings.join(','));
}
