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
