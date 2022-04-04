import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import CircleSpin from '../CircleSpin'
import useTranslation from 'next-translate/useTranslation'
import Axios from 'axios'
import FormikControl from '../formik/FormikControl'

const NameForm = ({ user, mutate, togleModal }) => {
  const { t } = useTranslation()
  return (
    <div>
      <Formik
        initialValues={{
          firstName: user.name.firstName || '',
          middleName: user.name.middleName || '',
          lastName: user.name.lastName || '',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, t('forms:maxChar', { num: 15 }))
            .min(2, t('forms:minChar', { num: 2 }))
            .required(t('forms:required')),
          lastName: Yup.string()
            .max(20, t('forms:maxChar', { num: 20 }))
            .required(t('forms:required')),
          middleName: Yup.string().max(20, t('forms:maxChar', { num: 20 })),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const data = { name: { ...values } }
            const res = await Axios.post(`/api/user/${user._id}`, data)
            if (res.data.success) {
              mutate()
              togleModal(false)
              return
            }
          } catch (err) {
            console.error(err)
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <FormikControl
              control="input"
              name="firstName"
              type="text"
              label={t('forms:name')}
            />
            <FormikControl
              control="input"
              name="middleName"
              type="text"
              label={t('forms:middlename')}
            />
            <FormikControl
              control="input"
              name="lastName"
              type="text"
              id="lastName"
              label={t('forms:surname')}
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

export default NameForm
