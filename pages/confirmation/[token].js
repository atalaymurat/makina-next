import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import Layout from '../../components/Layout'
import Message from '../../components/Message'
import Axios from 'axios'
import useUser from '../../lib/useUser'
import Link from 'next/link'
import Redirecting from '../../components/Redirecting'

const ConfirmationLink = () => {
  const [confirm, setConfirm] = useState(false)
  const [message, setMessage] = useState(null)
  const router = useRouter()
  const { t } = useTranslation()
  const { token } = router.query
  const { user, mutateUser } = useUser()

  useEffect(() => {
    const submitToken = async () => {
      try {
        const values = { token }
        const res = await Axios.post('/api/auth/verify', values)
        res.data.success && setConfirm(true)
        mutateUser()
      } catch (err) {
        setMessage(err.response.data)
      }
    }
    //if there is no user we want to submit data and get the user
    if (!user) submitToken()
  }, [token])

  // Checking if there is a user its already confirmed
  // we dont want to go confirmation again
  useEffect(() => {
    if (user && !confirm) {
      router.push("/panel")
    }
  }, [user, confirm])

  if (user && !confirm && !message) {
    return <Redirecting />
  }

  if (confirm && user) {
    return (
      <Layout>
        <div className="bg-gradient-to-t from-black to-gray-700 text-gray-300 h-full flex flex-col">
          <div className="my-auto text-center">
            <h1 className="text-5xl font-semibold">
              {t('confirmation:confirmed')}
            </h1>
          </div>
          <div className="w-full inline-flex items-center justify-center pb-20">
            <button className="bg-indigo-700 focus:ring-0 font-semibold text-lg rounded px-4 py-2 hover:bg-white hover:text-indigo-700 mr-4">
              <Link href="/panel">{t('confirmation:goPanel')}</Link>
            </button>
            <button className="border border-indigo-400 text-indigo-300 focus:ring-0 text-lg rounded px-4 py-2 hover:bg-white hover:text-indigo-700">
              <Link href="/">{t('confirmation:goMain')}</Link>
            </button>
          </div>
        </div>
      </Layout>
    )
  } else {
    return (
      <div className="bg-gray-800 text-gray-100 h-full flex flex-col">
        <div className="my-auto mx-auto animate-pulse w-7/12">
          {message ? (
            <Message data={message} />
          ) : (
            <h1 className="text-5xl text-indigo-300 font-semibold">
              {t('confirmation:confirming')}
            </h1>
          )}
        </div>
      </div>
    )
  }
}

export default ConfirmationLink
