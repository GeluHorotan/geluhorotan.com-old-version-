// Form
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

// Icons
import { useAuth } from '@//context/hooks/useAuth';
import Button from '@/components/Button';
// Components
import Input from '@/components/form/Input';
import useButtonCooldown from '@/context/hooks/useButtonCooldown';

const LoginSchema = Yup.object().shape({
  email: Yup.string().trim().required('This field is required!'),
  password: Yup.string().trim().required('This field is required!'),
});

const LoginForm = () => {
  const { login } = useAuth();
  const [isButtonDisabled, handleClick] = useButtonCooldown(3000);

  return (
    <Formik
      validateOnBlur
      validateOnChange
      validationSchema={LoginSchema}
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={async ({ email, password }) => {
        handleClick();
        await login({ email, password });
      }}
    >
      {({ values: { email, password }, errors, handleBlur, handleChange }) => (
        <Form
          className={'flex h-1/2 w-full flex-col justify-center gap-8    py-4'}
        >
          <Field
            label="Email"
            id="email"
            name="email"
            onChangeHandler={handleChange}
            onBlurHandler={handleBlur}
            inputType="text"
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
            inputType="password"
            value={password}
            error={errors.password}
            as={Input}
          />

          <Button
            type="submit"
            className=" mb-4 w-max rounded-lg border-2  border-accent  px-6 py-2 font-bold   uppercase transition-all duration-75 ease-in-out  disabled:!border-secondary_s_2 disabled:!text-secondary_s_2  dark:border-accent2 "
            rounded
            disabled={isButtonDisabled}
          >
            CONNECT
          </Button>
        </Form>
      )}
    </Formik>
  );
};
export default LoginForm;
