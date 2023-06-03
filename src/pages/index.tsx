import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { AiOutlineLayout } from 'react-icons/ai';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { MdDeveloperMode, MdSpeed } from 'react-icons/md';

import Button from '@/components/Button';
import ProjectForm from '@/components/form/ProjectForm';
import ModalWrapper from '@/components/ModalWrapper';
import Showcase from '@/components/Showcase';
import ShowcaseEntry from '@/components/ShowcaseEntry';
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
      <section
        className={
          ' container mt-[4.25rem]  flex  flex-col items-center justify-center    '
        }
      >
        <div className="relative flex h-full w-full items-center justify-between ">
          <div className="flex   w-1/2 flex-col justify-center gap-6   ">
            <h1 className="  text-primary dark:text-secondary">
              Transforming Visions <br />
              into <span className="text-accent_s">Pixel Perfection</span>
            </h1>
            <div className="flex flex-col items-start gap-2">
              <p>
                Discover a curated collection of meticulously crafted projects
                that embody cutting-edge creativity, executed with precision and
                adhering to industry best practices for exceptional quality.
              </p>
              <Button
                rounded
                className=" w-max rounded-xl bg-accent px-4 py-2 text-secondary"
                type="button"
                onClick={executeScroll}
              >
                TO PROJECTS
              </Button>
            </div>
          </div>

          <HeroIllustration />
        </div>
      </section>
      {/* <div className="mb-20  w-full px-20 text-secondary  ">
        <Showcase>
          <ShowcaseEntry
            icon={<AiOutlineLayout size={32} />}
            title={'Enagaging UI'}
          >
            Crafting captivating and user-centric interfaces.
          </ShowcaseEntry>
          <ShowcaseEntry
            icon={<MdSpeed size={32} />}
            title={`Performance Optimization`}
          >
            Optimizing website performance for lightning-fast loading.
          </ShowcaseEntry>
          <ShowcaseEntry
            icon={<MdDeveloperMode size={32} />}
            title={'Responsive Design'}
          >
            Designing websites that adapt seamlessly across devices.
          </ShowcaseEntry>
        </Showcase>
      </div> */}
      <section
        ref={myRef}
        className="container flex h-max !min-h-0 w-full flex-col items-center justify-center gap-8 "
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
        <div className=" grid h-max w-full grid-cols-2  gap-14 max-[900px]:grid-cols-1 ">
          {projects?.map((project, i) => {
            return (
              <div
                key={project._id}
                className="flex h-full min-h-full w-full flex-col items-center justify-center gap-4    "
              >
                <Image
                  src={project.images.header}
                  width={512}
                  height={480}
                  className="h-full w-full object-cover p-2"
                  alt={`${project.fullProjectName}'s image`}
                />
                {/* Test23 */}
                <div className="flex h-full w-full flex-row items-start justify-center   p-2 text-primary dark:text-secondary">
                  <div className="center  flex  h-full w-full flex-col justify-between gap-6 ">
                    <div className="  flex flex-col gap-2  ">
                      <h3 className="futura-heavy uppercase  tracking-wider">
                        {project.fullProjectName}
                      </h3>

                      <p className="h-full line-clamp-3">{project.desc}</p>
                    </div>
                    <div className="flex items-center gap-6  tracking-widest">
                      <Link
                        href={`/project/${project.fullProjectName}`}
                        className="rounded-xl bg-accent  px-3 py-1 text-secondary "
                      >
                        LEARN MORE
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center justify-center gap-2 rounded-xl border-2 border-accent px-3 py-1 text-primary dark:text-secondary "
                      >
                        <HiOutlineExternalLink size={16} /> VISIT
                      </Link>
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
