import { Box } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export default function ExerciseContainer({
  children,
}: PropsWithChildren<{}>) {
  return (
    <Box pl="5" pr="10">{children}</Box>
  );
}
