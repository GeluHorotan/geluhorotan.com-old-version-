import React from 'react';

type Props = {
  errorMsg: string;
  id: string;
};

const Error = ({ errorMsg, id }: Props) => {
  return (
    <div className="w-max ">
      {/* <CustomTooltip id={id}>
        {!errorMsg ? (
          <AiOutlineQuestionCircle />
        ) : (
          <MdErrorOutline className="text-error" />
        )}
        <p>{errorMsg}</p>
      </CustomTooltip> */}
    </div>
  );
};

export default Error;
