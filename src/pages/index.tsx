import dateFormat, { masks } from 'dateformat';
import Image from 'next/dist/client/image';
import { Fragment, useRef, useState } from 'react';

import Button from '@/components/Button';
import ProjectForm from '@/components/form/ProjectForm';
import ModalWrapper from '@/components/ModalWrapper';
import ProfilePicture from '@/components/ProfilePicture';
import HeroIllustration from '@/components/svgs/HeroIllustration';
import { useAuth } from '@/context/hooks/useAuth';
import { useProject } from '@/context/hooks/useProject';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import Role from '@/utils/roles';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const { projects } = useProject();
  const { user } = useAuth();
  console.log(projects);

  const myRef = useRef<HTMLDivElement>(null);
  const executeScroll = () => {
    if (myRef.current !== null) {
      myRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Main
      meta={
        <Meta
          title="Gelu Horotan - Software Engineer"
          description={`Step into my coder's lair and see what's cookin'. Browse through my projects and see how I can help bring your next software development project to life. `}
        />
      }
    >
      <section className={'container  flex items-center justify-between  '}>
        <div className="flex h-screen  w-1/2 flex-col justify-center  ">
          <h1 className="p-2 text-primary   dark:text-secondary">
            Gelu Horotan <br />
            <span className="text-accent_s"> Software Engineer</span>
          </h1>

          <Button
            rounded
            className=" bg-accent p-2  text-secondary"
            type="button"
            onClick={executeScroll}
          >
            SEE MY PROJECTS
          </Button>
        </div>

        <HeroIllustration />
      </section>
      <section
        ref={myRef}
        className="flex h-max w-full flex-col items-center justify-center  px-20  "
      >
        {user && user.role === Role.Admin && (
          <Button
            type="button"
            onClick={() => setIsOpen(true)}
            className="  self-end  rounded-lg bg-secondary_s px-4 py-2 dark:bg-primary_t"
          >
            ADD PROJECT
            <ModalWrapper
              title="Add Project"
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            >
              <ProjectForm />
            </ModalWrapper>
          </Button>
        )}
        <div className=" flex w-full flex-col justify-center  gap-14    ">
          {projects?.map((project, i) => {
            return (
              <div
                key={project._id}
                className="relative mx-20 flex h-max w-1/2 flex-col items-center justify-evenly gap-4 rounded-3xl bg-secondary p-2 odd:self-end even:self-start"
              >
                <Image
                  alt="img"
                  src={project.images.header}
                  width={555}
                  height={555}
                  className="h-max w-full rounded-3xl"
                ></Image>

                <div className="flex h-full w-full items-center    px-6 ">
                  <div>
                    {project.team.map((dev) => {
                      return (
                        <ProfilePicture
                          size="medium"
                          imageSrc={dev.profilePicture}
                          key={dev._id}
                        />
                      );
                    })}
                  </div>
                  <div className="flex w-full flex-col items-end justify-center gap-4   ">
                    <div className="flex flex-col items-end justify-center  ">
                      <h2 className="  text-4xl font-bold uppercase tracking-widest text-primary ">
                        {project.fullProjectName}
                      </h2>
                      <p>
                        {dateFormat(project.startDate, 'mmmm dS yyyy')} -{' '}
                        {dateFormat(project.endDate, 'mmmm dS yyyy')}
                      </p>
                    </div>
                    <div className="flex w-full items-center justify-end gap-4 ">
                      <Button
                        type="button"
                        className="rounded-3xl bg-primary py-1 px-3"
                      >
                        VISIT
                      </Button>
                      <Button
                        type="button"
                        className="rounded-3xl bg-primary py-1 px-3"
                      >
                        LEARN MORE
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="container"></section>
    </Main>
  );
}
