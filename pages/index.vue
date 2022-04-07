<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">

      <v-card>
        <v-card-title class="headline ">
          <SafeLogo class="d-flex justify-center mb-10"/>
          Ваши пароли защищены шифрованием.
        </v-card-title>
        <v-card-text>

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
import {IndexedDB, storageName, testPasswordRecord, testProfileRecord} from "../api/idb";

export default {
  name: 'IndexPage',
  mounted() {
    const dbHelper = new IndexedDB()
    dbHelper.initDB().then(
      db => {
        db.delete(storageName.password, testPasswordRecord.id)
        db.delete(storageName.profile, testProfileRecord.id)
        db.add(storageName.password, testPasswordRecord)
        db.add(storageName.profile, testProfileRecord)
      }
    )
  }
}
</script>
