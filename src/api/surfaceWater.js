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
    url: '/api/squirrel-service/historyData/getHistoryDataByApp',
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
//水质环图
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

//小时数据接口
export const portDetail = (platform) =>{
  return request({
    url: '/api/squirrel-service/Index/getHourReportListByApp',
    method: 'get',
    headers: {
      'platform': platform
    },
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
export const getReportList = (platform,treeId,type,time) =>{
  return request({
    url: '/api/squirrel-service/statreport/getReportList',
    method: 'get',
    headers: {
      'platform': platform
    },
    params: {
      treeId,
      type,
      time,
    }
  });
}
//预警类型
export const getAlertTypeType = (platform,alertType) =>{
  return request({
    url: '/api/blade-system/dict/dictionary',
    method: 'get',
    headers: {
      'platform': platform
    },
    params: {
      code:alertType
    }
  });
}

//预警模糊搜索 /squirrel-service/historyData/getEntPointGroupInfoList
export const searchPoints = (platform,parm) =>{
  return request({
    url: '/api/squirrel-service/historyData/getEntPointGroupInfoList',
    method: 'get',
    headers: {
      'platform': platform
    },
    params: {
      param:parm
    }
  });
}

//预警处理提交
export const abnormalInfoSubmit = (platform,conclusion,ids) =>{

  return request({
    url: '/api/squirrel-service/abnormalinfo/submit',
    method: 'post',
    headers: {
      'platform': platform,
      'Content-Type':"application/json"
    },
    data:{
      conclusion: conclusion,
      ids: ids
    },

  });
}
