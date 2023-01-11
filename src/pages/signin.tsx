import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

// Components
import LoginForm from '@/components/form/LoginForm';
import RegisterForm from '@/components/form/RegisterForm';
import SigninIllustration from '@/components/svgs/SigninIllustration';
import Tabs from '@/components/Tab';
import { useAuth } from '@/context/hooks/useAuth';

function Signin() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/?redirected=true');
    }
  }, [isAuthenticated, router]);

  const tabList = ['login', 'register'];

  return (
    <div className="container flex items-center   justify-center gap-20  ">
      <div className="flex h-full  w-full    items-center justify-center   ">
        <Tabs list={tabList}>
          <LoginForm className="rounded-b-3xl" />
          <RegisterForm className="rounded-b-3xl" />
        </Tabs>
        <SigninIllustration />
      </div>
    </div>
  );
}

export default Signin;
