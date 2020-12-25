import Navbar from './Navbar'
import Head from 'next/head'

const Layout = (props) => (
  <div className="h-full">
    <Head>
      <title>
        {props.title && `${props.title} -- ${process.env.NEXT_PUBLIC_SITE_NAME}` ||
          process.env.NEXT_PUBLIC_SITE_TITLE}
      </title>
      <meta
        name="title"
        content={
          props.title && `${props.title} -- ${process.env.NEXT_PUBLIC_SITE_NAME}` ||
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
          props.title && `${props.title} -- ${process.env.NEXT_PUBLIC_SITE_NAME}` ||
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
          props.title && `${props.title} -- ${process.env.NEXT_PUBLIC_SITE_NAME}` ||
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
    <Navbar />
    <div className="h-full bg-gray-200">{props.children}</div>
  </div>
)

export default Layout
