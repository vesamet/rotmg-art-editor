<template>
  <v-app>
    <v-main>
      <Board />
    </v-main>
  </v-app>
</template>

<script>
import Board from "./components/Board"

export default {
  name: "App",

  components: {
    Board,
  },

  data: () => ({
    //
  }),
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Sriracha&display=swap");

.v-application {
  background-color: black !important;
  font-family: "Sriracha", cursive !important;
  line-height: 1 !important;
}
</style>
