import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

type Props = {
  children?: React.ReactNode;
};

type FooterItemProps = {
  children?: React.ReactNode;
  href: string;
};

const FooterItem: FC<FooterItemProps> = ({ children, href }) => {
  return (
    <Link href={href}>
      <p className=" text-start font-extralight uppercase tracking-widest">
        {children}
      </p>
    </Link>
  );
};

const Footer: FC<Props> = ({ children }) => {
  return (
    <div className=" flex h-[50vh] flex-col items-center justify-center  border-b-8 border-b-accent2 bg-primary py-14 px-20 text-secondary">
      <div className="grid h-full grid-cols-3 gap-40  ">
        {' '}
        <div className="flex flex-col items-center justify-center  ">
          <div className="flex h-1/2 w-max flex-col items-start justify-start gap-4 ">
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
        <div className="flex flex-col items-center justify-center  ">
          <div className="flex h-1/2 w-max flex-col items-start justify-start gap-4 ">
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
          <div className="flex h-1/2 w-max flex-col items-start justify-start gap-4 ">
            <p className="font-semibold  uppercase tracking-[0.2rem] text-primary_t_2">
              Socials
            </p>
            <div className="flex flex-col gap-2">
              <FooterItem href="#">Github</FooterItem>
              <FooterItem href="#">LinkedIn</FooterItem>
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
