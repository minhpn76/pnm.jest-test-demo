import axios from "axios"

export const getUser = () => {
  return axios.get('/api/user').then(res=> res.data)
 }

export const login = (payload) => {
  return axios.post('/api/login', payload).then(res => res.data)
}