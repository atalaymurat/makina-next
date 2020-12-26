import Navbar from './Navbar'
import Head from 'next/head'

const Layout = (props) => (
  <>
    <Head>
      <title>
        {(props.title &&
          `${props.title} -- ${process.env.NEXT_PUBLIC_SITE_NAME}`) ||
          process.env.NEXT_PUBLIC_SITE_TITLE}
      </title>
      <meta
        name="title"
        content={
          (props.title &&
            `${props.title} -- ${process.env.NEXT_PUBLIC_SITE_NAME}`) ||
          process.env.NEXT_PUBLIC_SITE_TITLE
        }
      />
      <meta
        name="description"
        content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_API_BASE_URL} />
      <meta
        property="og:title"
        content={
          (props.title &&
            `${props.title} -- ${process.env.NEXT_PUBLIC_SITE_NAME}`) ||
          process.env.NEXT_PUBLIC_SITE_TITLE
        }
      />
      <meta
        property="og:description"
        content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
      />
      <meta
        property="og:image"
        content={process.env.NEXT_PUBLIC_API_BASE_URL + '/siteLogo.svg'}
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content={process.env.NEXT_PUBLIC_API_BASE_URL}
      />
      <meta
        property="twitter:title"
        content={
          (props.title &&
            `${props.title} -- ${process.env.NEXT_PUBLIC_SITE_NAME}`) ||
          process.env.NEXT_PUBLIC_SITE_TITLE
        }
      />
      <meta
        property="twitter:description"
        content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
      />
      <meta
        property="twitter:image"
        content={process.env.NEXT_PUBLIC_API_BASE_URL + '/siteLogo.svg'}
      />
    </Head>
    <header>
      <Navbar />
    </header>
    <div className="main-content">{props.children}</div>
    <div className="footer-content w-full">
      <div className="h-20 bg-gray-700 text-white font-semibold">
      <div className="mx-auto w-44 text-2xl text-center">{process.env.NEXT_PUBLIC_SITE_NAME}</div>
      </div>
    </div>
  </>
)

export default Layout
