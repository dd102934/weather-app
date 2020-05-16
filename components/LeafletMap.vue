<template>
  <div>
    <h1 class="headline font-weight-bold ma-3">
      地図から天気を調べよう！
    </h1>
    <p>{{ $store.getters['locationData/isLocationData'] }}</p>
    <v-row>
      <v-col cols="6" sm="9">
        <no-ssr>
          <v-card height="100%" width="100%">
            <l-map
              :zoom="zoom"
              :center="center"
              @click="setLocationInformation($event)"
            >
              <l-tile-layer :url="url"></l-tile-layer>
              <l-marker :lat-lng="marker"></l-marker>
            </l-map>
          </v-card>
        </no-ssr>
      </v-col>
      <v-col cols="6" sm="3">
        <MapForm></MapForm>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import MapForm from '~/components/MapForm.vue'
export default {
  components: {
    MapForm
  },
  data() {
    return {
      // 都庁の緯度、経度[35.68, 139.69]
      center: [35.68, 139.69],
      zoom: 5,
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      marker: [35.68, 139.69]
    }
  },
  methods: {
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
