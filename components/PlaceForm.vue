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
      <v-col
        v-for="forecast in forecastData"
        :key="forecast.index"
        cols="12"
        sm="3"
      >
        <v-card class="mx-auto" max-width="400">
          <v-card-title class="pb-0"
            >場所：{{ forecast.location }}</v-card-title
          >
          <v-img
            class="white--text align-end"
            max-height="230px"
            contain
            :src="require(`@/assets/images/${forecast.weather}.png`)"
          >
          </v-img>
          <v-card-text class="text--primary">
            <p class="text-left mb-0">国：{{ forecast.country }}</p>
            <p class="text-left mb-0">{{ forecast.summary }}</p>
          </v-card-text>
        </v-card>
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
export default {
  data: () => ({
    valid: false,
    place: '',
    forecastData: [],
    nameRules: [(v) => !!v || '調べたい場所を入力してください'],
    snackbar: false,
    snackbarMessage: '',
    snackbarTimeout: 1000,
    dialog: false,
    errorMessage: ''
  }),
  methods: {
    async showForecast(place) {
      if (place === '') {
        return
      }
      try {
        const { latitude, longitude } = await this.$api.getLocationData(place)
        const forecastObject = await this.$api.getForecastData(
          latitude,
          longitude
        )
        this.forecastData.unshift(forecastObject)
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
