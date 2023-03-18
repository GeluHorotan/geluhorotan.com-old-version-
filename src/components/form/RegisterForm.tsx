// Form
import { Field, Form, Formik } from 'formik';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { BiErrorCircle } from 'react-icons/bi';
import { BsPencilSquare } from 'react-icons/bs';
// Icons
import { MdAddAPhoto } from 'react-icons/md';
import * as Yup from 'yup';

import { useAuth } from '@//context/hooks/useAuth';
import Button from '@/components/Button';
import ModalWrapper from '@/components/ModalWrapper';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../Tooltip';
import FormIcon from './FormIcon';
// Motion
// import { AnimatePresence, motion, useAnimation } from 'framer-motion'
// Components
import Input from './Input';
import InputCropImage from './InputCropImage';

type Props = {
  className?: string;
  rounded?: boolean;
};

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Please enter more than 3 characters!')
    .max(10, `Please enter less than 10 characters!`)
    .required('This field is required!'),
  lastName: Yup.string()
    .min(3, 'Please enter more than 3 characters!')
    .max(10, `Please enter less than 10 characters!`)
    .required('This field is required!'),
  email: Yup.string()
    .email('Please enter a valid email!')
    .required('This field is required!'),
  password: Yup.string()
    .required('This field is required!')
    .min(6, 'Please enter more than 6 characters!')
    .max(24, 'Please enter less than 24 characters!'),
  password2: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (value: string) => value && value.length > 0,
      then: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
    }),
  profilePicture: Yup.mixed()
    .required('This field is required!')
    .test(
      'imageFormat',
      `Invalid image format. Please select a supported format!`,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Unreachable code error
      (value) => {
        if (typeof value === 'string') {
          const mimeType = value.split(',')[0].split(':')[1].split(';')[0];
          return ['image/jpeg', 'image/png', 'image/jpg'].includes(mimeType);
        }
        if (typeof value === 'object') {
          return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
        }
      }
    )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    .test('imageSize', 'Image is too large', (value) => {
      if (typeof value === 'string') {
        const imageData = Buffer.from(value, 'base64');

        const size = imageData.length / 1000;

        return size <= 2 * 1024; // 2 MB
      }
      if (typeof value === 'object') {
        const size = value.size / 1000;
        return size <= 2 * 1024; // @M
      }
    }),
});

const RegisterForm = ({ className, rounded }: Props) => {
  const { register } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);

  return (
    <TooltipProvider>
      <Tooltip>
        <Formik
          validateOnBlur
          validateOnChange
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password2: '',
            profilePicture: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={async ({
            firstName,
            lastName,
            email,
            password,
            password2,
            profilePicture,
          }) => {
            if (password === password2) {
              await register({
                firstName,
                lastName,
                email,
                password,
                profilePicture,
              });
            }
          }}
        >
          {({
            values: {
              firstName,
              lastName,
              email,
              password,
              password2,
              profilePicture,
            },
            setFieldValue,
            setStatus,
            errors,
            handleBlur,
            handleChange,
          }) => (
            <Form
              className={
                'flex h-1/2 w-full  flex-col justify-center gap-8  py-4 text-primary'
              }
            >
              <div className="relative flex w-max flex-col items-center justify-center gap-1 self-center rounded-full  text-secondary">
                {croppedImage && (
                  <Image
                    src={croppedImage}
                    alt="Profile Picture"
                    width={128}
                    height={128}
                    className={`rounded-full `}
                  />
                )}
                <Button
                  type="button"
                  className={`${
                    croppedImage ? 'show' : 'hidden'
                  } absolute top-0 right-0 text-secondary`}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <BsPencilSquare
                    size={32}
                    className="rounded-md bg-primary  p-1"
                  />
                </Button>
                <Button
                  type="button"
                  className={` h-32 w-32 rounded-full bg-primary_t p-12 text-secondary ${
                    !croppedImage ? 'show' : 'hidden'
                  }`}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <MdAddAPhoto size={32} />

                  <ModalWrapper
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    title="Select an Image"
                  >
                    <Field
                      setFieldValue={setFieldValue}
                      label="Profile picture"
                      id="profilePicture"
                      name="profilePicture"
                      onBlurHandler={handleBlur}
                      type="file"
                      value={profilePicture}
                      error={errors.profilePicture}
                      as={InputCropImage}
                      croppedImage={croppedImage}
                      setCroppedImage={setCroppedImage}
                      setIsOpen={setIsOpen}
                      setStatus={setStatus}
                    />
                  </ModalWrapper>
                </Button>
                <div className="flex items-center gap-0.5">
                  {errors.profilePicture && (
                    <TooltipTrigger className="flex ">
                      <BiErrorCircle
                        className={`${
                          errors.profilePicture ? 'text-error' : ''
                        }`}
                        size={16}
                      />
                    </TooltipTrigger>
                  )}{' '}
                  {errors.profilePicture && (
                    <TooltipContent className="bg-primary text-secondary">
                      <p>{errors.profilePicture}</p>
                    </TooltipContent>
                  )}
                  <span
                    className={`${errors.profilePicture ? 'text-error' : ''}`}
                  >
                    Profile picture
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 space-x-1">
                <Field
                  label="First name"
                  id="firstName"
                  name="firstName"
                  onChangeHandler={handleChange}
                  onBlurHandler={handleBlur}
                  type="input"
                  value={firstName}
                  error={errors.firstName}
                  as={Input}
                  icon={
                    <FormIcon
                      icon={<AiOutlineUser />}
                      error={errors.firstName}
                    />
                  }
                />

                <Field
                  label="Last name"
                  id="lastName"
                  name="lastName"
                  onChangeHandler={handleChange}
                  onBlurHandler={handleBlur}
                  type="input"
                  value={lastName}
                  error={errors.lastName}
                  as={Input}
                  icon={
                    <FormIcon
                      icon={<AiOutlineUser />}
                      error={errors.lastName}
                    />
                  }
                />
              </div>
              <Field
                label="Email "
                id="email"
                name="email"
                onChangeHandler={handleChange}
                onBlurHandler={handleBlur}
                type="input"
                value={email}
                error={errors.email}
                as={Input}
                icon={
                  <FormIcon icon={<AiOutlineMail />} error={errors.email} />
                }
              />
              <div className="grid grid-cols-2 space-x-1">
                <Field
                  label="Password"
                  id="password"
                  name="password"
                  onChangeHandler={handleChange}
                  onBlurHandler={handleBlur}
                  type="input"
                  value={password}
                  error={errors.password}
                  as={Input}
                  icon={
                    <FormIcon
                      icon={<AiOutlineLock />}
                      error={errors.password}
                    />
                  }
                />
                <Field
                  label="Check password"
                  id="password2"
                  name="password2"
                  onChangeHandler={handleChange}
                  onBlurHandler={handleBlur}
                  type="input"
                  value={password2}
                  error={errors.password2}
                  as={Input}
                  icon={
                    <FormIcon
                      icon={<AiOutlineLock />}
                      error={errors.password2}
                    />
                  }
                />
              </div>
              <Button
                type="submit"
                className="mb-4 w-full rounded-lg   bg-accent2 py-2   uppercase text-primary dark:text-primary"
                rounded
              >
                REGISTER
              </Button>
            </Form>
          )}
        </Formik>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RegisterForm;
