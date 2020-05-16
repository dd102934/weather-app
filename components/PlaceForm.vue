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
            height="38px"
            dense
            required
            class="mt-0 pt-0 pl=2"
            @keyup.enter="showForecast(place)"
          ></v-text-field>
          <v-btn
            color="primary"
            height="40px"
            :disabled="place == ''"
            @click="showForecast(place)"
            >検索</v-btn
          >
        </div>
      </v-form>
    </div>
    <v-row justify="center">
      <v-col cols="6" sm="8">
        <v-card height="450px">
          <client-only>
            <l-map :zoom="zoom" :center="center">
              <l-tile-layer :url="url"></l-tile-layer>
              <l-marker :lat-lng="marker"></l-marker>
            </l-map>
          </client-only>
        </v-card>
      </v-col>
      <v-col v-if="0 !== Object.keys(forecastData).length" cols="6" sm="4">
        <WeatherCard :forecastData="forecastData"></WeatherCard>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :top="true" :timeout="snackbarTimeout">
      {{ snackbarMessage }}
      <v-btn dark text @click="snackbar = false">閉じる</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import WeatherCard from '~/components/WeatherCard.vue'
export default {
  components: {
    WeatherCard
  },
  data: () => ({
    valid: false,
    place: '',
    nameRules: [(v) => !!v || '調べたい場所を入力してください'],
    snackbar: false,
    snackbarMessage: '',
    snackbarTimeout: 3000,
    center: [35.68, 139.69],
    zoom: 5,
    url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    marker: [35.68, 139.69],
    forecastData: {
      // location: '東京',
      // weather: 'snow',
      // country: 'JP',
      // summary: '晴れ'
    }
  }),
  methods: {
    async showForecast(place) {
      if (place === '') {
        return
      }
      try {
        const { latitude, longitude } = await this.$api.getLocationData(place)
        this.center = [latitude, longitude]
        this.marker = [latitude, longitude]
        const forecastObject = await this.$api.getForecastData(
          latitude,
          longitude
        )
        this.forecastData = forecastObject
        console.log(this.forecastData)
      } catch (e) {
        console.log(e)
        if (e) {
          this.snackbarMessage =
            '当てはまる場所が見つかりませんでした。再度入力をお願いします。'
          this.snackbar = true
        } else {
          this.snackbarMessage = 'サイトの管理者に問い合わせてしてください。'
          this.snackbar = true
        }
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
.v-dialog {
  .v-card__text {
    padding: 24px 20px;
  }
}
</style>
