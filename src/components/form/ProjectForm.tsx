// Form
// Components
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

import Button from '@/components/Button';
import TextArea from '@/components/form/TextArea';
import HeadlessCombobox from '@/components/HeadlessCombobox';
import Tabs from '@/components/Tabs';
import TeamCombobox from '@/components/TeamCombobox';
import { useProject } from '@/context/hooks/useProject';
// Combobox Options
import { technologyOptions } from '@/utils/comboboxOptions';

import FormProgressBar from './FormProgressBar';
import Input from './Input';
import InputImage from './InputImage';
import ProjectWrapper from './ProjectWrapper';

const ProjectForm: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { addProject, developers } = useProject();

  const tabList = ['general', 'description', 'additional'];

  const ProjectSchema = Yup.object().shape({
    fullProjectName: Yup.string()
      .min(3, 'The project name must be longer than 3 characters!')
      .max(15, 'The project name must not be longer than 15 characters!')
      .required('The project name is required!'),
    url: Yup.string().url().required('The url is required!'),
    githubRepo: Yup.string()
      .min(
        3,
        'The github repo name of the project must be longer than 3 characters!'
      )
      .max(
        45,
        'The github repo name of the project must not be longer than 15 characters!'
      )
      .required('The github repo name of the project is required!'),
    domain: Yup.string()
      .min(3, 'The domain of the project must be longer than 3 characters!')
      .max(
        45,
        'The domain of the project must not be longer than 15 characters!'
      )
      .required('The domain of the project is required!'),
    desc: Yup.string()
      .min(
        10,
        'The description of the project must be longer than 10 characters!'
      )
      .required('The description is required!'),
    technologies: Yup.array()
      .min(2, 'The tech stack must contain more technologies!')
      .max(5, 'The tech stack must contain less technologies!')
      .required('The tech stack is required!'),
    team: Yup.array()
      .min(1, 'The team must be made from more than one developer!')
      .max(5, 'The team cannot have more than 5 developers!')
      .required('The team that worked on the project is required.'),
  });

  return (
    <div className="flex min-h-full w-full flex-col items-center  py-4  ">
      <Formik
        validateOnBlur
        validateOnChange
        initialValues={{
          fullProjectName: '',
          url: '',
          githubRepo: '',
          domain: '',
          desc: '',
          technologies: [],
          team: [],
          images: {
            mobile: '',
            header: '',
            gallery: [],
          },
        }}
        validationSchema={ProjectSchema}
        onSubmit={async ({
          fullProjectName,
          url,
          githubRepo,
          domain,
          desc,
          technologies,
          team,
          images,
        }) => {
          await addProject({
            fullProjectName,
            url,
            githubRepo,
            domain,
            desc,
            technologies,
            team,
            images,
          });
        }}
      >
        {({
          values: {
            fullProjectName,
            url,
            githubRepo,
            domain,
            desc,
            technologies,
            team,
            images,
          },
          setFieldValue,
          errors,

          handleBlur,
          handleChange,
        }) => (
          <Form className={'flex h-full  w-full  flex-col justify-center     '}>
            <div className=" flex  h-full flex-col justify-center gap-10  ">
              <Tabs
                list={tabList}
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
                className="text-primary "
              >
                <ProjectWrapper
                  desc={`What is the project's name ? When have you started and finished ?`}
                >
                  <Field
                    label="Full project name"
                    id="fullProjectName"
                    name="fullProjectName"
                    onChangeHandler={handleChange}
                    onBlurHandler={handleBlur}
                    type="input"
                    value={fullProjectName}
                    error={errors.fullProjectName}
                    as={Input}
                    backgroundColor="bg-secondary_s"
                    labelColor="text-primary"
                  />

                  <Field
                    label="URL"
                    id="url"
                    name="url"
                    onChangeHandler={handleChange}
                    onBlurHandler={handleBlur}
                    type="input"
                    value={url}
                    error={errors.url}
                    as={Input}
                    backgroundColor="bg-secondary_s"
                    labelColor="text-primary"
                  />
                  <Field
                    label="Github Repo"
                    id="githubRepo"
                    name="githubRepo"
                    onChangeHandler={handleChange}
                    onBlurHandler={handleBlur}
                    type="input"
                    value={githubRepo}
                    error={errors.githubRepo}
                    as={Input}
                    labelColor="text-primary"
                    backgroundColor="bg-secondary_s"
                  />
                </ProjectWrapper>

                <ProjectWrapper desc="What was the hardest thing to overcome ? A short description would be exactly what this project needs. ">
                  <Field
                    label="Domain"
                    id="domain"
                    name="domain"
                    onChangeHandler={handleChange}
                    onBlurHandler={handleBlur}
                    type="input"
                    value={domain}
                    error={errors.domain}
                    as={Input}
                    backgroundColor="bg-secondary_s"
                    labelColor="text-primary"
                  />
                  <Field
                    label="Description"
                    id="desc"
                    name="desc"
                    onChangeHandler={handleChange}
                    onBlurHandler={handleBlur}
                    type="input"
                    value={desc}
                    error={errors.desc}
                    backgroundColor="bg-secondary_s"
                    as={TextArea}
                    labelColor="text-primary"
                  />
                </ProjectWrapper>
                <ProjectWrapper desc="Did you work alone on this project ? What technologies have you used ?">
                  <Field
                    setFieldValue={setFieldValue}
                    name="technologies"
                    fieldValue={technologies}
                    id={'technologies'}
                    isMulti
                    options={technologyOptions}
                    label="Technologies"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    as={HeadlessCombobox}
                    error={errors.technologies}
                    labelColor="text-primary"
                  />
                  <Field
                    setFieldValue={setFieldValue}
                    name="team"
                    fieldValue={team}
                    id={'team'}
                    isMulti
                    options={developers}
                    label="Team"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    as={TeamCombobox}
                    error={errors.team}
                    labelColor="text-primary"
                  />

                  <div className="grid grid-cols-2 gap-20 space-x-1 ">
                    <Field
                      setFieldValue={setFieldValue}
                      name="images.mobile"
                      value={images.mobile}
                      id={'mobileImage'}
                      label="Mobile Image"
                      as={InputImage}
                      error={errors.images}
                      type="file"
                      labelColor="text-primary"
                    />

                    <Field
                      setFieldValue={setFieldValue}
                      name="images.header"
                      value={images.header}
                      id={'header'}
                      label="Header Image"
                      as={InputImage}
                      error={errors.images}
                      type="file"
                      labelColor="text-primary"
                    />
                  </div>
                  <Field
                    setFieldValue={setFieldValue}
                    name="images.gallery"
                    value={images.gallery}
                    id={'gallery'}
                    label="Gallery Image"
                    as={InputImage}
                    error={errors.images}
                    type="file"
                    multiple
                    labelColor="text-primary"
                  />
                </ProjectWrapper>
              </Tabs>
              <div className="flex  flex-col ">
                <FormProgressBar />
                <div className="flex  w-full items-center justify-center gap-16 ">
                  <Button
                    type="button"
                    onClick={() =>
                      setSelectedIndex((prevState) => prevState - 1)
                    }
                  >
                    PREV
                  </Button>
                  <Button
                    type="button"
                    onClick={() =>
                      setSelectedIndex((prevState) => prevState + 1)
                    }
                  >
                    NEXT
                  </Button>
                  <Button type="submit" className="bg-red-400">
                    SUBMIT
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProjectForm;
