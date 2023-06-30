import { useEffect, useState } from 'react';

function useMount() {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return { isMounted };
}

export default useMount;
