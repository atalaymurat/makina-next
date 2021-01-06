import { useState, useRef } from 'react'
import Layout from '../components/Layout'
import { Formik, Form } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import * as Yup from 'yup'
import useTranslation from 'next-translate/useTranslation'
import { SelectInput, TextInput, PassInput } from '../lib/formikInputs'
import useUser from '../lib/useUser'
import ReCAPTCHA from 'react-google-recaptcha'

const Kayit = (props) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { mutateUser } = useUser()
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
              <Link href="/">
                <a href="#" className="underline">
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
              }}
              validationSchema={Yup.object({
                firstName: Yup.string()
                  .max(15, t('sign_up:maxChar', { num: 15 }))
                  .min(2, t('sign_up:minChar', { num: 2 }))
                  .required(t('sign_up:required')),
                lastName: Yup.string()
                  .max(20, t('sign_up:maxChar', { num: 20 }))
                  .required(t('sign_up:required')),
                email: Yup.string()
                  .email(t('sign_up:invalidEmail'))
                  .required(t('sign_up:required')),
                password: Yup.string()
                  .required(t('sign_up:required'))
                  .min(6, t('sign_up:minChar', { num: 6 })),
              })}
              onSubmit={async (values) => {
                const token = await recaptchaRef.current.executeAsync()
                values.recaptcha = token
                const res = await axios.post('/api/auth/signup', values)
                mutateUser()
                if (res.data.success) {
                  router.push('/panel')
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
                        console.log("reCapthcha: ", token )
                        setFieldValue("recaptcha", token)
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
                      className="w-full px-4 py-2 text-lg font-semibold text-white bg-gray-700 shadow transition-colors duration-300 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-blue-200 focus:ring-4"
                    >
                      {t('sign_up:save')}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="flex flex-col space-y-5">
              <span className="flex items-center justify-center space-x-2">
                <span className="h-px bg-gray-400 w-14"></span>
                <span className="font-normal text-gray-500">
                  {t('sign_up:otherAccounts')}
                </span>
                <span className="h-px bg-gray-400 w-14"></span>
              </span>
              <div className="flex flex-col space-y-4">
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-2 border border-gray-800 space-x-2 transition-colors duration-300 rounded-md group hover:bg-gray-800 focus:outline-none"
                >
                  <span>
                    <svg
                      className="w-5 h-5 text-gray-800 fill-current group-hover:text-white"
                      viewBox="0 0 16 16"
                      version="1.1"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-white">
                    Github
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-2 border border-blue-500 space-x-2 transition-colors duration-300 rounded-md group hover:bg-blue-500 focus:outline-none"
                >
                  <span>
                    <svg
                      className="text-blue-500 group-hover:text-white"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-blue-500 group-hover:text-white">
                    Twitter
                  </span>
                </a>

                <a
                  href="#"
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
                    Goggle
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

export default Kayit
