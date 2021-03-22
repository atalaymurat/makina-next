import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { TextInput } from '../../lib/formikInputs'
import CircleSpin from '../../components/CircleSpin'

const Wizard = ({ children, initialValues, onSubmit }) => {
  const [stepNumber, setStepNumber] = useState(0)
  const steps = React.Children.toArray(children)
  const [snapshot, setSnapshot] = useState(initialValues)

  const step = steps[stepNumber]
  const totalSteps = steps.length
  const isLastStep = stepNumber === totalSteps - 1

  const next = (values) => {
    setSnapshot(values)
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1))
  }

  const previous = (values) => {
    setSnapshot(values)
    setStepNumber(Math.max(stepNumber - 1, 0))
  }

  const handleSubmit = async (values, bag) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag)
    }
    if (isLastStep) {
      return onSubmit(values, bag)
    } else {
      bag.setTouched({})
      next(values)
    }
  }

  return (
    <Formik
      initialValues={snapshot}
      validationSchema={step.props.validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <p>
            Step {stepNumber + 1} of {totalSteps}
          </p>
          {step}
          <div className="flex flex-row divide-x-4 mt-6">
            {stepNumber > 0 && (
              <button className="btn-cancel "onClick={() => previous(formik.values)} type="button">
                Back
              </button>
            )}
            <button className="btn-submit" disabled={formik.isSubmitting} type="submit">
              {isLastStep ? 'Save' : 'Next'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

const WizardStep = ({ children }) => children

const New = () => (
  <Layout>
    <div className="container mx-auto">
      <h1 className="text-center">Machine#New</h1>
      <Wizard
        initialValues={{
          title: '',
          description: '',
          new: false,
          any: false,
        }}
        onSubmit={async (values) => {
          alert(JSON.stringify(values))
        }}
      >
        <WizardStep
          onSubmit={() => console.log('Step1 onSubmit')}
          validationSchema={Yup.object({
            title: Yup.string().required('required'),
            description: Yup.string().required('required'),
          })}
        >
          <TextInput name="title" type="text" id="title" label="title" />
          <TextInput
            name="description"
            type="text"
            id="desc"
            label="description"
          />


        </WizardStep>
        <WizardStep
          onSubmit={() => console.log('Step2 onSubmit')}
          validationSchema={Yup.object({
            new: Yup.boolean().oneOf( [true], 'Field must checked'),
          })}
        >
          <label>
            <Field name="new" type="checkbox" label="is new" className="mr-2" />
            is this a new machine
          </label>
          <ErrorMessage className="error" component="div" name="new" />
        </WizardStep>
        <WizardStep>
        <a href="/">go index</a>
        </WizardStep>
      </Wizard>
    </div>
  </Layout>
)

export default New
