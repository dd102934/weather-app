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
    const forecastData = await this.axios.$get(url)
    console.log(forecastData)
    const forecastObject = {
      latitude,
      longitude,
      country: forecastData.city.country ? forecastData.city.country : '不明',
      location: forecastData.city.name ? forecastData.city.name : '不明',
      weather: forecastData.list[10].weather[0].main.toLowerCase(),
      summary: forecastData.list[10].weather[0].description,
      temperature: Math.round(forecastData.list[10].main.temp),
      weatherData: forecastData.list,
      feelsLike: forecastData.list[10].main.feels_like,
      humidity: forecastData.list[10].main.humidity
    }
    console.log(forecastObject)
    return forecastObject
  }

  async getLocationData(place) {
    const url =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
      place +
      `.json?access_token=${process.env.MAP_BOX_API_KEY}&limit=1`
    const locationData = await this.axios.$get(url)
    if (locationData.features.length === 0) {
      throw new Error('invaildPlaceError')
    }

    const locationObject = {
      latitude: locationData.features[0].center[1],
      longitude: locationData.features[0].center[0]
    }

    console.log(locationObject)
    return locationObject
  }
}
