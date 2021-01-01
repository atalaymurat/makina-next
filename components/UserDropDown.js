import Link from 'next/link'
import { useState, useEffect } from 'react'

const UserDropDown = ({ user, setIsOpen, isOpen, handleLogout }) => {
	const [isDropOpen, setIsDropOpen] = useState(false)
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
			<button
				className="relative z-10 block w-8 h-8 text-white bg-indigo-700 border-2 rounded-full focus:outline-none focus:border-white"
				onClick={() => handleClick()}
			>
				<span className="w-full h-full text-lg font-bold text-center align-baseline">{user.firstName[0].toUpperCase()} </span>
			</button>
			{isDropOpen && (
				<button
					className="fixed inset-0 w-full h-full bg-black opacity-50 cursor-default"
					tabIndex="-1"
					onClick={() => setIsDropOpen(false)}
				></button>
			)}
			{isDropOpen && (
				<div className="absolute right-0 w-40 py-2 mt-2 bg-white rounded-lg shadow-xl">
					<Link href="/panel">
						<a
							className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
							onClick={() => setIsDropOpen(false)}
						>
							Hesabım
						</a>
					</Link>
					<Link href="/">
						<a className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white" onClick={() => setIsDropOpen(false)}>
							Destek
						</a>
					</Link>
					<Link href="/goodby">
						<a
							className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
							onClick={() => handleLogout()}
						>
							Çıkış
						</a>
					</Link>
				</div>
			)}
		</div>
	)
}

export default UserDropDown
