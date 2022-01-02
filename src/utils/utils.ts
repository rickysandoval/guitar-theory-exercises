import { getRandomInt } from './number-utils';

export function choseRandomMember<T = any>(array: T[]): T {
  const randomIndex = getRandomInt(array.length - 1);
  return array[randomIndex];
}
