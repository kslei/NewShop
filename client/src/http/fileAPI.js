import { $authHost, $host } from './index';

export const createFile = async (file) => {
  const { data } = await $authHost.post('api/file', file)
  return data
}

export const fetchFile = async () => {
  const res = await $host.get('api/file', {responseType: 'blob'})
  return res
}