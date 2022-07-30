import Vue from 'vue'
// 引入组件
import SvgIcon from '@/components/SvgIcon'// svg component
// 注册成全局组件
// register globally
Vue.component('svg-icon', SvgIcon)
// 一次性加载所有/svg目录下的svg文件
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
