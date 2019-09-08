function cookies (store) {
  store.watch((state) => {
    return state.cityList
  }, (newVal) => {
    store._vm.$cookie.setCookie('cityList', newVal)
  }, { deep: true })
}

export {
  cookies
}
