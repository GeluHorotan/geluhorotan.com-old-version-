import type { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import { useAuth } from '@/context/hooks/useAuth';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type Props = {
  query: {
    user_id: string;
    verification_token: string;
  };
};

type Params = {
  user_id: string;
  verification_token?: string;
};

const EmailVerification: NextPage<Props> = ({ query }: Props) => {
  const [message, setMessage] = useState();
  const { verifyEmail, resendEmailVerification } = useAuth();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { user_id, verification_token } = query;

  const checkEmail = async ({ user_id, verification_token }: Params) => {
    await verifyEmail({ user_id, verification_token });
  };

  const resendEmail = async ({ user_id }: Params) => {
    await resendEmailVerification({ user_id });
  };
  useEffect(() => {
    checkEmail({ user_id, verification_token });
  }, []);

  return (
    <Main
      meta={
        <Meta
          title="Gelu Horotan - Software Engineer"
          description={`Verify your email and unlock the key to an amazing experience with our mail verification page. Simply follow the steps, sit back and get ready to be part of an exclusive club of awesomeness.`}
        />
      }
    >
      <div>TEST</div>
      <Button type="button" onClick={() => resendEmail({ user_id })}>
        RESEND
      </Button>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  if (!query.verification_token && !query.user_id) {
    context.res.writeHead(302, { Location: '/?redirected=true' });
    context.res.end();
  }
  return { props: { query } };
};

export default EmailVerification;
