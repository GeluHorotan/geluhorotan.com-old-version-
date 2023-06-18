import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineLayout } from 'react-icons/ai';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { MdDeveloperMode, MdSpeed } from 'react-icons/md';
import { scroller } from 'react-scroll';

import Button from '@/components/Button';
import ContactForm from '@/components/form/ContactForm';
import ProjectForm from '@/components/form/ProjectForm';
import MockupIphone from '@/components/MockupIphone';
import ModalWrapper from '@/components/ModalWrapper';
import Scrolldown from '@/components/Scrolldown';
import ScrollTo from '@/components/ScrollTo';
import Showcase from '@/components/Showcase';
import ShowcaseEntry from '@/components/ShowcaseEntry';
import Spinner from '@/components/Spinner';
import { useAuth } from '@/context/hooks/useAuth';
import { useProject } from '@/context/hooks/useProject';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import Role from '@/utils/roles';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const { projects, isLoading } = useProject();
  const { user } = useAuth();

  const urlParams = new URLSearchParams(window.location.search);
  const scrollTo = urlParams.get('scrollTo');
  const scrollDuration = urlParams.get('scrollDuration');

  useEffect(() => {
    if (scrollTo) {
      scroller.scrollTo(scrollTo, {
        smooth: true,
        duration: scrollDuration,
      });
    }
    // Delay clearing the query parameters by 2 seconds
    const timeout = setTimeout(() => {
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }, parseInt(scrollDuration, 10));

    return () => {
      clearTimeout(timeout);
    };
  }, [scrollTo, scrollDuration, urlParams]);

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
          ' container mt-[4.25rem] flex flex-col  items-center justify-center  '
        }
      >
        <div className="mb-[4rem] flex h-full w-full items-center justify-between max-[840px]:mb-[10rem]   max-[840px]:flex-col-reverse max-[840px]:gap-14 ">
          <div className="flex   w-1/2 flex-col justify-center gap-6 max-[840px]:w-full max-[840px]:items-start  ">
            <h1 className="  text-primary dark:text-secondary max-[840px]:text-3xl ">
              Transforming Visions <br />
              into Pixel
              <span className="text-accent_s dark:text-accent2_s">
                {' '}
                Perfection
              </span>
            </h1>
            <div className="flex flex-col items-start gap-4 ">
              <p>
                Discover a curated collection of meticulously crafted projects
                that embody cutting-edge creativity, executed with precision and
                adhering to industry best practices for exceptional quality.
              </p>

              <ScrollTo
                className=" border-2 
               border-accent dark:border-accent2 "
                to="projects"
                smooth
                delay={100}
                duration={1000}
              >
                TO PROJECTS
              </ScrollTo>
            </div>
          </div>

          <MockupIphone />
        </div>
        <Scrolldown />
      </section>
      <section className="container flex !h-max !min-h-max  items-center justify-center   py-20">
        <Showcase>
          <ShowcaseEntry
            scrollToId="engaging"
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
            scrollToId="performance"
            icon={<MdSpeed size={64} />}
            title={`Performance Optimization`}
            number={2}
            scrollDuration={2000}
          >
            I am committed to optimizing website performance to its fullest
            potential. By implementing advanced techniques, meticulous code
            optimization, and strategic asset compression, I ensure
            lightning-fast loading times and seamless user interactions. Through
            efficient caching strategies, browser compatibility, and
            performance-enhancing methodologies, I deliver superior user
            experiences. By prioritizing performance, I help businesses thrive
            in today&apos;s digital landscape, providing a competitive edge and
            driving success.
          </ShowcaseEntry>
          <ShowcaseEntry
            scrollToId="responsive"
            icon={<MdDeveloperMode size={64} />}
            title={'Responsive Design'}
            number={3}
            scrollDuration={2500}
          >
            With a mobile-first approach and deep expertise in responsive design
            principles, I specialize in creating seamless and user-friendly
            websites. By utilizing fluid layouts, flexible grids, and media
            queries, I ensure consistent experiences across devices. Through
            meticulous attention to detail, accessibility considerations, and a
            focus on usability, I deliver websites that adapt effortlessly to
            any screen size or device. I prioritize responsive design to provide
            inclusive experiences that cater to diverse audiences.
          </ShowcaseEntry>
        </Showcase>
      </section>
      <section
        id="projects"
        className="container flex h-max w-full flex-col items-center justify-center gap-8  "
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
        {isLoading && <Spinner size={'large'} />}

        <div
          id="projects"
          className=" grid h-max w-full grid-cols-2  gap-14 max-[900px]:grid-cols-1 "
        >
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
                        className="rounded-xl bg-accent px-3 py-1  text-secondary dark:bg-accent2 dark:text-primary "
                      >
                        LEARN MORE
                      </Link>
                      <Link
                        href="#"
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
      </section>
      <section
        id="contact"
        className="container flex  items-center justify-center "
      >
        <div className="flex w-1/2 flex-col gap-12 max-[800px]:w-full ">
          <div className="flex w-full flex-col gap-4">
            <h2 className="futura-heavy tracking-wider">
              Let&apos;s meet
              <span className="text-accent dark:text-accent2">!</span>{' '}
            </h2>
            <p>
              Can&apos;t wait to meet you. <br />
              Please note that the fields marked with * are required!{' '}
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Main>
  );
}
