import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Props = {
  repoName: string;
};

type LinesOfCodeTypes = {
  lines: number;
};

const LinesOfCode: React.FC<Props> = ({ repoName }) => {
  const [linesOfCode, setLines] = useState<LinesOfCodeTypes | undefined>();

  const getLines = async () => {
    try {
      const res = await axios.get(
        `https://api.codetabs.com/v1/loc?github=GeluHorotan/${repoName}`
      );
      const { data } = res;
      const filteredData = data.filter(
        (item: { language: string }) => item.language === 'Total'
      );
      setLines(filteredData[0]);
    } catch (error) {
      setLines(undefined);
    }
  };

  useEffect(() => {
    getLines();
  }, []);

  return <p>{linesOfCode?.lines ? linesOfCode.lines : '-'}</p>;
};

export default LinesOfCode;
