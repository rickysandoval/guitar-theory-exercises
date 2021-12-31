import { Box, Checkbox, Flex, Text } from '@chakra-ui/react';
import Select from 'react-select';
import { ChordType } from '../../models/Chords';

const CHORD_TYPE_OPTIONS: {
  label: string,
  value: ChordType,
}[] = [{
  label: 'Major',
  value: 'major',
}, {
  label: 'Minor',
  value: 'minor',
}, {
  label: 'Diminished',
  value: 'diminished',
}];


export interface ISettings {
  chordTypes: ChordType[];
  includeAccidentals: boolean;
}

interface IProps {
  settings: ISettings;
  onSettingsChange: (settings: ISettings) => void;
}

export default function BuildingChordsSettings({
  settings,
  onSettingsChange,
}: IProps) {

  const {
    chordTypes,
    includeAccidentals,
  } = settings;
  

  return (
    <Flex
      direction={'column'}
      maxWidth="200px"
      >
        <Box mb="4">
          <Text>Chord Types</Text>
          <Select
            options={CHORD_TYPE_OPTIONS}
            isMulti
            value={CHORD_TYPE_OPTIONS.filter(option => chordTypes.includes(option.value))}
            isSearchable={false}
            onChange={(chordTypeValues) => {
              if (chordTypeValues.length) {
                const newStrings = chordTypeValues.map(({ value }) => value);
                onSettingsChange({
                  ...settings,
                  chordTypes: newStrings,
                });
              }
            }}
            isClearable={false}
          />
        </Box>
        <Box mb="4">
          <Text>Include Accidentals</Text>
          <Checkbox 
            isChecked={includeAccidentals}
            onChange={({ target: { checked } }) => {
              onSettingsChange({
                ...settings,
                includeAccidentals: checked,
              });
            }}
          ></Checkbox>
        </Box>
      </Flex>
  );
}
