import Layout from '../components/Layout'
import useTranslation from 'next-translate/useTranslation'

const Logout = () => {
	const { t } = useTranslation()
	return (
		<Layout noindex={true}>
			<div className="flex flex-row items-center justify-center h-full w-full">
				<div className="text-6xl mt-12 mx-auto">{t("logout:message")}</div>
			</div>
		</Layout>
	)
}

export default Logout
