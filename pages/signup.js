import { useState } from 'react'
import Layout from '../components/Layout'
import useTranslation from 'next-translate/useTranslation'
import Message from '../components/Message'
import SocialLogin from '../components/signup/SocialLogin'
import InfoCard from '../components/signup/InfoCard'
import SignupForm from '../components/signup/SignupForm'

const Signup = (props) => {
  const { t } = useTranslation()
  const [message, setMessage] = useState(null)

  return (
      <div className="flex min-h-screen items-center p-4 lg:justify-center">
        <div className="flex flex-col overflow-hidden bg-white shadow-lg rounded-md max md:flex-row md:flex-1 lg:max-w-screen-lg">
          <InfoCard />
          <div className="p-5 bg-white md:flex-1">
            {message && <Message data={message} />}

            <SignupForm setMessage={setMessage} />

            <div className="flex flex-col space-y-4">
              <span className="flex items-center justify-center space-x-2">
                <span className="h-px bg-gray-400 w-14"></span>
                <span className="font-normal text-gray-500">
                  {t('sign_up:otherAccounts')}
                </span>
                <span className="h-px bg-gray-400 w-14"></span>
              </span>

              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
  )
}

export default Signup
