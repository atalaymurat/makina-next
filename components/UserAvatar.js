import React from 'react'

function UserAvatar({ user }) {
  const userPhoto =
    (user.provider === 'local' && user.photos[0]) ||
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
      <div className="relative z-10 w-8 h-8 text-white bg-indigo-900 border-2 rounded-full focus:outline-none focus:border-white font-semibold inline-flex items-center text-xs justify-center align-middle overflow-hidden">
        <img src={userPhoto} alt="IMG" width={28} height={28} />
      </div>
    )
  }

  if (user && !userPhoto ) {
    return (
      <div className="relative z-10 w-8 h-8 text-white bg-indigo-900 border-2 rounded-full focus:outline-none focus:border-white font-semibold inline-flex items-center text-xs justify-center align-middle">
        {userName[0].toUpperCase() + userLastName[0].toUpperCase()}
      </div>
    )
  } else {
    return null
  }
}

export default UserAvatar
