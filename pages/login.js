import { useState } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { TextInput, PassInput } from '../lib/formikInputs'
import Axios from 'axios'
import Error from '../components/Error'
import useUser from '../lib/useUser'
import { useRouter } from 'next/router'

const Login = () => {
  const { t } = useTranslation()
  const [ error, setError] = useState(null)
  const { mutateUser } = useUser()
  const router = useRouter()
  return (
    <Layout>
      <div className="flex items-center h-full p-4 bg-gray-100 lg:justify-center">
        <div className="flex flex-col overflow-hidden bg-white shadow-lg rounded-md max md:flex-row md:flex-1 lg:max-w-screen-md">
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
            <p className="w-full mt-6 font-normal text-gray-300 md:mt-0">
              {t('sign_up:description')}
            </p>
            <p className="flex flex-col items-center justify-center mt-10 text-center">
              <span>{t('sign_up:signNewAccount')}</span>
              <Link href="/signup">
                <a href="#" className="py-2 px-4 border border-indigo-500 rounded mt-1 shadow  bg-gray-700 hover:bg-indigo-500 font-semibold">
                  {t('sign_up:signUp')}
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

          {/* RIGHT FORM SIDE*/}
          <div className="p-5 bg-white md:flex-1">
            <Error error={error} />
            <h3 className="my-4 text-2xl font-semibold text-gray-700">
              {t('sign_up:loginTitle')}
            </h3>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email(t('sign_up:invalidEmail'))
                  .required(t('forms:required')),
                password: Yup.string().required(t('froms:required')),
              })}
              onSubmit={ async (values, { setSubmitting }) => {
                try {
                  setSubmitting(true)
                  const res = await Axios.post('/api/auth/login', values)
                  if (res.data.success) {
                    mutateUser()
                    router.push("/panel")
                    return
                  }
                } catch (err) {
                  setError(err.response.data.message)
                }
              }}
            >
              {({ isSubmitting }) => (
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
                  <div className="py-2 mt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting ? true : false}
                      className="inline-flex items-center justify-center w-full px-4 py-2 text-lg font-semibold text-white bg-gray-700 shadow transition-colors duration-300 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-blue-200 focus:ring-4"
                    >
                      {isSubmitting && (
                        <svg
                          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          ></circle>
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      )}
                      {t('sign_up:login')}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login