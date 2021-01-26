import React from 'react'
import { formingDateShort } from '../../lib/helpers'

const Profile = ({ user }) => {
  return (
    <div className="border border-gray-400 flex mx-auto rounded px-4 py-2">
      <div className="relative w-44 h-36">
        {user.photo ? (
          <img
            className="object-cover w-full h-full rounded-xl"
            src={user.photo}
            alt="user"
          />
        ) : (
          <div className="h-full w-full bg-indigo-600 rounded-xl border border-white flex items-center justify-center align-middle">
            <span className=" text-2xl">MA</span>
          </div>
        )}
        <button className="bg-gray-800 py-1 bg-opacity-60 text-center absolute bottom-0 inset-x-0 rounded-b-xl cursor-pointer text-sm hover:bg-opacity-80">
          edit
        </button>
      </div>
      <div className="w-full px-4 flex flex-col">
        <div className="text-xl font-semibold">
          {user.name.firstName} {user.name.lastName}
        </div>
        <div className="text-sm">{user.email}</div>
        <div className="text-xs text-gray-500">
          since {formingDateShort(user.created_at)}
        </div>
        {/* BADGE BLOCK */}
        <div className="flex flex-row my-2 items-center justify-between">
          <div>
            <div className="border flex flex-col mx-auto border-purple-800 rounded">
              <div
                className="text-center font-bold px-2 w-14 bg-purple-700 text-xs"
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 mx-auto"

                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
              </div>
              <span className="font-bold text-purple-600 mx-auto">12</span>
            </div>
          </div>

          <div className="">
            <div className="border flex flex-col border-yellow-800 rounded">
              <span className="text-center font-bold px-2 w-14 bg-yellow-700 text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </span>
              <span className="font-bold mx-auto text-yellow-600">76</span>
            </div>
          </div>

          <div className="">
            <div className="border flex flex-col border-lime-700 rounded">
              <div className="px-2 w-14 bg-lime-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <span className="font-bold mx-auto text-lime-500">104</span>
            </div>
          </div>
        </div>

        {/* USER TYPE */}
        <div className="text-xs inline-flex justify-between">
          <div className="p-1 rounded border border-gray-700 text-gray-400">{user.accountType}</div>
          <button className="border border-gray-400 shadow font-semibold rounded p-1 hover:bg-gray-800">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
