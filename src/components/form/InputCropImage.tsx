import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
// Icons
import { BiImageAdd } from 'react-icons/bi';

import Button from '@/components/Button';
import getCroppedImg from '@/utils/cropImage';

type Props = {
  value: string;
  inputType: string;
  name: string;
  error: string;
  id: string;
  color?: string;
  label: string;
  croppedImage: string;
  setCroppedImage: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setFieldValue: (field: string, value: any) => void;
};

type Crop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const InputCropImage = ({
  inputType,
  setFieldValue,

  name,
  id,

  setCroppedImage,
  setIsOpen,

  error,
}: Props) => {
  const [dataUrl, setDataUrl] = useState<string | null>('');
  const [crop, setCrop] = useState<Crop>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Crop | null>(null);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFieldValue(name, file);
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setDataUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback(
    (croppedArea: unknown, croppedAreaPixels: Crop) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(dataUrl, croppedAreaPixels);
      setCroppedImage(croppedImage);

      setFieldValue(name, croppedImage);
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedAreaPixels]);

  const onClose = useCallback(() => {
    setDataUrl(null);
  }, []);

  return (
    <div className="relative m-10 flex   h-full w-full flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center gap-2 ">
        {(error || !dataUrl) && (
          <div className="flex flex-col items-center justify-center gap-2">
            <Button type="button" className="rounded-xl bg-primary">
              <label
                htmlFor={id}
                className=" flex h-full w-full flex-col items-center justify-center rounded-xl p-14 "
              >
                <BiImageAdd size={32} className="text-secondary" />

                <input
                  accept="image/jpg"
                  onChange={onInputChange}
                  name={name}
                  type={inputType}
                  id={id}
                  className="hidden bg-blue-600"
                />
                <p className="text-secondary ">Upload Image</p>
              </label>
            </Button>
          </div>
        )}
      </div>
      <span className="flex  items-center justify-center text-center    text-red-500">
        {error}
      </span>

      {dataUrl && !error && (
        <div className="relative my-7 mx-auto h-72 w-[500px] bg-primary ">
          <Cropper
            image={dataUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={(location) =>
              setCrop((prevState) => ({
                ...prevState,
                x: location.x,
                y: location.y,
              }))
            }
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            objectFit="horizontal-cover"
            restrictPosition={true}
          />
        </div>
      )}
      <p className=" w-full  text-center text-secondary">
        {' '}
        Please upload a .jpg .jpeg or .png file!
        <br />
        The file should not exceed 2 MB!
      </p>
      {dataUrl && !error && (
        <div className="flex  w-full items-center justify-center gap-4">
          <Button
            type="button"
            onClick={() => {
              showCroppedImage();
              setIsOpen(false);
            }}
            className="rounded-md bg-red-400 px-3 py-1"
          >
            Apply
          </Button>
          <Button
            type="button"
            onClick={onClose}
            className="rounded-md bg-red-400 px-3 py-1"
          >
            Discard
          </Button>
        </div>
      )}
    </div>
  );
};

export default InputCropImage;
