import Image from 'next/dist/client/image';
import Link from 'next/link';
import type { Key } from 'react';
import { useEffect, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { TfiWorld } from 'react-icons/tfi';

import ContactForm from '@/components/form/ContactForm';
import ProfilePicture from '@/components/ProfilePicture';
import Scrolldown from '@/components/Scrolldown';
import useScrollToElement from '@/customHooks/useScrollToElement';
import projects from '@/data/projects.json';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type ProjectState = {
  githubUrl: string;
  linesOfCode: string;
  introduction: string;
  startDate: string;
  endDate: string;
  fullProjectName: string;
  url: string;
  domain: string;
  keyHighlights: string[];
  conceptsCovered: string[];
  desc: string;
  technologies: {
    value: string;
    label: string;
  }[];
  team: {
    profilePicture: string;
    value: string;
    label: string;
    role: string;
  }[];
  images: {
    gallery: string[];
    header: string;
  };
};

const ProjectID = () => {
  const [project, setProject] = useState<ProjectState | undefined>();
  const handleContactClick = useScrollToElement();

  const {
    fullProjectName,
    images,
    introduction,
    desc,
    url,
    githubUrl,
    linesOfCode,
    domain,
    technologies,
    team,
    keyHighlights,
    conceptsCovered,
    startDate,
    endDate,
  } = project ?? {};

  const getProjectName = () => {
    const { pathname } = window.location;
    // Remove the leading and trailing slashes (if present)
    const trimmedPathname = pathname.replace(/^\/|\/$/g, '');
    // Extract the last segment of the pathname
    const lastSegment = trimmedPathname.substring(
      trimmedPathname.lastIndexOf('/') + 1
    );
    // Decode the URL-encoded string
    const decodedString = decodeURIComponent(lastSegment);

    return decodedString;
  };

  const getProject = () => {
    const projectName = getProjectName();
    const filteredProject = projects.filter(
      (project) => project.fullProjectName === projectName
    );
    setProject(filteredProject[0]);
  };

  useEffect(() => {
    getProject();
  }, [projects]);

  const scrollToElement = (elementId: string, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  if (project)
    return (
      <Main
        meta={
          <Meta
            title={`Gelu Horotan - ${getProjectName()}`}
            description={`Delve into the intricacies, explore the details, and unravel the story behind this exceptional project. From conception to execution, discover the challenges overcome, the innovations employed, and the remarkable outcomes achieved. Immerse yourself in the world of ${getProjectName()} and witness the seamless fusion of creativity and technical expertise. Get inspired, gain insights, and witness firsthand the impact of ${getProjectName()}. Join me on this captivating journey and explore the essence of ${getProjectName()}.`}
          />
        }
      >
        <section className="container !mt-16  flex flex-col items-center justify-center   py-10 max-lg:px-7 ">
          <div className="relative flex h-[75vh]  w-full items-center justify-center max-[1090px]:h-[50vh] max-md:h-[25vh]   ">
            <Image
              src={images.header}
              alt={fullProjectName}
              fill={true}
              priority
              className="inset-0 block h-auto w-full object-contain object-center"
            />
            <Scrolldown className=" " />
          </div>
          <div className="mx-auto flex h-full w-4/5 flex-col items-center justify-center gap-20   py-6 max-lg:w-full">
            <div className="flex flex-col items-center justify-center gap-2 ">
              <h1 className="futura-heavy text-center">{fullProjectName}</h1>
              <p className="text-primary_t_2 dark:text-secondary_s_2">
                {startDate} - {endDate}
              </p>
              <div className="flex items-center justify-center gap-4 text-accent dark:text-accent2 ">
                <Link href={githubUrl} target="_blank">
                  <AiFillGithub
                    size={28}
                    className="cursor-pointer drop-shadow-lg transition-transform duration-150 ease-in-out hover:scale-110 dark:drop-shadow-none"
                  />
                </Link>
                <Link href={url} target="_blank">
                  <TfiWorld
                    size={24}
                    className="cursor-pointer drop-shadow-lg transition-transform duration-150 ease-in-out hover:scale-110 dark:drop-shadow-none"
                  />
                </Link>
              </div>
            </div>
            <div className="flex w-full flex-wrap  gap-4  p-1  max-md:flex-col">
              <div className="flex  flex-[1_1_33%]  items-center justify-between rounded-xl border border-accent px-6 py-2 font-bold tracking-widest text-primary dark:border-accent2 dark:text-secondary">
                LINES OF CODE
                <p>{linesOfCode}</p>
              </div>
              <div className="flex flex-[1_1_33%] items-center justify-between rounded-xl border border-accent px-6 py-2 font-bold tracking-widest text-primary dark:border-accent2 dark:text-secondary">
                DOMAIN
                <p>{domain}</p>
              </div>
            </div>

            <h6 className="font-normal">{introduction}</h6>

            <div className="flex flex-col gap-6 self-start rounded-xl  font-bold tracking-widest   text-primary dark:text-secondary ">
              CONTENT
              <ul className="flex list-inside list-decimal flex-col items-start  gap-2  uppercase italic text-accent dark:text-accent2">
                <li
                  className="cursor-pointer font-semibold transition-all duration-200 ease-in-out hover:translate-x-2 "
                  onClick={() => scrollToElement('tech', 150)}
                >
                  Technologies
                </li>
                <li
                  className="cursor-pointer font-semibold transition-all duration-200 ease-in-out hover:translate-x-2"
                  onClick={() => scrollToElement('contributors', 150)}
                >
                  CONTRIBUTORS
                </li>
                <li
                  className="cursor-pointer font-semibold transition-all duration-200 ease-in-out hover:translate-x-2"
                  onClick={() => scrollToElement('keyHighlights', 150)}
                >
                  KEY HIGHLIGHTS
                </li>
                <li
                  className="cursor-pointer font-semibold transition-all duration-200 ease-in-out hover:translate-x-2"
                  onClick={() => scrollToElement('conceptsCovered', 150)}
                >
                  CONCEPTS COVERED
                </li>
                <li
                  className="cursor-pointer font-semibold transition-all duration-200 ease-in-out hover:translate-x-2"
                  onClick={() => scrollToElement('description', 150)}
                >
                  DESCRIPTION
                </li>
                <li
                  className="cursor-pointer font-semibold transition-all duration-200 ease-in-out hover:translate-x-2"
                  onClick={() => scrollToElement('contact', 150)}
                >
                  CONTACT
                </li>
                <li
                  className="cursor-pointer font-semibold transition-all duration-200 ease-in-out hover:translate-x-2"
                  onClick={() => scrollToElement('gallery', 150)}
                >
                  GALLERY
                </li>
              </ul>
            </div>

            <div
              id="tech"
              className="flex flex-col gap-6 self-start rounded-xl  font-bold  tracking-widest text-primary dark:text-secondary max-md:items-center max-md:self-center"
            >
              TECHNOLOGIES
              <div className="flex items-center justify-center gap-4 ">
                {technologies.map((technology, i) => {
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-center gap-2"
                    >
                      <Image
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${technology.value}/${technology.value}-original.svg`}
                        width={24}
                        height={24}
                        alt={technology.label}
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${technology.value}/${technology.value}-plain.svg`;
                        }}
                        className="drop-shadow-lg dark:drop-shadow-none"
                      />
                      <p>{technology.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              id="contributors"
              className="flex flex-col  gap-6  self-start rounded-xl font-bold tracking-widest   text-primary dark:text-secondary max-md:items-center max-md:self-center"
            >
              CONTRIBUTORS
              <div className="flex items-center justify-center gap-2 ">
                {team.map((member, i) => {
                  return (
                    <div
                      key={i}
                      className=" flex  items-center justify-center gap-4 max-md:flex-col  "
                    >
                      <ProfilePicture
                        imageSrc={member.profilePicture}
                        size="medium"
                        className="drop-shadow-lg dark:drop-shadow-none"
                      />
                      <div className="flex flex-col items-start max-md:items-center">
                        {member.label}
                        <p className="text-sm">{member.role}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              id="keyHighlights"
              className="flex w-full  flex-col gap-6  self-start  font-bold tracking-widest text-primary dark:text-secondary"
            >
              KEY HIGHLIGHTS
              <ul className="flex list-inside list-disc  flex-col gap-4 font-light italic ">
                {keyHighlights.map((highlight: string, i: Key) => {
                  return (
                    <li className="" key={i}>
                      {highlight}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div
              id="conceptsCovered"
              className="flex w-full  flex-col gap-6  self-start  font-bold tracking-widest text-primary dark:text-secondary"
            >
              CONCEPTS COVERED
              <ul className="flex list-inside list-disc  flex-col gap-4 font-light ">
                {conceptsCovered.map((concept: string, i: Key) => {
                  return (
                    <li className="" key={i}>
                      {concept}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div
              id="description"
              className="flex w-full  flex-col gap-6  self-start  font-bold tracking-widest text-primary dark:text-secondary"
            >
              DESCRIPTION
              <p className="" dangerouslySetInnerHTML={{ __html: desc }}></p>
            </div>
            <div className="w-full" id="contact">
              <ContactForm width={'w-full'} />
            </div>

            <div
              id="gallery"
              className="grid grid-cols-1 items-center justify-center gap-4"
            >
              {images.gallery.map((image, i) => {
                return (
                  <Image
                    src={image}
                    key={i}
                    alt={fullProjectName}
                    width={1920}
                    height={1080}
                    className="w-full "
                  />
                );
              })}
            </div>
          </div>
        </section>
      </Main>
    );
};

export default ProjectID;
