import Link from 'next/link'
import { useState } from 'react'
import useUser from '../lib/useUser'
import axios from 'axios'
import { useRouter } from 'next/router'

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const { user } = useUser()
	const router = useRouter()

	const handleLogout = async () => {
		setIsOpen(false)
		if (user) {
			await axios.post('/api/auth/logout')
			router.push('/goodby')
		}
	}

	return (
		<header className="border-b-2 border-white bg-gradient-to-r from-gray-800 to-gray-900">
			<div className="flex items-center justify-start px-4 py-2">
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
				<div className="flex items-center ml-2">
					<img src="/siteLogo.svg" alt="Site Logo" className="h-7 w-7" />
					<Link href="/">
						<a className="text-3xl logo">{process.env.NEXT_PUBLIC_SITE_NAME}</a>
					</Link>
				</div>
			</div>
			<div
				className={isOpen ? 'block pb-4 px-2 sm:flex sm:justify-start' : 'hidden pb-4 px-2 sm:flex'}
			>
				<Link href="/">
					<a
						className="block px-2 py-1 mt-1 font-semibold text-gray-300 rounded sm:mt-0 sm:ml-2 hover:bg-white hover:text-gray-800 "
						onClick={() => setIsOpen(false)}
					>
						Makina Sat
					</a>
				</Link>
				<Link href="/">
					<a
						className="block px-2 py-1 mt-1 font-semibold text-gray-300 rounded sm:mt-0 hover:bg-white hover:text-gray-800 "
						onClick={() => setIsOpen(false)}
					>
						Makinalar
					</a>
				</Link>
				<Link href="/">
					<a
						className="block px-2 py-1 mt-1 font-semibold text-gray-300 rounded sm:mt-0 hover:bg-white hover:text-gray-800 "
						onClick={() => setIsOpen(false)}
					>
						Hizmetler
					</a>
				</Link>

				{user ? (
					<Link href="/panel">
						<a
							className="block px-2 py-1 mt-1 font-semibold text-gray-300 rounded sm:mt-0 sm:mr-1 hover:bg-white hover:text-gray-800"
							onClick={() => setIsOpen(false)}
						>
							{user.firstName}
						</a>
					</Link>
				) : null}

				{!user && (
					<Link href="/">
						<a
							className="block px-2 py-1 mt-1 font-semibold text-gray-300 border border-gray-900 rounded sm:mt-0 sm:mr-1 hover:border-gray-50 hover:text-white sm:ml-auto"
							onClick={() => setIsOpen(false)}
						>
							Giriş Yap
						</a>
					</Link>
				)}

				{user && (
					<button
						className="block px-2 py-1 mt-1 font-semibold text-gray-300 border border-gray-900 rounded sm:mt-0 sm:mr-1 hover:border-gray-50 hover:text-white sm:ml-auto"
						onClick={() => handleLogout()}
					>
						Çıkış Yap
					</button>
				)}

				{!user && (
					<Link href="/kayit">
						<a
							className="block px-2 py-1 mt-1 font-extrabold text-gray-300 rounded sm:mt-0 hover:bg-gray-700 hover:text-white sm:bg-white sm:text-gray-800"
							onClick={() => setIsOpen(false)}
						>
							ÜYE OL
						</a>
					</Link>
				)}
			</div>
		</header>
	)
}

export default Navbar
