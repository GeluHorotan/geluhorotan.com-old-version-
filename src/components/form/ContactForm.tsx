// Form
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import type { FC } from 'react';
import * as Yup from 'yup';

import { useAuth } from '@//context/hooks/useAuth';
import Button from '@/components/Button';
// Components
import Input from '@/components/form/Input';
import useButtonCooldown from '@/context/hooks/useButtonCooldown';
import { useContact } from '@/context/hooks/useContact';

import Checkbox from './Checkbox';
import TextArea from './TextArea';

type Props = {
  className?: string;
  rounded?: boolean;
  width?: string;
};

const ContactSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .min(3, 'Please enter more than 3 characters!')
    .max(20, `Please enter less than 10 characters!`)
    .required('This field is required!'),
  lastName: Yup.string()
    .trim()
    .min(3, 'Please enter more than 3 characters!')
    .max(20, `Please enter less than 10 characters!`)
    .required('This field is required!'),
  email: Yup.string()
    .trim()
    .email('Please enter a valid email!')
    .required('This field is required!'),
  subject: Yup.string()
    .trim()
    .min(3, 'Please enter more than 3 characters!')
    .max(100, `Please enter less than 10 characters!`)
    .required('This field is required!'),
  message: Yup.string()
    .trim()
    .min(10, 'Please enter more than 10 characters!')
    .max(10000, 'Please enter less than 100 characters!')
    .required('This field is required!'),
  consent: Yup.boolean().oneOf([true], 'This field is required!'),
});

const ContactForm: FC<Props> = ({ className, rounded, width }) => {
  const [isButtonDisabled, handleClick] = useButtonCooldown(3000);
  const { sendMessage } = useContact();

  return (
    <Formik
      validateOnBlur
      validateOnChange
      validationSchema={ContactSchema}
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
        consent: false,
      }}
      onSubmit={async ({
        firstName,
        lastName,
        email,
        subject,
        message,
        consent,
      }) => {
        handleClick();
        await sendMessage({
          firstName,
          lastName,
          email,
          subject,
          message,
          consent,
        });
      }}
    >
      {({
        values: { firstName, lastName, email, subject, message, consent },
        errors,
        handleBlur,
        handleChange,
      }) => (
        <div
          className={`flex ${
            width || 'w-1/2'
          } item-start flex-col gap-12 max-[800px]:w-full `}
        >
          <div className="flex w-full flex-col gap-4 ">
            <h2 className="futura-heavy tracking-wider">
              Let&apos;s meet
              <span className="text-accent dark:text-accent2">!</span>{' '}
            </h2>
            <p>
              Get in touch by filling out the contact form below! <br />
              Please note that the fields marked with * are required!{' '}
            </p>
          </div>
          <Form className={'flex h-1/2  flex-col justify-center gap-8   py-4'}>
            <Field
              label="First name"
              placeholder="John"
              id="firstName"
              name="firstName"
              onChangeHandler={handleChange}
              onBlurHandler={handleBlur}
              inputType="text"
              value={firstName}
              error={errors.firstName}
              as={Input}
              isRequired
            />
            <Field
              label="Last name"
              placeholder="Doe"
              id="lastName"
              name="lastName"
              onChangeHandler={handleChange}
              onBlurHandler={handleBlur}
              inputType="text"
              value={lastName}
              error={errors.lastName}
              as={Input}
              isRequired
            />
            <Field
              label="Email"
              placeholder="john.doe@gmail.com"
              id="email"
              name="email"
              onChangeHandler={handleChange}
              onBlurHandler={handleBlur}
              inputType="text"
              value={email}
              error={errors.email}
              as={Input}
              isRequired
            />
            <Field
              label="Subject"
              placeholder="React Developer Opportunity"
              id="subject"
              name="subject"
              onChangeHandler={handleChange}
              onBlurHandler={handleBlur}
              inputType="text"
              value={subject}
              error={errors.subject}
              as={Input}
              isRequired
            />
            <Field
              label="Message"
              placeholder="Your thoughts here."
              id="message"
              name="message"
              onChangeHandler={handleChange}
              onBlurHandler={handleBlur}
              value={message}
              error={errors.message}
              labelColor={'text-secondary'}
              as={TextArea}
              isRequired
            />
            <Field
              label={
                <div>
                  I agree that my personal information provided above may be
                  used to contact me regarding this inquiry. <br /> For further
                  information, please read our&nbsp;
                  <Link
                    href="/privacy-policy"
                    key="privacy"
                    className="text-accent dark:text-accent2"
                  >
                    privacy policy
                  </Link>
                  . *
                </div>
              }
              id="consent"
              name="consent"
              onChangeHandler={handleChange}
              onBlurHandler={handleBlur}
              type="checkbox"
              value={consent}
              error={errors.consent}
              labelColor={'text-primary dark:text-secondary'}
              as={Checkbox}
              isRequired
            />

            <Button
              type="submit"
              className=" mb-4 w-max rounded-lg border-2  border-accent  px-6 py-2 font-bold   uppercase transition-all duration-75 ease-in-out  disabled:!border-secondary_s_2 disabled:!text-secondary_s_2  dark:border-accent2 "
              rounded
              disabled={isButtonDisabled}
            >
              SEND MESSAGE
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
export default ContactForm;
