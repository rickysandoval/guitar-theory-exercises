/* eslint-disable @typescript-eslint/no-use-before-define */
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components/macro';
import SettingsPanel from '../../components/SettingsPanel';
import { ALL_STRINGS, GuitarString } from '../../models/Strings';
import ExerciseContainer from '../ExerciseContainer';
import ExerciseHeading from '../ExerciseHeading';
import FretboardQuestionGenerator, { FretboardQuestion, FretboardQuizMode } from './FretboardQuestionGenerator';

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
      <Flex flex="1" direction="column">
        <ExerciseHeading title="Learning The Fretboard"></ExerciseHeading>
        <ExerciseContainer>
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
        </ExerciseContainer>
      </Flex>
      <SettingsPanel>
        <Flex 
          direction={'column'}
          maxWidth="200px"
          >
            <Box pb="4">
              <Text>String</Text>
              <Select
                options={STRING_OPTIONS}
                isMulti
                value={STRING_OPTIONS.filter(option => strings.includes(option.value))}
                isSearchable={false}
                onChange={(stringValues) => {
                  if (stringValues.length) {
                    const newStrings = stringValues.map(({ value }) => value);
                    setStrings(newStrings);
                  }
                }}
                isClearable={false}
              />
            </Box>
            <Box pb="4">
              <Text>Mode</Text>
              <Select
                options={MODE_OPTIONS}
                value={MODE_OPTIONS.find(option => option.value === mode)}
                onChange={(modeOption) => {
                  if (modeOption) {
                    setMode(modeOption.value);
                  }
                }}
                isSearchable={false}
                isClearable={false}
              />
            </Box>
          </Flex>
      </SettingsPanel>
    </Flex>
  );
}

function getInitialMode(): FretboardQuizMode {
  return 'MIX';
}


function getInitialStrings(): GuitarString[] {
  const defaultReturn: GuitarString[] = [6];
  return defaultReturn; 
}
