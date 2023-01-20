import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Tabs from '@/components/Tab';
import { useAuth } from '@/context/hooks/useAuth';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

// Components
const LoginForm = dynamic(() => import('../components/form/LoginForm'), {
  suspense: true,
});
const RegisterForm = dynamic(() => import('../components/form/RegisterForm'), {
  suspense: true,
});

function Signin() {
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
      <div className="container flex items-center   justify-center  ">
        <Tabs list={tabList}>
          <LoginForm className="rounded-b-3xl" />
          <RegisterForm className="rounded-b-3xl" />
        </Tabs>
      </div>
    </Main>
  );
}

export default Signin;
