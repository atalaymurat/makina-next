import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'


const Message = ({ data, className }) => {
  const router = useRouter()
  const { t } = useTranslation("forms")
  if (data && !data.success) {
  return (
    <div role="alert" className="m-1">
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-1 text-sm">
        {t("error")}
      </div>
      <div className="border border-t-0 border-red-400 rounded-b text-lg bg-red-100 px-4 py-2 text-red-700">
        <p>{data.message[router.locale]}</p>
      </div>
    </div>
  )}

  if (data && data.success ) {
  return (
    <div role="alert" className="m-1">
      <div className="bg-green-500 text-white font-bold rounded-t px-4 py-1 text-sm">
        {t("success")}
      </div>
      <div className="border border-t-0 border-green-400 rounded-b text-lg bg-green-100 px-4 py-2 text-green-700">
        <p>{data.message[router.locale]}</p>



      </div>
    </div>
  )

  }
  else return null
}

export default Message
