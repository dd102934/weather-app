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
    <v-row>
      <v-col cols="6" sm="8">
        <client-only>
          <v-card height="100%" width="100%">
            <l-map :zoom="zoom" :center="center">
              <l-tile-layer :url="url"></l-tile-layer>
              <l-marker :lat-lng="marker"></l-marker>
            </l-map>
          </v-card>
        </client-only>
      </v-col>
      <v-col cols="6" sm="4">
        <WeatherCard :forecastData="forecastData"></WeatherCard>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :top="true" :timeout="snackbarTimeout">
      {{ snackbarMessage }}
      <v-btn dark text @click="snackbar = false">閉じる</v-btn>
    </v-snackbar>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title
          >エラーが発生しました</v-card-title
        >
        <v-card-text py-5>{{ errorMessage }}</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    snackbarTimeout: 1000,
    dialog: false,
    errorMessage: '',
    center: [35.68, 139.69],
    zoom: 5,
    url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    marker: [35.68, 139.69],
    forecastData: {
      location: '東京',
      weather: 'snow',
      country: 'JP',
      summary: '晴れ'
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
          this.errorMessage =
            '当てはまる場所が見つかりませんでした。再度入力をお願い致しいます。'
          this.dialog = true
        } else {
          this.errorMessage = 'サイトの管理者に問い合わせてしてください。'
          this.dialog = true
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
