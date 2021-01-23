import React from 'react'

function UserAvatar({ user }) {
  if (user && user.picture) {
    return (
      <div className="relative z-10 w-8 h-8 text-white bg-indigo-900 border-2 rounded-full focus:outline-none focus:border-white font-semibold inline-flex items-center text-xs justify-center align-middle overflow-hidden">
        <img
          src={user.picture}
          alt="User Avatar Picture"
          width={28}
          height={28}
        />
      </div>
    )
  }

  if (user && !user.picture) {
    return (
      <div className="relative z-10 w-8 h-8 text-white bg-indigo-900 border-2 rounded-full focus:outline-none focus:border-white font-semibold inline-flex items-center text-xs justify-center align-middle">
        {user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}
      </div>
    )
  } else {
    return null
  }
}

export default UserAvatar
