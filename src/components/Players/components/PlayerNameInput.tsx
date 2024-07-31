import { useState, ChangeEvent, useEffect } from "react";

type PlayerNameInputProps = {
  name: string;
  index: number;
  setName: (index: number, newName: string) => void;
};

const PlayerNameInput = ({ name, index, setName }: PlayerNameInputProps) => {
  const [inputValue, setInputValue] = useState(name);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setName(index, inputValue); // Update the parent state when the input loses focus
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setInputValue(name);
  }, [name]);

  return (
    <input
      className={isFocused ? "player-name-focused" : "player-name"}
      placeholder="Enter name"
      value={inputValue}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
};

export default PlayerNameInput;
