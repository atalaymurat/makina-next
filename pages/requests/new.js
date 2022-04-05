import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import useTranslation from 'next-translate/useTranslation'
import withSession from '../../lib/session'
import Axios from 'axios'
import FormikControl from '../../components/formik/FormikControl'

import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'

const New = (props) => {
  const { t } = useTranslation()
  const { user } = props
  return (
    <Layout noFooter>
      <div className="container mx-auto px-4">
        <div className="text-center text-xs">{t('forms:newReqForm')}</div>
        <ReqForm
          initialValues={{
            name: {
              firstName: user ? user.name.firstName : '',
              lastName: user ? user.name.lastName : '',
            },
            phone:
              user && user.phone && user.phone.mobile
                ? user.phone.mobile
                : '' || (user && user.phone && user.phone.company)
                ? user.phone.company
                : '',
            email:
              user && user.local && user.local.email ? user.local.email : '',
            company: { name: '', country: 'TR', city: '' },
            requests: [
              {
                sector: '',
                category: '',
                brand: [],
                description: '',
              },
            ],
          }}
          user={user}
        />
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSession(async ({ req, res }) => {
  try {
    const sessionUser = req.session.get('user')
    if (!sessionUser) {
      console.log('No session User')
      return { props: {} }
    }

    const apiRes = await Axios.get(`/api/auth/user`, {
      headers: { cookie: req.headers.cookie },
    })
    console.log('PANEL API RES :: ', apiRes.data)

    if (sessionUser) {
      const user = apiRes.data
      return {
        props: { user },
      }
    }
  } catch (err) {
    console.error('Error: RequestNew.js', err)
    res.end()
  }
})

export default New

const ReqForm = ({ initialValues, user }) => {
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
    bag.setTouched({})
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

                <button
                  className="btn-submit"
                  type="submit"
                >
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

const Step1 = (props) => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col">
      <div className="bg-orange-300 rounded-md py-4 px-2 my-4 shadow-md">
        <h2 className="text-lg font-bold">{t('forms:contactInfo')}</h2>

        <div className="grid grid-cols-2 gap-2 w-full">
          <FormikControl
            control="input"
            type="text"
            name="name.firstName"
            label={t('forms:name')}
          />

          <FormikControl
            control="input"
            type="text"
            name="name.lastName"
            label={t('forms:surname')}
          />
        </div>
        <div className="px-1">
          <FormikControl
            control="phone"
            label={t('forms:phone')}
            name="phone"
          />
        </div>
        <div className="px-1">
          <FormikControl
            control="input"
            name="email"
            type="text"
            label={t('forms:email')}
          />
        </div>
      </div>
      <div className="bg-blue-300 rounded-md py-4 px-2 my-4 shadow-md">
        <h2 className="text-lg font-bold">{t('forms:company')}</h2>
        <div className="">
          <FormikControl
            control="input"
            name="company.name"
            type="text"
            label={t('forms:companyName')}
          />
          <div className="grid grid-cols-2 gap-2 w-full">
            <FormikControl
              control="input"
              name="company.city"
              type="text"
              label={t('forms:city')}
            />
            <FormikControl
              control="input"
              name="company.country"
              type="text"
              label={t('forms:country')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const Step2 = (props) => {
  const {
    values: { requests },
  } = props
  const { t } = useTranslation()

  const sectorOptions = [
    { label: 'Ahşap', value: 'ahsap' },
    { label: 'Metal', value: 'metal' },
    { label: 'Diğer', value: 'other' },
  ]
  const brandOptions = [
    { value: 'Ima', label: 'Ima' },
    { value: 'Schelling', label: 'Schelling' },
    { value: 'Motoman', label: 'Motoman' },
    { value: 'Fanuc', label: 'Fanuc' },
    { value: 'Kawasaki', label: 'Kawasaki' },
    { value: 'Kuka', label: 'Kuka' },
  ]
  const categoryOptions = [
    { label: 'Panel Ebatlama', value: 'panel ebatlama', root: 'ahsap' },
    { label: 'Cnc', value: 'cnc', root: 'ahsap' },
    { label: 'Delik Makinesi', value: 'delik makinesi', root: 'ahsap' },
    { label: 'Freze', value: 'freze', root: 'metal' },
    { label: 'Torna', value: 'torna', root: 'metal' },
    { label: 'Polisaj', value: 'polisaj', root: 'metal' },
    { label: 'İşlem Merkezi', value: 'islem merkezi', root: 'metal' },
    { label: 'Çapak Alma', value: 'capak alma', root: 'metal' },
    { label: 'Laser', value: 'laser', root: 'metal' },
    { label: 'Diğer', value: 'other', root: 'other' },
  ]
  const categoryFiltered = (sec) => {
    return categoryOptions.filter((cat) => cat.root === sec)
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold">{t('forms:addMachine')} </h1>
      <FieldArray name="requests">
        {({ insert, remove, push }) => (
          <>
            {props.values.requests.length > 0 &&
              props.values.requests.map((req, index) => (
                <div
                  key={index}
                  className="bg-blue-300 p-4 m-2 my-4 rounded-sm shadow-md"
                >
                  <FormikControl
                    control="radio"
                    name={`requests.${index}.sector`}
                    label={t('forms:sector')}
                    options={sectorOptions}
                    sid={index}
                  />

                  <FormikControl
                    control="radioSub"
                    name={`requests.${index}.category`}
                    label={t('forms:selectCat')}
                    options={categoryFiltered(req.sector)}
                    sid={index}
                  />

                  <FormikControl
                    control="reactSelect"
                    name={`requests.${index}.brand`}
                    label={t('forms:brandPrefer')}
                    placeholder={t('forms:select')}
                    isMulti
                    options={brandOptions}
                  />
                  <FormikControl
                    control="textarea"
                    name={`requests.${index}.description`}
                    label={t('forms:description')}
                    type="text"
                  />
                  <button
                    type="button"
                    className="btn-cancel w-2 m-2"
                    onClick={() => remove(index)}
                  >
                    X
                  </button>
                </div>
              ))}

            <button
              type="button"
              className="btn-submit bg-green-700 my-4"
              onClick={() =>
                push({
                  brand: [],
                })
              }
            >
              {t('forms:addAnother')}
            </button>
          </>
        )}
      </FieldArray>
    </div>
  )
}
