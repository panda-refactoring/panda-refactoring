import { useState } from "react";

const useTextArea = () => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value !== "") setIsFocus(true);
    else setIsFocus(false);
  };

  return { isFocus, handleTextArea };
};

export default useTextArea;
