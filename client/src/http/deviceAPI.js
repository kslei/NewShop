import {$authHost, $host} from './index';

export const createType = async (type)=> {
  const {data} = await $authHost.post('api/type', type)
  return data
}

export const fetchTypes = async (lng) => {
  const { data } = await $host.get('api/type', {
    params: {lng}
  })
  return data
}

export const createBrand = async (brand) => {
  const { data } = await $authHost.post('api/brand', brand)
  return data
}

export const fetchBrands = async () => {
  const { data } = await $host.get('api/brand')
  return data
}

export const createDevice = async (device) => {
  const { data } = await $authHost.post('api/device', device)
  return data
}

export const createInfo = async (info) => {
  const {data} = await $authHost.post('api/device/info', info)
  return data
}

export const updateDevice = async(device) => {
  const { data } = await $authHost.put('api/device', device)
  return data
}

export const fetchDevices = async (typeId, brandId, page, limit, news, discount, lng) => {
  const { data } = await $host.get('api/device', {
    params: {
      typeId, brandId, page, limit, news, discount, lng
    }
  })
  return data
}

export const fetchOneDevice = async (id, lng) => {
  const { data } = await $host.get('api/device/' + id, {
    params: {
      lng
    }
  })
  return data
}

export const createRating = async (rate, userId, deviceId) => {
  try {
    const {data} = await $authHost.post('api/rating', {rate, userId, deviceId})
    return data
  } catch (error) {
    return error.response.data
  }
}

export const createFrame = async (frame) => {
  const {data} = await $authHost.post('api/frame', frame)
  return data
}

export const updateFrame = async (frame) => {
  const { data } = await $authHost.put('api/frame', frame)
  return data
}

export const createImage = async (image) => {
  const { data } = await $authHost.post('api/image', image)
  return data
}

export const updateImage = async (image) => {
  const { data } = await $authHost.put('api/image', image)
  return data
}

export const fetchInfo = async (deviceId) => {
  const {data} = await $host.get('api/info', {
    params: {
      deviceId
    }
  })
  return data
}