import { useState, useEffect } from 'react'
import withSession from '../lib/session'
import Layout from '../components/Layout'
import Axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import Profile from '../components/panel/Profile'
import ConnectedAccounts from '../components/panel/ConnectedAccounts'
import UserData from '../components/panel/UserData'
import ModalBlock from '../components/panel/ModalBlock'
import useUser from '../lib/useUser'

const Panel = (props) => {
  const [modal, setModal] = useState(false)
  const [form , setForm] = useState("")
  const { user , mutateUser } = useUser(props.user)

  const togleModal = (val) => {
    setModal(val)
  }

  if (user) {
  return (
    <Layout title="Panel">
      {modal && (
        <ModalBlock
          modal={modal}
          togleModal={togleModal}
          user={user}
          mutate={mutateUser}
          setForm={setForm}
          form={form}
        />
      )}
      <div className="flex flex-col container mx-auto">
        <h1 className="mx-auto my-8">Panel#SHOW</h1>
        <Profile user={user} />
        <ConnectedAccounts user={user} />
        <UserData user={user} togleModal={togleModal} modal={modal} setForm={setForm} />
      </div>
    </Layout>
  )
  } else {
    return (
      <Layout>
        <div>No user....</div>
      </Layout>
    )
  }
}

export const getServerSideProps = withSession(async ({ req, res }) => {
  try {
    const sessionUser = req.session.get('user')
    if (!sessionUser) {
      res.statusCode = 401 //unauthorized
      res.redirect('/404')
      return { props: {} }
    }


    const apiRes = await Axios.get(`/api/auth/user`, {
      headers: { cookie: req.headers.cookie },
    })
    console.log("PANEL API RES :: ", apiRes.data)

    const user = apiRes.data
    return {
      props: { user },
    }
  } catch (err) {
    console.error('Error: Panel.js', err)
    res.redirect('/404')
  }
})

export default Panel
