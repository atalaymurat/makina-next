import withSession from '../lib/session'
import Layout from '../components/Layout'
import Axios from 'axios'


const Panel = (props) => {
	const { name : { firstName,lastName }} = props.user
	return (
		<Layout title="Panel">
			<div className="flex flex-col w-full p-8">
				<h1 className="mx-auto my-8">Panel#SHOW</h1>
				<h2 className="text-4xl font-semibold">
					Hoşgeldin, {firstName} {lastName}
				</h2>
			</div>
		</Layout>
	)
}

export const getServerSideProps = withSession(async ({ req, res }) => {
	try {
		const sessionUser = req.session.get('user')
		if (!sessionUser) {
			res.statusCode = 401 //unauthorized
			res.redirect('/404')
			return { props: {} }
		}
		const apiRes = await Axios.get(`/api/user/${sessionUser._id}`, { headers: {cookie: req.headers.cookie }})
		const user = apiRes.data
		console.log('PANEL', user)

		return {
			props: { user },
		}
	} catch (err) {
		console.error('Error: Panel.js')
	}
})

export default Panel
