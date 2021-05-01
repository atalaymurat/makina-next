import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { TextInput } from '../../lib/formikInputs'

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
        <Form autoComplete="off">
          <p>
            Step {stepNumber + 1} of {totalSteps}
          </p>
          {step}
          <div className="flex flex-row divide-x-4 mt-6">
            {stepNumber > 0 && (
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
              {isLastStep ? 'Save' : 'Next'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

const WizardStep = ({ children }) => children

const New = () => {
  const [listType, setListType] = useState('new')
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-center">Machine#New</h1>
        <Wizard
          initialValues={{
            title: '',
            description: '',
            listType: '',
            any: '',
            used: {
              modelYear: '',
            },
            new: {
              saleType: '',
            },
          }}
          onSubmit={async (val) => {
            let _values = { ...val }
            if (val.listType === 'new') {
              _values = { ...val, used: null }
            }
            if (val.listType === 'used') {
              _values = { ...val, used: null }
            }
            alert(JSON.stringify(_values))
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
            onSubmit={(values) => {
              console.log('Step2 onSubmit', values)
              setListType(values.listType)
              console.log('SELECTED:', listType)
            }}
            validationSchema={Yup.object({
              listType: Yup.string().required(
                'You must Select one of the options'
              ),
            })}
          >
            <label className="mr-4">
              <Field
                name="listType"
                type="radio"
                className="mr-2"
                value="new"
              />
              Listing a New (unused) machine
            </label>
            <label>
              <Field
                name="listType"
                type="radio"
                className="mr-2"
                value="used"
              />
              Listing a Used (second hand) machine
            </label>
            <ErrorMessage className="error" component="div" name="new" />
          </WizardStep>

          {listType === 'new' && (
            <WizardStep>
              <p>MACHINE OPTIONS FOR NEW ONES</p>
              <TextInput
                name="new.saleType"
                type="text"
                id="saleType"
                label="sale type"
              />
            </WizardStep>
          )}
          {listType === 'used' && (
            <WizardStep>
              <p>MACHINE OPTIONS FOR USED ONES</p>
              <TextInput
                name="used.modelYear"
                type="number"
                id="year"
                label="year"
              />
            </WizardStep>
          )}

          <WizardStep>
            <p>Listing Machine Values</p>
            {console.log()}
          </WizardStep>
        </Wizard>
      </div>
    </Layout>
  )
}
export default New
