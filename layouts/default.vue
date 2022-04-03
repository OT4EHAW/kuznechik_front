<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        text
        text-capitalize
        @click.stop="rightDrawer = !rightDrawer"
      >
       Вход
      </v-btn>
      <v-btn
        text
        text-capitalize
        @click.stop="rightDrawer = !rightDrawer"
      >
        Регистрация
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
      class="d-flex justify-center"
    >
      <span>© {{ new Date().getFullYear() }} Токарев Данила Максимович </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Менеджер паролей'
    }
  }
}
</script>
