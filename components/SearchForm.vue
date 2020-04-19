<template>
  <div>
    <h1 class="headline">
      気になる場所の天気を調べてみよう！
    </h1>
    <v-row no-gutters>
      <v-col cols="4">
        <v-form ref="form" @submit.prevent v-model="valid">
          <v-text-field
            v-model="place"
            :rules="nameRules"
            :counter="10"
            label="場所"
            required
            @keyup.enter="show(place)"
          ></v-text-field>
          <v-btn color="primary" @click="show(place)">天気</v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="forecast in forecastData"
        :key="forecast.index"
        cols="12"
        sm="3"
      >
        <v-card class="mx-auto" max-width="400">
          <v-card-title class="pb-0">{{ forecast.location }}</v-card-title>
          <v-card-text class="text--primary">
            <p>経度：{{ forecast.longitude }},緯度：{{ forecast.latitude }}</p>
            <p>{{ forecast.summary }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import { func1 } from '@/providers/forecast.js'
export default {
  data: () => ({
    valid: false,
    place: '',
    index: 0,
    forecastData: [],
    nameRules: [(v) => !!v || '調べたい場所を入力してください']
  }),
  methods: {
    async show(place) {
      const { latitude, longitude, location } = await this.getLocationaData(
        place
      )
      const forecastObject = await this.getForecastData(
        latitude,
        longitude,
        location
      )
      this.forecastData.unshift(forecastObject)
      console.log(this.forecastData)
    },
    async getForecastData(latitude, longitude, location) {
      const url = `/api/forecast/${process.env.DARK_SKY_API_KEY}/${latitude},${longitude}?units=si&lang=ja`
      const forecastData = await this.$axios.$get(url)
      console.log(forecastData)
      this.index += 1
      const index = this.index
      const forecastObject = {
        index,
        latitude,
        longitude,
        location,
        summary: forecastData.daily.data[0].summary,
        temperature: forecastData.currently.temperature,
        precipProbability: forecastData.currently.precipProbability
      }
      return forecastObject
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
