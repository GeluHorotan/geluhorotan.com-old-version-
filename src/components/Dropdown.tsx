import { Menu } from '@headlessui/react';
import Link from 'next/link';
import React from 'react';

type Props = {
  children: React.ReactNode;
  title?: string;
  data: {
    header: string;
    items: {
      to: string;
      name: string;
      id: number;
      isNew?: boolean;
      action?: () => void;
    }[];
  };
};

type LinkProps = {
  className?: string;
  fRef?: HTMLAnchorElement;
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const CustomLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, fRef) => {
    const { href, children, ...rest } = props;
    return (
      <Link href={href}>
        <>
          <a ref={fRef} {...rest}>
            {children}
          </a>
        </>
      </Link>
    );
  }
);

CustomLink.displayName = 'CustomLink';
const Dropdown = ({ children, data, title }: Props) => {
  return (
    <div className=" text-right">
      <Menu as="div" className="relative inline-block ">
        <Menu.Button className="inline-flex w-full items-center justify-center gap-4 rounded-md    text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {children}
        </Menu.Button>
        <Menu.Items className="absolute right-0 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md bg-white p-4 text-left   focus:outline-none">
          {data?.header} <br />
          {title && title}
          <div className="p-1  ">
            {data.items?.map((item) => {
              return (
                <>
                  {item?.isNew && (
                    <div className="w-full border  bg-black"></div>
                  )}

                  <Menu.Item key={item.id}>
                    <CustomLink
                      href={item.to}
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        }
                      }}
                      className={
                        ' group  flex h-max w-full  flex-col items-start rounded-md p-2 text-left text-sm text-primary transition-all  duration-200 ease-in-out ui-active:translate-x-1 ui-active:bg-accent_t_2 '
                      }
                    >
                      {item.name}
                    </CustomLink>
                  </Menu.Item>
                </>
              );
            })}
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default Dropdown;
