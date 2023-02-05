import type { GetServerSideProps, NextPage } from 'next';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type Props = {
  query: {
    token?: string;
  };
};

const EmailVerification: NextPage<Props> = ({ query }: Props) => {
  return (
    <Main
      meta={
        <Meta
          title="Gelu Horotan - Software Engineer"
          description={`Verify your email and unlock the key to an amazing experience with our mail verification page. Simply follow the steps, sit back and get ready to be part of an exclusive club of awesomeness.`}
        />
      }
    >
      <div>EmailVerification</div>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  if (!query.token) {
    context.res.writeHead(302, { Location: '/?redirected=true' });
    context.res.end();
  }
  return { props: { query } };
};

export default EmailVerification;
