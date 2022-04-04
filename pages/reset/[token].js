import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import Message from '../../components/Message'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import CircleSpin from '../../components/CircleSpin'
import Axios from 'axios'
import Link from 'next/link'
import FormikControl from '../../components/formik/FormikControl'

const Reset = () => {
  const [message, setMessage] = useState(null)
  const [passUpdated, setPassUpdated] = useState(false)
  const { t } = useTranslation()
  const router = useRouter()
  const { token } = router.query

  useEffect(() => {})

  if (passUpdated) {
    return (
      <Layout>
        <div className="flex flex-col items-center p-4 justify-center">
          <Message data={message} />
          <div className="w-full inline-flex items-center justify-center pb-20 mt-12">
            <button className="border border-indigo-400 text-indigo-300 focus:ring-0 text-lg rounded px-4 py-2 hover:bg-white hover:text-indigo-700">
              <Link href="/login">{t('reset:login')}</Link>
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex items-center p-4 justify-center">
        <div className="flex mt-12 flex-col w-full max-w-xl overflow-hidden shadow-lg rounded-md">
          {/* RIGHT PANEL PF LOGIN */}
          <div className="p-5 bg-white md:flex-1">
            <Message data={message} />

            <Formik
              key="reset-form"
              initialValues={{
                token: token,
                password: '',
                passConfirm: '',
              }}
              validationSchema={Yup.object({
                password: Yup.string()
                  .required(t('forms:required'))
                  .min(6, t('forms:minChar', { num: 6 })),
                passConfirm: Yup.string()
                  .oneOf([Yup.ref('password'), null], t('reset:match'))
                  .required(t('forms:required')),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  setSubmitting(true)
                  const res = await Axios.post('/api/auth/reset', values)
                  if (res.data.success) {
                    setMessage(res.data)
                    setPassUpdated(true)
                    // router.push('/panel')
                  }
                  setSubmitting(false)
                } catch (err) {
                  setMessage(err.response.data)
                }
              }}
            >
              {({ isSubmitting }) => (
                <>
                  <h3 className="my-4 text-2xl font-semibold text-gray-700">
                    {t('reset:title')}
                  </h3>
                  <Form className="mx-auto bg-transparent">
                    <Field
                      name="token"
                      type="hidden"
                      id="token"
                      value={token}
                    />
                    <FormikControl
                      control="password"
                      name="password"
                      label={t('reset:password')}
                      autoComplete="new-password"
                    />
                    <FormikControl
                      control="password"
                      name="passConfirm"
                      label={t('reset:passConfirm')}
                      autoComplete="new-password"
                    />
                    <div className="py-2 mt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting ? false : false}
                        className="inline-flex items-center justify-center w-full px-4 py-2 text-lg font-semibold text-white bg-gray-700 shadow transition-colors duration-300 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-blue-200 focus:ring-4"
                      >
                        {isSubmitting && <CircleSpin />}
                        {t('reset:save')}
                      </button>
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Reset
