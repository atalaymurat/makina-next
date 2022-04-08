import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../formik/FormikControl'
import axios from 'axios'

const validationSchema = Yup.object({
  name: Yup.string().required('gerekli...'),
  label: Yup.string().required('gerekli...'),
  sectors: Yup.array().min(1, 'en az bir sektör olmalı'),
})
const onSubmit = async ( values, { setSubmitting, resetForm }) => {
  setSubmitting(true)
  console.log('Submitting', values)
  if (!values._id) {
    await axios.post('/api/brands', values)
  }
  if (values._id ) {
    await axios.patch(`/api/brands/${values._id}`, values)
  }
  resetForm()
  setSubmitting(false)

  return
}

function BrandForm(props) {
  const { catOptions, selectedBrand, clearBrand } = props
  return (
    <Formik
      initialValues={{
        name: selectedBrand.name || '',
        label: selectedBrand.label || '',
        sectors: selectedBrand.sectors || [],
        _id: selectedBrand._id || undefined,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="p-6 grid grid-cols-2 gap-2">
          <FormikControl
            control="input"
            type="text"
            name="name"
            label="Brand Name"
          />
          <FormikControl
            control="input"
            type="text"
            name="label"
            label="Brand Label"
          />
          <FormikControl
            control="checkbox"
            name="sectors"
            label="Sector"
            options={catOptions}
            className="col-span-2"
          />
          <button
            type="submit"
            className="btn-submit my-4 col-span-2"
            disabled={isSubmitting}
            onClick={() => clearBrand({})}
          >
            {isSubmitting ? 'Kaydediyor...' : 'Kaydet'}
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default BrandForm
