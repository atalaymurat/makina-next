import Navbar from './Navbar'
import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'

const Layout = (props) => {
  const Router = useRouter()
  const path = Router.pathname
  const { t } = useTranslation('meta')
  const { title, noindex } = props
  return (
    <>
      <Head>
        <title>
          {(title && `${title} -- ${process.env.NEXT_PUBLIC_SITE_NAME}`) ||
            t('site_title', { site_name: process.env.NEXT_PUBLIC_SITE_NAME })}
        </title>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL + '/'} />
        <meta charSet="utf-8" />
        {noindex && <meta name="robots" content="noindex nofollow" />}
        <meta
          name="title"
          content={
            (title && `${title} -- ${process.env.NEXT_PUBLIC_SITE_NAME}`) ||
            t('site_title', { site_name: process.env.NEXT_PUBLIC_SITE_NAME })
          }
        />
        <meta
          name="description"
          content={t('site_description', {
            site_name: process.env.NEXT_PUBLIC_SITE_NAME,
          })}
        />

        {/* OPEN GRAPH */}
        <meta
          property="og:site_name"
          content={process.env.NEXT_PUBLIC_SITE_NAME}
        />
        <meta
          property="og:locale"
          content={Router.locale === 'en' ? 'en_us' : 'tr_tr'}
        />
        <meta property="og:type" content={'website'} />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}${
            Router.locale === 'en' ? '/en' : ''
          }${path}`}
        />
        <meta
          property="og:title"
          content={
            (title && `${title} -- ${process.env.NEXT_PUBLIC_SITE_NAME}`) ||
            t('site_title', { site_name: process.env.NEXT_PUBLIC_SITE_NAME })
          }
        />
        <meta
          property="og:description"
          content={t('site_description', {
            site_name: process.env.NEXT_PUBLIC_SITE_NAME,
          })}
        />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_API_BASE_URL + '/siteLogo.svg'}
        />
      </Head>
      <Navbar />
      <div className="main-content">{props.children}</div>
      <div className="relative z-10 w-full footer-content">
        <div className="h-20 font-semibold text-black bg-transparent border-t-2 border-black">
          <div className="mx-auto my-4 text-2xl text-center w-44">
            {process.env.NEXT_PUBLIC_SITE_NAME}
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
