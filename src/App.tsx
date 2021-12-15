import React from 'react';
import './App.css';
import styled from 'styled-components/macro';
import SidebarNav from './components/SidebarNav';
import LearningTheFretboard from './components/learning-the-fretboard/LearningTheFretboard';
import { Grommet, Main, Box, Header, Heading, ResponsiveContext } from 'grommet';
import theme from './theme';

const AppWrapper = styled(Box)`
  flex-grow: 1;
`;

const SiteHeader = styled(Header)`
  position: relative;
`

const MainContent = styled(Main)`
  flex: 1;
`

function App() {
  return (
    <Grommet theme={theme} themeMode={"light"} full>
      <Box direction="column" height="100%">
        <SiteHeader pad="medium" background="brand" elevation="medium">
          <Heading color="text-light" level="2" size="small" margin="none">Guitar Exercises</Heading>
        </SiteHeader>
        <AppWrapper direction="row">
          <ResponsiveContext.Consumer>
            {size => (
              <>
              {size !== 'small' && (
                <SidebarNav />
              )}
              <MainContent background="background-contrast" height='100%'>
                <LearningTheFretboard />
              </MainContent>
              </>
            )}
          </ResponsiveContext.Consumer>
        </AppWrapper>
      </Box>
    </Grommet>
  );
}

export default App;
