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
  getMenus() {
    return http.get(`menus`)
  },
  // 修改用户状态
  putUserState({ uId, type }) {
    return http.put(`users/${uId}/state/${type}`)
  },
  // 添加用户
  addUserList({ username, password, email, mobile }) {
    return http.post('/users', {
      username,
      password,
      email,
      mobile
    })
  },
  //根据ID查询用户信息
  getIdMsg({id}){
    return http.get(`users/${id}`)
  },
  //编辑用户提交
  editUserInfo({id,email,mobile}){
    return http.put( `users/${id}`, {
      email:email,
      mobile:mobile
    })
  },
  //根据id删除用户
  deleUser({ id }) {
    return http.delete(`users/${id}`)
  },
  //权限管理 所有权限列表
  getRights(){
    return http.get(`rights/list`)
  },
  //角色列表
  getRoles(){
    return http.get(`roles`)
  },
  //添加角色
  addRoles({roleName,roleDesc}){
    return http.post('/roles', {
      roleName,
      roleDesc,
    })
  }

}