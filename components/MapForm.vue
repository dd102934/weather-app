<template>
  <div class="map-height">
    <h4>
      地図から検索地を選択
    </h4>
    <div class="ml-10">
      <p class="mt-4">緯度：{{ lat }}</p>
      <p>経度：{{ lng }}</p>
    </div>
    <v-btn class="mt-4" color="primary" @click="show(lat, lng)">検索</v-btn>
    <v-row>
      <v-col v-for="forecast in forecastData" :key="forecast.index" cols="12">
        <v-card class="mx-auto" max-width="400">
          <v-card-title class="pb-0">天気情報</v-card-title>
          <v-card-text class="text--primary">
            <p>経度：{{ forecast.longitude }}</p>
            <p>緯度：{{ forecast.latitude }}</p>
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
  props: ['lat', 'lng'],
  data: () => ({
    valid: false,
    index: 0,
    forecastData: [],
    nameRules: [(v) => !!v || '調べたい場所を入力してください']
  }),
  methods: {
    async show(latitude, longitude) {
      const forecastObject = await this.getForecastData(latitude, longitude)
      this.forecastData = [forecastObject]
      console.log(this.forecastData)
    },
    async getForecastData(latitude, longitude) {
      const url = `/api/forecast/${process.env.DARK_SKY_API_KEY}/${latitude},${longitude}?units=si&lang=ja`
      const forecastData = await this.$axios.$get(url)
      console.log(forecastData)
      this.index += 1
      const index = this.index
      const forecastObject = {
        index,
        latitude,
        longitude,
        summary: forecastData.daily.data[0].summary,
        temperature: forecastData.currently.temperature,
        precipProbability: forecastData.currently.precipProbability
      }
      return forecastObject
    }
  }
}
</script>
<style lang="scss" scoped>
.map-height {
  height: 350px;
  p {
    margin-bottom: 0px;
    text-align: left;
  }
}
</style>
