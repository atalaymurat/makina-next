import Layout from '../components/Layout'
import { useFormik } from 'formik'
import axios from "axios"

const Kayit = (props) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      surname: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
      axios.post("/api/auth/signup", values)
    },
  })
  return (
    <Layout title="Üye Kaydı" baseURL={props.base}>
      <h1>Üye Kaydı Yap</h1>
      <form onSubmit={formik.handleSubmit}>
       <label htmlFor="email">Email Address</label>
       <input
         id="email"
         name="email"
         type="email"
         onChange={formik.handleChange}
         value={formik.values.email}
       />
       <button type="submit">Submit</button>
     </form>
    </Layout>
  )
}


export default Kayit
