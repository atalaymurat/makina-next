import Layout from '../components/Layout'
import useTranslation from 'next-translate/useTranslation'

const Logout = () => {
	const { t } = useTranslation()
	return (
		<Layout noindex={true}>
			<div className="flex items-center justify-center h-full">
				<h1 className="text-gray-300 text-7xl mt-12">{t("logout:message")}</h1>
			</div>
		</Layout>
	)
}

export default Logout
