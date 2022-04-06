import React from 'react'
import { Field, ErrorMessage, useField } from 'formik'
import TextError from './TextError'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import TR from '../../locales/tr/countryTR.json'
import EN from '../../locales/en/countryEN.json'
import flags from 'react-phone-number-input/flags'
import { useRouter } from 'next/router'

function Phone(props) {
  const { label, name, placeholder, country,  ...rest } = props
  const router = useRouter()
  return (
    <div className="flex flex-col w-full space-y-1">
      <label htmlFor={name} className="block">
        <span className="text-sm font-semibold text-gray-500">{label}</span>
      </label>

      <div className="flex flex-row items-center w-full">
        <Field id={name} name={name} {...rest}>
          {(props) => {
            const { field, form, meta } = props
            return (
              <PhoneInput
                name={name}
                smartCaret={false}
                flags={flags}
                labels={router.locale === 'tr' ? TR : EN}
                placeholder={placeholder}
                value={field.value}
                onBlur={form.handleBlur}
                onChange={(v) => form.setFieldValue(field.name, v)}
                country={country}
                defaultCountry="TR"
                className="pl-4 space-x-2 w-full flex"
              />
            )
          }}
        </Field>
      </div>
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default Phone
