import { useMutation, useQuery } from '@tanstack/react-query'
import { getUser, login } from './api'

export const useLogin = (redirect) => {
  return useMutation({
    mutationFn: (payload) => login(payload),
    onSettled: (data) => {
      if (data) {
        localStorage.setItem('token', data.tokenA)
        localStorage.setItem('username', data.username)
        redirect('/')
      }
    }
  })
}

export const useGetMe = () => {
  return useQuery({
    queryKey: ['Service.useGetMe'],
    queryFn: getUser
  })
}