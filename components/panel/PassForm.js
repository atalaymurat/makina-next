import { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import CircleSpin from '../CircleSpin'
import useTranslation from 'next-translate/useTranslation'
import Axios from 'axios'
import Message from '../Message'
import FormikControl from '../formik/FormikControl'

const PassForm = ({ user, mutate, togleModal, setSuccessMessage }) => {
  const [message, setMessage] = useState(null)
  const [showSuccess, setSuccess] = useState(false)
  const { t } = useTranslation()

  if (showSuccess) {
    return (
      <div>
        <p className="mb-4">
          <Message data={message} />
        </p>
      </div>
    )
  } else {

    return (
      <div>
        {message && (
          <p className="mb-4">
            <Message data={message} />
          </p>
        )}
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
          }}
          validationSchema={Yup.object({
            currentPassword: Yup.string()
              .min(6, t('forms:minChar', { num: 6 }))
              .required(t('forms:required')),
            newPassword: Yup.string()
              .min(6, t('forms:minChar', { num: 6 }))
              .required(t('forms:required')),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setMessage(null)
              const data = values
              const res = await Axios.post(
                `/api/user/${user._id}/password`,
                data
              )
              console.log('PASS RES', res.data)
              if (!res.data.success) return

              if (res.data.success) {
                setMessage(res.data)
                setSuccess(true)
                mutate()
                return
              }
            } catch (err) {
              setMessage(err.response.data)
              console.error('ERROR ON PASS FORM', err)
            }
          }}
        >
          {({ isSubmitting, setFieldValue, handleBlur }) => (
            <Form className="space-y-3">
              <FormikControl
                control="password"
                name="currentPassword"
                label={t('forms:currentPassword')}
                autoComplete="current-password"
              />
              <FormikControl
                control="password"
                name="newPassword"
                label={t('forms:newPassword')}
                autoComplete="new-password"
              />

              <div className="py-2 mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting ? true : false}
                  className="w-full px-4 py-2 text-lg font-semibold text-white bg-gray-700 shadow transition-colors duration-300 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-blue-200 focus:ring-4 inline-flex items-center justify-center"
                >
                  {isSubmitting && <CircleSpin />}
                  {t('forms:save')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
}

export default PassForm
