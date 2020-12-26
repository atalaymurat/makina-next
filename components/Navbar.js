import Link from 'next/link'
import { useState } from 'react'
import useUser from "../lib/useUser"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isLoading } = useUser()

  return (
    <header className="bg-gradient-to-r from-green-700 to-gray-900">
      <div className="flex items-center justify-start px-4 py-2">
        <div className="sm:hidden">
          <button
            type="button"
            className="block text-gray-300 hover:text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
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
        <div className="flex items-center ml-2">
          <img src="/siteLogo.svg" alt="Site Logo" className="h-7 w-7" />
          <Link href="/">
            <a className="logo text-3xl">{process.env.NEXT_PUBLIC_SITE_NAME}</a>
          </Link>
        </div>
      </div>
      <div
        className={
          isOpen
            ? 'block pb-4 px-2 sm:flex sm:justify-start'
            : 'hidden pb-4 px-2 sm:flex'
        }
      >
        <Link href="/">
          <a
            className="block mt-1 sm:mt-0 px-2 sm:ml-2 py-1 text-gray-300 font-semibold hover:bg-green-600 rounded "
            onClick={() => setIsOpen(false)}
          >
            Makina Sat
          </a>
        </Link>
        <Link href="/">
          <a
            className="block mt-1 sm:mt-0 px-2 py-1 text-gray-300 font-semibold hover:bg-green-600 rounded "
            onClick={() => setIsOpen(false)}
          >
            Makina Talep et
          </a>
        </Link>
        <Link href="/kayit">
          <a
            className="block mt-1 sm:mt-0 px-2 py-1 text-gray-300 font-semibold hover:bg-green-600 rounded "
            onClick={() => setIsOpen(false)}
          >
            Satıcı Hesabı Oluştur
          </a>
        </Link>
        <Link href="/panel">
          <a
            className="block mt-1 sm:mt-0 sm:mr-1 px-2 py-1 text-gray-300 font-semibold hover:bg-green-600 rounded"
            onClick={() => setIsOpen(false)}
          >
            { isLoading ? "spin" : user.firstName}
          </a>
        </Link>
        <Link href="/">
          <a
            className="block mt-1 sm:mt-0 sm:mr-1 px-2 py-1 text-gray-300 font-semibold hover:bg-green-600 rounded sm:ml-auto"
            onClick={() => setIsOpen(false)}
          >
            Giriş Yap
          </a>
        </Link>
        <Link href="/kayit">
          <a
            className="block mt-1 sm:mt-0 px-2 py-1 text-gray-300 font-extrabold hover:bg-green-600 hover:text-white sm:shadow-sm rounded sm:bg-white sm:text-green-900"
            onClick={() => setIsOpen(false)}
          >
            ÜYE OL
          </a>
        </Link>
      </div>
    </header>
  )
}

export default Navbar
