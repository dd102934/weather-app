<template>
  <div>
    <div class="text-center">
      <h1 class="headline font-weight-bold ma-3">
        明日の天気を調べよう！
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
      <v-col cols="12" sm="6" md="8" lg="8" xl="8">
        <LeafletMap />
      </v-col>
      <template v-if="0 !== Object.keys(forecastData).length">
        <v-col cols="12" sm="6" md="4" lg="2" xl="2">
          <WeatherCard :forecastData="forecastData" />
        </v-col>
        <v-col cols="12">
          <LineChart :chart-data="chartData" :options="chartOptions" />
        </v-col>
      </template>
    </v-row>
    <v-snackbar v-model="snackbar" :top="true" :timeout="snackbarTimeout">
      {{ snackbarMessage }}
      <v-btn dark text @click="snackbar = false">閉じる</v-btn>
    </v-snackbar>
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
  data: () => ({
    valid: false,
    place: '',
    nameRules: [(v) => !!v || '調べたい場所を入力してください'],
    snackbar: false,
    snackbarMessage: '',
    snackbarTimeout: 3000,
    // 都庁の緯度、経度[35.68, 139.69]
    forecastData: {},
    chartDataValues: [],
    chartLabels: [],
    chartOptions: {
      title: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMax: 40,
              suggestedMin: 0,
              stepSize: 10,
              callback: (label, index, labels) => label.toLocaleString() + '°C'
            }
          }
        ]
      },
      maintainAspectRatio: false,
      animation: {
        duration: 1500,
        easing: 'easeInOutCubic'
      }
    }
  }),
  computed: {
    chartData() {
      return {
        datasets: [
          {
            label: '気温°C',
            data: this.chartDataValues,
            borderColor: 'rgba(255,0,0,1)',
            backgroundColor: 'rgba(0,0,0,0)'
          }
        ],
        labels: this.chartLabels
      }
    }
  },
  created() {
    this.$store.dispatch('locationData/initLocationData')
  },
  methods: {
    async showForecast(place) {
      if (place === '') {
        return
      }
      try {
        const { latitude, longitude } = await this.$api.getLocationData(place)
        this.setLocationData(latitude, longitude)
        const forecastObject = await this.$api.getForecastData(
          latitude,
          longitude
        )
        this.forecastData = forecastObject
        this.createChartData(forecastObject)
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
    },
    createChartData(forecastObject) {
      this.chartDataValues = []
      this.chartLabels = []
      let date
      for (let step = 10; step < 18; step++) {
        if (step === 10) {
          date = forecastObject.weatherData[step].dt_txt.slice(5, -6) + '時'
        } else {
          date = forecastObject.weatherData[step].dt_txt.slice(11, -6) + '時'
        }
        this.chartLabels.push(date)
        this.chartDataValues.push(forecastObject.weatherData[step].main.temp)
      }
    },
    setLocationData(latitude, longitude) {
      this.$store.dispatch('locationData/changeLocationData', {
        newlatitude: latitude,
        newlongitude: longitude
      })
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

.none {
}
</style>
