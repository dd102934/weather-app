<template>
  <v-layout justify-center align-center>
    <v-flex>
      <div class="text-center">
        <vuetify-logo />
      </div>
      <search-form />
    </v-flex>
  </v-layout>
</template>

<script>
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import SearchForm from '~/components/SearchForm.vue'

export default {
  components: {
    VuetifyLogo,
    SearchForm
  }
}
</script>
