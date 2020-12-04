/*
import * as API from './'
*/
import request from '@/router/axios'
//水质环图
export const cycleChart = (id,platform) =>{
  return request({
    url: '/api/squirrel-loam/Index/governanceRating',
    method: 'get',
    headers: {
      'platform': platform
    },
    params: {
      id
    }
  });
}
