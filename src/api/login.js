/*
import * as API from './'
*/
import request from '@/router/axios'

export const loginByUsername = (tenantId, username, password, key, code) =>{
  return request({
    url: '/api/blade-auth/oauth/token',
    method: 'post',
    headers: {
      'Tenant-Id': tenantId,
      'Captcha-Key': key,
      'Captcha-Code': code,
    },
    params: {
      tenantId,
      username,
      password,
      grant_type: "password",
    }
  });
}
export const searchList = (tenantId, username, password,key, code) =>{
  return request({
    url: '/api/blade-system/menu/rootMenus',
    method: 'get',
    headers: {
      'Tenant-Id': tenantId,
      'Captcha-Key': key,
      'Captcha-Code': code,
    },
    params: {
      tenantId,
      username,
      password,
    }
  });
}
