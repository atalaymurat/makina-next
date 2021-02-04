import Layout from '../components/Layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

const Index = (props) => {
	const Router = useRouter()
	const { t } = useTranslation()

	return (
		<Layout>
			<div className="relative flex flex-col items-start w-full pt-12">
				<h1 className="w-full h-full max-w-5xl px-8 mx-auto text-5xl font-bold md:text-7xl lg:text-6xl ">
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-green-600">
						{t('index:greeting')}
					</span>
				</h1>
				<div className="p-4 mx-auto my-8 border border-gray-900 hover:border-gray-700">
					{props.data.success  ? (
						<p className="font-semibold text-center text-green-600"># API</p>
					) : (
						<p className="font-extrabold text-center text-red-800"># API</p>
					)}
				</div>
			</div>
		</Layout>
	)
}

export async function getServerSideProps() {
	const res = await axios.get(`/api/test`)
	const res2 = await axios.get('/api/index')
	const data = res.data
	const data2 = res2.data

	if (!data) {
		return {
			notFound: true,
		}
	}

	return {
		props: { data: { ...data, ...data2 } },
	}
}

export default Index
