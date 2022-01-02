import { Box, Button, Flex } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import styled from 'styled-components/macro';
import { Fret } from '../../models/Frets';
import { GuitarString } from '../../models/Strings';
import { FretboardQuestion } from './FretboardQuestionGenerator';


const frets = new Array(12).fill(null).map((v, i) => i + 1 as Fret);

const strings: GuitarString[] = [1, 2, 3, 4, 5, 6];

const DotWrapper = ({
  children,
}: PropsWithChildren<{}>) => (
  <Box
    position="absolute"
    top="calc(50% + 2px)"
    left="50%"
    transform="translate(-50%,-50%)"
  >
    {children}
    </Box>
);

const Dots = (fret: Fret) => {
  if ([3, 5, 7, 9].includes(fret)) {
    return (
      <DotWrapper>
        <span>*</span>
      </DotWrapper>
    );
  }
  if (fret === 12) {
    return (
      <DotWrapper>
        <Flex direction="column">
          <span>*</span>
          <span>*</span>
        </Flex>
      </DotWrapper>
    );
  }
  return null;
};

const FretButton = styled(Button)`
  &:hover {
    background: rgba(0,0,0,.1);
  }
`;

interface IProps {
  question: FretboardQuestion;
  onChoseFret: (fret: Fret) => void;
}

export default function LearningTheFretboardVisual({
  question,
  onChoseFret,
}: IProps) {

  return (
    <Box 
      position="relative"
      bg="gray.100"
      borderTop="1px"
      borderBottom="1px"
      borderColor="gray.200"
      maxWidth="800px"
    >
      <Flex borderLeft="1px" borderColor="gray.400">
        {frets.map((fret) => (
          <Box key={fret} flex="1" borderRight="1px" borderColor="gray.400" height="0" pb="12.5%" position="relative">
            {Dots(fret)}
          </Box>
        ))}
      </Flex>
      <Flex 
        direction="column" 
        justifyContent="space-around"
        position="absolute"
        left="0"
        top="0"
        width="100%"
        height="100%"
      >
        {strings.map(string => (
          <Box 
            key={string} 
            height="0" 
            borderTop="1px"
            borderBottom="none"
            borderWidth={(string === question.string) ? '2px' : '1px'}
            borderColor={(string === question.string) ? 'green.500' : 'gray.500'}
          />
        ))}
      </Flex>
      {question.mode === 'FRET' && (
        <Box 
          position="absolute"
          borderColor="green.500"
          bg='green.500'
          borderRadius={'50%'}
          height="10px"
          width="10px"
          boxSizing="content-box"
          left={question.fret > 0 ? `calc(((100%/12) * ${question.fret - 1})  + (100%/24))` : 0}
          top={`calc((100%/12) * ${(question.string - 1) * 2 + 1})`}
          transform={'translate(-50%, -50%)'}
        />
      )}
      {question.mode === 'NOTE' && (
        <>
        <Box 
          position="absolute"
          left="0"
          top={`calc((100%/12) * ${(question.string - 1) * 2 + 1})`}
          transform={'translate(-100%, -50%)'}
        >
          <FretButton 
            flex="1" 
            variant="unstyled"
            height="15px"
            width="20px"
            border-radius=""
            display="block"
            margin="0"
            onClick={() => onChoseFret(0)}
            minWidth="none"
          />
        </Box>
        <Flex 
          position="absolute"
          left="0"
          width="100%"
          top={`calc((100%/12) * ${(question.string - 1) * 2 + 1})`}
          transform={'translateY(-50%)'}
        >
          {frets.map((fret) => (
            <Box pl="1" pr="1" flex="1" key={fret}>
              <FretButton 
                key={fret} 
                flex="1" 
                variant="unstyled"
                height="15px"
                border-radius=""
                display="block"
                margin="0"
                onClick={() => onChoseFret(fret)}
                width="100%"
              />
            </Box>
          ))}
        </Flex>
        </>
      )}
    </Box>
  );
}
