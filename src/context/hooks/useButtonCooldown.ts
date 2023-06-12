import { useState } from 'react';

type UseButtonCooldownReturnType = [boolean, () => void];

const useButtonCooldown = (
  cooldownDuration: number = 3000
): UseButtonCooldownReturnType => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleClick = (): void => {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true);

      setTimeout(() => {
        setIsButtonDisabled(false);
      }, cooldownDuration);
    }
  };

  return [isButtonDisabled, handleClick];
};

export default useButtonCooldown;
