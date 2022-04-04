import React from 'react'
import ReactSelect from './ReactSelect'
import Input from './Input'
import TextArea from './TextArea'
import Phone from './Phone'
import Pass from './Pass'

function FormikControl(props) {
  const { control, ...rest } = props
  switch (control) {
    case 'input':
      return <Input {...rest} />
    case 'textarea':
      return <TextArea {...rest} />
    case 'select':
    case 'reactSelect':
      return <ReactSelect {...rest} />
    case 'radio':
    case 'checkbox':
    case 'date':
    case 'password':
      return <Pass {...rest} />
    case 'phone':
      return <Phone {...rest} />
    default:
      return null
  }
}

export default FormikControl
