import { $authHost } from './index';

export const createOrder = async (deviceId, quantity, userId, date, deliveryId) => {
  const { data } = await $authHost.post('api/order', {deviceId, quantity, userId, date, deliveryId})
  return data
}

export const createMail = async(email, message) => {
  const { data } = await $authHost.post('api/mail', { email, message })
  return data
}

export const fetchBasket = async (status) => {
  try {
    const { data } = await $authHost.get('api/order', {
    params: {
      status: status,
    }
  })
  return data
  } catch (error) {
    return error.response
  }
}

export const putBasket = async (id, status, date, deliveryId) => {
  try {
    const { data } = await $authHost.put('api/order', {id, status, date, deliveryId})
    return data
  } catch (error) {
    return error.response
  }
}

export const removeBasket = async (userId, deviceId) => {
  const { data } = await $authHost.delete('api/order', {
    params: { 
      userId: userId,
      deviceId: deviceId,
    }
  })
  return data
}