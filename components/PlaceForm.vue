<template>
  <div>
    <div class="text-center">
      <h1 class="headline font-weight-bold ma-3">
        場所から天気を調べよう！
      </h1>
      <v-form ref="form" @submit.prevent v-model="valid">
        <div class="search-button">
          <v-text-field
            v-model="place"
            :rules="nameRules"
            label="場所"
            required
            class="mt-0 pt-0 pl=2"
          ></v-text-field>
          <v-btn color="primary" :disabled="place == ''" @click="show(place)"
            >検索</v-btn
          >
        </div>
      </v-form>
    </div>
    <v-row>
      <v-col
        v-for="forecast in forecastData"
        :key="forecast.index"
        cols="12"
        sm="4"
      >
        <v-card class="mx-auto" max-width="400">
          <v-card-title class="pb-0">{{ forecast.location }}</v-card-title>
          <v-card-text class="text--primary">
            <p class="text-left mb-0">
              経度：{{ forecast.longitude }},緯度：{{ forecast.latitude }}
            </p>
            <p class="text-left mb-0">{{ forecast.summary }}</p>
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
      try {
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
      } catch (error) {
        console.log('hoge')
      }
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
<style lang="scss" scoped>
form {
  width: 30vw;
  margin: 10px auto;
  @media screen and (max-width: 480px) {
    width: 60vw;
  }

  .search-button {
    display: flex;
    text-align: right;
  }
}
</style>
