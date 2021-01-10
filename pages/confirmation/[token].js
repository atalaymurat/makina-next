import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import Layout from '../../components/Layout'
import Error from '../../components/Error'
import Axios from 'axios'
import useUser from '../../lib/useUser'

const ConfirmationLink = () => {
  const [confirm, setConfirm] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { t } = useTranslation()
  const { token } = router.query
  const { mutateUser } = useUser()

  useEffect(() => {
    const submitToken = async () => {
      try {
        const values = { token }
        const res = await Axios.post('/api/auth/verify', values)
        res.data.success && setConfirm(true)
        mutateUser()
      } catch (err) {
        setError(err.response.data.message)
      }
    }
    submitToken()
    alert('Use Effect')
  }, [token])

  if (confirm) {
    return (
      <Layout>
        <div className="bg-gray-800 text-gray-300 h-full flex flex-col">
          <div className="my-auto mx-auto">
            <h1 className="text-5xl font-semibold">
              {t('confirmation:confirmed')}
            </h1>
          </div>
        </div>
      </Layout>
    )
  } else {
    return (
      <div className="bg-gray-800 text-gray-100 h-full flex flex-col">
        <div className="my-auto mx-auto animate-pulse w-7/12">
          {error ? (
            <Error error={error} />
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
