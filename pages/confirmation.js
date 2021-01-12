import Layout from '../components/Layout'
import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { TextInput } from '../lib/formikInputs'
import Axios from 'axios'
import Error from '../components/Error'
import useTranslation from 'next-translate/useTranslation'
import useUser from '../lib/useUser'
import Link from 'next/link'

const Confirmation = () => {
  const [error, setError] = useState(null)
  const [confirm, setConfirm] = useState(false)
  const { t } = useTranslation()
  const { mutateUser } = useUser()

  if (confirm) {
    return (
      <Layout>
        <div className="bg-gray-800 text-gray-100 h-full flex flex-col items-start">
          <div className="my-auto mx-auto text-3xl w-4/5">
            <div className="flex items-center">
              <Link href="/">
                <a>
                  <img
                    src="/siteLogo.svg"
                    alt="Site Logo"
                    className="h-7 w-7"
                  />
                </a>
              </Link>
              <Link href="/">
                <a className="text-3xl logo">
                  {process.env.NEXT_PUBLIC_SITE_NAME}
                </a>
              </Link>
            </div>
            <h2 className="mx-auto font-semibold text-3xl">
              {t('confirmation:confirmed')}
            </h2>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <div className="bg-gray-800 text-gray-100 h-full flex flex-col items-start">
      <div className="divide-y divide-indigo-500 mx-auto my-5 text-3xl w-4/5">
        <div className="flex items-center">
          <Link href="/">
            <a>
              <img src="/siteLogo.svg" alt="Site Logo" className="h-7 w-7" />
            </a>
          </Link>
          <Link href="/">
            <a className="text-3xl logo">{process.env.NEXT_PUBLIC_SITE_NAME}</a>
          </Link>
        </div>
        <div className="py-4">
          {error ? (
            <Error error={error} />
          ) : (
            <>
              <p>{t('confirmation:sentMail')}</p>
              <p>{t('confirmation:checkMail')} </p>
              <p className="text-lg">{t('confirmation:checkSpam')} </p>
            </>
          )}
        </div>
        <div className="py-4">
          <h2 className="text-center">{t('confirmation:enterCode')}</h2>
          <Formik
            initialValues={{ token: '' }}
            validationSchema={Yup.object({
              token: Yup.string()
                .min(6, t('forms:minChar', { num: 6 }))
                .required(t('forms:required')),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setSubmitting(true)
                setError(null)
                const res = await Axios.post('/api/auth/verify', values)
                if (res.data.success) {
                  setConfirm(true)
                  mutateUser()
                  setSubmitting(false)
                }
              } catch (err) {
                setSubmitting(false)
                setError(err.response.data.message)
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="max-w-md w-6/12 mx-auto mt-2">
                <span className="text-gray-800 w-full text-lg">
                  <TextInput name="token" type="text" id="token" />
                </span>
                <div className="py-2 w-full">
                  <button
                    className="inline-flex items-center border-2 justify-center shadow rounded px-6 py-4 text-sm font-bold border-gray-200 hover:bg-indigo-500 w-full focus:outline-none"
                    type="submit"
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
                    {t('forms:validate').toUpperCase()}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
export default Confirmation
