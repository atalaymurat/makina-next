import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Axios from 'axios'
import Message from '../components/Message'
import useTranslation from 'next-translate/useTranslation'
import useUser from '../lib/useUser'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Redirecting from '../components/Redirecting'
import CircleSpin from '../components/CircleSpin'
import FormikControl from '../components/formik/FormikControl'

const Confirmation = () => {
  const [message, setMessage] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const { t } = useTranslation()
  const { user, mutateUser } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user && !confirm) {
      router.push('/panel')
    }
  }, [user, confirm])

  // Already Confirmed User Account Redirect to Panel
  if (user && !confirm) {
    return <Redirecting />
  }

  // Confirmed New User Welcome Screen
  if (confirm && user) {
    return (
      <div className="flex flex-col min-h-screen items-start">
        <div className="my-auto mx-auto max-w-3xl text-3xl">
          <div className="flex items-center">
            <Link href="/">
              <a>
                <img
                  src="/siteLogo.svg"
                  alt="Site Logo"
                  className="h-7 w-7 filter filter-invert-100"
                />
              </a>
            </Link>
            <Link href="/">
              <a className="text-3xl logo text-gray-900">
                {process.env.NEXT_PUBLIC_SITE_NAME}
              </a>
            </Link>
          </div>
          <h2 className="mx-auto font-semibold text-3xl">
            {t('confirmation:confirmed')}
          </h2>
        </div>
        <div className="w-full inline-flex items-center justify-center pb-20 mt-6">
          <button className="bg-indigo-700 focus:outline-none focus:ring focus:border-blue-400 font-semibold text-lg rounded px-4 py-2 hover:bg-white hover:text-indigo-700 mr-4">
            <Link href="/panel">{t('confirmation:goPanel')}</Link>
          </button>
          <button className="border border-indigo-400 text-indigo-300 focus:outline-none focus:ring focus:border-blue-400 text-lg rounded px-4 py-2 hover:bg-white hover:text-indigo-700">
            <Link href="/">{t('confirmation:goMain')}</Link>
          </button>
        </div>
      </div>
    )
  }

  // Verification Screen
  return (
    <div className="min-h-screen mx-auto max-w-3xl flex flex-col items-start bg-gray-100">
      <div className="mx-auto my-5 text-3xl w-full px-8">
        <div className="flex items-center mb-2">
          <Link href="/">
            <a>
              <img
                src="/siteLogo.svg"
                alt="Site Logo"
                className="h-6 w-6 filter filter-invert-100 "
              />
            </a>
          </Link>
          <Link href="/">
            <a className="text-2xl logo text-gray-900">
              {process.env.NEXT_PUBLIC_SITE_NAME}
            </a>
          </Link>
        </div>
        <div className="py-4">
          {message ? (
            <Message data={message} />
          ) : (
            !showForm && (
              <>
                <p>{t('confirmation:sentMail')}</p>
                <p>{t('confirmation:checkMail')} </p>
                <p className="text-lg">{t('confirmation:checkSpam')}</p>
                <div className="flex">
                  <p className="text-lg font-light mr-2">
                    {t('confirmation:contactUs')}
                  </p>
                </div>
              </>
            )
          )}
          {!showForm && (
            <div className="py-4">
              <h2 className="text-center text-lg">
                {t('confirmation:enterCode')}
              </h2>
              <Formik
                key="confirm-form"
                initialValues={{ token: '' }}
                validationSchema={Yup.object({
                  token: Yup.string()
                    .min(6, t('forms:minChar', { num: 6 }))
                    .required(t('forms:required')),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    setMessage(null)
                    setSubmitting(true)
                    const res = await Axios.post('/api/auth/verify', values)
                    if (res.data.success) {
                      setConfirm(true)
                      mutateUser()
                      setSubmitting(false)
                    }
                  } catch (err) {
                    setSubmitting(false)
                    setMessage(err.response.data)
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="mx-auto mt-2" key="02">
                    <span className="text-gray-800 w-full text-lg">
                      <FormikControl
                        control="input"
                        name="token"
                        type="text"
                        id="token"
                      />
                    </span>
                    <div className="py-2 w-full">
                      <button
                        className="mt-2 inline-flex items-center border-2 justify-center shadow rounded px-6 py-4 text-sm font-bold bg-gray-800 text-gray-300 border-gray-200 hover:bg-indigo-500 w-full focus:outline-none focus:ring focus:border-blue-400"
                        type="submit"
                        disabled={isSubmitting ? true : false}
                      >
                        {isSubmitting && <CircleSpin />}
                        {t('forms:validate').toUpperCase()}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>

        {/* RESENT MESAJ FORM */}
        <div className="min-h-screen mx-auto max-w-2xl flex flex-col items-start bg-gray-100">
          {showForm ? (
            <Formik
              key="resent-form"
              initialValues={{ email: '' }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email(t('forms:invalidEmail'))
                  .required(t('forms:required')),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  setMessage(null)
                  setSubmitting(true)
                  const res = await Axios.post('/api/auth/resent', values)
                  if (res.data.success) {
                    setMessage(res.data)
                  }
                } catch (err) {
                  setMessage(err.response.data)
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="max-w-xl" key="01">
                  <h2 className="text-xl">{t('confirmation:sentNewMail')}</h2>
                  <h2 className="text-lg">{t('confirmation:checkSpam')}</h2>
                  <span className="text-gray-800 text-lg">
                    <FormikControl
                      control="input"
                      name="email"
                      type="text"
                      id="email"
                      label={t('forms:email')}
                    />
                  </span>
                  <button
                    className="mt-4 inline-flex items-center border-2 justify-center shadow rounded px-6 py-4 text-sm font-bold border-gray-200 bg-gray-800 text-gray-300 hover:bg-indigo-500 w-full focus:outline-none focus:ring focus:border-blue-400"
                    type="submit"
                    disabled={isSubmitting ? true : false}
                  >
                    {isSubmitting && <CircleSpin />}
                    {t('forms:sent').toUpperCase()}
                  </button>
                  <button
                    className="mt-2 inline-flex items-center border-2 justify-center shadow rounded px-6 py-4 text-sm font-bold border-gray-200 bg-gray-600 text-gray-300 hover:bg-indigo-500 w-full focus:outline-none focus:ring focus:border-blue-400"
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setMessage(null)
                    }}
                  >
                    {t('forms:cancel').toUpperCase()}
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            <button
              type="button"
              className="flex w-full items-center border-2 justify-center shadow rounded px-6 py-4 text-sm font-bold bg-gray-800 text-gray-300 border-gray-200 hover:bg-indigo-500 focus:outline-none focus:ring focus:border-blue-400"
              onClick={() => {
                setShowForm(true)
                setMessage(null)
              }}
            >
              {t('confirmation:reSentMail')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
export default Confirmation
