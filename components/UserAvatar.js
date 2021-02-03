import React from 'react'

function UserAvatar({ user }) {
  const userPhoto =
    (user.provider === 'local' && user.photos[0] && user.photos[0].value) ||
    (user.provider === 'facebook' && user.facebook.picture) ||
    (user.provider === 'linkedin' && user.linkedin.picture)

    const userName =
    (user.provider === 'local' && user.name.firstName) ||
    (user.provider === 'facebook' && user.facebook.name.givenName) ||
    (user.provider === 'linkedin' && user.linkedin.name.givenName)

    const userLastName =
    (user.provider === 'local' && user.name.lastName) ||
    (user.provider === 'facebook' && user.facebook.name.familyName) ||
    (user.provider === 'linkedin' && user.linkedin.name.familyName)

  if ( user && userPhoto) {
    return (
      <button className="relative z-10 text-white bg-indigo-900 focus:outline-none font-semibold inline-flex items-center text-xs justify-center align-middle overflow-hidden">
        <img src={userPhoto} alt="IMG" className="w-8 h-8 rounded-full object-cover" />
      </button>
    )
  }

  if (user && !userPhoto ) {
    return (
      <button className="relative z-10 w-8 h-8 text-white bg-indigo-900 border-2 rounded-full focus:outline-none focus:border-white font-semibold inline-flex items-center text-xs justify-center align-middle">
        {userName[0].toUpperCase() + userLastName[0].toUpperCase()}
      </button>
    )
  } else {
    return null
  }
}

export default UserAvatar
