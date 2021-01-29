import React from 'react'
import { formingDateShort } from '../../lib/helpers'
import BadgeBlock from './BadgeBlock'

const getNameByProvider = (provider, user) => {
  if (provider === "facebook")  return user.facebook.name.givenName
  if ( provider === 'linkedin') return user.linkedin.name.givenName
  if (provider === 'local') return user.name.firstName
}
const getMiddleNameByProvider = (provider, user) => {
  if (provider === "facebook")  return null
  if ( provider === 'linkedin') return null
  if (provider === 'local') return user.name.middleName
}
const getLastNameByProvider = (provider, user) => {
  if (provider === "facebook")  return user.facebook.name.familyName
  if ( provider === 'linkedin') return user.linkedin.name.familyName
  if (provider === 'local') return user.name.lastName
}
const getUserPhoto = ( provider, user) => {
  if (provider === 'facebook') return user.facebook.picture
  if (provider === 'linkedin') return user.linkedin.picture
  if (provider === 'local') return user.photos[0]
}
const getUserEmail = ( provider, user) => {
  if (provider === 'facebook') return user.facebook.email
  if (provider === 'linkedin') return user.linkedin.email
  if (provider === 'local') return user.local.email
}


const Profile = ({ user }) => {
  return (
    <div className="my-1 w-full max-w-lg border border-gray-400 flex mx-auto rounded px-4 py-2">
      <div className="relative w-44 h-36">
        { getUserPhoto(user.provider, user) ? (
          <img
            className="object-cover w-full h-full rounded-xl"
            src={getUserPhoto(user.provider, user)}
            alt="user"
          />
        ) : (
          <div className="h-full w-full bg-indigo-600 rounded-xl border border-white flex items-center justify-center align-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-20 h-20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
          </div>
        )}
        <a className="bg-gray-800 w-full py-1 bg-opacity-60 text-center absolute bottom-0 inset-x-0 rounded-b-xl cursor-pointer text-sm hover:bg-opacity-80">
          edit
        </a>
      </div>
      <div className="w-full px-4 flex flex-col">
        <div className="text-xl font-semibold">

          {getNameByProvider(user.provider, user)} {getMiddleNameByProvider(user.provider, user)} {getLastNameByProvider(user.provider, user)}
          <span className="text-xs float-right">by {user.provider}</span>
        </div>
        <div className="text-sm">{getUserEmail(user.provider, user)}</div>
        <div className="text-xs font-normal text-gray-500 mb-2">
          since {formingDateShort(user.created_at)}
        </div>

        {/* BADGE BLOCK */}
        <BadgeBlock user={user} />

        {/* USER TYPE  and UPGRADE */}
        <div className="text-xs inline-flex justify-between">
          <div className="p-1 text-center mr-1 w-1/2 rounded border border-gray-700 text-gray-400">
            {user.accountType}
          </div>
          {user.accountType === 'user' && (
            <button className="w-1/2 ml-1 border border-gray-400 shadow font-semibold rounded p-1 hover:bg-gray-800">
              Upgrade
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
