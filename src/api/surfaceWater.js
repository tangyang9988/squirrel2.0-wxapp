/*
import * as API from './'
*/
import request from '@/router/axios'

export const getHistoryHeader = (treeIds,platform) =>{
  return request({
    url: '/api/squirrel-service/latestData/getHead',
    method: 'get',
    headers: {
      platform:platform
    },
    params: {
      treeIds,
    }
  });
}
export const getHistoryList = (treeId,platform,start,end,current,size) =>{
  return request({
    url: '/api/squirrel-service/historyData/getList',
    method: 'get',
    headers: {
      platform:platform
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
