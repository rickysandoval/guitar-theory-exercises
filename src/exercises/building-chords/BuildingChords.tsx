import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import NoteInput from '../../components/NoteInput';
import PianoInput from '../../components/PianoInput';
import SettingsPanel from '../../components/SettingsPanel';
import { Chord } from '../../models/Chords';
import { generateRandomChord } from '../../utils/chord-utils';
import ExerciseContainer from '../ExerciseContainer';
import ExerciseHeading from '../ExerciseHeading';
import { ALL_ACCIDENTALS, Note } from '../../models/Notes';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import BuildingChordsSettings, { ISettings } from './BuildingChordsSettings';

const SETTINGS_STORAGE_KEY = 'building-chords-settings';

function getInitialSettings(): ISettings {
  try {
    const settings = JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) || '');
    if (!settings) {
      throw new Error();
    }
    return settings;
  } catch (e) {
    return {
      chordTypes: ['major'],
      includeAccidentals: true,
    };
  }
}

const generateChord = (settings: ISettings, oldChord?: Chord) => {
  const exclude = !settings.includeAccidentals ? [...ALL_ACCIDENTALS] : [];
  if (oldChord) {
    exclude.push(...oldChord.notes.slice(0, 1));
  }
  const newChord = generateRandomChord(exclude, settings.chordTypes);
  return newChord;
};

const initialSettings = getInitialSettings();

const defaultChord = generateChord(initialSettings);


export default function BuildingChords() {
  const [chord, setChord] = useState<Chord>(defaultChord);
  const [third, setThird] = useState<Note | undefined>();
  const [fifth, setFifth] = useState<Note | undefined>();
  const [thirdFocused, setThirdFocused] = useState(false);
  const [fifthFocused, setFifthFocused] = useState(false);
  const thirdInputRef = useRef<HTMLInputElement>(null);
  const fifthInputRef = useRef<HTMLInputElement>(null);
  const nextQuestionButtonRef = useRef<HTMLButtonElement>(null);

  const [settings, setSettings] = useState<ISettings>(initialSettings);

  const onPianoInput = (note: Note) => {
    if (!third) {
      setThird(note);
      setThirdFocused(true);
      fifthInputRef.current?.focus();
    } else if (!fifth) {
      setFifth(note);
      setFifthFocused(true);
      nextQuestionButtonRef.current?.focus();
    }
  };

  const isCorrect = useMemo(() => {
    const thirdIsRight = third && third === chord.notes[1];
    const fifthIsRight = fifth && fifth === chord.notes[2];
    return thirdIsRight && fifthIsRight;
  }, [chord.notes, fifth, third]);

  const isIncorrect = useMemo(() => {
    const thirdIsWrong =  third !== chord.notes[1];
    const fifthIsWrong =  fifth !== chord.notes[2];
    return third && fifth && thirdFocused && fifthFocused && (thirdIsWrong || fifthIsWrong);
  }, [chord.notes, fifth, third, thirdFocused, fifthFocused]);

  const revealAnswer = () => {
    setThird(chord.notes[1]);
    setFifth(chord.notes[2]);
  };

  const generateNewChord = useCallback((withSettings: ISettings, oldChord: Chord) => {
    setChord(generateChord(withSettings, oldChord));

    setFifth(undefined);
    setThird(undefined);
    setFifthFocused(false);
    setThirdFocused(false);
    thirdInputRef.current?.focus();
  }, []);

  useEffect(() => {
    generateChord(settings, chord);
  }, [settings]);

  useEffect(() => {
    return () => {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    };
  }, [settings]);

  return (
    <Flex height="100%">
      <Flex flex="1" direction="column">
        <ExerciseHeading title="Building Chords">Directions: Build out the triad/chord starting with the given note.</ExerciseHeading>
        <ExerciseContainer>
          <Flex  mt="5" mb="5" alignItems={'flex-start'} >
            <Flex direction="column" display="inline-flex" alignItems={'center'}>
              <Heading  mb="5" as="h2" size="xl" textTransform="capitalize">{chord.notes[0]} {chord.type}</Heading>
              <Flex display="inline-flex" alignItems="center">
                <NoteInput 
                  value={chord.notes[0]}
                  correctValue={chord.notes[0]}
                  includeAccidentalButtons={false}
                />
                <NoteInput 
                  value={third} 
                  onChange={(newThird) => {
                    setThird(newThird);
                    thirdInputRef.current?.focus();
                    if (newThird === chord.notes[1]) {
                      setThirdFocused(true);
                      fifthInputRef.current?.focus();
                    }
                  }}
                  onBlur={() => setThirdFocused(true)}
                  correctValue={chord.notes[1]}
                  ref={thirdInputRef}
                />
                <NoteInput 
                  value={fifth} 
                  onChange={(newFifth) => {
                    setFifth(newFifth);
                    fifthInputRef.current?.focus();
                    if (newFifth === chord.notes[2]) {
                      setThirdFocused(true);
                      nextQuestionButtonRef.current?.focus();
                    }
                  }}
                  onBlur={() => setFifthFocused(true)}
                  correctValue={chord.notes[2]}
                  ref={fifthInputRef}
                />
              </Flex>
              <Box textAlign={'center'} mt="1" mb="2">
                <Button variant="link" colorScheme="brand" onClick={revealAnswer}>Reveal Answer</Button>
              </Box>
              <Box mb="10" textAlign="center">
                <Button 
                  rightIcon={<ArrowRightIcon />} 
                  leftIcon={<ArrowLeftIcon />} 
                  variant="ghost" 
                  colorScheme="brand"
                  onClick={() => generateNewChord(settings, chord)}
                  ref={nextQuestionButtonRef}
                >New Chord</Button>
              </Box>
              <PianoInput onChange={onPianoInput} />
            </Flex>
            <Flex alignItems={'center'} ml="4" mt="4">
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
          </Flex>
        </ExerciseContainer>
      </Flex>
      <SettingsPanel>
        <BuildingChordsSettings
          settings={settings}
          onSettingsChange={setSettings}
        />
      </SettingsPanel>
    </Flex>
  );
}
