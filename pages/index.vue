<template>
  <v-layout justify-center align-center>
    <v-flex>
      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">天気検索アプリ</h2>

        <v-responsive
          class="mx-auto title font-weight-light text-left mb-8"
          max-width="720"
        >
          このWEBアプリは天気の検索ができるアプリです。天気の検索方法には二通りあり、調べたい場所を入力する方法と、地図から選ぶ方法があります。
        </v-responsive>

        <v-avatar class="elevation-12 mb-12" size="128">
          <v-img :src="require('@/assets/images/sunny.png')"></v-img>
        </v-avatar>

        <div>
          <v-btn color="primary" large>
            <span class="font-weight-bold">
              <nuxt-link to="/place" class="link-button"
                >場所から検索</nuxt-link
              >
            </span>
          </v-btn>
          <v-btn color="secondary" large>
            <span class="font-weight-bold">
              <nuxt-link to="/map" class="link-button">地図から検索</nuxt-link>
            </span>
          </v-btn>
        </div>
      </v-container>

      <div class="py-12"></div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {}
}
</script>

<style lang="scss" scoped>
.text-center {
  .display-2 {
    @media screen and (max-width: 400px) {
      font-size: 2.4rem !important;
    }
  }
}
.link-button {
  color: #ffffff !important;
  text-decoration: none;
}
</style>
