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
import SocialLogin from '../components/SocialLogin'

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
                  if (res.data.success && res.data.login ){
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

              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Signup
