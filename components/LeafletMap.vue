<template>
  <client-only>
    <v-card>
      <l-map
        :zoom="zoom"
        :center="[locationData.latitude, locationData.longitude]"
        @click="setMaker($event)"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker
          :lat-lng="[locationData.latitude, locationData.longitude]"
        ></l-marker>
      </l-map>
    </v-card>
  </client-only>
</template>
<script>
export default {
  data() {
    return {
      // 都庁の緯度、経度[35.68, 139.69]
      zoom: 5,
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      mapMarker: this.marker
    }
  },
  computed: {
    locationData() {
      return this.$store.getters['locationData/isLocationData']
    }
  },
  methods: {
    setMaker(e) {
      console.log(e)
      // 少数第二位までを表示
      const latitude = Math.floor(e.latlng.lat * 100) / 100
      const longitude = Math.floor(e.latlng.lng * 100) / 100
      this.setLocationData(latitude, longitude)
      console.log(this.$store.getters['locationData/isLocationData'])
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
.vue2leaflet-map {
  height: 50vh;
}
</style>
