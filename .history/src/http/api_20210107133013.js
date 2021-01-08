import http from './index'

export default {
// 登录接口
  login({ username, password }) {
    return http.post('/login', {
      username,
      password
    })
  },
// 用户数据列表
  getUsers({ pagenum, pagesize, query }) {
    if (query) {
      return http.get(`/users?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`)
    } else {
      return http.get(`/users?pagenum=${pagenum}&pagesize=${pagesize}`)
    }
  },
// 左侧菜单权限
  getMenus(){
    return http.get(`menus`)
  }
}