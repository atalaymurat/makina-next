import Layout from '../components/Layout'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'

const Kayit = (props) => {
  return (
    <Layout title="Üye Kaydı" baseURL={props.base}>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '' }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'En fazla 15 karakter !')
            .min(2, 'En az 2 karakter olabilir !')
            .required('Gerekli !'),
          lastName: Yup.string()
            .max(20, 'En fazla 20 karakter olabilir !')
            .required('Gerekli !'),
          email: Yup.string()
            .email('Geçersiz email adresi !')
            .required('Gerekli !'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          axios.post('/api/auth/signup', values)
        }}
      >
        <Form className="bg-transparent mx-auto max-w-xl">
          <h1 className="text-center text-3xl font-bold text-gray-800">
            Yeni Üye Kayıt Formu
          </h1>
          <label htmlFor="firstName" className="block">
            <span className="text-gray-700"> First Name</span>
            <Field
              name="firstName"
              type="text"
              className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
            />
          </label>
          <span className="text-red-600 font-light mb-2 inline-block">
            <ErrorMessage name="firstName" />
          </span>
          <label htmlFor="lastName" className="block">
            <span className="text-gray-700">Last Name</span>
            <Field
              name="lastName"
              type="text"
              className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            />
          </label>
          <span className="text-red-600 font-light mb-2 inline-block">
            <ErrorMessage name="lastName" />
          </span>
          <label htmlFor="email" className="block">
            <span className="text-gray-700">Email Address</span>
            <Field
              name="email"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <span className="text-red-600 mb-2 font-light inline-block">
            <ErrorMessage name="email" />
          </span>
          <label htmlFor="accountType" className="block">
            <span className="text-gray-700">Hesap Tipi</span>
            <Field
              name="accountType"
              as="select"
              className="block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            >
              <option value="user">Üye Hesabı</option>
              <option value="seller">Satıcı Hesabı</option>
              <option value="manufacturer">İmalatcı Hesabı</option>
            </Field>
          </label>
          <button
            type="submit"
            className="md:w-32 bg-green-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-green-500 transition ease-in-out duration-300"
          >
            Kaydet
          </button>
        </Form>
      </Formik>
    </Layout>
  )
}

export default Kayit
