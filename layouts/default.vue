<template>
  <v-app>
    <Toolbar />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} Daijiro</span>
    </v-footer>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar'

export default {
  components: {
    Toolbar
  },
  data() {
    return {
      fixed: false
    }
  }
}
</script>
