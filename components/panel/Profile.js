import React, { useState, useRef } from 'react'
import { formingDateShort } from '../../lib/helpers'
import BadgeBlock from './BadgeBlock'
import axios from 'axios'
import useUser from '../../lib/useUser'
import useTranslation from 'next-translate/useTranslation'

const getNameByProvider = (provider, user) => {
  if (provider === 'facebook') return user.facebook.name.givenName
  if (provider === 'linkedin') return user.linkedin.name.givenName
  if (provider === 'local') return user.name.firstName
}
const getMiddleNameByProvider = (provider, user) => {
  if (provider === 'facebook') return null
  if (provider === 'linkedin') return null
  if (provider === 'local') return user.name.middleName
}
const getLastNameByProvider = (provider, user) => {
  if (provider === 'facebook') return user.facebook.name.familyName
  if (provider === 'linkedin') return user.linkedin.name.familyName
  if (provider === 'local') return user.name.lastName
}
const getUserPhoto = (provider, user) => {
  if (provider === 'facebook') return user.facebook.picture
  if (provider === 'linkedin') return user.linkedin.picture
  if (provider === 'local') return user.photos[0] && user.photos[0].value
}
const getUserEmail = (provider, user) => {
  if (provider === 'facebook') return user.facebook.email
  if (provider === 'linkedin') return user.linkedin.email
  if (provider === 'local') return user.local.email
}

const Profile = ({ user }) => {
  const { t } = useTranslation()
  const [file, setFile] = useState('')
  const [filename, setFilename] = useState('')
  const [toggleModal, setTogglemodal] = useState(false)
  const fileInput = useRef(null)
  const { mutateUser } = useUser()

  const inputChange = async (e) => {
    setTogglemodal(true)
    let targetFile = e.target.files[0]
    targetFile = Object.assign(targetFile, {
      preview: URL.createObjectURL(targetFile),
    })
    setFile(targetFile)
    setFilename(targetFile.name)
  }

  const uploadFile = async (e) => {
    e.preventDefault()
    console.log('SUBMITTED', file)
    const formData = new FormData()
    formData.append('image', file, filename)
    try {
      const res = await axios.post('/api/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(res)
      if (res.data.success) {
        setTogglemodal(false)
        mutateUser()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {toggleModal && (
        <div className="fixed z-20 top-0 left-0 inset-0 flex justify-center">
          <div className="relative z-20 w-2/3 max-w-2xl h-64 bg-gray-200 opacity-100 mt-24 text-gray-600 rounded p-6 flex flex-wrap justify-around items-center space-x-2 space-y-2">
            <img
              src={file.preview}
              alt="preview"
              className="h-32 w-32 border border-gray-600 rounded object-scale-down"
            />
            {filename}
            <div className="flex items-center space-x-2">
              <button
                className="px-4 py-2 text-red-600 rounded shadow hover:bg-red-600 hover:text-white focus:outline-none"
                onClick={() => setTogglemodal(false)}
              >
                {t('forms:cancel')}
              </button>
              <button
                className="px-4 py-2 bg-gray-600 rounded shadow-lg focus:outline-none hover:bg-indigo-600 text-white font-bold"
                onClick={uploadFile}
              >
                {t('forms:save')}
              </button>
            </div>
          </div>
          <div
            className="absolute bg-black opacity-60 w-screen h-full"
            onClick={() => setTogglemodal(false)}
          ></div>
        </div>
      )}

      <div className="my-1 w-full max-w-lg border border-gray-400 flex mx-auto rounded px-4 py-2">
        <div className="relative w-44 h-36">
          {getUserPhoto(user.provider, user) ? (
            <img
              className="object-fill w-full h-full rounded-xl"
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
          {user.methods.includes('local') && (
            <>
              <button
                className="bg-gray-800 w-full py-1 bg-opacity-60 text-center absolute bottom-0 inset-x-0 rounded-b-xl cursor-pointer text-sm hover:bg-opacity-80 focus:outline-none"
                onClick={() => fileInput.current.click()}
              >
                {t('panel:edit')}
              </button>
              <input
                type="file"
                className="hidden"
                onChange={inputChange}
                ref={fileInput}
                accept="image/*"
              />
            </>
          )}
        </div>
        <div className="w-full px-4 flex flex-col">
          <div className="text-xl font-semibold">
            {getNameByProvider(user.provider, user)}{' '}
            {getMiddleNameByProvider(user.provider, user)}{' '}
            {getLastNameByProvider(user.provider, user)}
            <span className="text-xs float-right">{t(`panel:${user.provider}`)}</span>
          </div>
          <div className="text-sm">{getUserEmail(user.provider, user)}</div>
          <div className="text-xs font-normal text-gray-500 mb-2">
            {t('panel:since')} {formingDateShort(user.created_at)}
          </div>

          {/* BADGE BLOCK */}
          <BadgeBlock user={user} />

          {/* USER TYPE  and UPGRADE */}
          <div className="text-xs inline-flex justify-between">
            <div className="p-1 text-center mr-1 w-1/2 rounded border border-gray-700 text-gray-400">
              {t(`panel:${user.accountType}`)}
            </div>
            {user.accountType === 'user' && (
              <button className="w-1/2 ml-1 border border-gray-400 shadow font-semibold rounded p-1 hover:bg-gray-800">
                {t('panel:upgrade')}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
