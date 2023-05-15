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
              backgroundColor="bg-secondary"
              className="bg-secondary"
            >
              <ProjectForm />
            </ModalWrapper>
          </Button>
        )}
        <div className="   grid grid-cols-2 gap-14  ">
          {projects?.map((project, i) => {
            return (
              <div
                key={project._id}
                className="flex flex-col items-center justify-center gap-4  "
              >
                <div className="flex  w-full items-center justify-start gap-4">
                  <Image
                    src={project.images.header}
                    width={240}
                    height={240}
                    className="rounded-2xl"
                    alt={`${project.fullProjectName}'s image`}
                  />
                  <div className="flex h-full flex-col justify-center gap-1 text-secondary ">
                    <h2 className="">{project.fullProjectName}</h2>
                    <div className="flex w-full items-center justify-start gap-2">
                      <p>
                        {' '}
                        {project.team.map((worker, i) => {
                          return worker.role;
                        })}
                        {/* {dateFormat(project.startDate, 'mmmm dS yyyy')} -{' '}
                        {dateFormat(project.endDate, 'mmmm dS yyyy')} */}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col items-start gap-2 text-secondary_s_2 ">
                  <p>
                    {project.desc}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Enim qui, inventore accusantium nulla eveniet ullam sed, vel
                    tempora blanditiis facilis et labore deleniti quis? Ab
                    possimus veniam excepturi impedit libero.
                  </p>
                  <div className="flex w-full items-center justify-start gap-1">
                    <Button
                      type="button"
                      className=" rounded-2xl bg-accent py-1 px-3"
                    >
                      TEST LEARN MORE
                    </Button>
                    <Button type="button" className="  py-1 px-3 underline">
                      VISIT
                    </Button>
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
