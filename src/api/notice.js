/*
import * as API from './'
*/
import request from '@/router/axios'

//公告接口
export const companyNotice = () =>{
  return request({
    url: '/api/squirrel-dust/todayBuildingSite/getNotices',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization':"Basic c2FiZXI6c2FiZXJfc2VjcmV0",
      'Blade-Auth':"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiIyNzkzOTgiLCJ1c2VyX25hbWUiOiJhZG1pbiIsInJlYWxfbmFtZSI6ImFkbWlucSIsImF2YXRhciI6IiIsImF1dGhvcml0aWVzIjpbImFkbWluIl0sImNsaWVudF9pZCI6InNhYmVyIiwicm9sZV9uYW1lIjoiYWRtaW4iLCJsaWNlbnNlIjoicG93ZXJlZCBieSBibGFkZXgiLCJwb3N0X2lkIjoiMTI4ODA4MTQ3ODE2ODY4MjQ5OCIsInVzZXJfaWQiOiIxMjg4MDgxNDc4NTIxMDA4MTMwIiwicm9sZV9pZCI6IjEyODgwODE0NzgxMjI1NDUxNTMiLCJzY29wZSI6WyJhbGwiXSwibmlja19uYW1lIjoiYWRtaW4iLCJvYXV0aF9pZCI6IiIsImV4cCI6MTYwNDkwMDAzNSwiZGVwdF9pZCI6IjEyODgwODE0NzgxMzUxMjgwNjYiLCJqdGkiOiI4MDY0MzI2NS0xNzljLTQ1MzQtOWEzNC0zMDE2NjRlNTI3OTMiLCJhY2NvdW50IjoiYWRtaW4ifQ.CGPxUA_fg_yjZpmXUiCherpKlSvPc6rZsQhoR91HrOw"
    },
    params: {
    }
  });
}

