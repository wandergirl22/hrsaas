const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.username,
  userId: (state) => state.user.userInfo.userId, // 建立用户id的映射
  staffPhoto: (state) => state.user.userInfo.staffPhoto, // 建立用户头像的映射
  companyName: (state) => state.user.userInfo.companyName
}
export default getters
