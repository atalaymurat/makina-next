import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'


const Error = ({ error }) => {
  const router = useRouter()
  const { t } = useTranslation("forms")
  if (error) {
  return (
    <div role="alert" className="m-1">
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-1 text-sm">
        {t("error")}
      </div>
      <div className="border border-t-0 border-red-400 rounded-b text-lg bg-red-100 px-4 py-2 text-red-700">
        <p>{error[router.locale]}</p>
      </div>
    </div>
  )

  }
  else return null
}

export default Error
