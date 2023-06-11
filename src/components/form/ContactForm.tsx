// Form
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import type { FC } from 'react';
import * as Yup from 'yup';

import { useAuth } from '@//context/hooks/useAuth';
import Button from '@/components/Button';
// Components
import Input from '@/components/form/Input';

import Checkbox from './Checkbox';

type Props = {
  className?: string;
  rounded?: boolean;
};

const ContactSchema = Yup.object().shape({
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
  subject: Yup.string()
    .min(3, 'Please enter more than 3 characters!')
    .max(10, `Please enter less than 10 characters!`)
    .required('This field is required!'),
  message: Yup.string()
    .min(10, 'Please enter more than 10 characters!')
    .max(100, 'Please enter less than 100 characters!')
    .required('This field is required!'),
  consent: Yup.boolean().oneOf([true], 'This field is required!'),
});

const ContactForm: FC<Props> = ({ className, rounded }) => {
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
      // onSubmit={async ({
      //   firstName,
      //   lastName,
      //   email,
      //   subject,
      //   message,
      //   consent,
      // }) => {
      //   await login({ firstName, lastName, email, subject, message, consent });
      // }}
      onSubmit={async ({
        firstName,
        lastName,
        email,
        subject,
        message,
        consent,
      }) => {
        console.log('object');
      }}
    >
      {({
        values: { firstName, lastName, email, subject, message, consent },
        errors,
        handleBlur,
        handleChange,
      }) => (
        <Form className={'flex h-1/2  flex-col justify-center gap-8   py-4'}>
          <Field
            label="First name"
            placeholder="Alex"
            id="firstName"
            name="firstName"
            onChangeHandler={handleChange}
            onBlurHandler={handleBlur}
            type="input"
            value={firstName}
            error={errors.firstName}
            as={Input}
            isRequired
          />
          <Field
            label="Last name"
            placeholder="Montoya"
            id="lastName"
            name="lastName"
            onChangeHandler={handleChange}
            onBlurHandler={handleBlur}
            type="input"
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
            type="input"
            value={email}
            error={errors.email}
            as={Input}
            isRequired
          />
          <Field
            label="Subject"
            placeholder="Frontend Opportunity"
            id="subject"
            name="subject"
            onChangeHandler={handleChange}
            onBlurHandler={handleBlur}
            type="input"
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
            type="input"
            value={message}
            error={errors.message}
            labelColor={'text-secondary'}
            as={Input}
            isRequired
          />
          <Field
            label={
              <div>
                I agree that my personal information provided above may be used
                to contact me regarding this inquiry. <br /> For further
                information, please read our&nbsp;
                <Link
                  href="/terms-and-conditions"
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
            className="mb-4 w-max rounded-lg border border-accent    px-6 py-2 font-bold   uppercase text-primary dark:border-accent2 dark:text-secondary"
            rounded
          >
            SEND MESSAGE
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export default ContactForm;
