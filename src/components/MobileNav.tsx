import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, Button, IconButton } from '@chakra-ui/react';
import { PropsWithChildren, useState } from 'react';

const NavLink = ({ href, children, onClick }: PropsWithChildren<{ href: string, onClick?: () => void }>) => (
  <Button as="a" href={href} p="4" variant="ghost" borderRadius={0} justifyContent={'flex-start'} onClick={onClick}>{children}</Button>
);

export default function MobileNav() {
  const [showExercises, setShowExercises] = useState(false);
  return (
    <Box 
      pt={1} 
      background="gray.50" 
      borderTop="1px" 
      borderColor="gray.100"
      width="100%"
      display={{
        base: 'block',
        md: 'none',
      }}
    >
      <Flex
        position="relative"
      >
        {showExercises && (
          <Flex 
            direction="column"
            position="absolute"
            bottom="100%"
            left="0"
            right="0"
            borderTop="1px" 
            borderColor="gray.100"
            background="white"
          >
            <NavLink href="/exercises/learning-the-fretboard" onClick={() => setShowExercises(false)}>Learning The Fretboard</NavLink>
            <NavLink href="/exercises/building-chords" onClick={() => setShowExercises(false)}>Building Chords</NavLink>
          </Flex>
        )}
        <Box p="1">
          <IconButton 
            colorScheme={'brand'}
            aria-label="Exercises" 
            icon={<HamburgerIcon />} 
            onClick={() => setShowExercises(!showExercises)}
          />
        </Box>
      </Flex>
    </Box>
  );
}
