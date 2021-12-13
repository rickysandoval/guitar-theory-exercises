import React from 'react';
import styled from 'styled-components/macro';
import { Sidebar, Nav, Button } from 'grommet';

const Wrapper = styled(Sidebar)`
  display: flex;
  flex-direction: column;
`

export default function SidebarNav() {
  return (
    <Wrapper pad={{ top: 'small'}} border="right" background="background-contrast">
      <Nav gap="none" pad="none">
        <Button label="Learning The Fretboard"/>
      </Nav>
    </Wrapper>
  );
}
