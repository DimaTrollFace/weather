class Cookie {
  static decodeValue (value) {
    return JSON.parse(value)
  }
  static encodeValue (value) {
    return JSON.stringify(value)
  }
  setCookie (name, value) {
    try {
      value = Cookie.encodeValue(value)
      document.cookie = `${name}=${value}`
    } catch (e) {
      console.error(e)
    }
  }
  getCookie (name) {
    const cookieList = document.cookie.split(';')
    const cookieMap = cookieList.reduce((result, str) => {
      let index = str.indexOf('=')
      if (index !== -1) {
        let key = str.slice(0, index)
        let value = str.slice(index + 1)
        try {
          result[key] = Cookie.decodeValue(value)
        } catch (e) {
          console.error(e)
        }
      }
      return result
    }, {})
    return cookieMap[name]
  }
  deleteCookie () {

  }
}
export default {
  install (Vue) {
    Vue.prototype.$cookie = new Cookie()
  }
}
