import { getUserInfo, login, getUserDetail } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    setToken(state, payLoad) {
      state.token = payLoad
    },
    getUserInfo(state, payLoad) {
      state.userInfo = payLoad
    }
  },
  actions: {
    async getToken(context, payLoad) {
      const res = await login(payLoad)
      context.commit('setToken', res)
      setTokenTime()
    }, // 获取用户信息
    async getUserInfo(context) {
      const result = await getUserInfo()
      const baseInfo = await getUserDetail(result.userId)
      const baseResult = { ...result, ...baseInfo }
      context.commit('setUserInfo', baseResult) // 提交mutations
      // 加一个点睛之笔  这里这一步，暂时用不到，但是请注意，这给我们后边会留下伏笔
      return baseResult
    },
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
    }
  }
}
