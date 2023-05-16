import dateFormat, { masks } from 'dateformat';
import Image from 'next/dist/client/image';
import Link from 'next/link';
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
        className="flex h-max w-full flex-col items-center justify-center  gap-8 px-20 "
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
        <div className=" grid h-screen w-full grid-cols-2 grid-rows-2  gap-14 ">
          {projects?.map((project, i) => {
            return (
              <div
                key={project._id}
                className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-3xl "
              >
                <Image
                  src={project.images.header}
                  width={512}
                  height={480}
                  className=" w-full rounded-3xl bg-secondary_s_2 p-2"
                  alt={`${project.fullProjectName}'s image`}
                />
                <div className="flex  w-full flex-row items-start justify-between  p-2 text-secondary">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                      <h3 className="uppercase">{project.fullProjectName}</h3>
                      <p>{project.desc}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/project/${project.fullProjectName}`}
                        className="rounded-3xl bg-accent2 px-2 py-1 text-primary"
                      >
                        LEARN MORE
                      </Link>
                      <Link href="#" className="text-accent underline">
                        VISIT SITE
                      </Link>
                    </div>
                  </div>

                  <p>{project.domain ? project.domain : 'Automotive'}</p>
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
