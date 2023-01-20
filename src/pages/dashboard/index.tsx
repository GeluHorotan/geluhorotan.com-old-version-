import Image from 'next/image';
import { AiFillEye, AiFillLike } from 'react-icons/ai';
import { GoUnverified } from 'react-icons/go';
import { MdVerified } from 'react-icons/md';

import { useAuth } from '@/context/hooks/useAuth';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

function Dashboard() {
  const { user } = useAuth();

  return (
    <Main
      meta={
        <Meta
          title="Gelu Horotan - Software Engineer"
          description={`Keep your account information up-to-date with my user friendly dashboard. `}
        />
      }
    >
      <div className="flex h-full w-full items-center justify-center  ">
        <div className="grid h-full w-full    grid-cols-2      gap-8 text-secondary">
          <div className="flex h-full w-full flex-col  items-center justify-evenly rounded-3xl bg-secondary px-2   ">
            <h2 className="text-primary  ">
              <span className=" font-semibold"> Hi,</span> {user?.firstName}!
            </h2>
            <section className="flex flex-col items-center justify-center gap-4">
              <div className="flex items-center gap-4 text-primary">
                <h6>
                  {user?.firstName}&nbsp;{user?.lastName}
                </h6>

                <div className="flex items-center gap-4">
                  {user?.verified ? (
                    <MdVerified size={24} color={'blue'} />
                  ) : (
                    <GoUnverified size={24} color={'blue'} />
                  )}
                </div>
              </div>
              <h6 className="text-primary"> {user?.email}</h6>
            </section>

            <section className="flex flex-col items-center justify-center gap-4">
              <h5 className="w-full text-right  font-bold text-primary">
                Your last blog posts
              </h5>
              <div className="    w-full gap-y-4 font-medium text-primary ">
                <div className=" flex items-center justify-center gap-8 rounded-xl bg-secondary_s px-4 py-2 ">
                  <Image
                    src={'/256.png'}
                    className="rounded-xl"
                    alt={'blog'}
                    width={64}
                    height={64}
                  />

                  <div className="flex w-full flex-col  ">
                    <h5 className="font-semibold">React is Awesome!</h5>
                    <div className="flex items-center justify-start gap-4">
                      <div className="flex flex-col items-center justify-center ">
                        <AiFillEye /> 120
                      </div>
                      <div className="flex flex-col items-center justify-center ">
                        <AiFillLike /> 120
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center  justify-center gap-8 rounded-xl bg-secondary_s px-4 py-2 duration-200 ease-in-out hover:scale-105 ">
                  <Image
                    src={'/256.png'}
                    className="rounded-xl"
                    alt={'blog'}
                    width={64}
                    height={64}
                  />
                  <div className="flex w-full flex-col  ">
                    <h5 className="font-semibold">NodeJS is Awesome!</h5>
                    <div className="flex items-center justify-start gap-4">
                      <div className="flex flex-col items-center justify-center ">
                        <AiFillEye /> 120
                      </div>
                      <div className="flex flex-col items-center justify-center ">
                        <AiFillLike /> 120
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" flex items-center justify-center gap-8 rounded-xl bg-secondary_s px-4 py-2  ">
                  <Image
                    src={'/256.png'}
                    className="rounded-xl"
                    alt={'blog'}
                    width={64}
                    height={64}
                  />

                  <div className="flex w-full  flex-col">
                    <h5 className="font-semibold">Ii trag la mue lui Alex!</h5>
                    <div className="flex items-center justify-start gap-4">
                      <div className="flex flex-col items-center justify-center ">
                        <AiFillEye /> 120
                      </div>
                      <div className="flex flex-col items-center justify-center ">
                        <AiFillLike /> 120
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Dashboard;
