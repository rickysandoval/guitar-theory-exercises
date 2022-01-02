import { Flex, Input } from '@chakra-ui/react';
import { forwardRef } from 'react';
import * as _ from 'underscore';
import { Fret } from '../models/Frets';
import useFretKeyboardInput from '../hooks/useFretKeyboardInput';

interface IProps {
  value: Fret | undefined;
  correctValue: Fret;
  onChange?: (fret: Fret | undefined) => void;
  onBlur?: () => void;
}
const FretInput = forwardRef<HTMLInputElement, IProps>(({
  value,
  correctValue,
  onChange,
  onBlur,
}, ref) => {

  const onKeyPress = useFretKeyboardInput(value, onChange || _.noop);

  return (
    <Flex mt="1" mb="1" p="1" direction="column" textAlign={'center'}>
      <Input
        ref={ref}
        type="text" 
        onKeyUp={onKeyPress}
        onChange={_.noop} 
        onBlur={onBlur}
        width={'3em'}
        background="white"
        isInvalid={value !== undefined && value !== correctValue}
        value={value !== undefined ? value : ''}
        pointerEvents={onChange ? 'auto' : 'none'}
        errorBorderColor='red.300'
        p="0"
        textAlign={'center'}
      />
    </Flex>
  );
});
export default FretInput;
