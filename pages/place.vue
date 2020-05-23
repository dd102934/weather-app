<template>
  <v-layout>
    <v-flex class="text-center">
      <PlaceSearch />
    </v-flex>
  </v-layout>
</template>

<script>
import PlaceSearch from '~/components/PlaceSearch.vue'

export default {
  components: {
    PlaceSearch
  }
}
</script>
