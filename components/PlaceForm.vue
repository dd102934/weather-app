<template>
  <div>
    <div class="text-center">
      <h1 class="headline font-weight-bold ma-3">
        場所から明日の天気を調べよう！
      </h1>
      <v-form ref="form" v-model="valid" @submit.prevent>
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
          <v-card-title class="pb-0"
            >{{ forecast.country }}:{{ forecast.location }}</v-card-title
          >
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
export default {
  data: () => ({
    valid: false,
    place: '',
    forecastData: [],
    nameRules: [(v) => !!v || '調べたい場所を入力してください']
  }),
  methods: {
    async show(place) {
      const { latitude, longitude } = await this.$api.getLocationData(place)
      const forecastObject = await this.$api.getForecastData(
        latitude,
        longitude
      )
      this.forecastData.unshift(forecastObject)
      console.log(this.forecastData)
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
