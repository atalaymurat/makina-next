import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik'
import * as Yup from 'yup'
import {
  TextInput,
  TextAreaInput,
  SelectCreatable,
} from '../../lib/formikInputs'

const MacForm = ({ initialValues, onSubmit }) => {
  const [stepNumber, setStepNumber] = useState(0)
  const [snapshot, setSnapshot] = useState(initialValues)
  const steps = [<Step1 />, <Step2 />]
  const totalSteps = steps.length
  const isLast = stepNumber === totalSteps - 1

  const schemaArray = [
    Yup.object({
      title: Yup.string().required('Gerekli'),
      description: Yup.string().required('Gerekli'),
    }),
    Yup.object({ brand: Yup.string().nullable().required('Gerekli') }),
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
      return onSubmit(values, bag)
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
          {React.cloneElement(steps[stepNumber], { ...formik })}

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
              {stepNumber === totalSteps - 1 ? 'save' : 'next'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

const Step1 = () => (
  <>
    <TextInput name="title" type="text" id="title" label="title" />
    <TextAreaInput
      name="description"
      type="text"
      id="desc"
      label="Description"
    />
  </>
)
const Step2 = (props) => (
  <>
  {JSON.stringify(props.values)}
    <SelectCreatable
      name="brand"
      label="Brand"
      id="brand"
      value={props.values.brand}
      options={[
        { value: 'Ima', label: 'Ima' },
        { value: 'Schelling', label: 'Schelling' },
      ]}
    />
  </>
)

const New = () => {
  const [listType, setListType] = useState('new')
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-center">Machine#New</h1>
        <MacForm
          initialValues={{
            title: '',
            description: '',
            listType: '',
            brand: "",
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
              _values = { ...val, new: null }
            }
            alert(JSON.stringify(_values))
          }}
        ></MacForm>
      </div>
    </Layout>
  )
}
export default New
