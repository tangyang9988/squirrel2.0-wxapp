import request from '@/router/axios'

//预警记录接口 /api/squirrel-dust/environmentmonitor/getDustDeviceData getAbnormalData
//水质环图 
export const cycleChart = () =>{
  return request({
    url: '/api/squirrel-service/Index/getChartData?id=3',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization':"Basic c2FiZXI6c2FiZXJfc2VjcmV0",
      'Blade-Auth':"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiIyNzkzOTgiLCJ1c2VyX25hbWUiOiJhZG1pbiIsInJlYWxfbmFtZSI6ImFkbWlucSIsImF2YXRhciI6IiIsImF1dGhvcml0aWVzIjpbImFkbWluIl0sImNsaWVudF9pZCI6InNhYmVyIiwicm9sZV9uYW1lIjoiYWRtaW4iLCJsaWNlbnNlIjoicG93ZXJlZCBieSBibGFkZXgiLCJwb3N0X2lkIjoiMTI4ODA4MTQ3ODE2ODY4MjQ5OCIsInVzZXJfaWQiOiIxMjg4MDgxNDc4NTIxMDA4MTMwIiwicm9sZV9pZCI6IjEyODgwODE0NzgxMjI1NDUxNTMiLCJzY29wZSI6WyJhbGwiXSwibmlja19uYW1lIjoiYWRtaW4iLCJvYXV0aF9pZCI6IiIsImV4cCI6MTYwNDkwMzAzNiwiZGVwdF9pZCI6IjEyODgwODE0NzgxMzUxMjgwNjYiLCJqdGkiOiI2OGRkOTU2YS03YmVjLTQ0OTctYjczNS0zN2M2ZWNlYzk2YTAiLCJhY2NvdW50IjoiYWRtaW4ifQ.Lrw4iQbxgBMNQDwJrOaBPQ4wddYh27cwxelPg_aOcSI",
      'platform': '21'
    },
    params: {
    }
  });
}

//卡片数据
export const portDetail = () =>{
    return request({
      url: '/api/squirrel-service/Index/getChartData?id=5',
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization':"Basic c2FiZXI6c2FiZXJfc2VjcmV0",
        'Blade-Auth':"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiIyNzkzOTgiLCJ1c2VyX25hbWUiOiJhZG1pbiIsInJlYWxfbmFtZSI6ImFkbWlucSIsImF2YXRhciI6IiIsImF1dGhvcml0aWVzIjpbImFkbWluIl0sImNsaWVudF9pZCI6InNhYmVyIiwicm9sZV9uYW1lIjoiYWRtaW4iLCJsaWNlbnNlIjoicG93ZXJlZCBieSBibGFkZXgiLCJwb3N0X2lkIjoiMTI4ODA4MTQ3ODE2ODY4MjQ5OCIsInVzZXJfaWQiOiIxMjg4MDgxNDc4NTIxMDA4MTMwIiwicm9sZV9pZCI6IjEyODgwODE0NzgxMjI1NDUxNTMiLCJzY29wZSI6WyJhbGwiXSwibmlja19uYW1lIjoiYWRtaW4iLCJvYXV0aF9pZCI6IiIsImV4cCI6MTYwNDkwMzAzNiwiZGVwdF9pZCI6IjEyODgwODE0NzgxMzUxMjgwNjYiLCJqdGkiOiI2OGRkOTU2YS03YmVjLTQ0OTctYjczNS0zN2M2ZWNlYzk2YTAiLCJhY2NvdW50IjoiYWRtaW4ifQ.Lrw4iQbxgBMNQDwJrOaBPQ4wddYh27cwxelPg_aOcSI",
        'platform': '21'
      },
      params: {
      }
    });
  }