<template>
  <div>
    <v-toolbar :color="'primary'" height="48px" fixed>
      <v-toolbar-title>
        <nuxt-link to="/" class="toolbar-title">天気検索アプリ</nuxt-link>
      </v-toolbar-title>
      <v-btn text>
        <nuxt-link to="/place" class="toolbar-title">場所から検索</nuxt-link>
      </v-btn>
      <v-btn text>
        <nuxt-link to="/map" class="toolbar-title">地図から検索</nuxt-link>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<style lang="scss" scoped>
.toolbar-title {
  color: #ffffff !important;
  text-decoration: none;
}
</style>
