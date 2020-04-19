<template>
  <div>
    <v-card>
      <v-card-title class="headline">
        気になる場所の天気を調べてみよう！
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent v-model="valid">
          <v-text-field
            v-model="place"
            :rules="nameRules"
            :counter="10"
            label="Place"
            required
            @keyup.enter="show(place)"
          ></v-text-field>
          <v-btn color="primary" @click="show(place)">天気</v-btn>
        </v-form>
        <p>{{ weatherDescription }}</p>
        <p>
          <v-btn @click="func1()">fff</v-btn>
        </p></v-card-text
      >
    </v-card>
  </div>
</template>

<script>
import { func1 } from '@/providers/forecast.js'
export default {
  data: () => ({
    valid: false,
    place: '',
    weatherDescription: '',
    nameRules: [(v) => !!v || 'Place is required']
  }),
  methods: {
    async show(place) {
      const { latitude, longitude, location } = await this.getLocationaData(
        place
      )
      console.log(latitude, longitude, location)
      const forecastObject = await this.getForecastData(latitude, longitude)
      this.weatherDescription = forecastObject.summary
    },
    async getForecastData(latitude, longitude) {
      const url = `/api/forecast/${process.env.DARK_SKY_API_KEY}/${latitude},${longitude}?units=si&lang=ja`
      const forecastData = await this.$axios.$get(url)
      console.log(forecastData)
      const forecastObject = {
        summary: forecastData.daily.data[0].summary,
        temperature: forecastData.currently.temperature,
        precipProbability: forecastData.currently.precipProbability
      }
      return forecastObject
    },
    func1() {
      func1()
    },
    async getLocationaData(place) {
      const url =
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        place +
        `.json?access_token=${process.env.MAP_BOX_API_KEY}&limit=1`
      try {
        const response = await this.$axios.get(url)
        const locationData = response.data
        console.log(response)

        const locationObject = {
          latitude: locationData.features[0].center[1],
          longitude: locationData.features[0].center[0],
          location: locationData.features[0].place_name
        }

        console.log(locationObject)
        return locationObject
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style>
.user-name {
  font-size: 16px;
  color: #35495e;
}
</style>
