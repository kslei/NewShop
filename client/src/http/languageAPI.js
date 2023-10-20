import { $authHost, $host } from './index';

export const updateLocale = async (lng, key, value) => {
  const { data } = await $authHost.put('api/lng', {lng, key, value})
  return data
}

export const fetchLocale = async (lng, key) => {
  try {
    const { data } = await $host.get('api/lng', {
      params: {
        lng: lng,
        key: key
      }
    })
    return data
  } catch (error) {
    return error.response
  }
}
export const fetchOneLocale = async (lng, value) => {
  try {
    const {data} = await $host.get('api/lng', {
      params: {
        lng: lng,
        value: value
      }
    })
    return data
  } catch (error) {
    return error.response
  }
}