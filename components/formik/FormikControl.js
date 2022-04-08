import React from 'react'
import ReactSelect from './ReactSelect'
import Input from './Input'
import TextArea from './TextArea'
import Phone from './Phone'
import Pass from './Pass'
import RadioGroup from './RadioGroup'
import RadioGroupSub from './RadioGroupSub'
import CheckBoxGroup from './CheckBoxGroup'
import Select from './Select'

function FormikControl(props) {
  const { control, ...rest } = props
  switch (control) {
    case 'input':
      return <Input {...rest} />
    case 'textarea':
      return <TextArea {...rest} />
    case 'select':
      return <Select {...rest} />
    case 'reactSelect':
      return <ReactSelect {...rest} />
    case 'radio':
      return <RadioGroup {...rest} />
    case 'radioSub':
      return <RadioGroupSub {...rest} />
    case 'checkbox':
      return <CheckBoxGroup {...rest} />
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
