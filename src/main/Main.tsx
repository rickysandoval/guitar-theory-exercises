import { Flex, Heading, Box } from '@chakra-ui/react';
import styled from 'styled-components/macro';
import SidebarNav from '../components/SidebarNav';
import LearningTheFretboard from '../exercises/learning-the-fretboard/LearningTheFretboard';

const MainWrapper = styled(Flex)`
  flex-direction: column;
  height: 100vh;
`;

export default function Main() {
  return (
    <MainWrapper>
      <Flex p={3} background="brand.200" color="gray.800" shadow="md" zIndex="2">
        <Heading as="h1" size="lg" fontWeight="normal">Guitar Exercises</Heading>
      </Flex>
      <Flex direction="row" flex="1">

        <SidebarNav />
        <Box background="gray.50" height="100%" flex="1">
          <LearningTheFretboard />
        </Box>
      </Flex>
    </MainWrapper>
  );
}
