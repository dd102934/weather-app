export default function({ $axios }, inject) {
  const api = new API($axios)

  inject('api', api)
}

class API {
  constructor(axios) {
    this.axios = axios
  }

  async getForecastData(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=ja&APPID=${process.env.OPEN_WEATHER_API_KEY}`
    const res = await this.axios.$get(url)
    const forecastData = res
    console.log(forecastData)
    const index = getUniqueStr(1000)
    console.log(index)
    const forecastObject = {
      index,
      latitude,
      longitude,
      country: forecastData.city.country,
      location: forecastData.city.name,
      summary: forecastData.list[10].weather[0].description,
      temperature: forecastData.list[10].main.temp
    }
    console.log(forecastObject)
    return forecastObject

    function getUniqueStr(myStrong) {
      let strong = 1000
      if (myStrong) strong = myStrong
      return (
        new Date().getTime().toString(16) +
        Math.floor(strong * Math.random()).toString(16)
      )
    }
  }

  async getLocationData(place) {
    const url =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
      place +
      `.json?access_token=${process.env.MAP_BOX_API_KEY}&limit=1`
    const locationData = await this.axios.$get(url)

    const locationObject = {
      latitude: locationData.features[0].center[1],
      longitude: locationData.features[0].center[0]
    }

    console.log(locationObject)
    return locationObject
  }
}
