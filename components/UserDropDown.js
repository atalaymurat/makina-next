import Link from 'next/link'
import { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import UserAvatar from './UserAvatar'

const UserDropDown = ({ user, setIsOpen, isOpen, handleLogout }) => {
  const [isDropOpen, setIsDropOpen] = useState(false)
  const { t } = useTranslation()
  const handleClick = () => {
    setIsOpen(false)
    setIsDropOpen(!isDropOpen)
  }

  const handleEsc = (e) => {
    if (e.key === 'Esc' || e.key === 'Escape') {
      setIsDropOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEsc)

    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  })

  return (
    <div className="relative hidden sm:block">
      <button onClick={() => handleClick()}>
        <UserAvatar user={user} />
      </button>
      {isDropOpen && (
        <button
          className="fixed inset-0 w-full h-full bg-black opacity-50 cursor-default z-20"
          tabIndex="-1"
          onClick={() => setIsDropOpen(false)}
        ></button>
      )}
      {isDropOpen && (
        <div className="absolute right-0 w-40 py-2 mt-2 bg-white rounded-lg shadow-xl z-20">
          <Link href="/panel">
            <a
              className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              onClick={() => setIsDropOpen(false)}
            >
              {t('menu:myAccount')}
            </a>
          </Link>
          <Link href="/">
            <a
              className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              onClick={() => setIsDropOpen(false)}
            >
              {t('menu:support')}
            </a>
          </Link>

          <button
            className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-indigo-500 hover:text-white"
            onClick={() => handleLogout()}
          >
            {t('menu:logout')}
          </button>
        </div>
      )}
    </div>
  )
}

export default UserDropDown
