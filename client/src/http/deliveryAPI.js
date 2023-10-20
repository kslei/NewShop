import { $authHost } from './index';

export const createDelivery = async (name) => {
  const { data } = await $authHost.post('api/delivery',  name )
  return data
}

export const fetchDelivery = async (lng) => {
  try {
    const { data } = await $authHost.get('api/delivery', {
      params: {lng}
    })
    return data
  } catch (error) {
    return error.response
  }
}

export const removeDelivery = async (id) => {
  const {data} = await $authHost.delete('api/delivery', {params: id})
  return data
}