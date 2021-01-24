import { useState, useRef } from 'react'
import Layout from '../components/Layout'
import { Formik, Form } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import * as Yup from 'yup'
import useTranslation from 'next-translate/useTranslation'
import { SelectInput, TextInput, PassInput } from '../lib/formikInputs'
import ReCAPTCHA from 'react-google-recaptcha'
import { Persist } from 'formik-persist'
import Message from '../components/Message'
import CircleSpin from '../components/CircleSpin'

const Signup = (props) => {
  const { t } = useTranslation()
  const [message, setMessage] = useState(null)
  const router = useRouter()
  const recaptchaRef = useRef()

  return (
    <Layout title={t('sign_up:title')}>
      <div className="flex items-center h-full p-4 lg:justify-center">
        <div className="flex flex-col overflow-hidden bg-white shadow-lg rounded-md max md:flex-row md:flex-1 lg:max-w-screen-md">
          <div className="p-4 py-6 text-white bg-gray-800 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <div className="my-3 text-4xl font-bold tracking-wider text-center">
              <Link href="/">
                <a>
                  <span className="logo">
                    {process.env.NEXT_PUBLIC_SITE_NAME}
                  </span>
                </a>
              </Link>
            </div>
            <p className="w-full overflow-hidden mt-6 font-normal md:mt-0">
              {t('sign_up:description')}
            </p>
            <p className="flex flex-col items-center justify-center mt-10 text-center">
              <span>{t('sign_up:alreadyHaveAccount')}</span>
              <Link href="/login">
                <a
                  href="#"
                  className="py-2 px-4 border border-indigo-500 rounded mt-1 shadow  bg-gray-700 hover:bg-indigo-500 font-semibold focus:ring-0"
                >
                  {t('sign_up:login')}
                </a>
              </Link>
            </p>
            <p className="mt-6 text-sm text-center">
              &bull;{' '}
              <Link href="/">
                <a className="underline">{t('sign_up:userAgrement')} </a>
              </Link>{' '}
              &bull;{' '}
              <Link href="/">
                <a className="underline">{t('sign_up:privacyPolicy')}</a>
              </Link>
              <br />
              &bull;{' '}
              <Link href="/">
                <a className="underline">{t('sign_up:cookies')}</a>
              </Link>
            </p>
          </div>
          <div className="p-5 bg-white md:flex-1">
            {message && <Message data={message} />}

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
                accountType: 'user',
                locale: '',
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
                  setMessage(null)
                  setSubmitting(true)
                  const token = await recaptchaRef.current.executeAsync()
                  values.recaptcha = token
                  values.locale = router.locale
                  const res = await axios.post('/api/auth/signup', values)
                  setSubmitting(false)
                  if (res.data.success) {
                    router.push('/confirmation')
                  }
                } catch (err) {
                  setMessage(err.response.data)
                  setSubmitting(false)
                }
              }}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form className="max-w-xl mx-auto bg-transparent">
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

                  <SelectInput
                    name="accountType"
                    label={t('sign_up:account')}
                    id="accountType"
                    as="select"
                  >
                    <option value="user">{t('sign_up:user')}</option>
                    <option value="seller">{t('sign_up:seller')}</option>
                    <option value="manufacturer">
                      {t('sign_up:manufacturer')}
                    </option>
                  </SelectInput>

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
                  <Persist name="signup-form" clearIfSubmitted />
                </Form>
              )}
            </Formik>

            <div className="flex flex-col space-y-4">
              <span className="flex items-center justify-center space-x-2">
                <span className="h-px bg-gray-400 w-14"></span>
                <span className="font-normal text-gray-500">
                  {t('sign_up:otherAccounts')}
                </span>
                <span className="h-px bg-gray-400 w-14"></span>
              </span>
              <div className="flex flex-col space-y-4">
                <a
                  href="/api/auth/fb"
                  className="flex items-center justify-center px-4 py-2 border border-blue-700 space-x-2 transition-colors duration-300 rounded-md group hover:bg-blue-700 focus:outline-none"
                >
                  <span>
                    <svg className="w-6 h-6" viewBox="0 0 50 50">
                      <path
                        d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z"
                        fill="#4267B2"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-blue-700 group-hover:text-white">
                    Facebook
                  </span>
                </a>
                <a
                  href="/api/auth/in"
                  className="flex items-center justify-center px-4 py-2 border border-blue-500 space-x-2 transition-colors duration-300 rounded-md group hover:bg-blue-500 focus:outline-none"
                >
                  <span>
                    <svg className="w-6 h-6  rounded-md bg-white" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      fill="#0a66c2" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-blue-500 group-hover:text-white">
                    LinkedIn
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Signup
