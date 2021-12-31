import { Flex, Heading } from '@chakra-ui/react';
import styled from 'styled-components/macro';
import SidebarNav from '../components/SidebarNav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Exercises from '../exercises/Exercises';
import MobileNav from '../components/MobileNav';

const MainWrapper = styled(Flex)`
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  max-width: 100vw;
  overflow: hidden;
`;

export default function Main() {
  return (
    <MainWrapper>
      <Flex p={3} background="brand.200" color="gray.800" shadow="md" zIndex="2">
        <Heading as="h1" size="lg" fontWeight="normal">Music Theory For Guitar Exercises</Heading>
      </Flex>
      <Flex direction="row" flex="1">
        <SidebarNav />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="exercises/*" element={<Exercises />}/>
          </Routes>
        </BrowserRouter>
      </Flex>
      <MobileNav />
    </MainWrapper>
  );
}
