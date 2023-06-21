import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Spinner from './Spinner';

type Props = {
  repoName: string;
};

type LinesOfCodeTypes = {
  lines: number;
};

const LinesOfCode: React.FC<Props> = ({ repoName }) => {
  const [linesOfCode, setLines] = useState<LinesOfCodeTypes | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getLines = async () => {
    try {
      const res = await axios.get(
        `https://api.codetabs.com/v1/loc?github=GeluHorotan/${repoName}`
      );
      const { data } = res;
      const filteredData = data.filter(
        (item: { language: string }) => item.language === 'Total'
      );
      setIsLoading(false);
      setLines(filteredData[0]);
    } catch (error) {
      setIsLoading(false);
      setLines(undefined);
    }
  };

  useEffect(() => {
    getLines();
  }, []);

  return (
    <div className="">
      {/* {linesOfCode?.lines ? linesOfCode.lines : } */}
      <Spinner size="small" noText />
    </div>
  );
};

export default LinesOfCode;
