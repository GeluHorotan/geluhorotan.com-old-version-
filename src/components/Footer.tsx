import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';
import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai';
import { TiSocialLinkedin } from 'react-icons/ti';
import { Link as ScrollLink } from 'react-scroll';

import useScrollToElement from '@/customHooks/useScrollToElement';

type Props = {
  children?: React.ReactNode;
};

type FooterItemProps = {
  children?: React.ReactNode;
  to: string;
  target?: string;
};

const FooterItem: FC<FooterItemProps> = ({ children, to, target }) => {
  const handleContactClick = useScrollToElement();
  return (
    <Link
      href={to}
      target={target || ''}
      onClick={(event) => handleContactClick(event, to, target, -25)}
    >
      <p className="flex items-center gap-2 text-start  font-light tracking-widest transition-all duration-150 ease-in-out hover:translate-x-1 ">
        {children}
      </p>
    </Link>
  );
};

const Footer: FC<Props> = ({ children }) => {
  return (
    <div className=" flex h-[50vh] flex-col items-center justify-between  bg-primary p-20  text-secondary dark:bg-secondary dark:text-primary max-[1012px]:h-max max-[1012px]:gap-10 max-[1012px]:px-8  max-[1012px]:py-6  ">
      <div className="flex w-full justify-center gap-40 max-[1012px]:flex-col max-[1012px]:gap-6 ">
        {' '}
        <div className="flex h-full flex-col items-center justify-center   ">
          <div className="flex h-full  w-full flex-col items-start justify-start gap-4 ">
            <p className="font-bold  uppercase tracking-[0.2rem] ">
              Navigation
            </p>
            <div className="flex flex-col gap-2">
              <FooterItem to={'/about'}>About</FooterItem>
              <FooterItem to={`/`} target={'projects'}>
                Projects
              </FooterItem>
              <FooterItem to={`/cv`}>CV</FooterItem>
              <FooterItem to={`/`} target="contact">
                Contact
              </FooterItem>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center   ">
          <div className="flex h-full w-full flex-col items-start justify-start gap-4 ">
            <p className="font-bold  uppercase tracking-[0.2rem] ">Legal</p>
            <div className="flex flex-col gap-2">
              <FooterItem to={'/terms-and-conditions'}>
                Terms and Conditions
              </FooterItem>
              <FooterItem to={'/privacy-policy'}>Privacy Policy</FooterItem>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center  ">
          <div className="flex h-full w-full flex-col items-start justify-start gap-4 ">
            <p className="font-bold  uppercase tracking-[0.2rem] ">Socials</p>
            <div className="flex flex-col gap-2">
              <FooterItem to="https://github.com/GeluHorotan" target={'_blank'}>
                {' '}
                <AiFillGithub size={20} /> Github
              </FooterItem>
              <FooterItem
                to="https://www.linkedin.com/in/gelu-horotan/"
                target={'_blank'}
              >
                <TiSocialLinkedin size={20} /> LinkedIn
              </FooterItem>
              <FooterItem
                to="https://twitter.com/oxymoron365"
                target={'_blank'}
              >
                <AiOutlineTwitter size={20} /> Twitter
              </FooterItem>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[0.1rem] w-full bg-primary "></div>
      <div className="">
        <p className="text-center tracking-widest">
          All rights reserved &copy; Gelu Horotan {new Date().getFullYear()}{' '}
        </p>
      </div>
    </div>
  );
};

export default Footer;
