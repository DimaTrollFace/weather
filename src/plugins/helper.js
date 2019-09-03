export default {
  install (Vue) {
    Object.defineProperties(Vue.prototype, {
      setModel: {
        get () {
          return (model = {}, origin = {}) => {
            if (!model || !origin || typeof (model) !== 'object') return model || origin
            return Object.keys(model).reduce((result, key) => {
              result[key] = origin[key] !== undefined
                ? origin[key]
                : model[key]
              return result
            }, {})
          }
        }
      }
    })
  }
}
