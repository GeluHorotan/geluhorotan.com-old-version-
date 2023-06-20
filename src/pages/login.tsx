import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Components
import LoginForm from '@/components/form/LoginForm';
import { useAuth } from '@/context/hooks/useAuth';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type Props = {
  children?: React.ReactNode;
};

const Login: NextPage<Props> = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/?redirected=true');
    }
  }, [isAuthenticated, router]);

  const tabList = ['login', 'register'];

  return (
    <Main
      meta={
        <Meta
          title="Gelu Horotan - Software Engineer"
          description={`Unlock the doors to the secret club of awesomeness with my signin page - Enter your credentials, grab a drink and let's code together`}
        />
      }
    >
      <section className="container flex items-center justify-center  !py-40   ">
        <div className=" w-1/2 max-[800px]:w-full ">
          <div className="flex w-full flex-col gap-12 ">
            <div className="flex w-full flex-col gap-4 ">
              <h2 className="futura-heavy tracking-wider">
                Let&apos;s connect
                <span className="text-accent dark:text-accent2">!</span>{' '}
              </h2>
              <p>
                Let&apos;s embark on this journey together and make amazing
                things happen!
              </p>
              <p>
                Don&apos;t have an account yet ? You can easily create one by{' '}
                <Link
                  href="/register"
                  className="font-normal text-accent dark:text-accent2"
                >
                  accessing the register page
                </Link>
                . It only takes a few moments!
              </p>
            </div>
            <LoginForm className="rounded-b-3xl" />
          </div>
        </div>
      </section>
    </Main>
  );
};

export default Login;
