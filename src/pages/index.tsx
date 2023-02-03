import { useRef, useState } from 'react';

import Button from '@/components/Button';
import ProjectForm from '@/components/form/ProjectForm';
import ModalWrapper from '@/components/ModalWrapper';
import HeroIllustration from '@/components/svgs/HeroIllustration';
import { useProject } from '@/context/hooks/useProject';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const { projects } = useProject();

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
      <div className={'flex  h-screen  w-full items-center justify-evenly  '}>
        <div className="flex h-screen  w-1/2 flex-col justify-center ">
          <h1 className="p-2 text-secondary   dark:text-primary">
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
      </div>
      <div
        ref={myRef}
        className="flex h-screen w-full flex-col items-center justify-center gap-10 scroll-smooth "
      >
        <Button
          type="button"
          onClick={() => setIsOpen(true)}
          className=" rounded-lg bg-slate-300 p-2"
        >
          ADD PROJECT
          <ModalWrapper
            title="Add Project"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            backgroundColor="bg-secondary"
          >
            <ProjectForm />
          </ModalWrapper>
        </Button>
        <div className="flex w-11/12 items-center justify-center gap-20 bg-red-400">
          {projects?.map((project, i) => {
            return (
              <div
                key={project._id}
                className={
                  'flex w-full flex-col items-center justify-center bg-blue-400'
                }
              >
                <h3> {project.fullProjectName}</h3>
                <p>{project.desc}</p>
                <div className="flex items-center justify-center gap-10 rounded-lg bg-red-400">
                  {/* {project.team?.map(
                    (
                      dev: {
                        _id: Key;
                        profilePicture: string;
                        label:
                          | string
                          | number
                          | boolean
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | ReactFragment
                          | ReactPortal;
                        role:
                          | string
                          | number
                          | boolean
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | ReactFragment
                          | ReactPortal;
                      },
                      i: any
                    ) => {
                      return (
                        <div
                          key={dev._id}
                          className="flex flex-col items-center gap-4"
                        >
                          <ProfilePicture
                            imageSrc={dev.profilePicture}
                            size="medium"
                          ></ProfilePicture>
                          <h6>{dev.label}</h6>
                          <p>{dev?.role}</p>
                        </div>
                      );
                    }
                  )} */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div></div>
    </Main>
  );
}
