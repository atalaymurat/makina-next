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
            .max(15, '! En fazla 15 karakter')
            .min(2, '! En az 2 karakter olabilir' )
            .required('! Gerekli'),
          lastName: Yup.string()
            .max(20, '! En fazla 20 karakter olabilir')
            .required('! Gerekli'),
          email: Yup.string()
            .email('! Geçersiz email adresi')
            .required('! Gerekli'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          axios.post('/api/auth/signup', values)
        }}
      >
        <Form className="bg-gray-200 mx-auto max-w-xl">
          <h1 className="text-center text-3xl font-bold text-gray-800">Yeni Üye Kayıt Formu</h1>
          <label htmlFor="firstName" className="block font-semibold">
            First Name
          </label>
          <Field
            name="firstName"
            type="text"
            className="form-input mt-1 block w-full"
          />
          <span className="text-red-600 font-semibold mb-2 inline-block">
            <ErrorMessage name="firstName" />
          </span>
          <label htmlFor="lastName" className="block">
            Last Name
          </label>
          <Field
            name="lastName"
            type="text"
            className="form-input mt-1 block w-full"
          />
          <span className="text-red-600 font-semibold mb-2 inline-block">
            <ErrorMessage name="lastName" />
          </span>
          <label htmlFor="email" className="block">
            Email Address
          </label>
          <Field
            name="email"
            type="text"
            className="form-input mt-1 block w-full"
          />
          <span className="text-red-600 font-semibold mb-2 inline-block">
            <ErrorMessage name="email" />
          </span>
          <label htmlFor="accountType" className="block">
            Hesap Tipi
          </label>
          <Field
            name="accountType"
            as="select"
            className="form-select mt-1 block w-full"
          >
            <option value="user">Üye Hesabı</option>
            <option value="seller">Satıcı Hesabı</option>
            <option value="manufacturer">İmalatcı Hesabı</option>
          </Field>
          <button type="submit" className="botton my-4 border px-4 py-2 font-bold border-blue-900 bg-purple-300">Kaydet</button>
        </Form>
      </Formik>
    </Layout>
  )
}

export default Kayit
