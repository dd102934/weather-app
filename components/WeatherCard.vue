<template>
  <v-card class="mx-auto">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline"
          >{{ forecastData.country }} :
          {{ forecastData.location }}</v-list-item-title
        >
        <v-list-item-subtitle> {{ forecastData.summary }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <v-row align="center">
        <v-col class="display-2 tempature" cols="6">
          {{ forecastData.temperature }}&deg;C
        </v-col>
        <v-col cols="6">
          <v-img
            :src="require(`@/assets/images/${forecastData.weather}.png`)"
            alt="Sunny image"
            width="92"
          ></v-img>
        </v-col>
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-title>
        体感温度
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ forecastData.feelsLike }}&deg;C</v-list-item-subtitle
      >
    </v-list-item>

    <v-list-item>
      <v-list-item-title>
        湿度
      </v-list-item-title>
      <v-list-item-subtitle>{{ forecastData.humidity }}%</v-list-item-subtitle>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    forecastData: Object
  }
}
</script>
<style lang="scss" scoped>
.tempature {
  @media screen and (max-width: 575px) {
    font-size: 1.5rem !important;
  }
}
</style>
