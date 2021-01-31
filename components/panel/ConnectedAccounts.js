import React from 'react'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'

const ConnectedAccounts = ({ user }) => {
  const { t } = useTranslation()
  if ((user.linkedin.id) || (user.facebook.id)) {
    return (
      <div className="my-1 w-full max-w-lg border border-gray-400 mx-auto rounded px-4 pt-2 pb-4">
        <h1 className="block text-xl mb-2 font-semibold border-b border-gray-600">
          {t("panel:connectedAccounts")}
        </h1>
        {user.local.email && (
          <div className="flex flex-row justify-between items-center border-b py-2 px-1 border-gray-700">
            <Image src="/siteLogo.svg" alt="Site Logo" width="48" height="48" />
            <div className="px-4 flex-grow">
              <div className="block text-md font-semibold">{process.env.NEXT_PUBLIC_SITE_NAME}</div>
              <div className="block text-sm">
                {user.name.firstName}
                {user.name.middleName && ` ${user.name.middleName}`}{' '}
                {user.name.lastName}
              </div>
            </div>
            <div className="w-2/12 font-bold">
              {user.provider === 'local' && t("panel:login")}
            </div>
          </div>
        )}
        {user.linkedin.id && (
          <div className="flex flex-row justify-between items-center border-b py-2 px-1 border-gray-700">
            <svg className="w-12 h-12" viewBox="0 0 24 24">
              <path
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                fill="#0a66c2"
              />
            </svg>
            <div className="px-4 flex-grow">
              <div className="block text-md font-semibold">LinkedIn</div>
              <div className="block text-sm">
                {user.linkedin.name.givenName} {user.linkedin.name.familyName}
              </div>
            </div>
            <div className="w-2/12 font-bold">
              {user.provider === 'linkedin' && t("panel:login")}
            </div>
          </div>
        )}
        { user.facebook.id && (
          <div className="flex flex-row justify-between items-center border-b py-2 px-1 border-gray-700">
            <svg className="w-12 h-12" viewBox="0 0 50 50">
              <path
                d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z"
                fill="#4267B2"
              ></path>
            </svg>
            <div className="px-4 flex-grow">
              <div className="block text-md font-semibold">facebook</div>
              <div className="block text-sm">
                {user.facebook.name.givenName} {user.facebook.name.familyName}
              </div>
            </div>
            <div className="w-2/12 font-bold">
              {user.provider === 'facebook' && t("panel:login")}
            </div>
          </div>
        )}
      </div>
    )
  } else return null
}

export default ConnectedAccounts
