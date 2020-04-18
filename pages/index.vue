<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
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
