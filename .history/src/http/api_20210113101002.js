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
  getIdMsg({ id }) {
    return http.get(`users/${id}`)
  },
  //编辑用户提交
  editUserInfo({ id, email, mobile }) {
    return http.put(`users/${id}`, {
      email: email,
      mobile: mobile
    })
  },
  //根据id删除单个用户
  deleUser({ id }) {
    return http.delete(`users/${id}`)
  },
  //权限管理 所有权限列表
  getRights() {
    return http.get(`rights/list`)
  },
  //角色列表
  getRoles() {
    return http.get(`roles`)
  },
  //添加角色
  addRoles({ roleName, roleDesc }) {
    return http.post('/roles', {
      roleName,
      roleDesc,
    })
  },
  //编辑提交角色
  editRolesInfo({ id, roleName, roleDes }) {
    return http.put(`roles/${id}`, {
      roleName: roleName,
      roleDes: roleDes
    })
  },
  //根据id删除角色
  deleRoles({ id }) {
    return http.delete(`roles/${id}`)
  },
  //  
  //基于时间统计的折线图
  getLineChart() {
    return http.get(`reports/type/1`)
  },
  //订单数据列表
  getOrderList({ query, pagenum, pagesize }) {
    if (query) {
      return http.get(`orders?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`)
    } else {
      return http.get(`orders?pagenum=${pagenum}&pagesize=${pagesize}`)
    }
  },
  //删除单个角色指定权限
  deleRolesLimit({ roleId, rightId }) {
    return http.delete(`roles/${roleId}/rights/${rightId}`);
  },

  //商品分类数据列表 不传参数 默认所有分类数据
  getCateList() {
    return http.get( `/categories`);
  },
  //商品分类数据列表
  getgoods({ type, pagenum, pagesize }) {
    return http.get( `/categories?type=${type}&pagenum=${pagenum}&pagesize=${pagesize}`);
  },

  //块级选择器
  getblock(){ 
    return http.get(`/categories?type=${2}`);
  },
  getblocktree() {
    return http.get(`/categories?type=${3}`);
  },
  //添加分类
  addclassid({ cat_pid, cat_name, cat_level }) {
    return http.post(`/categories?cat_pid=${cat_pid}&cat_name=${cat_name}&cat_level=${cat_level}`);
  }
}