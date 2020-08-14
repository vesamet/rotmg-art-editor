<template>
  <v-dialog v-model="isOpen" persistent max-width="290">
    <v-card>
      <h3 class="primary--text text-center pt-3">Load art from saved code.</h3>

      <v-textarea
        name="artcode"
        label="Paste you code here"
        v-model="code"
        class="my-3 mx-5 code-box"
      ></v-textarea>
      <p class="error--text text-center mx-5 pt-0">{{ error }}</p>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click="$emit('on-close')">
          Cancel
        </v-btn>

        <v-btn color="primary" @click="validate" :disabled="!code">
          Load
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      code: "",
      error: "",
    }
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    validate() {
      let parsedCode
      try {
        parsedCode = JSON.parse(this.code)
      } catch {
        this.error = "Uh oh! Your code is invalid."
        return
      }
      if (parsedCode.pixels && parsedCode.width && parsedCode.height) {
        this.$emit("on-load", parsedCode)
      } else {
        this.error =
          "Uh oh! Your code is incomplete. Make sure you pasted it correctly."
      }
    },
  },
}
</script>

<style scoped>
.code-box {
  font-size: 0.8em;
}
</style>
