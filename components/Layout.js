import Navbar from './Navbar'
import Head from 'next/head'

const Layout = (props) => {
	const { title, noindex } = props
	return (
		<>
			<Head>
				<title>
					{(title && `${title} -- ${process.env.NEXT_PUBLIC_SITE_NAME}`) ||
						process.env.NEXT_PUBLIC_SITE_TITLE}
				</title>
				<meta charSet="utf-8" />
				{noindex && <meta name="robots" content="noindex,nofollow" />}
				<meta
					name="title"
					content={
						(title && `${title} -- ${process.env.NEXT_PUBLIC_SITE_NAME}`) ||
						process.env.NEXT_PUBLIC_SITE_TITLE
					}
				/>
				<meta name="description" content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION} />

				<meta property="og:type" content="website" />
				<meta property="og:url" content={process.env.NEXT_PUBLIC_API_BASE_URL} />
				<meta
					property="og:title"
					content={
						(title && `${title} -- ${process.env.NEXT_PUBLIC_SITE_NAME}`) ||
						process.env.NEXT_PUBLIC_SITE_TITLE
					}
				/>
				<meta property="og:description" content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION} />
				<meta
					property="og:image"
					content={process.env.NEXT_PUBLIC_API_BASE_URL + '/siteLogo.svg'}
				/>

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content={process.env.NEXT_PUBLIC_API_BASE_URL} />
				<meta
					property="twitter:title"
					content={
						(title && `${title} -- ${process.env.NEXT_PUBLIC_SITE_NAME}`) ||
						process.env.NEXT_PUBLIC_SITE_TITLE
					}
				/>
				<meta property="twitter:description" content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION} />
				<meta
					property="twitter:image"
					content={process.env.NEXT_PUBLIC_API_BASE_URL + '/siteLogo.svg'}
				/>
			</Head>
			<header>
				<Navbar />
			</header>
			<div className="main-content">{props.children}</div>
			<div className="w-full footer-content">
				<div className="h-20 font-semibold text-white bg-gray-900 border-t-2 border-green-50">
					<div className="mx-auto my-4 text-2xl text-center w-44">
						{process.env.NEXT_PUBLIC_SITE_NAME}
					</div>
				</div>
			</div>
		</>
	)
}

export default Layout
