import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import styled from 'styled-components/macro';
import { Note } from '../models/Notes';

const PianoWrapper = styled(Box)`
  display: block;
  width: 100%;
  max-width: 400px;
  position: relative;
`;


const WhiteKey = ({
  children,
  ...rest
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <Button 
      {...rest}
      variant={'ghost'}
      border="1px"
      border-color="gray.100"
      flex="1"
      borderRadius={0}
      pt="40%"
      pb="20px"
    >{children}</Button>
  );
};

const BlackKeyButton = styled(Button)`
  position: relative;
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0; 
    bottom: 0;
    background: rgba(0,0,0);
    z-index: -1;
  }

  &:focus,&:hover {
    &:before {
      background: rgba(100,100,100);
    }
  }
`;

const BlackKey = ({
  children,
  ...rest
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
      <BlackKeyButton 
        {...rest}
        variant={'solid'}
        colorScheme="blackAlpha"
        borderRadius={0}
        height="200%"
        flexDir={'column'}
        paddingInlineStart={0}
        paddingInlineEnd={0}
        flexBasis={0}
        minWidth={0}
        flex="2"
      >{children}</BlackKeyButton>
  );
};

interface IProps {
  onChange: (note: Note) => void;
  className?: string;
}

export default function PianoInput({
  onChange,
  className,
}: IProps) {

  return (
    <PianoWrapper 
      className={className}
      border="1px"
      border-color="gray.100"
      position="relative"
    >
      <Flex
        position={'absolute'}
        top={0}
        height={'33%'}
        left={'calc((100%/21) * 2)'}
        right={'calc((100%/21) * 2)'}
        zIndex="1"
      >
        <BlackKey onClick={() => onChange('C♯')}>
          <span>D♭</span>
          <span>C♯</span>
        </BlackKey>
        <Spacer flex="1"/>
        <BlackKey onClick={() => onChange('D♯')}>
          <span>E♭</span>
          <span>D♯</span>
        </BlackKey>
        <Spacer flex="1" />
        <Spacer flex="2" pointerEvents={'none'}/>
        <Spacer flex="1" />
        <BlackKey onClick={() => onChange('F♯')}>
          <span>G♭</span>
          <span>F♯</span>
        </BlackKey>
        <Spacer flex="1" />
        <BlackKey onClick={() => onChange('G♯')}>
          <span>A♭</span>
          <span>G♯</span>
        </BlackKey>
        <Spacer flex="1" />
        <BlackKey onClick={() => onChange('A♯')}>
          <span>B♭</span>
          <span>A♯</span>
        </BlackKey>
      </Flex>
      <Flex>
        <WhiteKey onClick={() => onChange('C')}>C</WhiteKey>
        <WhiteKey onClick={() => onChange('D')}>D</WhiteKey>
        <WhiteKey onClick={() => onChange('E')}>E</WhiteKey>
        <WhiteKey onClick={() => onChange('F')}>F</WhiteKey>
        <WhiteKey onClick={() => onChange('G')}>G</WhiteKey>
        <WhiteKey onClick={() => onChange('A')}>A</WhiteKey>
        <WhiteKey onClick={() => onChange('B')}>B</WhiteKey>
      </Flex>
    </PianoWrapper>
  );
}
