import React from 'react'

function UserAvatar({ user }) {
  const getUserPhoto = (provider, user) => {
    if (!user.photos[0]) {
      switch (provider) {
        case 'facebook':
          return user.facebook.picture
        case 'linkedin':
          return user.linkedin.picture
        default:
          return null
      }
    } else {
      return user.photos[0].value
    }
  }

  const userName =
    (user.provider === 'local' && user.name.firstName) ||
    (user.provider === 'facebook' && user.facebook.name.givenName) ||
    (user.provider === 'linkedin' && user.linkedin.name.givenName)

  const userLastName =
    (user.provider === 'local' && user.name.lastName) ||
    (user.provider === 'facebook' && user.facebook.name.familyName) ||
    (user.provider === 'linkedin' && user.linkedin.name.familyName)

  if (user && getUserPhoto(user.provider, user)) {
    return (
      <a className="relative z-50 text-white bg-indigo-900 rounded-full focus:outline-none font-semibold inline-flex items-center text-xs justify-center align-middle overflow-hidden">
        <img
          src={getUserPhoto(user.provider, user)}
          alt="IMG"
          className="w-8 h-8 rounded-full object-cover"
        />
      </a>
    )
  }

  if (user && getUserPhoto(user.provider, user)) {
    return (
      <a className="relative z-50 w-8 h-8 text-white bg-indigo-900 border-2 rounded-full focus:outline-none focus:border-white font-semibold inline-flex items-center text-xs justify-center align-middle">
        {userName[0].toUpperCase() + userLastName[0].toUpperCase()}
      </a>
    )
  } else {
    return (
        <div className="relative z-50 bg-indigo-600 rounded-xl flex items-center justify-center align-middle focus:outline-none px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {userName}
        </div>
    )
  }
}

export default UserAvatar
