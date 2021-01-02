import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const useUser = ({ redirectTo = false, redirectIfFound = false } = {}) => {
	const { data: user, mutate: mutateUser } = useSWR('/api/auth/user')
	const Router = useRouter()

	useEffect(() => {
		if (!redirectTo || !user) return

		if (
			// If redirectTo is set, redirect if the user was not found.
			(redirectTo &&
				!redirectIfFound &&
				!(user === null || user === void 0 ? void 0 : user.isLoggedIn)) ||
			// If redirectIfFound is also set, redirect if the user was found
			(redirectIfFound && (user === null || user === void 0 ? void 0 : user.isLoggedIn))
		) {
			Router.push(redirectTo)
		}
	}, [user])

	return { user, mutateUser }
}

export default useUser
