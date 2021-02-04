import React, { useRef, useState } from 'react'
import { TextInput, PassInput } from '../../lib/formikInputs'
import useTranslation from 'next-translate/useTranslation'
import * as Yup from 'yup'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import ReCAPTCHA from 'react-google-recaptcha'
import CircleSpin from '../CircleSpin'
import { useRouter } from 'next/router'

const SignupForm = ({ setMessage }) => {
  const { t } = useTranslation()
  const recaptchaRef = useRef()
  const router = useRouter()
  const [selected, setSelected] = useState('user')
  return (
    <>
      <h3 className="my-4 text-2xl font-semibold text-gray-700">
        {t('sign_up:title')}
      </h3>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          recaptcha: '',
          locale: '',
          accountType: 'user',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, t('forms:maxChar', { num: 15 }))
            .min(2, t('forms:minChar', { num: 2 }))
            .required(t('forms:required')),
          lastName: Yup.string()
            .max(20, t('forms:maxChar', { num: 20 }))
            .required(t('forms:required')),
          email: Yup.string()
            .email(t('sign_up:invalidEmail'))
            .required(t('forms:required')),
          password: Yup.string()
            .required(t('forms:required'))
            .min(6, t('forms:minChar', { num: 6 })),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            alert(JSON.stringify(values))
            setMessage(null)
            setSubmitting(true)
            const token = await recaptchaRef.current.executeAsync()
            values.recaptcha = token
            values.locale = router.locale
            const res = await axios.post('/api/auth/signup', values)
            setSubmitting(false)
            if (res.data.success && res.data.login) {
              alert(res.data.login)
              router.push('/panel')
              return
            }
            if (res.data.success && !res.data.login) {
              router.push('/confirmation')
              return
            }
          } catch (err) {
            setMessage(err.response.data)
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="max-w-3xl mx-auto bg-transparent">
            <div className="flex flex-col">
              <div className="flex flex-col lg:flex-row lg:flex-1 lg:space-x-2">
                <div className="w-full lg:w-1/2">
                  <TextInput
                    name="firstName"
                    type="text"
                    id="firstName"
                    label={t('sign_up:name')}
                  />
                  <TextInput
                    name="lastName"
                    type="text"
                    id="lastName"
                    label={t('sign_up:surname')}
                  />
                  <TextInput
                    name="email"
                    type="text"
                    id="email"
                    label={t('sign_up:email')}
                  />

                  <PassInput
                    name="password"
                    id="password"
                    label={t('sign_up:password')}
                    autoComplete="new-password"
                  />

                  <div className="my-2">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
                      size="invisible"
                      hl={router.locale}
                      onChange={(token) => {
                        setFieldValue('recaptcha', token)
                      }}
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/2 h-full">
                  <div className="space-y-6 mt-6 text-gray-600">
                    <button
                      className={`flex text-left w-full h-1/2 flex-row border border-gray-300 px-2 py-5 items-center rounded shadow focus:outline-none ${
                        selected === 'user'
                          ? 'border-gray-700 bg-gray-800 text-white'
                          : 'hover:border-gray-700 text-gray-800 opacity-70 hover:opacity-100'
                      } `}
                      type="button"
                      onClick={() => {
                        setSelected('user')
                        setFieldValue('accountType', 'user')
                      }}
                    >
                      <div className="w-1/4 flex flex-col items-center justify-center">
                        <h2 className="text-lg font-medium">Üye</h2>
                        <span className="text-sm font-semibold">Bireysel</span>
                        <span className="text-sm mt-1">Ücretsiz</span>
                      </div>
                      <div className="w-3/4">
                        <ul className="list-reset text-sm ml-2 font-light">
                          <li className="mb-1">Favorilere Eklemek</li>
                          <li className="mb-1">İlan lokasyonlarını görmek</li>
                          <li className="mb-1">teklif vermek ve fazlası...</li>
                        </ul>
                      </div>
                      {selected === 'user' ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          className="w-6 h-6 fill-current text-gray-300"
                        >
                          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                      ) : null}
                      <Field
                        name="accountType"
                        type="radio"
                        value="user"
                        className="hidden"
                      />
                    </button>

                    <button
                      className={`flex text-left w-full h-1/2 flex-row border border-gray-300 px-2 py-5 items-center rounded shadow focus:outline-none ${
                        selected === 'seller'
                          ? 'border-gray-700 bg-gray-800 text-white'
                          : 'hover:border-gray-700 text-gray-800 opacity-70 hover:opacity-100'
                      } `}
                      onClick={() => {
                        setSelected('seller')
                        setFieldValue('accountType', 'seller')
                      }}
                      type="button"
                    >
                      <div className="w-1/4 flex flex-col items-center justify-center">
                        <h2 className="text-lg font-medium">Satıcı</h2>
                        <span className="text-sm font-semibold">Kurumsal</span>
                        <span className="text-sm mt-1">Ücretsiz</span>
                      </div>
                      <div className="w-3/4">
                        <ul className="list-reset text-sm ml-2 font-light">
                          <li className="mb-1">İlan vermek, eposta tanıtım</li>
                          <li className="mb-1">
                            2.el ve Yeni ekipman listeleme
                          </li>
                          <li className="mb-1">teklif almak ve fazlası...</li>
                        </ul>
                      </div>
                      {selected === 'seller' ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          className="w-6 h-6 fill-current text-gray-300"
                        >
                          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                      ) : null}
                      <Field
                        name="accountType"
                        type="radio"
                        value="seller"
                        className="hidden"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center my-2 text-gray-500 space-x-2">
                  <label className="text-sm font-semibold text-justify ">
                    {t('sign_up:acceptUserAgreement')}
                  </label>
                </div>

                <div className="py-2">
                  <button
                    type="submit"
                    disabled={isSubmitting ? true : false}
                    className="w-full px-4 py-2 text-lg font-semibold text-white bg-gray-700 shadow transition-colors duration-300 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-blue-200 focus:ring-4 inline-flex items-center justify-center"
                  >
                    {isSubmitting && <CircleSpin />}
                    {t('sign_up:signUp')}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default SignupForm
