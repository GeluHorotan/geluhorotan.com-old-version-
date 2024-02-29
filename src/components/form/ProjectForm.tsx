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
      .max(20, 'The project name must not be longer than 20 characters!')
      .required('The project name is required!'),
    url: Yup.string().url().required('The url is required!'),
    linesOfCode: Yup.string()
      .required('The start date is required!')
      .min(
        1,
        'The lines of code of the project should be longer than 1 character.'
      )
      .max(
        8,
        'The lines of code of the project should not be longer than 8 character.'
      ),
    githubUrl: Yup.string()
      .min(
        1,
        'The lines of code of the project should be longer than 1 character.'
      )
      .max(
        100,
        'The lines of code of the project should not be longer than 100 character.'
      ),
    domain: Yup.string()
      .min(3, 'The domain of the project must be longer than 3 characters!')
      .max(
        20,
        'The domain of the project must not be longer than 20 characters!'
      )
      .required('The domain of the project is required!'),
    desc: Yup.string()
      .min(
        10,
        'The description of the project must be longer than 10 characters!'
      )
      .max(
        3000,
        'The description of the project must not be longer than 3000 characters!'
      )
      .required('The description is required!'),
    keyHighlights: Yup.string()
      .min(
        10,
        'The description of the project must be longer than 10 characters!'
      )
      .max(
        3000,
        'The description of the project must not be longer than 15 characters!'
      )
      .required('The description is required!'),
    conceptsCovered: Yup.string()
      .min(
        10,
        'The description of the project must be longer than 10 characters!'
      )
      .max(
        3000,
        'The description of the project must not be longer than 15 characters!'
      )
      .required('The description is required!'),
    technologies: Yup.array()
      .min(2, 'The tech stack must contain more technologies!')
      .max(20, 'The tech stack must contain less technologies!')
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
          githubUrl: '',

          linesOfCode: '',
          domain: '',
          desc: '',
          keyHighlights: '',
          conceptsCovered: '',
          technologies: [],
          team: [],
          images: {
            header: '',
            gallery: [],
          },
        }}
        validationSchema={ProjectSchema}
        onSubmit={async ({
          fullProjectName,
          url,
          conceptsCovered,

          githubUrl,

          linesOfCode,
          domain,
          desc,
          keyHighlights,
          technologies,
          team,
          images,
        }) => {
          await addProject({
            fullProjectName,
            url,
            conceptsCovered,

            githubUrl,

            linesOfCode,
            domain,
            desc,
            keyHighlights,
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
            githubUrl,
            conceptsCovered,
            linesOfCode,

            domain,
            desc,
            keyHighlights,
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
                    inputType="text"
                    value={fullProjectName}
                    error={errors.fullProjectName}
                    as={Input}
                    reverseTextColor
                    labelColor="text-primary"
                  />

                  <Field
                    label="URL"
                    id="url"
                    name="url"
                    onChangeHandler={handleChange}
                    onBlurHandler={handleBlur}
                    inputType="text"
                    value={url}
                    error={errors.url}
                    as={Input}
                    labelColor="text-primary"
                    reverseTextColor
                  />

                  <Field
                    label="Lines of Code"
                    id="linesOfCode"
                    name="linesOfCode"
                    onChangeHandler={handleChange}
                    onBlurHandler={handleBlur}
                    inputType="text"
                    value={linesOfCode}
                    error={errors.linesOfCode}
                    as={Input}
                    labelColor="text-primary"
                    reverseTextColor
                  />
                  <Field
                    label="Github URL"
                    id="githubUrl"
                    name="githubUrl"
                    onChangeHandler={handleChange}
                    onBlurHandler={handleBlur}
                    inputType="text"
                    value={githubUrl}
                    error={errors.githubUrl}
                    as={Input}
                    labelColor="text-primary"
                    reverseTextColor
                  />
                </ProjectWrapper>

                <ProjectWrapper desc="What was the hardest thing to overcome ? A short description would be exactly what this project needs. ">
                  <Field
                    label="Domain"
                    id="domain"
                    name="domain"
                    onChangeHandler={handleChange}
                    onBlurHandler={handleBlur}
                    inputType="text"
                    value={domain}
                    error={errors.domain}
                    as={Input}
                    labelColor="text-primary"
                    reverseTextColor
                  />
                  <Field
                    label="Description"
                    id="desc"
                    name="desc"
                    onChangeHandler={handleChange}
                    onBlurHandler={handleBlur}
                    value={desc}
                    error={errors.desc}
                    as={TextArea}
                    labelColor="text-primary"
                    reverseTextColor
                  />
                  <Field
                    label="Key Highlights"
                    id="keyHighlights"
                    name="keyHighlights"
                    onChangeHandler={handleChange}
                    onBlurHandler={handleBlur}
                    value={keyHighlights}
                    error={errors.keyHighlights}
                    as={TextArea}
                    labelColor="text-primary"
                    reverseTextColor
                  />
                  <Field
                    label="Concepts Covered"
                    id="conceptsCovered"
                    name="conceptsCovered"
                    onChangeHandler={handleChange}
                    onBlurHandler={handleBlur}
                    value={conceptsCovered}
                    error={errors.conceptsCovered}
                    as={TextArea}
                    labelColor="text-primary"
                    reverseTextColor
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
                    reverseTextColor
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
                    reverseTextColor
                    labelColor="text-primary"
                  />

                  <div className="grid grid-cols-2 gap-20 space-x-1 ">
                    <Field
                      setFieldValue={setFieldValue}
                      name="images.header"
                      value={images.header}
                      id={'header'}
                      label="Header Image"
                      as={InputImage}
                      error={errors.images}
                      inputType="file"
                      labelColor="text-primary"
                      reverseTextColor
                    />
                    <Field
                      setFieldValue={setFieldValue}
                      name="images.gallery"
                      value={images.gallery}
                      id={'gallery'}
                      label="Gallery Image"
                      as={InputImage}
                      error={errors.images}
                      inputType="file"
                      multiple
                      labelColor="text-primary"
                      reverseTextColor
                    />
                  </div>
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
