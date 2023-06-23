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
  return (
    <Main
      meta={
        <Meta
          title="Gelu Horotan - Register"
          description={`Step into my world of creativity, innovation, and technical expertise as you explore my projects, skills, and accomplishments. Join the club!`}
        />
      }
    >
      <section className="container flex items-center justify-center !py-40  ">
        <div className=" w-1/2 max-[960px]:w-full">
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
