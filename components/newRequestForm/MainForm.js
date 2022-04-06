import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import Step1 from './Step1'
import Step2 from './Step2'

const MainForm = ({ initialValues, user, categories, brands }) => {
  const { t } = useTranslation()
  const [formValues, setFormValues] = useState({})
  const [listType, setListType] = useState('new')
  const [stepNumber, setStepNumber] = useState(0)
  const [snapshot, setSnapshot] = useState(initialValues)
  const steps = [<Step1 />, <Step2 />]
  const totalSteps = steps.length
  const isLast = stepNumber === totalSteps - 1

  const schemaArray = [
    Yup.object({
      name: Yup.object({
        firstName: Yup.string()
          .max(15, t('forms:maxChar', { num: 15 }))
          .min(2, t('forms:minChar', { num: 2 }))
          .required(t('forms:required')),
        lastName: Yup.string()
          .max(20, t('forms:maxChar', { num: 20 }))
          .min(2, t('forms:minChar', { num: 2 }))
          .required(t('forms:required')),
      }),
      phone: Yup.string()
        .required(t('forms:required'))
        .min(13, t('forms:notValidPhone'))
        .max(13, t('forms:notValidPhone')),
      email: Yup.string()
        .email(t('forms:invalidEmail'))
        .required(t('forms:required')),
      company: Yup.object({
        name: Yup.string().required(t('forms:required')),
        city: Yup.string().required(t('forms:required')),
        country: Yup.string().required(t('forms:required')),
      }),
    }),
    Yup.object().shape({
      requests: Yup.array().of(
        Yup.object().shape({
          category: Yup.string().required(t('forms:required')),
          brand: Yup.array().min(1, t('forms:required')),
          description: Yup.string(),
          sector: Yup.string().required(t('forms:required')),
        })
      ),
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
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form autoComplete="off">
            <div className="mx-auto max-w-4xl">
              {React.cloneElement(steps[stepNumber], {
                ...formik,
                listType,
                setListType,
                user,
                categories,
                brands
              })}

              <div className="flex flex-row divide-x-4 my-6">
                {stepNumber !== 0 && (
                  <button
                    className="btn-cancel"
                    onClick={() => previous(formik.values)}
                    type="button"
                  >
                    {t('forms:back')}
                  </button>
                )}

                <button className="btn-submit" type="submit">
                  {stepNumber === totalSteps - 1
                    ? t('forms:save')
                    : t('forms:next')}
                </button>
              </div>

              {formValues.name ? (
                <div className="m-2 p-2 text-indigo-600">
                  <div>Form Data Preview for Server Database</div>
                  <code>{JSON.stringify(formValues, null, '\t')}</code>
                </div>
              ) : null}
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default MainForm
