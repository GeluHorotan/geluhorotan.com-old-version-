import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Components
import LoginForm from '@/components/form/LoginForm';
import RegisterForm from '@/components/form/RegisterForm';
import Tabs from '@/components/Tab';
import { useAuth } from '@/context/hooks/useAuth';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

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
      <div className="container flex items-center justify-center    ">
        <div className="w-1/2 ">
          <Tabs list={tabList}>
            <LoginForm className="rounded-b-3xl" />
            <RegisterForm className="rounded-b-3xl" />
          </Tabs>
        </div>
      </div>
    </Main>
  );
}

export default Signin;
