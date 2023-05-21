import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { GrHostMaintenance, GrVmMaintenance } from 'react-icons/gr';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { MdDeveloperMode } from 'react-icons/md';
import { SiSitepoint } from 'react-icons/si';

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
        className={'container flex flex-col items-center justify-between  '}
      >
        <div className="flex w-full items-center justify-between">
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
        </div>
        <Showcase>
          <ShowcaseEntry
            icon={<SiSitepoint size={48} />}
            title={'Website Development'}
          >
            Building fully functional and visually appealing websites using
            modern web technologies. From static websites to dynamic web
            applications, I can create responsive and user-friendly experiences
            tailored to your specific needs. Let me bring your ideas to life on
            the web!
          </ShowcaseEntry>
          <ShowcaseEntry
            icon={<MdDeveloperMode size={48} />}
            title={'Front-end Development'}
          >
            Crafting engaging user interfaces and seamless user experiences
            using HTML, CSS, and JavaScript. I specialize in converting design
            mockups into pixel-perfect, interactive web interfaces. With
            attention to detail and a focus on performance, I can enhance your
            website&apos;s frontend to captivate and delight your users.
          </ShowcaseEntry>
          <ShowcaseEntry
            icon={<GrVmMaintenance size={48} className="text-secondary" />}
            title={'Website Maintenance and Optimization'}
          >
            Keeping your website up-to-date, secure, and optimized for
            performance. I offer regular maintenance services, ensuring that
            your website runs smoothly, remains compatible with the latest web
            standards, and stays protected against vulnerabilities.
            Additionally, I can optimize your website&apos;s speed and
            performance, improving its loading time and overall user experience.
          </ShowcaseEntry>
        </Showcase>
      </section>
      <section
        ref={myRef}
        className="container flex h-max w-full flex-col items-center justify-center gap-8   "
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
