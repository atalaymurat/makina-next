import { useState, useEffect } from 'react'
import withSession from '../lib/session'
import Layout from '../components/Layout'
import Axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import Profile from '../components/panel/Profile'
import ConnectedAccounts from '../components/panel/ConnectedAccounts'
import UserData from '../components/panel/UserData'
import ModalBlock from '../components/panel/ModalBlock'
import useSWR from 'swr'

const Panel = ({ user }) => {
  const [modal, setModal] = useState(false)
  const { data, mutate } = useSWR(`/api/user/${user._id}`, { initialData: user })

  const togleModal = (val) => {
    setModal(val)
  }
  return (
    <Layout title="Panel">
      {modal && (
        <ModalBlock
          modal={modal}
          togleModal={togleModal}
          user={data}
          mutate={mutate}
        />
      )}
      <div className="flex flex-col container mx-auto">
        <h1 className="mx-auto my-8">Panel#SHOW</h1>
        <Profile user={data} />
        <ConnectedAccounts user={data} />
        <UserData user={data} togleModal={togleModal} modal={modal} />
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
