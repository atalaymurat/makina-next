import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../components/formik/FormikControl'
import SelectCatInput from '../../lib/selectCatInput'
import Dropzone from 'react-dropzone'

const MacForm = ({ initialValues }) => {
  const [formValues, setFormValues] = useState({})
  const [listType, setListType] = useState('new')
  const [stepNumber, setStepNumber] = useState(0)
  const [snapshot, setSnapshot] = useState(initialValues)
  const steps = [
    <Step1 />,
    <Step2 />,
    <Step3 />,
    listType === 'new' ? <StepNew /> : <StepUsed />,
    <StepCategory />,
    <StepImages />,
  ]
  const totalSteps = steps.length
  const isLast = stepNumber === totalSteps - 1

  const schemaArray = [
    Yup.object({
      title: Yup.string().required('Gerekli'),
      description: Yup.string().required('Gerekli'),
    }),
    Yup.object({ brand: Yup.object().nullable().required('Gerekli') }),
    Yup.object({
      listType: Yup.string().required('You must Select one of the options'),
    }),
  ]

  const next = (values) => {
    setSnapshot(values)

    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1))
  }

  const previous = (values) => {
    setSnapshot(values)
    setStepNumber(Math.max(stepNumber - 1, 0))
  }

  const handleSubmit = async (values, bag) => {
    if (isLast) {
      return setFormValues(values)
    } else {
      bag.setTouched({})
      next(values)
    }
  }

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={schemaArray[stepNumber]}
    >
      {(formik) => (
        <Form autoComplete="off">
          {React.cloneElement(steps[stepNumber], {
            ...formik,
            listType,
            setListType,
          })}

          <div className="flex flex-row divide-x-4 mt-6">
            {stepNumber !== 0 && (
              <button
                className="btn-cancel "
                onClick={() => previous(formik.values)}
                type="button"
              >
                Back
              </button>
            )}

            <button
              className="btn-submit"
              disabled={formik.isSubmitting}
              type="submit"
            >
              {stepNumber === totalSteps - 1 ? 'Save' : 'Next'}
            </button>
          </div>

          {formValues.title ? (
            <div className="m-2 p-2 text-indigo-600">
              <div>Form Data Preview for Server Database</div>
              <code>{JSON.stringify(formValues, null, 4)}</code>
            </div>
          ) : null}
        </Form>
      )}
    </Formik>
  )
}

const Step1 = (props) => {
  return (
    <>
      <FormikControl
        control="input"
        name="title"
        type="text"
        id="title"
        label="Title"
      />
      <FormikControl
        control="textarea"
        name="description"
        type="text"
        label="Description"
      />
    </>
  )
}
const Step2 = (props) => (
  <>
    <FormikControl
      control="reactSelect"
      name="brand"
      label="Brand"
      options={[
        { value: 'Ima', label: 'Ima' },
        { value: 'Schelling', label: 'Schelling' },
        { value: 'Motoman', label: 'Motoman' },
        { value: 'Fanuc', label: 'Fanuc' },
        { value: 'Kawasaki', label: 'Kawasaki' },
        { value: 'Kuka', label: 'Kuka' },
      ]}
      isMulti={false}
    />
    <FormikControl
      control="input"
      name="modelType"
      label="Model Type"
      type="text"
    />
  </>
)
const Step3 = (props) => (
  <>
    <h2 className="text-3xl text-center font-semibold mb-4 p-2">
      Are you going to list a NEW or USED machine?
    </h2>
    <div className="flex">
      <div className="flex-1">
        <label className="mr-4">
          <Field
            name="listType"
            type="radio"
            className="mr-2"
            value="new"
            onClick={() => props.setListType('new')}
          />
          Listing a New (unused) machine
        </label>
      </div>

      <div className="flex-1">
        <label>
          <Field
            name="listType"
            type="radio"
            className="mr-2"
            value="used"
            onClick={() => props.setListType('used')}
          />
          Listing a Used (second hand) machine
        </label>
      </div>
    </div>

    <ErrorMessage
      className="text-red-600 italic inline-block mb-2"
      component="div"
      name="listType"
    />
  </>
)

const StepNew = (props) => (
  <>
    <h2>NEW Machine Information Form</h2>
  </>
)

const StepUsed = (props) => (
  <>
    <h2>USED Machine Information Form</h2>
    <FormikControl
      control="input"
      name="modelYear"
      label="Model Production Year"
      type="number"
    />
    <FormikControl
      control="input"
      name="technicData"
      type="text"
      label="Technical Data"
    />
  </>
)

const StepCategory = (props) => (
  <>
    <h2>Select the Category</h2>
    <SelectCatInput {...props} />
  </>
)

const StepImages = (props) => {
  return (
    <>
      <h2>Upload Machine Images</h2>
      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    </>
  )
}

const New = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-center text-xs">Machine#New#Form [DEVELOPMENT]</h1>
        <MacForm
          initialValues={{
            title: '',
            description: '',
            listType: '',
            brand: {},
            modelType: '',
            modelYear: '',
            category: '',
            images: [],
          }}
        />
      </div>
    </Layout>
  )
}
export default New
