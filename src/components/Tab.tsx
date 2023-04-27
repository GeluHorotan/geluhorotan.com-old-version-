import { Tab } from '@headlessui/react';
import React from 'react';

type Items = {
  list: string[];
  className?: string;
  children: React.ReactElement[];

  setSelectedIndex?: React.Dispatch<React.SetStateAction<number>>;
  setActiveTab?: React.Dispatch<React.SetStateAction<number>>;
  [key: string]: unknown;
};
const Tabs = ({ list, setActiveTab, className, children, ...props }: Items) => {
  return (
    <Tab.Group {...props} as={'div'}>
      <div className="flex   flex-col gap-8 ">
        <Tab.List className="flex w-full gap-1   [&>*:last-child]:rounded-tr-lg [&>*:first-child]:rounded-tl-lg  ">
          {list.map((item, index) => (
            <Tab
              key={index}
              className={`w-full   bg-accent2 outline-none ui-selected:bg-accent ui-selected:text-secondary ${
                className || ''
              }     duration-250      p-2 font-medium uppercase leading-5  text-primary transition-all ease-in-out focus:outline-none  `}
              onClick={() => {
                if (setActiveTab) {
                  return setActiveTab(index);
                }
                return null;
              }}
            >
              {item}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className={''}>
          {children.map((item, index) => {
            return (
              <Tab.Panel key={index} className="flex h-full items-center ">
                {item}
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};

export default Tabs;
