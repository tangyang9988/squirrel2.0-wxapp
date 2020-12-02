/*
import * as API from './'
*/
import request from '@/router/axios'

//获取柱状图数据
export const getData = (platform) =>{
  return request({
    url: '/api/squirrel-ficm/deptinfo/getDeptNum',
    method: 'get',
    headers: {
      platform:platform
    },
    params: {
    }
  });
}
export const getAbnormalCount = (platform) =>{
  return request({
    url: '/api/squirrel-service/abnormalinfo/getAbnormalCount',
    method: 'get',
    headers: {
      platform:platform
    },
    params: {
    }
  });
}


 


