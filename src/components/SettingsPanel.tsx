import { SettingsIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import styled, { css } from 'styled-components/macro';

const SettingsDrawer = styled(Box)<{ isOpen: boolean }>`
  position: absolute;
  height: 100%;
  width: 100vw;
  top: 0;
  right: 0;
  background: white;
  transform: translateX(100%);
  ${({ isOpen }) => isOpen && css`
    transform: translateX(0);
  `}
`;

export default function SettingsPanel({
  children,
}: React.PropsWithChildren<{}>){
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box height="100%" position="relative" pt="2" pr="2">
      <div>
        <IconButton 
          position="relative"
          zIndex={5}
          aria-label="Exercise Settings" 
          icon={<SettingsIcon />}
          onClick={() => setIsOpen(!isOpen)}
          colorScheme={'brand'}
        />
      </div>
      <SettingsDrawer 
        isOpen={isOpen}
        shadow="base"
        pt="12"
        pl="4"
        pr="4"
        overflow="auto"
      >
        {children}
      </SettingsDrawer>
    </Box>
  );
}
