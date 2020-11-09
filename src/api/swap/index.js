/*
import * as API from './'
*/
import request from '@/router/axios'

export const loginByUsername = (tenantId, username, password) =>{
  return request({
    url: '/api/blade-auth/oauth/token',
    method: 'post',
      params: {
      tenantId,
      username,
      password,
      grant_type: "password",
      scope: "all",
      type:"account"
    }
  });
}
