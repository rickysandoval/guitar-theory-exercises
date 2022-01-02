import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import FretInput from '../../components/FretInput';
import NoteInput from '../../components/NoteInput';
import SettingsPanel from '../../components/SettingsPanel';
import { Fret } from '../../models/Frets';
import { Note } from '../../models/Notes';
import ExerciseContainer from '../ExerciseContainer';
import ExerciseHeading from '../ExerciseHeading';
import FretboardQuestionGenerator, { FretboardQuestion } from './FretboardQuestionGenerator';
import LearningTheFretboardSettings, { ISettings } from './LearningTheFretboardSettings';
import LearningTheFretboardVisual from './LearningTheFretboardVisual';

const SETTINGS_STORAGE_KEY = 'learning-the-fretboard-settings';

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

const storedSettings = getInitialSettings();

const initialQuestion = FretboardQuestionGenerator.generateRandomQuestion(storedSettings);


export default function LearningTheFretboard() {

  const [settings, setSettings] = useState<ISettings>(storedSettings);
  const [question, setQuestion] = useState<FretboardQuestion>(initialQuestion);
  const [noteAnswer, setNoteAnswer] = useState<Note | undefined>();
  const [fretAnswer, setFretAnswer] = useState<Fret | undefined>();
  const [noteFocused, setNoteFocused] = useState(false);
  const [fretFocused, setFretFocused] = useState(false);
  const noteInputRef = useRef<HTMLInputElement>(null);
  const fretInputRef = useRef<HTMLInputElement>(null);
  const nextQuestionButtonRef = useRef<HTMLButtonElement>(null);

  const generateNewQuestion = useCallback((withSettings: ISettings) => {
    setNoteAnswer(undefined);
    setFretAnswer(undefined);
    setNoteFocused(false);
    setFretFocused(false);
    const newQuestion = FretboardQuestionGenerator
      .generateRandomQuestion(withSettings);
    setQuestion(newQuestion);
    noteInputRef.current?.focus();
  }, []);


  const isCorrect: boolean = useMemo(() => {
    if (question?.mode === 'FRET') {
      return question?.note === noteAnswer;
    }
    if (question?.mode === 'NOTE') {
      return question?.fret === fretAnswer;
    }
    return false;
  }, [question, noteAnswer, fretAnswer]);

  const isIncorrect: boolean = useMemo(() => {
    if (question?.mode === 'FRET') {
      return !!noteAnswer && question?.note !== noteAnswer && noteFocused;
    }
    if (question?.mode === 'NOTE') {
      return !!fretAnswer && question?.fret !== fretAnswer && fretFocused;
    }
    return false;
  }, [question, noteAnswer, fretAnswer, noteFocused, fretFocused]);

  useEffect(() => {
    generateNewQuestion(settings);
  }, [settings, generateNewQuestion]);


  useEffect(() => {
    return () => {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    };
  }, [settings]);

  const revealAnswer = () => {
    if (question) {
      setFretAnswer(question.fret);
      setNoteAnswer(question.note);
    }
  };

  return (
    <Flex height="100%">
      <Flex flex="1" direction="column">
        <ExerciseHeading title="Learning The Fretboard"></ExerciseHeading>
        <Box maxWidth="800px">
          <ExerciseContainer>
          {question?.mode === 'FRET' && (
            <Heading  mb="4" as="h2" size="lg">Fret <strong>{question.fret}</strong>, String <strong>{question.string}</strong></Heading>
          )}
          {question?.mode === 'NOTE' && (
            <Heading  mb="4" as="h2" size="lg"><strong>{question.note}</strong> on String <strong>{question.string}</strong></Heading>
          )}
          {question && (
            <Box mb="5" display={{ base: 'none', sm: 'block' }}>
              <LearningTheFretboardVisual 
                question={question} 
                onChoseFret={answer => {
                  console.log(answer);
                  setFretAnswer(answer);
                  if (answer === question.fret) {
                    nextQuestionButtonRef.current?.focus();
                  }
                }}
              />
            </Box>
          )}
            <Flex alignItems="flex-start">
              <Flex alignItems="center" direction="column" flex="1">
                <Box position="relative">
                {question?.mode === 'FRET' && (
                  <NoteInput 
                    correctValue={question.note} 
                    value={noteAnswer}
                    onChange={answer => {
                      setNoteAnswer(answer);
                      if (answer === question.note) {
                        nextQuestionButtonRef.current?.focus();
                      }
                    }}
                    includeAccidentalButtons={settings.includeAccidentals}
                    ref={noteInputRef}
                    onBlur={() => setNoteFocused(true)}
                  />
                )}
                {question?.mode === 'NOTE' && (
                  <FretInput 
                    correctValue={question.fret} 
                    value={fretAnswer}
                    onChange={answer => {
                      setFretAnswer(answer);
                      if (answer === question.fret) {
                        nextQuestionButtonRef.current?.focus();
                      }
                    }}
                    ref={fretInputRef}
                    onBlur={() => setFretFocused(true)}
                  />
                )}
                  <Flex 
                    alignItems={'center'} 
                    position={'absolute'}
                    left="100%"
                    top="50%"
                    transform="translateY(-50%)"
                    pl="2"
                  >
                    {isCorrect && (
                      <>
                        <CheckIcon color="green.500" mr="2"/>
                        <Text color="green.500">Correct!</Text>
                      </>
                    )}
                    {isIncorrect && (
                      <>
                        <CloseIcon color="red.500" mr="2"/>
                        <Text color="red.500">Incorrect</Text>
                      </>
                    )}
                  </Flex>
                </Box>
                <Box textAlign={'center'} mt="1" mb="2">
                  <Button variant="link" colorScheme="brand" onClick={revealAnswer}>Reveal Answer</Button>
                </Box>
                <Box mb="10" textAlign="center">
                  <Button 
                    rightIcon={<ArrowRightIcon />} 
                    leftIcon={<ArrowLeftIcon />} 
                    variant="ghost" 
                    colorScheme="brand"
                    onClick={() => generateNewQuestion(settings)}
                    ref={nextQuestionButtonRef}
                  >Next</Button>
                </Box>
              </Flex>
            </Flex>
          </ExerciseContainer>
        </Box>
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
