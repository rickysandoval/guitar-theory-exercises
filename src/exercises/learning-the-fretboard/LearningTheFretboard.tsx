/* eslint-disable @typescript-eslint/no-use-before-define */
import { Button, Flex } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import SettingsPanel from '../../components/SettingsPanel';
import ExerciseContainer from '../ExerciseContainer';
import ExerciseHeading from '../ExerciseHeading';
import FretboardQuestionGenerator, { FretboardQuestion } from './FretboardQuestionGenerator';
import LearningTheFretboardSettings, { ISettings } from './LearningTheFretboardSettings';

const SETTINGS_STORAGE_KEY = 'learning-the-fretboard-settings';

const storedSettings = getInitialSettings();

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

  const [settings, setSettings] = useState<ISettings>(storedSettings);
  const [question, setQuestion] = useState<FretboardQuestion>();
  const [showingAnswer, setShowingAnswer] = useState(false);

  const generateNewQuestion = useCallback(() => {
    setShowingAnswer(false);
    const {
      mode, strings, fretRange, includeAccidentals,
    } = settings;
    const newQuestion = FretboardQuestionGenerator
      .generateRandomQuestion(mode, strings, fretRange, includeAccidentals);
    setQuestion(newQuestion);
  }, [settings]);

  useEffect(() => {
    if (!question) {
      generateNewQuestion();
    }
  }, [question, generateNewQuestion]);

  useEffect(() => {
    setShowingAnswer(false);
    const {
      mode, strings, fretRange, includeAccidentals,
    } = settings;
    setQuestion(FretboardQuestionGenerator.generateRandomQuestion(mode, strings, fretRange, includeAccidentals));
  }, [settings]);

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

  useEffect(() => {
    return () => {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    };
  }, [settings]);

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
        <LearningTheFretboardSettings
          settings={settings}
          onSettingsChange={setSettings}
        />
      </SettingsPanel>
    </Flex>
  );
}

function getInitialSettings(): ISettings {
  try {
    const settings = JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) || '');
    if (!settings) {
      throw new Error();
    }
    return settings;
  } catch (e) {
    return {
      mode: 'MIX',
      strings: [6],
      fretRange: [0, 12],
      includeAccidentals: true,
    };
  }
}
