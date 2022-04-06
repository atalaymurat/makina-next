import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { FieldArray } from 'formik'
import { useRouter } from 'next/router'

import FormikControl from '../../components/formik/FormikControl'

const Step2 = (props) => {
  const Router = useRouter()
  const { values, categories, brands } = props
  const { t } = useTranslation()

  const setSectorOptions = (data) => {
    console.log("Data Cat:", data)
    const sectorMain = data.filter((d) => d.depth === 0)
    const sectorOps = sectorMain.map((sec) => {
      return {
        label: Router.locale === 'en' ? sec.name.en : sec.name.tr,
        value: sec._id,
      }
    })
    return sectorOps
  }

  const setCatOptions = (data) => {
    const opsDepOne = data.filter((d) => d.depth === 1)
    const catOps = opsDepOne.map((op) => {
      return {
        label: Router.locale === 'en' ? op.name.en : op.name.tr,
        value: op._id,
        root: op.parentId,
      }
    })
    return catOps
  }
  const setBrandOptions = (data) => {
    const brdOps = data.map((d) => {
      return { label: d.label, value: d._id }
    })
    return brdOps
  }
  const categoryFiltered = (sector, keys) => {
    return keys.filter((cat) => cat.root === sector)
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold">{t('forms:addMachine')} </h1>
      <FieldArray name="requests">
        {({ insert, remove, push }) => (
          <>
            {values.requests.length > 0 &&
              values.requests.map((req, index) => (
                <div
                  key={index}
                  className="bg-blue-300 p-4 m-2 my-4 rounded-sm shadow-md"
                >
                  <FormikControl
                    control="radio"
                    name={`requests.${index}.sector`}
                    label={t('forms:sector')}
                    options={setSectorOptions(categories)}
                    sid={index}
                  />
                  {values.requests[index].sector && (
                    <FormikControl
                      control="radioSub"
                      name={`requests.${index}.category`}
                      label={t('forms:selectCat')}
                      options={categoryFiltered(
                        req.sector,
                        setCatOptions(categories)
                      )}
                      sid={index}
                    />
                  )}

                  <FormikControl
                    control="reactSelect"
                    name={`requests.${index}.brand`}
                    label={t('forms:brandPrefer')}
                    placeholder={t('forms:select')}
                    isMulti
                    options={setBrandOptions(brands)}
                  />
                  <FormikControl
                    control="textarea"
                    name={`requests.${index}.description`}
                    label={t('forms:description')}
                    type="text"
                  />
                  <button
                    type="button"
                    className="btn-cancel w-2 m-2"
                    onClick={() => remove(index)}
                  >
                    X
                  </button>
                </div>
              ))}

            <button
              type="button"
              className="btn-submit bg-green-700 my-4"
              onClick={() =>
                push({
                  brand: [],
                })
              }
            >
              {t('forms:addAnother')}
            </button>
          </>
        )}
      </FieldArray>
    </div>
  )
}

export default Step2
