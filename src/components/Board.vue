<template>
  <v-container class="board-container">
    <v-row align="center">
      <v-col cols="12">
        <h1 class="board-title">Rotmg art editor</h1>
      </v-col>
      <v-col cols="12" md="6" order="1" order-md="1" class="mb-2">
        <v-card class="editor-card" color="primary lighten-2">
          <v-btn color="primary" dark small absolute bottom left fab>
            <v-icon>mdi-file-send</v-icon>
          </v-btn>
          <Editor
        /></v-card>
      </v-col>
      <v-col cols="12" md="6" order="3" order-md="2" class="mb-2">
        <v-card class="render-card" color="secondary lighten-2">
          <v-btn color="secondary" dark small absolute bottom right fab>
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
          <Sprite
        /></v-card>
      </v-col>
      <v-col cols="12" order="2" order-md="3">
        <v-card class="actions-card" color="primary lighten-2">
          <v-row>
            <v-col cols="12" md="6">
              <v-card class="ma-2 mr-0 pb-6">
                <v-subheader>Tools</v-subheader>
                <v-btn class="mx-2 mt-0">
                  <v-icon left>mdi-pencil</v-icon> Pencil</v-btn
                >
                <v-btn class="mx-2 mt-0">
                  <v-icon left>mdi-eraser</v-icon> Eraser</v-btn
                >
                <v-btn class="mx-2 mt-0">
                  <v-icon left>mdi-eyedropper</v-icon> Picker</v-btn
                >
              </v-card>
              <v-card class="ma-2 mr-0 pb-6">
                <v-subheader>Time travel</v-subheader>
                <v-btn class="mx-2 mt-0" color="warning lighten-2">
                  <v-icon left>mdi-cached</v-icon> Restart</v-btn
                >
                <v-btn class="mx-2 mt-0">
                  <v-icon left>mdi-undo</v-icon> Undo</v-btn
                >
                <v-btn class="mx-2 mt-0">
                  <v-icon left>mdi-redo</v-icon> Redo</v-btn
                >
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card class="ma-2 ml-0 pb-2 text-center">
                <v-subheader>Color</v-subheader>
                <v-color-picker
                  v-model="color"
                  flat
                  class="mx-auto mb-2"
                  hide-mode-switch
                  dot-size="16px"
                  show-swatches
                  hide-inputs
                  swatches-max-height="100px"
                ></v-color-picker>
                <p>{{ color }}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Editor from "@/components/Board/Editor"
import Sprite from "@/components/Board/Sprite"
export default {
  components: {
    Editor,
    Sprite,
  },
  data() {
    return {
      color: "",
    }
  },
}
</script>

<style scoped>
.board-container {
  text-align: center;
  max-width: 1200px;
  margin: auto;
}
.editor-card,
.render-card,
.actions-card {
  min-height: 200px;
}
.board-title {
  color: white;
}
</style>
