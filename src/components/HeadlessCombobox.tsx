import { Combobox } from '@headlessui/react';
// Framer motion
import { motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';
// Icons
import { MdClose, MdTaskAlt } from 'react-icons/md';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './Tooltip';

type Props = {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  value: any;
  error: string;
  id: string;
  label: string;
  labelColor?: string;
  placeholder?: string;

  setFieldValue: (field: string, value: any) => void;

  options: any[];
};

const HeadlessCombobox = ({
  value,
  name,
  error,
  id,
  label,
  labelColor,
  setFieldValue,
  options,

  ...props
}: Props) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [query, setQuery] = useState('');
  const controls = useAnimationControls();

  const filteredOptions =
    query === ''
      ? options
      : options.filter((person) =>
          person.value
            .toUpperCase()
            .replace(/\s+/g, '')
            .includes(query.toUpperCase().replace(/\s+/g, ''))
        );

  useEffect(() => {
    setFieldValue(name, selectedOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions]);
  useEffect(() => {
    if (error) {
      controls.start({ x: [0, 3, 0] });
    }
  }, [error]);

  const removeEntry = (index: number) => {
    // Remove the language from the array
    const newEntries = [...selectedOptions];
    newEntries.splice(index, 1);
    setSelectedOptions(newEntries);
    // Update the values object with the new array
    setFieldValue(name, newEntries);
  };

  const handleOnChange = (value: never[]) => {
    setSelectedOptions(value);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <motion.div
          initial={{ x: 0 }}
          animate={controls}
          transition={{ type: 'spring', duration: 0.1 }}
          className="relative flex flex-col gap-1  "
        >
          <label
            htmlFor={name}
            className={`${labelColor || 'text-secondary'} ${
              !error || 'text-error'
            } flex items-center gap-1`}
          >
            {error && (
              <TooltipTrigger className="flex ">
                <BiErrorCircle
                  className={`${error ? 'text-error' : labelColor}`}
                  size={16}
                ></BiErrorCircle>
              </TooltipTrigger>
            )}
            {label}
          </label>
          {error && (
            <TooltipContent className="bg-primary text-secondary">
              <p>{error}</p>
            </TooltipContent>
          )}

          <div className=" relative w-full ">
            <Combobox
              value={selectedOptions}
              onChange={handleOnChange}
              multiple
            >
              <div className="relative flex flex-col   ">
                <Combobox.Input
                  className={`w-full rounded-lg bg-secondary_s p-2 outline-none  duration-200 ease-in-out ${
                    error ? 'border border-error' : ''
                  } `}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={'Select the tech stack'}
                />

                <Combobox.Button className=" absolute right-0 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center pr-2 ">
                  <IoIosArrowForward className="rotate-90 transition-all duration-200 ease-in-out " />
                </Combobox.Button>

                <Combobox.Options className="absolute top-full right-0 z-50   max-h-60 w-full overflow-auto rounded-md bg-secondary py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredOptions.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredOptions.map((option, index) => (
                      <Combobox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-default  select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-secondary_s_2 ' : ''
                          }`
                        }
                        value={option}
                      >
                        {({ selected, active }) => (
                          <div className="flex flex-row items-center gap-3">
                            <span>{index + 1}.</span>
                            <Image
                              src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${option.value}/${option.value}-original.svg`}
                              width={24}
                              height={24}
                              alt={option.label}
                              onError={(e) => {
                                const img = e.target as HTMLImageElement;
                                img.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${option.value}/${option.value}-plain.svg`;
                              }}
                            />

                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {option.label}
                            </span>

                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? 'text-white' : 'text-teal-600'
                                }`}
                              >
                                <MdTaskAlt
                                  className={'text-success'}
                                  size={16}
                                />
                              </span>
                            ) : null}
                          </div>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </div>

              <div
                className={`  ${
                  selectedOptions.length === 0
                    ? 'flex-nowrap'
                    : 'grid w-full grid-cols-4 '
                }   gap-4 rounded-md  py-2`}
              >
                {selectedOptions.length === 0 && (
                  <p>No {label.toLowerCase()} added.</p>
                )}
                {selectedOptions?.map((sOption, index) => {
                  return (
                    <div
                      key={index}
                      className=" relative  flex   w-full  items-center justify-center  rounded-lg bg-secondary_s_2   "
                    >
                      <div className=" flex h-full w-full  items-center justify-center gap-2  p-2">
                        <Image
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${sOption.value}/${sOption.value}-original.svg`}
                          width={20}
                          height={20}
                          alt={sOption.label}
                          className=""
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${sOption.value}/${sOption.value}-plain.svg`;
                          }}
                        />
                        <p>{sOption.label}</p>
                      </div>
                      <MdClose
                        className=" absolute right-2"
                        onClick={() => removeEntry(index)}
                      ></MdClose>
                    </div>
                  );
                })}
              </div>
            </Combobox>
          </div>
        </motion.div>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HeadlessCombobox;