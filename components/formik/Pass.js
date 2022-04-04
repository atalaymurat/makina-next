import React, { useState } from 'react'
import { Field, ErrorMessage, useField } from 'formik'
import TextError from './TextError'
import useTranslation from 'next-translate/useTranslation'

function Pass(props) {
  const { label, name, ...rest } = props
  const [showPass, setShowPass] = useState(false)
  const { t } = useTranslation()
  const [field, meta] = useField(props)
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="block">
        <span className="text-sm font-semibold text-gray-500">{label}</span>
      </label>
      <Field
        id={name}
        name={name}

        {...rest}
        type={showPass ? 'text' : 'password'}
        className={`px-4 py-2 border text-gray-500 border-gray-300 rounded transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 ${
          meta.touched && meta.error ? 'border-red-600 border-2' : null
        }`}
      />

      {meta.value.length > 0 && (
        <div className="relative left-0 z-10 flex items-center m-1 -top-6">
          <button
            className="absolute px-1 mx-1 text-sm text-blue-800 lowercase bg-blue-200 border-2 border-gray-300 rounded right-2 focus:outline-none"
            type="button"
            tabIndex="-1"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? t('forms:hide') : t('forms:show')}
          </button>
        </div>
      )}
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default Pass
