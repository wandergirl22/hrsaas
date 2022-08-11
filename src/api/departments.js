import request from '@/utils/request'
/**
 * 获取组织架构的数据
 * @returns Promise对象
 */
export function getDeptsApi() {
  return request({
    url: '/company/department'
  })
}
/**
 * 删除部门
 * @param {Number} id 要删除部门id
 * @returns Promise对象
 */
export function delDeptsApi(id) {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE'
  })
}
/**
 * 添加部门
 * @param {*} data
 * @returns Promise对象
 */
export function addDeptsApi(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
/**
 * 获取部门详细信息
 * @param {String} id 部门id
 * @returns Promise对象
 */
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}
/**
 * 编辑部门
 * @param {*} data
 * @returns Promise对象
 */
export function editDeptApi(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
