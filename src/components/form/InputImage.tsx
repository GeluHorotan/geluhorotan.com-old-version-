import Image from 'next/image';
import React, { useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';

type Props = {
  multiple?: boolean;
  label: string;
  type: string;
  id: string;
  value: any;
  setFieldValue: (field: string, value: any) => void;
  name: string;
};

const InputImage = ({
  name,
  id,
  type,
  setFieldValue,
  value,
  label,
  multiple = false,
}: Props) => {
  const [dataUrl, setDataUrl] = useState('');

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setDataUrl(event.target?.result as string);
      if (multiple) {
        setFieldValue(name, [...value, event.target?.result]);
      } else if (!multiple) {
        setFieldValue(name, event.target?.result);
      }
    };
    reader.readAsDataURL(file);
  };

  console.log(value, 'vv');

  return (
    <div className=" flex w-full flex-col   items-center gap-2 rounded-lg ">
      <p className="text-primary ">{label}</p>
      <div className="flex gap-4">
        {dataUrl && (
          <div className="flex items-center gap-2">
            {!multiple ? (
              <Image
                src={dataUrl && dataUrl}
                width={64}
                height={64}
                alt="test"
                className="rounded-lg"
              />
            ) : (
              value?.map((image: string, i: React.Key) => {
                return (
                  <Image
                    src={image}
                    width={64}
                    height={64}
                    alt="test2"
                    className="rounded-lg"
                    key={i}
                  />
                );
              })
            )}
          </div>
        )}
        {!dataUrl && <p>No image added.</p>}
        <label
          htmlFor={id}
          className=" flex  h-16 w-16 flex-col items-center justify-center gap-1 rounded-lg bg-blue-400   "
        >
          <BiImageAdd size={32} className="text-secondary" />
          <input
            accept="image/jpg"
            onChange={onInputChange}
            name={name}
            type={type}
            id={id}
            className="hidden bg-blue-600"
          />
        </label>
      </div>
    </div>
  );
};

export default InputImage;
