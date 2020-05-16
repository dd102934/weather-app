<template>
  <div class="map-height">
    <v-card class="mx-auto" max-width="400">
      <v-card-title class="pb-0"
        >場所：{{ forecastData.location }}</v-card-title
      >
      <v-img
        class="white--text align-end"
        max-height="230px"
        contain
        :src="require(`@/assets/images/${forecastData.weather}.png`)"
      >
      </v-img>
      <v-card-text class="text--primary">
        <p class="text-left mb-0">国：{{ forecastData.country }}</p>
        <p class="text-left mb-0">{{ forecastData.summary }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    forecastData: Object
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
