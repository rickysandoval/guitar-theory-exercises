import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useMemo, useRef, useState } from 'react';
import NoteInput from '../../components/NoteInput';
import PianoInput from '../../components/PianoInput';
import SettingsPanel from '../../components/SettingsPanel';
import { Chord } from '../../models/Chords';
import { generateRandomChord } from '../../utils/chord-utils';
import ExerciseContainer from '../ExerciseContainer';
import ExerciseHeading from '../ExerciseHeading';
import { Note } from '../../models/Notes';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

const defaultChord = generateRandomChord(undefined, ['major']);

export default function BuildingChords() {
  const [chord, setChord] = useState<Chord>(defaultChord);
  const [third, setThird] = useState<Note | undefined>();
  const [fifth, setFifth] = useState<Note | undefined>();
  const [thirdFocused, setThirdFocused] = useState(false);
  const [fifthFocused, setFifthFocused] = useState(false);
  const thirdInputRef = useRef<HTMLInputElement>(null);
  const fifthInputRef = useRef<HTMLInputElement>(null);
  const nextQuestionButtonRef = useRef<HTMLButtonElement>(null);

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

  const generateNewChord = () => {
    setChord(generateRandomChord(chord ? chord.notes.slice(0, 1) : [], ['major']));
    setFifth(undefined);
    setThird(undefined);
    setFifthFocused(false);
    setThirdFocused(false);
    thirdInputRef.current?.focus();
  };

  return (
    <Flex height="100%">
      <Flex flex="1" direction="column">
        <ExerciseHeading title="Building Chords">Directions: Build out the triad/chord starting with the given note.</ExerciseHeading>
        <ExerciseContainer>
          <Heading as="h2" size="md" textTransform="capitalize">
            <Box fontWeight={'normal'} display="inline-block">Build Chord:</Box> {chord.notes[0]} {chord.type}</Heading>
          <Flex  mt="5" mb="5" alignItems={'flex-start'} >
            <Flex direction="column" display="inline-flex" alignItems={'center'}>
              <Flex display="inline-flex" alignItems="center">
                <NoteInput 
                  value={chord.notes[0]}
                  correctValue={chord.notes[0]}
                />
                <NoteInput 
                  value={third} 
                  onChange={(newThird) => {
                    setThird(newThird);
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
              <Box mb="2" textAlign="center">
                <Button 
                  rightIcon={<ArrowRightIcon />} 
                  leftIcon={<ArrowLeftIcon />} 
                  variant="ghost" 
                  colorScheme="brand"
                  onClick={generateNewChord}
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
        Settings
      </SettingsPanel>
    </Flex>
  );
}
