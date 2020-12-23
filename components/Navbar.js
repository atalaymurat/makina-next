import Link from 'next/link'

const Navbar = () => {
	return (
		<>
			<div className="w-full bg-green-400 border">
				<div className="inline-block p-3 text-4xl font-thin text-white bg-green-600 hover:text-red-600">
					<Link href="/">
						<a>Makinatr</a>
					</Link>
				</div>
				<Link href="/kayit" className="ml-auto">
					<a>Üye OL</a>
				</Link>
			</div>
		</>
	)
}

export default Navbar
