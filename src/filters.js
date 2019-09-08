export default function (Vue) {
  Vue.filter('kelvinToCelsius', function (kelvin) {
    let value = Number(kelvin)
    if (isNaN(value)) return value
    value -= 273
    return `${value.toFixed()} °C`
  })
}
