import { Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import LearningTheFretboard from './learning-the-fretboard/LearningTheFretboard';

export default function Exercises() {
  return (
    <Box background="gray.50" height="100%" flex="1">
      <Routes>
        <Route path="learning-the-fretboard" element={<LearningTheFretboard />}/>
      </Routes>
    </Box>
  );
}
