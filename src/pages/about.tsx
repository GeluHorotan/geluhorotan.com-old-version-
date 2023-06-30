import type { NextPage } from 'next';
import Link from 'next/link';
import React, { useEffect } from 'react';

import AboutEntry from '@/components/AboutEntry';
import TechStack from '@/components/TechStack';
import useScrollToElement from '@/customHooks/useScrollToElement';
import { Meta } from '@/layouts/Meta';
import { TextTemplate } from '@/templates/TextTemplate';

type Props = {
  children?: React.ReactNode;
};

const About: NextPage<Props> = () => {
  const handleContactClick = useScrollToElement();

  return (
    <TextTemplate
      pageTitle="About"
      headerPadding
      meta={
        <Meta
          title="Gelu Horotan - About"
          description={`Welcome to the heart of my coding universe! The about page is where you get to know more about me. Dive into my story, passions, and the driving force behind my dedication to frontend development. Uncover the magic that fuels my creativity and see how I can bring your software project to life.`}
        />
      }
    >
      <section className=" flex !h-max flex-col items-start  justify-center gap-8 px-20 max-[1100px]:flex-col  max-md:px-4  ">
        <div className="flex h-full w-full flex-col justify-center gap-10   max-[1100px]:w-full">
          <div className="flex w-1/2  flex-col gap-8 max-[1076px]:w-full">
            <p className="">
              {' '}
              Driven by curiosity and inspired by my best friend&apos;s
              encouragement, I embarked on my coding journey in November 2021.
              Despite initial doubts about my math skills, I discovered that
              programming transcends traditional barriers.{' '}
            </p>
            <p>
              {' '}
              Starting with C and Python, I quickly grasped the fundamentals and
              drew upon my background in graphic design to excel in frontend
              development. In February 2022, I immersed myself in HTML, CSS, and
              React, harnessing my creativity to craft captivating user
              interfaces.
            </p>
            <p>
              Determined to learn and grow, I ventured into freelancing,
              tackling projects for friends while continuously expanding my
              knowledge. Eager to broaden my expertise, I delved into Next.js,
              Tailwind CSS, TypeScript, and even Node.js to gain a deeper
              understanding of backend technologies.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-2  max-[1100px]:items-center">
          <div className=" flex w-full  items-start justify-center gap-6 max-[1100px]:flex-row max-[1100px]:flex-wrap">
            <TechStack />
          </div>
        </div>
        <div className="flex w-full gap-4 max-md:justify-center ">
          <Link
            className=" flex 
               w-max cursor-pointer  items-center rounded-xl bg-accent px-4  py-2 text-secondary transition-all duration-200 ease-in-out hover:scale-105  dark:bg-accent2 dark:text-primary "
            href=""
            onClick={(event) => handleContactClick(event, '/', 'contact', -25)}
          >
            CONTACT
          </Link>
          <Link
            className=" flex 
               w-max cursor-pointer items-center rounded-xl border-2 border-accent px-4 py-2 text-primary transition-all duration-200 ease-in-out hover:scale-105  dark:border-accent2 dark:text-secondary"
            href=""
            onClick={(event) => handleContactClick(event, '/', 'projects', -25)}
          >
            PROJECTS
          </Link>
        </div>
      </section>
      <div className="flex w-full flex-col bg-red-400">
        <div className="h-20 w-full bg-accent dark:bg-accent2"></div>
        <div className="h-20 w-full bg-accent dark:bg-accent2"></div>

        <AboutEntry
          id="engaging"
          imgSrc="https://res.cloudinary.com/dbhkxaszq/image/upload/v1686318465/About%20Photos/fotis-fotopoulos-DuHKoV44prg-unsplash_jjuvsw.webp"
          title="Crafting Captivating and User-Centric Interfaces"
          colorScheme="reverse"
        >
          {' '}
          With a passion for user-centric design and expertise in frontend
          technologies, I specialize in crafting engaging user interfaces that
          captivate audiences. By seamlessly blending aesthetics and
          functionality, I create visually stunning and intuitive web solutions.
          Through meticulous attention to detail, strategic use of animations,
          and seamless navigation, I ensure memorable and impactful user
          experiences. I take pride in designing interfaces that not only meet
          client goals but also leave a lasting impression.
        </AboutEntry>

        <div className="h-20 w-full bg-accent dark:bg-accent2"></div>
        <div className="h-20 w-full bg-accent dark:bg-accent2"></div>
        <AboutEntry
          id="performance"
          imgSrc="https://res.cloudinary.com/dbhkxaszq/image/upload/v1686318464/About%20Photos/gabriel-vasiliu-1cIirhlCMts-unsplash_sy5mar.webp"
          title="Enhancing Website Performance for Lightning-Fast Loading"
          colorScheme="normal"
          isReversed
        >
          {' '}
          Performance I am committed to optimizing website performance to its
          fullest potential. By implementing advanced techniques, meticulous
          code optimization, and strategic asset compression, I ensure
          lightning-fast loading times and seamless user interactions. Through
          efficient caching strategies, browser compatibility, and
          performance-enhancing methodologies, I deliver superior user
          experiences. By prioritizing performance, I help businesses thrive in
          today&apos;s digital landscape, providing a competitive edge and
          driving success.
        </AboutEntry>
        <div className="h-20 w-full bg-accent dark:bg-accent2"></div>
        <div className="h-20 w-full bg-accent dark:bg-accent2"></div>
        <AboutEntry
          id="responsive"
          imgSrc="https://res.cloudinary.com/dbhkxaszq/image/upload/v1686317800/About%20Photos/mohammad-rahmani-gA396xahf-Q-unsplash_bjunnz.webp"
          title="Designing Websites that Seamlessly Adapt Across Devices"
          colorScheme="reverse"
          objectPosition="object-right"
        >
          {' '}
          With a mobile-first approach and deep expertise in responsive design
          principles, I specialize in creating seamless and user-friendly
          websites. By utilizing fluid layouts, flexible grids, and media
          queries, I ensure consistent experiences across devices. Through
          meticulous attention to detail, accessibility considerations, and a
          focus on usability, I deliver websites that adapt effortlessly to any
          screen size or device. I prioritize responsive design to provide
          inclusive experiences that cater to diverse audiences.
        </AboutEntry>
      </div>
    </TextTemplate>
  );
};

export default About;
