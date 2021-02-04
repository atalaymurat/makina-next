import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { TextInput, PassInput } from '../lib/formikInputs'
import Axios from 'axios'
import Message from '../components/Message'
import useUser from '../lib/useUser'
import { useRouter } from 'next/router'
import CircleSpin from '../components/CircleSpin'
import SocialLogin from '../components/signup/SocialLogin'

const Login = (props) => {
  const [forget, setForget] = useState(false)
  const { t } = useTranslation()
  const [message, setMessage] = useState(null)
  const [resetSuccess, setResetSuccess] = useState(false)
  const { mutateUser } = useUser()
  const router = useRouter()

  useEffect(() => {
    setForget(false)
    setMessage(null)
  }, [props])

  return (
    <Layout>
      <div className="flex items-center p-4 lg:justify-center">
        <div className="flex mt-12 flex-col overflow-hidden bg-white shadow-lg rounded-md max md:flex-row md:flex-1 lg:max-w-screen-md">
          {/* LEFT SIDE ITEMS */}
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
            <p className="w-full mt-6 font-normal md:mt-0">
              {t('sign_up:description')}
            </p>
            <p className="flex flex-col items-center justify-center mt-10 text-center">
              <span>{t('sign_up:signNewAccount')}</span>
              <Link href="/signup">
                <a
                  href="#"
                  className="py-2 px-4 border border-indigo-500 rounded mt-1 shadow  bg-gray-700 hover:bg-indigo-500 font-semibold"
                >
                  {t('sign_up:signUp')}
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

          {/* RIGHT FORM SIDE*/}
          <div className="p-5 bg-white md:flex-1">
            <Message data={message} />

            {/* FORM FOR FORGET PASSWORD */}
            {forget ? (
              <Formik
                key="forget-pass"
                initialValues={{ email: '' }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email(t('sign_up:invalidEmail'))
                    .required(t('forms:required')),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    setMessage(null)
                    setSubmitting(true)
                    const res = await Axios.post('/api/auth/forget', values)
                    if (res.data.success) {
                      setMessage(res.data)
                      setResetSuccess(true)
                      return
                    }
                  } catch (err) {
                    setMessage(err.response.data)
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <>
                    <h3 className="my-4 text-2xl font-semibold text-gray-700">
                      {t('sign_up:resetPass')}
                    </h3>
                    <Form className="max-w-xl mx-auto bg-transparent">
                      <TextInput
                        name="email"
                        type="text"
                        id="email"
                        label={t('sign_up:email')}
                      />

                      <div className="pt-2 mt-2">
                        <button
                          type="submit"
                          disabled={resetSuccess || isSubmitting ? true : false}
                          className={`inline-flex items-center justify-center w-full px-4 py-2 text-lg font-semibold text-white shadow transition-colors duration-300 rounded-md focus:outline-none focus:ring-blue-200 focus:ring-4 ${
                            resetSuccess || isSubmitting
                              ? 'bg-gray-500 hover:bg-gray-500'
                              : 'bg-gray-700 hover:bg-indigo-500'
                          }`}
                        >
                          {isSubmitting && <CircleSpin />}
                          {t('sign_up:reset')}
                        </button>
                      </div>

                      <div className="pt-2 mt-2">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center w-full px-4 py-2 text-lg font-semibold border border-red-700 text-red-700 shadow transition-colors duration-300 rounded-md hover:bg-red-700 hover:text-white focus:outline-none focus:ring-blue-200 focus:ring-4"
                          onClick={() => {
                            setForget(false)
                            setMessage(null)
                          }}
                        >
                          {t('sign_up:back')}
                        </button>
                      </div>
                    </Form>
                  </>
                )}
              </Formik>
            ) : (
              <Formik
                key="login-form"
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email(t('sign_up:invalidEmail'))
                    .required(t('forms:required')),
                  password: Yup.string().required(t('forms:required')),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    setSubmitting(true)
                    const res = await Axios.post('/api/auth/login', values)
                    if (res.data.success) {
                      mutateUser()
                      router.push('/panel')
                      return
                    }
                  } catch (err) {
                    setMessage(err.response.data)
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <>
                    <h3 className="my-4 text-2xl font-semibold text-gray-700">
                      {t('sign_up:loginTitle')}
                    </h3>
                    <Form className="max-w-xl mx-auto bg-transparent">
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
                      <div className="block py-1">
                        <span
                          className="float-right mt-1 mb-2 text-sm text-gray-700 hover:text-gray-400 cursor-pointer hover:underline"
                          onClick={() => {
                            setForget(true)
                            setMessage(null)
                          }}
                        >
                          {t('sign_up:forgetPass')}
                        </span>
                      </div>
                      <div className="py-2 mt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting ? true : false}
                          className="inline-flex items-center justify-center w-full px-4 py-2 text-lg font-semibold text-white bg-gray-700 shadow transition-colors duration-300 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-blue-200 focus:ring-4"
                        >
                          {isSubmitting && <CircleSpin />}
                          {t('sign_up:login')}
                        </button>
                      </div>
                    </Form>
                    <div className="flex flex-col space-y-4">
                      <span className="flex items-center justify-center space-x-2">
                        <span className="h-px bg-gray-400 w-14"></span>
                        <span className="font-normal text-gray-500">
                          {t('sign_up:otherAccounts')}
                        </span>
                        <span className="h-px bg-gray-400 w-14"></span>
                      </span>

                      <SocialLogin />
                    </div>
                  </>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login
