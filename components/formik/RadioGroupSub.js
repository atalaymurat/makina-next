import React from 'react'
import { Field, ErrorMessage, useFormikContext } from 'formik'
import TextError from './TextError'

function RadioGroupSub(props) {
  const { name, label, options, sid, ...rest } = props
  const formikProps = useFormikContext()
  const meta = formikProps.getFieldMeta(name)

  return (
    <div className="flex flex-col space-y-1 my-2">
      <label className="block">
        <span className="text-sm font-semibold text-gray-500">{label}</span>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 group px-2 py-4 border bg-slate-50 text-gray-500 border-gray-300 rounded transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 shadow-md">
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
      {meta.error && meta.touched && (
        <div className="inline-block mb-2 font-light text-red-600 italic">
          {meta.error}
        </div>
      )}
    </div>
  )
}

export default RadioGroupSub
