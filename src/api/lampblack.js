/*
import * as API from './'
*/
import request from '@/router/axios'
//水质环图
export const cycleChart = (platform) =>{
  return request({
    url: '/api/squirrel-loam/Index/governanceRating',
    method: 'get',
    headers: {
      'platform': platform
    },
  });
}
//小时数据接口
export const portDetail = (platform) =>{
  return request({
    url: '/api/squirrel-loam/GIS/getDataByApp',
    method: 'get',
    headers: {
      'platform': platform
    },
  });
}
//历史数据接口
export const getHistoryList = (treeId,platform,start,end,current,size) =>{
  return request({
    url: '/api/squirrel-loam/historyData/getHistoryDataByApp',
    method: 'get',
    headers: {
      'platform': platform
    },
    params: {
      treeId,
      start,
      end,
      current,
      size
    }
  });
}

//预警管理
export const abnormalInfoSubmit = (treeId,platform,start,end,current,size) =>{
  return request({
    url: '/api/squirrel-loam/abnormalinfo/submit',
    method: 'get',
    headers: {
      'platform': platform
    },
    params: {
      treeId,
      start,
      end,
      current,
      size
    }
  });
}

