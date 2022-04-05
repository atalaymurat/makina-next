import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function RadioGroupSub(props) {
  const { name, label, options, sid, ...rest } = props

  return (
    <div className="flex flex-col space-y-1 my-2">
      <label className="block">
        <span className="text-sm font-semibold text-gray-500">{label}</span>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 py-4 border bg-slate-50 text-gray-500 border-gray-300 rounded transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200">
        <Field name={name} {...rest}>
          {({ field }) => {
            return options.map((option, i) => {
              const uid = Date.now().toString(36) + Math.random().toString(36)

              return (
                <div key={option.label} className="flex mx-2 items-center space-x-1">
                  <input
                    type="radio"
                    id={uid}
                    {...field}
                    value={option.value}
                    checked={field.value === option.value}
                  />
                  <label htmlFor={uid}>{option.label}</label>
                </div>
              )
            })
          }}
        </Field>
      </div>
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default RadioGroupSub
