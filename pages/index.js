import Layout from '../components/Layout'
import LeadList from '../components/LeadList'
import axios from 'axios'

axios.defaults.baseURL = process.env.API_BASE_URL

const Index = (props) => {
	return (
		<Layout>
			<h1>Welcome to Index dev.makinatr this site under development</h1>
			<p>We develop nodejs and reacta apps for web interfaces</p>
			<div className="row">
				{props.data.success ? <p className="text-success">api test [{props.data.message}]</p> : <p className="text-danger">Api Test [FAIL]</p>}
		{process.env.SECRET}
		{process.env.NODE_ENV}
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
