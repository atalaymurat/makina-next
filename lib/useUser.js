import { data } from 'autoprefixer'
import { useEffect } from 'react'
import useSWR from 'swr'

const useUser = () => {
  const { data, error } = useSWR('/api/auth/user')
  console.log("SWR WORKED USEUSER auth/user")
  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useUser
