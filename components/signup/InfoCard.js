import React from 'react'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

const infoCard = (props) => {
  const { t } = useTranslation()
  return (
    <div className="p-4 py-6 text-white bg-gray-800 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
      <div className="my-3 text-4xl font-bold tracking-wider text-center">
        <Link href="/">
          <a>
            <span className="logo">{process.env.NEXT_PUBLIC_SITE_NAME}</span>
          </a>
        </Link>
      </div>
      <p className="w-full overflow-hidden mt-6 font-normal md:mt-0">
        {t('sign_up:description')}
      </p>
      <p className="flex flex-col items-center justify-center mt-10 text-center">
        <span>{t('sign_up:alreadyHaveAccount')}</span>
        <Link href="/login">
          <a
            href="#"
            className="py-2 px-4 border border-indigo-500 rounded mt-1 shadow  bg-gray-700 hover:bg-indigo-500 font-semibold focus:ring-0"
          >
            {t('sign_up:login')}
          </a>
        </Link>
      </p>
      <p className="mt-6 text-sm text-center">
        &bull;{' '}
        <Link href="/">
          <a className="underline">{t('sign_up:userAgrement')} </a>
        </Link>{' '}
        &bull;{' '}
        <Link href="/">
          <a className="underline">{t('sign_up:privacyPolicy')}</a>
        </Link>
        <br />
        &bull;{' '}
        <Link href="/">
          <a className="underline">{t('sign_up:cookies')}</a>
        </Link>
      </p>
    </div>
  )
}

infoCard.propTypes = {}

export default infoCard
