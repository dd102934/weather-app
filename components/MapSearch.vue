<template>
  <div>
    <h1 class="headline font-weight-bold ma-3">
      明日の天気を調べよう！
    </h1>
    <v-btn
      color="primary"
      @click="showForecast(locationData.latitude, locationData.longitude)"
      >検索</v-btn
    >
    <v-row justify="center">
      <v-col cols="12" sm="6" md="8" lg="8" xl="8">
        <LeafletMap />
      </v-col>
      <v-col
        v-if="0 !== Object.keys(forecastData).length"
        cols="12"
        sm="6"
        md="4"
        lg="4"
        xl="4"
      >
        <WeatherCard :forecastData="forecastData"></WeatherCard>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import WeatherCard from '~/components/WeatherCard.vue'
import LeafletMap from '~/components/LeafletMap.vue'
export default {
  components: {
    WeatherCard,
    LeafletMap
  },
  data() {
    return {
      forecastData: {}
    }
  },
  computed: {
    locationData() {
      return this.$store.getters['locationData/isLocationData']
    }
  },
  created() {
    this.$store.dispatch('locationData/initLocationData')
  },
  methods: {
    async showForecast(latitude, longitude) {
      // 地図から選択した際に経度に異常な値が入らないようにする
      if (longitude > 180) {
        while (longitude > 180) {
          longitude -= 360
        }
      } else if (longitude < -180) {
        while (longitude < -180) {
          longitude += 360
        }
      }

      const forecastObject = await this.$api.getForecastData(
        latitude,
        longitude
      )
      this.forecastData = forecastObject
      console.log(this.forecastData)
    }
  }
}
</script>

<style lang="scss" scoped></style>
