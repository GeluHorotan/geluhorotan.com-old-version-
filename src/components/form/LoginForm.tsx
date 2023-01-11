// Form
import { Field, Form, Formik } from 'formik';
import React from 'react';

import { useAuth } from '@//context/hooks/useAuth';
import Button from '@/components/Button';

// Components
import Input from './Input';

type Props = {
  className?: string;
  rounded?: boolean;
};

const LoginForm = ({ className, rounded }: Props) => {
  const { login } = useAuth();

  return (
    <Formik
      validateOnBlur
      validateOnChange
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={async ({ email, password }) => {
        await login({ email, password });
      }}
    >
      {({ values: { email, password }, errors, handleBlur, handleChange }) => (
        <Form className={'flex flex-col gap-8 py-4'}>
          <Field
            label="Email"
            id="email"
            name="email"
            onChangeHandler={handleChange}
            onBlurHandler={handleBlur}
            type="input"
            value={email}
            error={errors.email}
            as={Input}
          />
          <Field
            label="Password"
            id="password"
            name="password"
            onChangeHandler={handleChange}
            onBlurHandler={handleBlur}
            type="password"
            value={password}
            error={errors.password}
            as={Input}
          />

          <Button
            type="submit"
            className="mb-4 w-full self-center bg-secondary_s_2 py-2  px-4 uppercase text-primary"
            rounded
          >
            LOGIN
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
