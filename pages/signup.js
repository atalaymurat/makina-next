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
import Error from '../components/Error'

const Signup = (props) => {
  const { t } = useTranslation()
  const [error, setError] = useState(null)
  const router = useRouter()
  const recaptchaRef = useRef()

  return (
    <Layout title={t('sign_up:title')}>
      <div className="flex items-center h-full p-4 bg-gray-100 lg:justify-center">
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
            <p className="w-full mt-6 font-normal text-gray-300 md:mt-0">
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
            <p className="mt-6 text-sm text-center text-gray-300">
              <Link href="/">
                <a className="underline">{t('sign_up:userAgrement')} </a>
              </Link>{' '}
              &bull;{' '}
              <Link href="/">
                <a className="underline">{t('sign_up:privacyPolicy')}</a>
              </Link>{' '}
              &bull;{' '}
              <Link href="/">
                <a className="underline">{t('sign_up:cookies')}</a>
              </Link>
            </p>
          </div>
          <div className="p-5 bg-white md:flex-1">
            {error && <Error error={error} />}

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
                  setSubmitting(true)
                  setError(null)
                  const token = await recaptchaRef.current.executeAsync()
                  values.recaptcha = token
                  values.locale = router.locale
                  const res = await axios.post('/api/auth/signup', values)
                  if (res.data.success) {
                    router.push('/confirmation')
                  }
                } catch (err) {
                  setError(err.response.data.message)
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
                      disabled={isSubmitting ? false : false}
                      className="w-full px-4 py-2 text-lg font-semibold text-white bg-gray-700 shadow transition-colors duration-300 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-blue-200 focus:ring-4"
                    >
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
                  href="javascript:void(0)"
                  className="flex items-center justify-center px-4 py-2 border border-yellow-400 space-x-2 transition-colors duration-300 rounded-md group hover:bg-yellow-400 focus:outline-none"
                >
                  <span>
                    <svg className="w-6 h-6" viewBox="0 0 40 40">
                      <path
                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                        fill="#FFC107"
                      />
                      <path
                        d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                        fill="#FF3D00"
                      />
                      <path
                        d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                        fill="#4CAF50"
                      />
                      <path
                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                        fill="#1976D2"
                      />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-yellow-400 group-hover:text-white">
                    Google
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
