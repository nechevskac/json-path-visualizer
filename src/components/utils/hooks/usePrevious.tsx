import { useRef, useEffect } from 'react';

// eslint-disable-next-line
export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
