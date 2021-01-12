import Link from 'next/link'
import { useState } from 'react'
import useUser from '../lib/useUser'
import axios from 'axios'
import { useRouter } from 'next/router'
import UserDropDown from './UserDropDown'
import useTranslation from 'next-translate/useTranslation'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, mutateUser } = useUser()
  const router = useRouter()
	const { t } = useTranslation()

	const sectors = ["sellMachine","wood", "metal", "medical", "automation" ]

  const handleLogout = async () => {
    setIsOpen(false)
    if (user) {
      try {
        const res = await axios.post('/api/auth/logout')
        // We are asking SWR to update its state
        if (res.data.success) {
          mutateUser()
          router.push('/logout')
          return
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  const checkActive = (link) => {
    if (router.pathname == link) {
      return true
    } else {
      return false
    }
  }

  return (
    <header className="border-b-2 border-white bg-gradient-to-r from-gray-800 to-gray-900">
      {/* FIRST ROW LOGO AND OTHER STUFF */}
      <div className="flex items-center justify-start px-4 py-2">
        {/* BURGER ICON */}
        <div className="sm:hidden">
          <button
            type="button"
            className="block text-gray-300 hover:text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>

        {/*SITE LOGO */}
        <div className="flex items-center">
          <Link href="/">
            <a>
              <img src="/siteLogo.svg" alt="Site Logo" className="h-6 w-6" />
            </a>
          </Link>
          <Link href="/">
            <a className="text-2xl logo">{process.env.NEXT_PUBLIC_SITE_NAME}</a>
          </Link>
        </div>
        {/* LANGUAGE SWITCHER COMPONENT */}
        <div className="ml-auto">
          <ul className="flex items-center">
            {router.locales.map((lang) => (
              <li
                className={`px-1 text-xs font-semibold uppercase ${
                  router.locale == lang ? 'text-white' : 'text-gray-400'
                }`}
                key={lang}
              >
                <Link href={router.asPath} locale={lang}>
                  <a>{lang === 'en-US' ? 'en' : lang} |</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*NAVBAR 2nd ROW LINKS */}
      <nav
        className={
          isOpen
            ? 'block pb-4 sm:pb-2 sm:flex sm:justify-start sm:ml-2'
            : 'hidden pb-2 px-2 sm:flex'
        }
      >
        {/* NAV MENU LINKS */}
        {sectors.map((sec) => (
          <Link href="/">
            <a
              className="block px-4 py-1 mt-1 font-semibold text-gray-300 sm:px-2 sm:mt-0 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {t(`menu:${sec}`)}
            </a>
          </Link>
        ))}




        {/* LINK TO LOGIN */}
        {!user && (
          <Link href="/login">
            <a
              className={`block px-4 sm:px-2 py-1 mt-1 font-semibold text-gray-300 sm:mt-0 sm:mr-1 hover:text-white sm:ml-auto ${
                checkActive('/login') && 'sm:border-b-2 sm:border-indigo-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-stretch">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  className="w-5 h-5 mr-2 fill-current sm:hidden to-gray-300"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clipRule="evenodd"
                  />
                </svg>
                {t('menu:login')}
              </div>
            </a>
          </Link>
        )}

        {!user && (
          <>
            {/* BURGER MENU LINK SIGNUP */}
            <Link href="/signup" className="block sm:hidden">
              <a
                className="block px-4 py-1 mt-1 font-semibold text-gray-300 sm:hidden hover:bg-gray-700 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-stretch">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="w-5 h-5 mr-2 text-gray-300 fill-current"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{t('menu:signUp')}</span>
                </div>
              </a>
            </Link>

            {/* WIDE SCREEN LINK SIGNUP */}
            <Link href="/signup" className="hidden sm:block">
              <a
                className={`hidden px-2 py-1 mr-2 ml-1 font-semibold text-gray-800 bg-white rounded sm:block hover:bg-gray-700 hover:text-white ${
                  checkActive('/signup') && 'border-b-2 border-indigo-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t('menu:signUp')}
              </a>
            </Link>
          </>
        )}

        {/* USER DROPDOWN WİDGET */}
        {user && (
          <div className="ml-auto mr-2">
            <UserDropDown
              user={user}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              handleLogout={handleLogout}
            />
          </div>
        )}
        {/* USER BURGER MENU DISPLAY */}
        {user && (
          <div className="block sm:hidden">
            <div className="flex items-center px-4 py-2 font-semibold text-gray-400">
              <div className="w-8 h-8 mr-3 text-center text-white bg-indigo-700 border-2 rounded-full">
                <span className="w-full h-full text-lg font-bold">
                  {user.firstName[0].toUpperCase()}
                </span>
              </div>
              <span className="tracking-wide uppercase truncate">
                {user.firstName}
              </span>
            </div>
            <div className="border-t border-gray-600">
              <Link href="/panel">
                <a
                  className="block px-4 py-1 text-gray-300 hover:bg-gray-700 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {t('menu:myAccount')}
                </a>
              </Link>
              <Link href="/">
                <a
                  className="block px-4 py-1 text-gray-300 hover:bg-gray-700 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {t('menu:support')}
                </a>
              </Link>
              <a
                className="block px-4 py-1 text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => handleLogout()}
              >
                {t('menu:logout')}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
