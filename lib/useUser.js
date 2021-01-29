import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const useUser = (data) => {
  const { data: user, mutate: mutateUser } = useSWR('/api/auth/user', {
    initialData: data,
  })
  const Router = useRouter()

  useEffect(() => {
    if (!user) {
      return
    }
  }, [user])

  return { user, mutateUser }
}

export default useUser
