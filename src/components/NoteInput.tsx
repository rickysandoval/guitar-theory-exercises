import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { FLAT, FLATTABLE_NOTES, Note, SHARP, SHARPABLE_NOTES } from '../models/Notes';
import * as _ from 'underscore';
import useNoteKeyboardInput from '../hooks/useNoteKeyboardInput';

interface IProps {
  value: Note | undefined;
  correctValue: Note;
  onChange?: (note: Note | undefined) => void;
  onBlur?: () => void;
  includeAccidentalButtons?: boolean;
}
const NoteInput = forwardRef<HTMLInputElement, IProps>(({
  value,
  correctValue,
  onChange,
  onBlur,
  includeAccidentalButtons = true,
}, ref) => {

  const onKeyPress = useNoteKeyboardInput(value, onChange || _.noop);

  const canFlat = value && (
    FLATTABLE_NOTES.includes(value) || value.includes(SHARP)
  );

  const canSharp = value && (
    SHARPABLE_NOTES.includes(value) || value.includes(FLAT)
  );

  return (
    <Flex mt="1" mb="1" p="1" direction="column" textAlign={'center'}>
      <Box display={includeAccidentalButtons && onChange ? 'block' : 'none'}>
        <Button 
          variant={'link'}
          isDisabled={!canSharp}
          onClick={() => {
            if (value?.includes(FLAT)) {
              onChange?.(value.replace(FLAT, '') as Note);
            } else {
              onChange?.(value + SHARP as Note);
            }
          }}
        >{SHARP}</Button>
      </Box>
      <Input
        ref={ref}
        type="text" 
        onKeyUp={onKeyPress}
        onChange={_.noop} 
        onBlur={onBlur}
        width={'3em'}
        background="white"
        isInvalid={value && value !== correctValue}
        value={value || ''}
        pointerEvents={onChange ? 'auto' : 'none'}
        errorBorderColor='red.300'
        p="0"
        textAlign={'center'}
      />
      <Box display={includeAccidentalButtons && onChange ? 'block' : 'none'}>
        <Button 
          variant={'link'}
          isDisabled={!canFlat}
          onClick={() => {
            if (value?.includes(SHARP)) {
              onChange?.(value.replace(SHARP, '') as Note);
            } else {
              onChange?.(value + FLAT as Note);
            }
          }}
        >{FLAT}</Button>
      </Box>
    </Flex>
  );
});
export default NoteInput;
