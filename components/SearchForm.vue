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
            @keyup.enter="getLocationInformation(place)"
          ></v-text-field>
          <v-btn color="primary" @click="getLocationInformation(place)"
            >天気</v-btn
          >
        </v-form>
        <p>{{ latitude }} {{ longitude }}{{ location }}</p>
        <v-btn @click="a()">fff</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { func1 } from '@/providers/forecast.js'
export default {
  data: () => ({
    valid: false,
    place: '',
    latitude: 0,
    longitude: 0,
    location: '',
    nameRules: [(v) => !!v || 'Place is required']
  }),
  methods: {
    showWeather() {
      this.$axios
        .$get(`/api/forecast/${process.env.DARK_SKY_API_KEY}/37.8267,-122.4233`)
        .then((response) => {
          const forecastData = response
          console.log(forecastData)
          console.log(
            forecastData.daily.data[0].summary +
              ' It is currently ' +
              forecastData.currently.temperature +
              ' degress out. There is a ' +
              forecastData.currently.precipProbability +
              '% chance of rain.'
          )
        })
        .catch((error) => {
          console.log(error, 'forecastAPI ERROR!')
        })
    },
    a() {
      func1()
    },
    getLocationInformation(place) {
      const url =
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        place +
        `.json?access_token=${process.env.MAP_BOX_API_KEY}&limit=1`

      this.$axios
        .get(url)
        .then((response) => {
          console.log(response)
          const geoLocationdata = response.data
          this.latitude = geoLocationdata.features[0].center[1]
          this.longitude = geoLocationdata.features[0].center[0]
          this.location = geoLocationdata.features[0].place_name
        })
        .catch((error) => {
          console.log(error)
        })
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
