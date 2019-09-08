export default function (app) {
  checkCookies(app)
  checkCurrentUserPosition(app)

  function checkCookies (app) {
    let citiesFromCookies = app.$cookie.getCookie('cityList')
    if (citiesFromCookies && Array.isArray(citiesFromCookies)) {
      citiesFromCookies.forEach((city) => {
        app.$store.dispatch('addNewCity', city)
      })
    }
  }
  function checkCurrentUserPosition (app) {
    if (!navigator.geolocation) return
    navigator.geolocation
      .getCurrentPosition((pos) => {
        const { latitude: lat, longitude: lon } = pos.coords
        app.$store.dispatch('getWeatherByCityCoords', { lat, lon })
          .then((city) => {
            app.$store.dispatch('setCurrentCity', city)
          })
      }, (err) => {
        app.errorMessage(err.message)
      })
  }
}
