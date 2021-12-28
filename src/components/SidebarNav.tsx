import { Box, Flex, Button } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

const NavLink = ({ href, children }: PropsWithChildren<{ href: string }>) => (
  <Button as="a" href={href} p="4" variant="ghost" borderRadius={0} justifyContent={'flex-start'}>{children}</Button>
);

export default function SidebarNav() {

  return (
    <Box 
      pt={1} 
      background="gray.50" 
      borderRight="1px" 
      borderColor="gray.100"
    >
      <Flex direction="column">
        <NavLink href="/exercises/learning-the-fretboard">Learning The Fretboard</NavLink>
        <NavLink href="/exercises/building-chords">Building Chords</NavLink>
      </Flex>
    </Box>
  );
}
