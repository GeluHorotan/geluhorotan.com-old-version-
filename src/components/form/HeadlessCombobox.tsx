import { Combobox } from '@headlessui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
// Icons
import { MdClose, MdTaskAlt } from 'react-icons/md';

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
  const [techSrc, setTechSrc] = useState('');

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

  const removeLanguage = (index: number) => {
    // Remove the language from the array
    const newLanguages = [...selectedOptions];
    newLanguages.splice(index, 1);
    setSelectedOptions(newLanguages);
    // Update the values object with the new array
    setFieldValue(name, newLanguages);
  };

  const handleOnChange = (value: never[]) => {
    setSelectedOptions(value);
  };

  return (
    <div className="relative flex flex-col gap-1  ">
      <label htmlFor={name} className={`${labelColor || 'text-secondary'}`}>
        {label}
      </label>

      <div className=" relative w-full ">
        <Combobox value={selectedOptions} onChange={handleOnChange} multiple>
          <div className="relative flex flex-col   ">
            <Combobox.Input
              className="w-full rounded-lg bg-secondary_s p-2 outline-none  duration-200 ease-in-out"
              onChange={(event) => setQuery(event.target.value)}
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
                        <span>{index}.</span>
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
                            <MdTaskAlt className={'text-success'} size={16} />
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
                  className=" flex w-full  flex-row items-center justify-between gap-3 rounded-md  bg-secondary_s "
                >
                  <div className="flex flex-row items-center gap-1 p-1">
                    <Image
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${sOption.value}/${sOption.value}-original.svg`}
                      width={16}
                      height={16}
                      alt={sOption.label}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${sOption.value}/${sOption.value}-plain.svg`;
                      }}
                    />
                    <p>{sOption.label}</p>
                  </div>

                  <MdClose
                    size={20}
                    className=" h-full  rounded-r-md  bg-secondary_s_2  px-0.5  text-primary"
                    onClick={() => removeLanguage(index)}
                  />
                </div>
              );
            })}
          </div>
        </Combobox>
      </div>
    </div>
  );
};

export default HeadlessCombobox;
