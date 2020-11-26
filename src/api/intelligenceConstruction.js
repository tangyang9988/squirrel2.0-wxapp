//
import request from '@/router/axios'

export const getWeather = (platform) =>{
  return request({
    url: '/api/squirrel-service/Index/getWeather',
    method: 'get',
    headers: {
      platform:platform
    },
    params: {
    }
  });
}

export const presentData = (platform) =>{
  return request({
    url: '/api/squirrel-service/latestData/getListByApp',
    method: 'get',
    headers: {
      platform:platform
    },
    params: {
    }
  });
}