<template>
  <div>
    <h1 class="headline font-weight-bold ma-3">
      地図から明日の天気を調べよう！
    </h1>
    <v-btn
      color="primary"
      @click="showForecast(locationData.latitude, locationData.longitude)"
      >検索</v-btn
    >
    <v-row justify="center">
      <v-col cols="6" sm="8">
        <client-only>
          <v-card height="450px">
            <l-map
              :zoom="zoom"
              :center="center"
              @click="setLocationInformation($event)"
            >
              <l-tile-layer :url="url"></l-tile-layer>
              <l-marker :lat-lng="marker"></l-marker>
            </l-map>
          </v-card>
        </client-only>
      </v-col>
      <v-col v-if="0 !== Object.keys(forecastData).length" cols="6" sm="4">
        <WeatherCard :forecastData="forecastData"></WeatherCard>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import WeatherCard from '~/components/WeatherCard.vue'
export default {
  components: {
    WeatherCard
  },
  data() {
    return {
      // 都庁の緯度、経度[35.68, 139.69]
      center: [
        this.$store.getters['locationData/isLocationData'].latitude,
        this.$store.getters['locationData/isLocationData'].longitude
      ],
      zoom: 5,
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      marker: [
        this.$store.getters['locationData/isLocationData'].latitude,
        this.$store.getters['locationData/isLocationData'].longitude
      ],
      forecastData: {}
    }
  },
  computed: {
    locationData() {
      return this.$store.getters['locationData/isLocationData']
    }
  },
  methods: {
    async showForecast(latitude, longitude) {
      // 地図から選択した際に経度に異常な値が入らないようにする
      console.log(latitude, longitude)
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
    },
    setLocationInformation(e) {
      console.log(e)
      // 少数第二位までを表示
      const latitude = Math.floor(e.latlng.lat * 100) / 100
      const longitude = Math.floor(e.latlng.lng * 100) / 100
      this.marker = [latitude, longitude]
      this.$store.dispatch('locationData/changeLocationData', {
        newlatitude: latitude,
        newlongitude: longitude
      })
      console.log(this.$store.getters['locationData/isLocationData'])
    }
  }
}
</script>

<style lang="scss" scoped></style>
