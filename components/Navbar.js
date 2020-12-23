import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-green-700 via-green-900 to-gray-800">
      <div className="flex items-center justify-start px-1 py-2">
        <button
          type="button"
          className="block text-gray-300 hover:text-white focus:outline-none"
        >
          <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path
              fill-rule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            />
          </svg>
        </button>
        <div className="flex items-center ml-2">
          <img src="/siteLogo.svg" alt="Site Logo" className="h-6 w-6" />
          <Link href="/">
            <a className="text-2xl text-white mx-1">makinaTr</a>
          </Link>
        </div>
      </div>
      <div className="">
        <Link href="/kayit">
          <a className="block text-gray-300 font-semibold">Makina Sat</a>
        </Link>
        <Link href="/kayit">
          <a className="block text-gray-300 font-semibold">Makina Talep et</a>
        </Link>
        <Link href="/kayit">
          <a className="block text-gray-300 font-semibold">Satıcı Hesapları</a>
        </Link>
      </div>
    </header>
  )
}

export default Navbar
