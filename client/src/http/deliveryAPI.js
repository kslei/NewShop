import { $authHost } from './index';

export const createDelivery = async (name) => {
  const { data } = await $authHost.post('api/delivery',  name )
  return data
}

export const fetchDelivery = async () => {
  try {
    const { data } = await $authHost.get('api/delivery')
    return data
  } catch (error) {
    return error.response
  }
}

/* export const putBasket = async (id, status, date) => {
  const { data } = await $authHost.put('api/order', { id, status, date })
  return data
} */

export const removeBasket = async (id) => {
  const { data } = await $authHost.delete('api/delivery', {
    params: {
      id: id,
    }
  })
  return data
}