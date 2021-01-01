import Link from 'next/link'
import { useState } from 'react'
import useUser from '../lib/useUser'
import axios from 'axios'
import { useRouter } from 'next/router'
import UserDropDown from './UserDropDown'

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
				<div className="flex items-center ml-2">
					<img src="/siteLogo.svg" alt="Site Logo" className="h-7 w-7" />
					<Link href="/">
						<a className="text-3xl logo">{process.env.NEXT_PUBLIC_SITE_NAME}</a>
					</Link>
				</div>
			</div>

			{/*NAVBAR 2nd ROW LINKS */}
			<nav className={isOpen ? 'block pb-4 sm:flex sm:justify-start' : 'hidden pb-4 px-2 sm:flex'}>
				{/* NAV MENU LINKS */}
				<Link href="/">
					<a
						className="block px-4 py-1 mt-1 font-semibold text-gray-300 sm:px-2 sm:mt-0 sm:ml-2 hover:bg-gray-700 hover:text-white "
						onClick={() => setIsOpen(false)}
					>
						Makina Sat
					</a>
				</Link>

				<Link href="/">
					<a
						className="block px-4 py-1 mt-1 font-semibold text-gray-300 sm:px-2 sm:mt-0 hover:bg-gray-700 hover:text-white "
						onClick={() => setIsOpen(false)}
					>
						Makinalar
					</a>
				</Link>

				<Link href="/">
					<a
						className="block px-4 py-1 mt-1 font-semibold text-gray-300 sm:px-2 sm:mt-0 hover:bg-gray-700 hover:text-white "
						onClick={() => setIsOpen(false)}
					>
						Hizmetler
					</a>
				</Link>

				{/* LINK TO LOGIN */}
				{!user && (
					<Link href="/">
						<a
							className="block px-4 py-1 mt-1 font-semibold text-gray-300 rounded sm:mt-0 sm:mr-1 hover:bg-white hover:text-gray-800 sm:ml-auto"
							onClick={() => setIsOpen(false)}
						>
							Giriş Yap
						</a>
					</Link>
				)}

				{!user && (
					<>
						{/* BURGER MENU LINK SIGNUP */}
						<Link href="/kayit" className="block sm:hidden">
							<a
								className="block px-4 py-1 mt-1 font-semibold text-gray-300 rounded sm:hidden hover:bg-white hover:text-gray-800"
								onClick={() => setIsOpen(false)}
							>
								ÜYE OL
							</a>
						</Link>

						{/* WIDE SCREEN LINK SIGNUP */}
						<Link href="/kayit" className="hidden sm:block">
							<a
								className="hidden px-2 py-1 mr-2 font-semibold text-gray-800 bg-white rounded sm:block hover:bg-gray-700 hover:text-white"
								onClick={() => setIsOpen(false)}
							>
								ÜYE OL
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
							<span>{user.firstName}</span>
						</div>
						<div className="border-t border-gray-600">
							<Link href="/panel">
								<a
									className="block px-4 py-1 text-gray-300 hover:bg-gray-700 hover:text-white"
									onClick={() => setIsOpen(false)}
								>
									Hesabım
								</a>
							</Link>
							<Link href="/">
								<a
									className="block px-4 py-1 text-gray-300 hover:bg-gray-700 hover:text-white"
									onClick={() => setIsOpen(false)}
								>
									Destek
								</a>
							</Link>
							<Link href="/goodby">
								<a
									className="block px-4 py-1 text-gray-300 hover:bg-gray-700 hover:text-white"
									onClick={() => handleLogout()}
								>
									Çıkış
								</a>
							</Link>
						</div>
					</div>
				)}
			</nav>
		</header>
	)
}

export default Navbar
