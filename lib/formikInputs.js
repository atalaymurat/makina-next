import { useState } from 'react'
import { useField, Field, ErrorMessage } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useRouter } from 'next/router'
import TR from '../locales/tr/countryTR.json'
import EN from '../locales/en/countryEN.json'
import flags from 'react-phone-number-input/flags'
import Creatable from 'react-select/creatable'

export const SelectCreatable = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props)
  const defaultValue = (op, val) => {
    return op ? op.find((o) => o.value === val) || {label: val, value: val} : ""
  }
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={props.id || props.name} className="block">
        <span className="text-sm font-semibold text-gray-500">{label}</span>
      </label>
      <Creatable
        isClearable
        name={props.name}
        value={defaultValue(props.options, field.value)}
        onChange={(v) => helpers.setValue( v ? v.value : "")}
        options={props.options}
        className="react-select-container"
        classNamePrefix="react-select"
        backspaceRemovesValue = {true}
      />
      <p>{JSON.stringify(field)}</p>
      <p>{JSON.stringify(meta)}</p>
      {meta.touched && meta.error ? (
        <div className="inline-block mb-2 font-light text-red-600 italic">
          {meta.error}
        </div>
      ) : null}
    </div>
  )
}

export const SelectInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={props.id || props.name} className="block">
        <span className="text-sm font-semibold text-gray-500">{label}</span>
      </label>
      <select
        className={`px-4 py-2 border border-gray-300 text-gray-500 rounded transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 ${
          meta.touched && meta.error ? 'border-red-600' : null
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="inline-block mb-2 font-light text-red-600 italic">
          {meta.error}
        </div>
      ) : null}
    </div>
  )
}

export const TextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props)
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={props.id || props.name} className="block">
        <span className="text-sm font-semibold text-gray-500">{label}</span>
      </label>
      <input
        className={`px-4 py-2 border text-gray-500 border-gray-300 rounded transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 ${
          meta.touched && meta.error ? 'border-red-600' : null
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="inline-block mb-2 font-light text-red-600 italic">
          {meta.error}
        </div>
      ) : null}
    </div>
  )
}

export const TextAreaInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={props.name} className="block">
        <span className="text-sm font-semibold text-gray-500">{label}</span>
      </label>
      <textarea
        id={props.name}
        name={props.name}
        rows="6"
        className={`px-4 py-2 border text-gray-500 border-gray-300 rounded transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 ${
          meta.touched && meta.error ? 'border-red-600' : null
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="inline-block mb-2 font-light text-red-600 italic">
          {meta.error}
        </div>
      ) : null}
    </div>
  )
}

export const PassInput = ({ label, ...props }) => {
  const [showPass, setShowPass] = useState(false)
  const { t } = useTranslation()
  const [field, meta] = useField(props)
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={props.id || props.name} className="block">
        <span className="text-sm font-semibold text-gray-500">{label}</span>
      </label>
      <input
        className={`relative z-0 px-4 py-2 border text-gray-500 border-gray-300 rounded transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 ${
          meta.touched && meta.error ? 'border-red-600' : null
        }`}
        type={showPass ? 'text' : 'password'}
        {...field}
        {...props}
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
      {meta.touched && meta.error ? (
        <div className="inline-block mb-2 font-light text-red-600 italic">
          {meta.error}
        </div>
      ) : null}
    </div>
  )
}

export const PhoneInputField = (props) => {
  const router = useRouter()
  const {
    name,
    value,
    handleBlur,
    setFieldValue,
    label,
    onChange,
    id,
    placeholder,
    init,
  } = props
  const [field, meta] = useField(props)

  const setValue = (num) => {
    setFieldValue(name, num)
    if (onChange !== null) {
      onChange(num)
    }
  }

  return (
    <div className="flex flex-col w-full space-y-1">
      <label htmlFor={props.id || props.name} className="block">
        <span className="text-sm font-semibold text-gray-500">{label}</span>
      </label>

      <div className="flex flex-row items-center w-full">
        <PhoneInput
          smartCaret={false}
          flags={flags}
          labels={router.locale === 'tr' ? TR : EN}
          id={id}
          placeholder={placeholder}
          name={name}
          value={field.value}
          onBlur={handleBlur}
          onChange={setValue}
          country={props.country}
          defaultCountry="TR"
          className="pl-4 space-x-2 w-full flex"
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="inline-block mb-2 font-light text-red-600 italic">
          {meta.error}
        </div>
      ) : null}
    </div>
  )
}
