import React from 'react'

function UserAvatar({ user }) {
  const getUserPhoto = (provider, user) => {
    if (!user.photos[0]) {
      switch (provider){
        case ('facebook') : return user.facebook.picture
        case ('linkedin') : return user.linkedin.picture
        default: return null
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
      <a className="relative z-10 text-white bg-indigo-900 rounded-full focus:outline-none font-semibold inline-flex items-center text-xs justify-center align-middle overflow-hidden">
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
      <a className="relative z-10 w-8 h-8 text-white bg-indigo-900 border-2 rounded-full focus:outline-none focus:border-white font-semibold inline-flex items-center text-xs justify-center align-middle">
        {userName[0].toUpperCase() + userLastName[0].toUpperCase()}
      </a>
    )
  } else {
    return null
  }
}

export default UserAvatar
