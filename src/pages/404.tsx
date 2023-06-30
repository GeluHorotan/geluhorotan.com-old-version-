import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Logo from '@/components/svgs/Logo';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type Props = {
  children?: React.ReactNode;
};

const NotFoundPage: NextPage<Props> = () => {
  const router = useRouter();
  const [cooldown, setCooldown] = useState<number>(10);

  useEffect(() => {
    const countdown = setInterval(() => {
      setCooldown((prevCooldown) => prevCooldown - 1);
    }, 1000);

    if (cooldown === 0) {
      clearInterval(countdown);
      router.push('/');
    }

    return () => clearInterval(countdown);
  }, [cooldown, router]);

  return (
    <Main
      meta={
        <Meta
          title="Gelu Horotan - Homepage"
          description={`Oops! The page you are looking for could not be found. Don't worry, we'll redirect you back to the homepage shortly. Stay tuned!`}
        />
      }
    >
      <div className="flex h-screen flex-col items-center justify-center gap-14 px-20 text-primary dark:text-secondary max-md:px-4">
        <Logo id={2} size={200} />
        <div className="flex flex-col items-center justify-center gap-4 ">
          <h1 className="  text-center font-bold ">Page Not Found</h1>

          <p className=" text-lg">
            Redirecting back to the homepage in {cooldown} seconds...
          </p>
        </div>
        <Link
          href="/"
          className=" flex 
               w-max cursor-pointer items-center rounded-xl border-2 border-accent px-4 py-2 text-primary  dark:border-accent2 dark:text-secondary"
        >
          BACK TO HOMEPAGE
        </Link>
      </div>
    </Main>
  );
};

export default NotFoundPage;
