import { Combobox } from '@headlessui/react';
import React, { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
// Icons

type Props = {
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  fieldValue: {
    profilePicture: string;
    label: string;
    value: string;
    role: string;
  }[];
  error?: string;
  id: string;
  label: string;
  labelColor?: string;
  placeholder?: string;
  setFieldValue: (field: string, value: any) => void;
  index: number;
  options: any[];
};

type Value = {
  value: string;
  label: string;
};

const SingleCombobox = ({
  name,
  fieldValue,
  setFieldValue,
  index,
  options,
}: Props) => {
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((person) =>
          person.value
            .toUpperCase()
            .replace(/\s+/g, '')
            .includes(query.toUpperCase().replace(/\s+/g, ''))
        );

  const handleOnChange = (value: Value) => {
    setFieldValue(name, { ...fieldValue[index], role: value.label });
  };

  return (
    <div className="relative flex flex-col gap-1   ">
      <div className=" relative  ">
        <Combobox onChange={handleOnChange}>
          <div className="relative flex   ">
            <Combobox.Input
              className=" rounded-lg bg-transparent outline-none  duration-200 ease-in-out placeholder:font-light placeholder:text-primary"
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              placeholder={
                fieldValue ? fieldValue[index].role : 'Select a role'
              }
            />
            <Combobox.Button className=" flex    items-center ">
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
                      `relative cursor-default  select-none p-2 ${
                        active ? 'bg-secondary_s_2 ' : ''
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <div className="flex flex-row items-center gap-3">
                        <span>{index + 1}.</span>

                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {option.label}
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </div>
        </Combobox>
      </div>
    </div>
  );
};

export default SingleCombobox;
