<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">

      <v-card>
        <v-card-title class="headline ">
          <SafeLogo class="d-flex justify-center mb-10"/>
          Криптографический алгоритм «Кузнечик»
        </v-card-title>
        <v-card-text>
          <p>
            Российский стандарт шифра с длинной блока 128 бит - <a
              href="https://protect.gost.ru/v.aspx?control=8&baseC=-1&page=0&month=-1&year=-1&search=&RegNum=1&DocOnPageCount=15&id=224244&pageK=F56A2B0D-ADE5-46EF-A808-6408E9E0B045"
              target="_blank"
              rel="noopener noreferrer"
            >
            ГОСТ 34.12-2018
            </a>

          </p>

          <p>Ваш шаг на пути к безопасному электронному документообороту.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="normal"
            nuxt
            to="/detail"
          >
            Подробнее
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
