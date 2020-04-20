<template>
  <div>
    <h1 class="headline font-weight-bold ma-3">
      地図から天気を調べよう！
    </h1>
    <v-row>
      <v-col cols="6" sm="9">
        <no-ssr>
          <l-map
            :zoom="zoom"
            :center="center"
            @click="setLocationInformation($event)"
          >
            <l-tile-layer :url="url"></l-tile-layer>
            <l-marker :lat-lng="marker"></l-marker>
          </l-map>
        </no-ssr>
      </v-col>
      <v-col cols="6" sm="3">
        <MapForm :lat="latitude" :lng="longitude"></MapForm>
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
      center: [35.68, 139.69],
      zoom: 5,
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      latitude: 35.68,
      longitude: 139.69,
      marker: [35.68, 139.69]
    }
  },
  methods: {
    setLocationInformation(e) {
      console.log(e)
      // 少数第二位までを表示
      this.latitude = Math.floor(e.latlng.lat * 100) / 100
      this.longitude = Math.floor(e.latlng.lng * 100) / 100
      this.marker = [this.latitude, this.longitude]
    }
  }
}
</script>

<style lang="scss" scoped>
#map {
  height: 400px;
}
</style>
