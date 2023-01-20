import React from 'react';
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';

const getInputIcon = (id: string, error: string) => {
  const props = {
    className: `${error ? 'text-error' : 'text-success'}`,
  };
  switch (id) {
    case 'email':
      return <AiOutlineMail {...props}></AiOutlineMail>;
    case 'firstName':
      return <AiOutlineUser {...props}></AiOutlineUser>;
    case 'lastName':
      return <AiOutlineUser {...props}></AiOutlineUser>;
    case 'password':
      return <AiOutlineLock {...props}></AiOutlineLock>;
    case 'password2':
      return <AiOutlineLock {...props}></AiOutlineLock>;
    case 'oldPassword':
      return <AiOutlineLock {...props}></AiOutlineLock>;

    default:
      return null;
  }
};

export default getInputIcon;
