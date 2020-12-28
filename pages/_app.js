import '../styles/globals.css'
import { SWRConfig } from 'swr'
import axios from 'axios'

axios.defaults.baseURL = process.env.API_BASE_URL

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
	return (
		<SWRConfig
			value={{
				fetcher: (url) => axios(url).then((res) => res.data),
				onError: (err) => console.error(err),
			}}
		>
				<Component {...pageProps} />
		</SWRConfig>
	)
}
