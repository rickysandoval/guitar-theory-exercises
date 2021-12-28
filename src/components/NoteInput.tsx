import { Box, Input } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { Note } from '../models/Notes';
import * as _ from 'underscore';
import useNoteKeyboardInput from '../hooks/useNoteKeyboardInput';

interface IProps {
  value: Note | undefined;
  correctValue: Note;
  onChange?: (note: Note | undefined) => void;
  onBlur?: () => void;
}
const NoteInput = forwardRef<HTMLInputElement, IProps>(({
  value,
  correctValue,
  onChange,
  onBlur,
}, ref) => {

  const onKeyPress = useNoteKeyboardInput(value, onChange || _.noop);

  return (
    <Box mt="5" mb="5" p="1">
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
    </Box>
  );
});
export default NoteInput;
