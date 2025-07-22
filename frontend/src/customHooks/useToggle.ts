import { useState } from "react";

export const useToggle = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);
  const setToggle = (value: string) => {
    setValue((prevValue: boolean) =>
      typeof value == "boolean" ? value : !prevValue
    );
  };
  return [value, setToggle];
};
