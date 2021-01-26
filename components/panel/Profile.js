import React from 'react'
import { formingDateShort } from '../../lib/helpers'

const Profile = ({ user }) => {
  return (
    <div className="border border-gray-400 flex mx-auto rounded px-4 py-2">
      <div className="relative w-36 h-30">
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
        <div className="flex flex-row my-2 items-center justify-between">

          <div className="">
            <div className="border flex flex-col mx-auto border-purple-800 rounded">
              <span className="text-center font-bold px-2 w-14 bg-purple-700 text-xs">
                ilan
              </span>
              <span className="font-bold text-purple-600 mx-auto">12</span>
            </div>
          </div>

          <div className="">
            <div className="border flex flex-col border-yellow-800 rounded">
              <span className="text-center font-bold px-2 w-14 bg-yellow-700 text-xs">
                favori
              </span>
              <span className="font-bold mx-auto text-yellow-600">76</span>
            </div>
          </div>

          <div className="">
            <div className="border flex flex-col border-lime-700 rounded">
              <span className="text-center font-bold px-2 w-14 bg-lime-600 text-xs">
                görme
              </span>
              <span className="font-bold mx-auto text-lime-500">104</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
