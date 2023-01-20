// Form
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

import { useProject } from '@//context/hooks/useProject';
import Tabs from '@/components/Tab';

import FormProgressBar from './FormProgressBar';
import HeadlessCombobox from './HeadlessCombobox';
// Components
import Input from './Input';
import ProjectWrapper from './ProjectWrapper';
import TextArea from './TextArea';

const ProjectForm: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { addProject } = useProject();

  const technologyOptions = [
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'go', label: 'Go' },
    { value: 'java', label: 'Java' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'php', label: 'PHP' },
    { value: 'python', label: 'Python' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'swift', label: 'Swift' },
    { value: 'angular', label: 'Angular' },
    { value: 'aspnet', label: 'ASP.NET' },
    { value: 'flask', label: 'Flask' },
    { value: 'laravel', label: 'Laravel' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'rails', label: 'Rails' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'django', label: 'Django' },
    { value: 'express', label: 'Express' },
    { value: 'nuxt', label: 'Nuxt' },
    { value: 'svelte', label: 'Svelte' },
  ];

  const tabList = ['general', 'description', 'additional'];

  const ProjectSchema = Yup.object().shape({
    fullProjectName: Yup.string()
      .min(3, 'The name is way too short!')
      .max(15, 'The name is way too long!')
      .required('This field is required!'),
    technologies: Yup.array().required('This field is required!'),
  });

  return (
    <div className="flex    h-full w-full flex-col items-center justify-between   ">
      <Formik
        validateOnBlur
        validateOnChange
        initialValues={{
          fullProjectName: '',
          abbreviation: '',
          desc: '',
          startDate: '',
          endDate: '',
          technologies: [],
          team: [],
        }}
        validationSchema={ProjectSchema}
        onSubmit={async ({
          fullProjectName,
          abbreviation,
          desc,
          startDate,
          endDate,
          technologies,
          team,
        }) => {
          await addProject({
            fullProjectName,
            abbreviation,
            desc,
            startDate,
            endDate,
            technologies,
            team,
          });
        }}
      >
        {({
          values: {
            fullProjectName,
            abbreviation,
            desc,
            startDate,
            endDate,
            technologies,
            team,
          },
          setFieldValue,
          errors,

          handleBlur,
          handleChange,
        }) => (
          <Form className={'flex h-full  w-full flex-col  py-4 '}>
            <div className=" flex h-full  flex-col justify-center  gap-20">
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
                    labelColor={'text-primary'}
                    label="Full project name"
                    id="fullProjectName"
                    name="fullProjectName"
                    onChangeHandler={handleChange}
                    onBlurHandler={handleBlur}
                    type="input"
                    value={fullProjectName}
                    error={errors.fullProjectName}
                    as={Input}
                  />
                  <Field
                    labelColor={'text-primary'}
                    label="Abbreviation"
                    id="abbreviation"
                    name="abbreviation"
                    onChangeHandler={handleChange}
                    onBlurHandler={handleBlur}
                    type="input"
                    value={abbreviation}
                    error={errors.abbreviation}
                    as={Input}
                  />

                  <div className="grid grid-cols-2 gap-20 space-x-1">
                    <Field
                      labelColor={'text-primary'}
                      label="Start Date"
                      id="startDate"
                      name="startDate"
                      onChangeHandler={handleChange}
                      onBlurHandler={handleBlur}
                      type="date"
                      value={startDate}
                      error={errors.startDate}
                      as={Input}
                    />
                    <Field
                      labelColor={'text-primary'}
                      label="End Date"
                      id="endDate"
                      name="endDate"
                      onChangeHandler={handleChange}
                      onBlurHandler={handleBlur}
                      type="date"
                      value={endDate}
                      error={errors.endDate}
                      as={Input}
                    />
                  </div>
                </ProjectWrapper>

                <ProjectWrapper desc="What was the hardest thing to overcome ? A short description would be exactly what this project needs. ">
                  <Field
                    labelColor={'text-primary'}
                    label="Description"
                    id="desc"
                    name="desc"
                    onChangeHandler={handleChange}
                    onBlurHandler={handleBlur}
                    type="input"
                    value={desc}
                    error={errors.desc}
                    as={TextArea}
                  />
                </ProjectWrapper>
                <ProjectWrapper desc="Did you work alone on this project ? What technologies have you used ?">
                  <Field
                    setFieldValue={setFieldValue}
                    labelColor="text-primary"
                    name="technologies"
                    value={technologies}
                    id={'technologies'}
                    isMulti
                    options={technologyOptions}
                    label="Technologies"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    as={HeadlessCombobox}
                    error={errors.technologies}
                  />
                  <Field
                    setFieldValue={setFieldValue}
                    labelColor="text-primary"
                    name="team"
                    value={team}
                    id={'team'}
                    isMulti
                    options={technologyOptions}
                    label="Team"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    as={HeadlessCombobox}
                    error={errors.team}
                  />
                </ProjectWrapper>
              </Tabs>
              <FormProgressBar />
              <div className="flex  w-full items-center justify-center gap-16">
                <button
                  onClick={() => setSelectedIndex((prevState) => prevState - 1)}
                >
                  PREV
                </button>
                <button
                  onClick={() => setSelectedIndex((prevState) => prevState + 1)}
                >
                  NEXT
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProjectForm;
