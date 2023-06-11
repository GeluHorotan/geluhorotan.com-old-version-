import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Components
import RegisterForm from '@/components/form/RegisterForm';
import { useAuth } from '@/context/hooks/useAuth';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type Props = {
  children?: React.ReactNode;
};

const Register: NextPage<Props> = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // if (isAuthenticated) {
    //   router.push('/?redirected=true');
    // }
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
      <section className="container flex items-center justify-center   ">
        <div className="mt-40 w-1/2">
          <div className="flex w-full flex-col items-start justify-center gap-12  ">
            <div className="flex w-full flex-col gap-4  ">
              <h2 className="futura-heavy tracking-wider">
                Let&apos;s make an account
                <span className="text-accent dark:text-accent2">!</span>{' '}
              </h2>
              <p>
                Let&apos;s embark on this journey together and make amazing
                things happen!
              </p>
              <p>
                Already have an account ? You can easily login by{' '}
                <Link
                  href="/login"
                  className="font-normal text-accent dark:text-accent2"
                >
                  accessing the login page
                </Link>
              </p>
            </div>
            <RegisterForm className="rounded-b-3xl" />
          </div>
        </div>
      </section>
    </Main>
  );
};

export default Register;
