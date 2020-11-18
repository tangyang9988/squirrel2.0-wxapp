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
//水质环图  id3
export const cycleChart = (id,platform) =>{
  return request({
    url: '/api/squirrel-service/Index/getChartData',
    method: 'get',
    headers: {
      'platform': platform
    },
    params: {
      id
    }
  });
}

//卡片数据 id5
export const portDetail = (id,platform) =>{
  return request({
    url: '/api/squirrel-service/Index/getChartData',
    method: 'get',
    headers: {
      'platform': platform
    },
    params: {
      id
    }
  });
}

export const getWarnRecords = (platform,treeId,start,end,current,size) =>{
  return request({
    url: '/api/squirrel-service/abnormalinfo/getList',
    method: 'get',
    headers: {
      'platform': platform
    },
    params: {
      current,
      size,
      start,
      end,
      treeId
    }
  });
}