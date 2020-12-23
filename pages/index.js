import Layout from '../components/Layout'
import axios from 'axios'

axios.defaults.baseURL = process.env.API_BASE_URL

const Index = (props) => {
	return (
		<Layout>
				{props.data.success ? <p className="text-red-500">api test [{props.data.message}]</p> : <p className="text-danger">Api Test [FAIL]</p>}
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
