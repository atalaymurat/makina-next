import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import CircleSpin from '../CircleSpin'
import useTranslation from 'next-translate/useTranslation'
import Axios from 'axios'
import FormikControl from '../formik/FormikControl'

const PhoneForm = ({ user, mutate, togleModal }) => {
  const { t } = useTranslation()
  return (
    <div>
      <Formik
        initialValues={{
          mobile: user.phone.mobile || '',
          company: user.phone.company || '',
        }}
        validationSchema={Yup.object({
          mobile: Yup.string()
            .min(13, t('forms:notValidPhone'))
            .max(13, t('forms:notValidPhone')),
          company: Yup.string()
            .min(13, t('forms:notValidPhone'))
            .max(13, t('forms:notValidPhone')),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const data = { phone: { ...values } }
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
        {({ isSubmitting, setFieldValue, handleBlur }) => (
          <Form className="space-y-3">
            <FormikControl
              control="phone"
              label={t("panel:gsmTel")}
              name="mobile"
            />
            <FormikControl
              control="phone"
              label={t("panel:companyTel")}
              name="company"
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

export default PhoneForm
