import type { NextPage } from 'next';
import React, { useEffect } from 'react';

import AboutEntry from '@/components/AboutEntry';
import AboutTechEntry from '@/components/AboutTechEntry';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Scroll = require('react-scroll');

const { Element } = Scroll;
const { scroller } = Scroll;

type Props = {
  children?: React.ReactNode;
};

const About: NextPage<Props> = () => {
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
  }, []);

  return (
    <Main
      meta={
        <Meta
          title="Gelu Horotan - Software Engineer"
          description={`Unlock the doors to the secret club of awesomeness with my signin page - Enter your credentials, grab a drink and let's code together`}
        />
      }
    >
      <section className=" container flex !h-max  items-center justify-center gap-40 py-40  max-[1100px]:flex-col  ">
        <div className="flex h-full w-1/2 flex-col justify-center gap-10  max-[1100px]:w-full">
          <h1 className="futura-heavy relative    tracking-widest ">ABOUT</h1>
          <div className="flex w-full flex-col gap-8 max-[1076px]:w-full">
            <h4 className="">
              Detail-oriented professional and critical thinker with a flair for
              creating elegant solutions in the least amount of time.
            </h4>
            <p>
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
            <p>
              {' '}
              With an unwavering passion and relentless drive, I am poised to
              make a lasting impact in the world of frontend development.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-2 max-[1100px]:items-center">
          <h6 className="tracking-widedst">TECH</h6>

          <div className="rounded- flex w-full flex-col items-start justify-center gap-6 max-[1100px]:flex-row max-[1100px]:flex-wrap">
            <AboutTechEntry techName={'javascript'} />

            <AboutTechEntry techName={'react'} />
            <AboutTechEntry techName={'typescript'} />
            <AboutTechEntry techName={'nodejs'} />
            <AboutTechEntry techName={'tailwindcss'} />
          </div>
        </div>
      </section>
      <div className="h-20 w-full bg-accent dark:bg-accent2"></div>
      <div className="h-20 w-full bg-accent dark:bg-accent2"></div>

      <AboutEntry
        id="engaging"
        imgSrc="  https://res.cloudinary.com/dbhkxaszq/image/upload/v1685910938/About%20Photos/mohammad-rahmani-gA396xahf-Q-unsplash_k8aamj.jpg"
        title="Crafting Captivating and User-Centric Interfaces"
        colorScheme="reverse"
      >
        {' '}
        With a passion for user-centric design and expertise in frontend
        technologies, I specialize in crafting engaging user interfaces that
        captivate audiences. By seamlessly blending aesthetics and
        functionality, I create visually stunning and intuitive web solutions.
        Through meticulous attention to detail, strategic use of animations, and
        seamless navigation, I ensure memorable and impactful user experiences.
        I take pride in designing interfaces that not only meet client goals but
        also leave a lasting impression.
      </AboutEntry>

      <div className="h-20 w-full bg-accent dark:bg-accent2"></div>
      <div className="h-20 w-full bg-accent dark:bg-accent2"></div>
      <AboutEntry
        id="performance"
        imgSrc="  https://res.cloudinary.com/dbhkxaszq/image/upload/v1685911161/About%20Photos/gabriel-vasiliu-1cIirhlCMts-unsplash_fk7coh.jpg"
        title="Enhancing Website Performance for Lightning-Fast Loading"
        colorScheme="normal"
        isReversed
      >
        {' '}
        Performance I am committed to optimizing website performance to its
        fullest potential. By implementing advanced techniques, meticulous code
        optimization, and strategic asset compression, I ensure lightning-fast
        loading times and seamless user interactions. Through efficient caching
        strategies, browser compatibility, and performance-enhancing
        methodologies, I deliver superior user experiences. By prioritizing
        performance, I help businesses thrive in today&apos;s digital landscape,
        providing a competitive edge and driving success.
      </AboutEntry>
      <div className="h-20 w-full bg-accent dark:bg-accent2"></div>
      <div className="h-20 w-full bg-accent dark:bg-accent2"></div>
      <AboutEntry
        id="responsive"
        imgSrc="https://res.cloudinary.com/dbhkxaszq/image/upload/v1685911383/About%20Photos/photo-1605379399642-870262d3d051_pjov25.avif"
        title="Designing Websites that Seamlessly Adapt Across Devices"
        colorScheme="reverse"
      >
        {' '}
        With a mobile-first approach and deep expertise in responsive design
        principles, I specialize in creating seamless and user-friendly
        websites. By utilizing fluid layouts, flexible grids, and media queries,
        I ensure consistent experiences across devices. Through meticulous
        attention to detail, accessibility considerations, and a focus on
        usability, I deliver websites that adapt effortlessly to any screen size
        or device. I prioritize responsive design to provide inclusive
        experiences that cater to diverse audiences.
      </AboutEntry>
      <div className="h-20 w-full bg-accent dark:bg-accent2"></div>
      <div className="h-20 w-full bg-accent dark:bg-accent2" id="test"></div>
    </Main>
  );
};

export default About;