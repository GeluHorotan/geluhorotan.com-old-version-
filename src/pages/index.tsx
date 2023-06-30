import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineLayout } from 'react-icons/ai';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { MdDeveloperMode, MdSpeed } from 'react-icons/md';

import Button from '@/components/Button';
import ContactForm from '@/components/form/ContactForm';
import ProjectForm from '@/components/form/ProjectForm';
import MockupIphone from '@/components/MockupIphone';
import ModalWrapper from '@/components/ModalWrapper';
import Scrolldown from '@/components/Scrolldown';
import Showcase from '@/components/Showcase';
import ShowcaseEntry from '@/components/ShowcaseEntry';
import Spinner from '@/components/Spinner';
import TechStack from '@/components/TechStack';
import { useAuth } from '@/context/hooks/useAuth';
import { useProject } from '@/context/hooks/useProject';
import useScrollToElement from '@/customHooks/useScrollToElement';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import Role from '@/utils/roles';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const { projects, isLoading } = useProject();
  const { user } = useAuth();
  const { handleContactClick } = useScrollToElement();

  return (
    <Main
      meta={
        <Meta
          title="Gelu Horotan - Homepage"
          description={`Step into my coder's lair and see what's cookin'. Browse through my projects and see how I can help bring your next software development project to life. `}
        />
      }
    >
      <section
        className={
          ' container mt-[4.25rem] flex flex-col  items-center justify-center  '
        }
      >
        <div className="mb-[4rem] flex h-full w-full items-center justify-between max-[840px]:mb-[0rem]   max-[840px]:flex-col-reverse max-[840px]:gap-14 ">
          <div className="flex   w-1/2 flex-col justify-center gap-6 max-[840px]:w-full max-[840px]:items-center  ">
            <div className="flex items-center gap-4 max-[840px]:flex-wrap max-[840px]:justify-center">
              <TechStack />
            </div>
            <h1 className="  text-primary dark:text-secondary max-[840px]:text-3xl ">
              Transforming Visions <br />
              into Pixel
              <span className="text-accent_s dark:text-accent2_s">
                {' '}
                Perfection
              </span>
            </h1>

            <div className="flex flex-col items-start gap-4 max-[840px]:items-center ">
              <p className="max-[840px]:text-center">
                As a detail-oriented and highly motivated front-end developer, I
                possess a strong skill set in React, Next JS, Typescript, Redux,
                and Tailwind CSS. I am currently focused on expanding my
                knowledge in data structures and algorithms to further enhance
                my capabilities.
              </p>
              <div className="flex gap-4">
                <Link
                  className=" flex 
               w-max cursor-pointer items-center rounded-xl bg-accent px-4  py-2 text-secondary transition-all duration-200  ease-in-out hover:scale-105  dark:bg-accent2 dark:text-primary "
                  href=""
                  onClick={(event) =>
                    handleContactClick(event, '', 'contact', -25)
                  }
                >
                  GET IN TOUCH
                </Link>
                <Link
                  className=" flex 
               w-max cursor-pointer items-center rounded-xl border-2 border-accent px-4 py-2 text-primary transition-all duration-200 ease-in-out hover:scale-105  dark:border-accent2 dark:text-secondary"
                  href=""
                  onClick={(event) =>
                    handleContactClick(event, '', 'projects', -25)
                  }
                >
                  PROJECTS
                </Link>
              </div>
            </div>
          </div>

          <MockupIphone />
        </div>
        <Scrolldown />
      </section>
      <section className="container flex !h-max !min-h-max  items-center justify-center  p-20 max-md:px-4">
        <Showcase>
          <ShowcaseEntry
            target="engaging"
            icon={<AiOutlineLayout size={64} />}
            title={'Enagaging UI'}
            number={1}
            scrollDuration={1500}
          >
            With a passion for user-centric design and expertise in frontend
            technologies, I specialize in crafting engaging user interfaces that
            captivate audiences. By seamlessly blending aesthetics and
            functionality, I create visually stunning and intuitive web
            solutions. Through meticulous attention to detail, strategic use of
            animations, and seamless navigation, I ensure memorable and
            impactful user experiences. I take pride in designing interfaces
            that not only meet client goals but also leave a lasting impression
            on users.
          </ShowcaseEntry>
          <ShowcaseEntry
            target="performance"
            icon={<MdSpeed size={64} />}
            title={`Performance Optimization`}
            number={2}
            scrollDuration={2000}
          >
            I excel in enhancing website performance to provide lightning-fast
            loading times and seamless interactions. Through advanced
            optimization techniques, code efficiency, and intelligent asset
            management, I ensure optimal website performance. By prioritizing
            speed, scalability, and responsiveness, I create exceptional user
            experiences that keep visitors engaged and satisfied.
          </ShowcaseEntry>
          <ShowcaseEntry
            target="responsive"
            icon={<MdDeveloperMode size={64} />}
            title={'Responsive Design'}
            number={3}
            scrollDuration={2500}
          >
            I have honed my skills in designing websites that seamlessly adapt
            to different devices and screen sizes. By employing responsive
            design principles, fluid layouts, and media queries, I guarantee
            that websites look and function flawlessly across various platforms.
            With a focus on accessibility and usability, I create inclusive
            experiences that cater to a wide range of users.
          </ShowcaseEntry>
        </Showcase>
      </section>

      <section
        id="projects"
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
        {isLoading && <Spinner size="medium"></Spinner>}
        {projects && (
          <div
            id="projects"
            className=" grid h-max w-full grid-cols-2  gap-14 max-[900px]:grid-cols-1 "
          >
            {projects?.map((project, i) => {
              return (
                <div
                  key={i}
                  className="flex h-full min-h-full w-full flex-col items-center justify-center gap-4    "
                >
                  <Image
                    src={project.images.header}
                    width={512}
                    height={480}
                    sizes="(max-width: 768) 25vw, (min-width: 769) 100vh"
                    className="h-full w-full object-cover p-2"
                    alt={`${project.fullProjectName}'s image`}
                  />

                  <div className="flex h-full w-full flex-row items-start justify-center   p-2 text-primary dark:text-secondary">
                    <div className="center  flex  h-full w-full flex-col justify-between gap-6 ">
                      <div></div>
                      <div className="  flex flex-col gap-2  ">
                        <h3 className="futura-heavy uppercase  tracking-wider">
                          {project.fullProjectName}
                        </h3>

                        <p className="text-primary_t_2 dark:text-secondary_s_2">
                          {project.startDate} - {project.endDate}
                        </p>

                        <p className="h-full font-light tracking-wider line-clamp-3">
                          {project.desc}
                        </p>
                      </div>

                      <div className="flex items-center gap-6  tracking-widest">
                        <Link
                          href={`/project/${project.fullProjectName}`}
                          className="items-center justify-center rounded-xl bg-accent  px-3 py-1 text-secondary dark:bg-accent2 dark:text-primary"
                        >
                          DETAILS
                        </Link>
                        <Link
                          href={project.url}
                          target="_blank"
                          className="flex items-center justify-center gap-2 rounded-xl border border-accent px-3 py-1 text-primary dark:border-accent2 dark:text-secondary "
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
        )}
      </section>

      <section
        id="contact"
        className="container flex  items-center justify-center "
      >
        <ContactForm />
      </section>
    </Main>
  );
}
