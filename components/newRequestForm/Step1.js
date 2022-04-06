import React from 'react'
import useTranslation from 'next-translate/useTranslation'

import FormikControl from '../../components/formik/FormikControl'

const Step1 = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col">
      <div className="bg-orange-300 rounded-md py-4 px-2 my-4 shadow-md">
        <h2 className="text-lg font-bold">{t('forms:contactInfo')}</h2>

        <div className="grid grid-cols-2 gap-2 w-full">
          <FormikControl
            control="input"
            type="text"
            name="name.firstName"
            label={t('forms:name')}
          />

          <FormikControl
            control="input"
            type="text"
            name="name.lastName"
            label={t('forms:surname')}
          />
        </div>
        <div className="px-1">
          <FormikControl
            control="phone"
            label={t('forms:phone')}
            name="phone"
          />
        </div>
        <div className="px-1">
          <FormikControl
            control="input"
            name="email"
            type="text"
            label={t('forms:email')}
          />
        </div>
      </div>
      <div className="bg-blue-300 rounded-md py-4 px-2 my-4 shadow-md">
        <h2 className="text-lg font-bold">{t('forms:company')}</h2>
        <div className="">
          <FormikControl
            control="input"
            name="company.name"
            type="text"
            label={t('forms:companyName')}
          />
          <div className="grid grid-cols-2 gap-2 w-full">
            <FormikControl
              control="input"
              name="company.city"
              type="text"
              label={t('forms:city')}
            />
            <FormikControl
              control="input"
              name="company.country"
              type="text"
              label={t('forms:country')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step1