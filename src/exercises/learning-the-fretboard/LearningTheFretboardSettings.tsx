import { Box, Checkbox, Flex, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text } from '@chakra-ui/react';
import Select from 'react-select';
import { Fret } from '../../models/Frets';
import { ALL_STRINGS, GuitarString } from '../../models/Strings';
import { FretboardQuizMode } from './FretboardQuestionGenerator';
import * as _ from 'underscore';

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


export interface ISettings {
  strings: GuitarString[];
  mode: FretboardQuizMode;
  fretRange: [Fret, Fret];
  includeAccidentals: boolean;
}

interface IProps {
  settings: ISettings;
  onSettingsChange: (settings: ISettings) => void;
}

export default function LearningTheFretboardSettings({
  settings,
  onSettingsChange,
}: IProps) {

  const {
    strings,
    mode,
    fretRange,
    includeAccidentals,
  } = settings;
  

  return (
    <Flex
      direction={'column'}
      maxWidth="200px"
      >
        <Box mb="4">
          <Text>String(s)</Text>
          <Select
            options={STRING_OPTIONS}
            isMulti
            value={STRING_OPTIONS.filter(option => strings.includes(option.value))}
            isSearchable={false}
            onChange={(stringValues) => {
              if (stringValues.length) {
                const newStrings = stringValues.map(({ value }) => value);
                onSettingsChange({
                  ...settings,
                  strings: newStrings,
                });
              }
            }}
            isClearable={false}
          />
        </Box>
        <Box mb="4">
          <Text>Mode</Text>
          <Select
            options={MODE_OPTIONS}
            value={MODE_OPTIONS.find(option => option.value === mode)}
            onChange={(modeOption) => {
              if (modeOption) {
                onSettingsChange({
                  ...settings,
                  mode: modeOption.value,
                });
              }
            }}
            isSearchable={false}
            isClearable={false}
          />
        </Box>
        <Box mb="4" position="relative" zIndex="0">
          <Text>Fret Range</Text>
          <Box textAlign="center">
            <Text>{fretRange[0]} - {fretRange[1]}</Text>
            <RangeSlider
              onChange={(newRange: [Fret, Fret]) => {
                if (!_.isEqual(newRange, fretRange)) {
                  onSettingsChange({
                    ...settings,
                    fretRange: newRange,
                  });
                }
              }}
              min={0} 
              max={12} 
              defaultValue={fretRange}
              step={1}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
          </Box>
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
