import { Heading, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

interface IExerciseHeadingProps {
  title: string;
}
export default function ExerciseHeading({
  title,
  children,
}: PropsWithChildren<IExerciseHeadingProps>) {
  return (
    <>
    <Heading as="h1" size="lg" mt="5" pl="5" mb={children ? '2' : '10'}>{title}</Heading>
    {children && (
      <Text mb="10" pl="5" pr="5">{children}</Text>
    )} 
    </>
  );
}
