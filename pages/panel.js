import { useState } from 'react'
import withSession from '../lib/session'
import Layout from '../components/Layout'
import Axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import Profile from '../components/panel/Profile'
import ConnectedAccounts from '../components/panel/ConnectedAccounts'
import UserData from '../components/panel/UserData'

import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { TextInput } from '../lib/formikInputs'
import CircleSpin from '../components/CircleSpin'

const NameForm = ({ user }) => {
  const { t } = useTranslation()
  return (
    <div>
      <Formik
        initialValues={{
          firstName: user.name.firstName || '',
          middleName: user.name.middleName || '',
          lastName: user.name.lastName || '',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, t('forms:maxChar', { num: 15 }))
            .min(2, t('forms:minChar', { num: 2 }))
            .required(t('forms:required')),
          lastName: Yup.string()
            .max(20, t('forms:maxChar', { num: 20 }))
            .required(t('forms:required')),
          middleName: Yup.string().max(20, t('forms:maxChar', { num: 20 })),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            alert(JSON.stringify(values))
          } catch (err) {
            console.error(err)
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
              <TextInput
                name="firstName"
                type="text"
                id="firstName"
                label="Name"
              />
              <TextInput
                name="middleName"
                type="text"
                id="middleName"
                label="Middle Name"
              />
            <TextInput
              name="lastName"
              type="text"
              id="lastName"
              label={t('form:surname')}
            />
            <div className="py-2 mt-2">
              <button
                type="submit"
                disabled={isSubmitting ? true : false}
                className="w-full px-4 py-2 text-lg font-semibold text-white bg-gray-700 shadow transition-colors duration-300 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-blue-200 focus:ring-4 inline-flex items-center justify-center"
              >
                {isSubmitting && <CircleSpin />}
                {t('form:save')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

const ModalBlock = ({ modal, togleModal, user }) => {
  return (
    <div>
      <div
        className="fixed top-0 left-0 w-screen h-full max-h-full bg-black bg-opacity-60"
        onClick={() => togleModal(false)}
      >
        {JSON.stringify(modal)}
      </div>
      <div className="fixed z-10 inset-0 mx-auto my-auto flex flex-col max-w-xl w-10/12 h-3/5 bg-gray-200 border-2 border-gray-700 rounded-b-xl text-gray-700 overflow-x-hidden">
        <div className="flex justify-between">
          <div></div>
          <a
            className="p-4 hover:bg-black hover:bg-opacity-25 cursor-pointer"
            onClick={() => togleModal(false)}
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
          </a>
        </div>
        <div className="px-4 py-4">
          <NameForm user={user} />
        </div>
      </div>
    </div>
  )
}

const Panel = (props) => {
  const [modal, setModal] = useState(false)

  const togleModal = (val) => {
    setModal(val)
  }
  const {
    accountType,
    created_at,
    locale,
    name: { firstName, lastName },
    local: { email },
  } = props.user
  return (
    <Layout title="Panel">
      {modal && (
        <ModalBlock modal={modal} togleModal={togleModal} user={props.user} />
      )}
      <div className="flex flex-col container mx-auto">
        <h1 className="mx-auto my-8">Panel#SHOW</h1>
        <Profile user={props.user} />
        <ConnectedAccounts user={props.user} />
        <UserData user={props.user} togleModal={togleModal} modal={modal} />
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSession(async ({ req, res }) => {
  try {
    const sessionUser = req.session.get('user')
    if (!sessionUser) {
      res.statusCode = 401 //unauthorized
      res.redirect('/404')
      return { props: {} }
    }
    const apiRes = await Axios.get(`/api/user/${sessionUser._id}`, {
      headers: { cookie: req.headers.cookie },
    })
    const user = apiRes.data
    console.log('PANEL', user)

    return {
      props: { user },
    }
  } catch (err) {
    console.error('Error: Panel.js')
  }
})

export default Panel
