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

const EmailVerification: NextPage<Props> = ({ query }: Props) => {
  const { verifyEmail, resendEmailVerification } = useAuth();
  const [message, setMessage] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { user_id, verification_token } = query;

  useEffect(() => {
    verifyEmail({ user_id, verification_token }).then((res: Response) =>
      setMessage(res)
    );
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
      <div className="container flex flex-col items-center justify-center">
        <div className="flex h-96 w-96 flex-col items-center justify-center rounded-lg bg-primary_t">
          <div className="">{message && message.msg}</div>
          <Button
            type="button"
            onClick={() =>
              resendEmailVerification({ user_id }).then((res: any) =>
                setMessage(res)
              )
            }
          >
            RESEND
          </Button>
        </div>
      </div>
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
