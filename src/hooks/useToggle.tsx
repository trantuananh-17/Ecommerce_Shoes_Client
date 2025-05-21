import { useState, useCallback } from "react";

type UseToggleResult = [
  boolean,
  () => void,
  React.Dispatch<React.SetStateAction<boolean>>
];

export const useToggle = (initial = false): UseToggleResult => {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle, setValue];
};
