import { Box, Flex, Button } from '@chakra-ui/react';

export default function SidebarNav() {

  return (
    <Box 
      pt={1} 
      background="gray.50" 
      borderRight="1px" 
      borderColor="gray.100"
    >
      <Flex direction="column">
        <Button as="a" href="#" p="4" variant="ghost" borderRadius={0}>Learning The Fretboard</Button>
      </Flex>
    </Box>
  );
}
