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