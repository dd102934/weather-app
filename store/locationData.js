export const state = () => ({
  latitude: 35.68,
  longitude: 139.24
})

export const mutations = {
  changeLocationData(state, { newlatitude, newlongitude }) {
    state.latitude = newlatitude
    state.longitude = newlongitude
  }
}

export const actions = {
  changeLocationData({ commit }, { newlatitude, newlongitude }) {
    commit('changeLocationData', { newlatitude, newlongitude })
  }
}

export const getters = {
  isLocationData(state) {
    return { latitude: state.latitude, longitude: state.longitude }
  }
}
