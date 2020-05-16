<template>
  <div class="map-height">
    <h4>
      地図から検索地を選択
    </h4>
    <div class="ml-10">
      <p class="mt-4">
        緯度：{{ $store.getters['locationData/isLocationData'].latitude, }}
      </p>
      <p>経度：{{ $store.getters['locationData/isLocationData'].longitude }}</p>
    </div>
    <v-btn
      class="mt-4"
      color="primary"
      @click="
        showForecast(
          $store.getters['locationData/isLocationData'].latitude,
          $store.getters['locationData/isLocationData'].longitude
        )
      "
      >検索</v-btn
    >
    <v-row>
      <v-col v-for="forecast in forecastData" :key="forecast.index" cols="12">
        <v-card class="mx-auto" max-width="400">
          <v-card-title class="pb-0">天気情報</v-card-title>
          <v-img
            class="white--text align-end"
            max-height="230px"
            contain
            :src="require(`@/assets/images/${forecast.weather}.png`)"
          >
          </v-img>
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
export default {
  props: ['lat', 'lng'],
  data: () => ({
    index: 0,
    forecastData: []
  }),
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
      this.forecastData = [forecastObject]
      console.log(this.forecastData)
    }
  }
}
</script>
<style lang="scss" scoped>
.map-height {
  height: 60vh;
  p {
    margin-bottom: 0px;
    text-align: left;
  }
}
</style>
