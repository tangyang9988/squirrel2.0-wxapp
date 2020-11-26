/*
import * as API from './'
*/
import request from '@/router/axios'

//环境监测
export const getAllSiteData = (platform) =>{
  return request({
    url: '/api/squirrel-airq/index/getTableData',
    method: 'get',
    headers: {
      platform:platform
    },
    params: {
    }
  });
}
//获取站点
export const getSites = (platform) =>{
  return request({
    url: '/api/squirrel-ficm/siteinfo/getSites',
    method: 'get',
    headers: {
      platform:platform
    },
    params: {
    }
  });
}
//站点空气质量环图 
export const cycleChart = (platform,siteInfoId) =>{
  return request({
    url: '/api/squirrel-airq/index/getDatesOfLevels',
    method: 'get',
    headers: {
      'platform': platform
    },
    params: {
      siteInfoId
    }
  });
}

//最新30日AQI
export const latestAQI = (platform,siteInfoId) =>{
  return request({
    url: '/api/squirrel-airq/index/getQualityData',
    method: 'get',
    headers: {
      'platform': platform
    },
    params: {
      siteInfoId
    }
  });
}

//实时数据接口
export const portDetail = (id,platform) =>{
  return request({
    url: '/api/squirrel-service/Index/getHourReportListByApp',
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
