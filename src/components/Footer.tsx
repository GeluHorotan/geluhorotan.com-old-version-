import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';
import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai';
import { TiSocialLinkedin } from 'react-icons/ti';
import { Link as ScrollLink } from 'react-scroll';

type Props = {
  children?: React.ReactNode;
};

type FooterItemProps = {
  children?: React.ReactNode;
  href: string;
  target?: string;
};

const FooterItem: FC<FooterItemProps> = ({ children, href, target }) => {
  return (
    <Link href={href} target={target || ''}>
      <p className="flex items-center gap-2 text-start font-extralight tracking-widest transition-all duration-150 ease-in-out hover:translate-x-1 hover:text-accent2">
        {children}
      </p>
    </Link>
  );
};

const Footer: FC<Props> = ({ children }) => {
  return (
    <div className=" flex h-[50vh] flex-col items-center justify-between border-b-8  border-b-accent2 bg-primary p-20  text-secondary  max-[1012px]:h-max max-[1012px]:gap-10 max-[1012px]:px-8  max-[1012px]:py-6  ">
      <div className="flex w-full justify-center gap-40 max-[1012px]:flex-col max-[1012px]:gap-6 ">
        {' '}
        <div className="flex h-full flex-col items-center justify-center   ">
          <div className="flex h-full  w-full flex-col items-start justify-start gap-4 ">
            <p className="font-semibold  uppercase tracking-[0.2rem] text-primary_t_2">
              Navigation
            </p>
            <div className="flex flex-col gap-2">
              <FooterItem href={'/about'}>About</FooterItem>
              <FooterItem href={`/?scrollTo=projects&scrollDuration=2000`}>
                Projects
              </FooterItem>
              <FooterItem href={`/?scrollTo=contact&scrollDuration=2000`}>
                Contact
              </FooterItem>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center   ">
          <div className="flex h-full w-full flex-col items-start justify-start gap-4 ">
            <p className="font-semibold  uppercase tracking-[0.2rem] text-primary_t_2">
              Legal
            </p>
            <div className="flex flex-col gap-2">
              <FooterItem href={'/terms-and-conditions'}>
                Terms and Conditions
              </FooterItem>
              <FooterItem href={'/terms-and-conditions'}>
                Privacy Policy
              </FooterItem>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center  ">
          <div className="flex h-full w-full flex-col items-start justify-start gap-4 ">
            <p className="font-semibold  uppercase tracking-[0.2rem] text-primary_t_2">
              Socials
            </p>
            <div className="flex flex-col gap-2">
              <FooterItem
                href="https://github.com/GeluHorotan"
                target={'_blank'}
              >
                {' '}
                <AiFillGithub size={20} /> Github
              </FooterItem>
              <FooterItem
                href="https://www.linkedin.com/in/gelu-horotan/"
                target={'_blank'}
              >
                <TiSocialLinkedin size={20} /> LinkedIn
              </FooterItem>
              <FooterItem
                href="https://twitter.com/oxymoron365"
                target={'_blank'}
              >
                <AiOutlineTwitter size={20} /> Twitter
              </FooterItem>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[0.1rem] w-full bg-primary_t"></div>
      <div className="">
        <p className="tracking-widest">
          All rights reserved &copy; Gelu Horotan {new Date().getFullYear()}{' '}
        </p>
      </div>
    </div>
  );
};

export default Footer;
