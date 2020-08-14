<template>
  <v-dialog v-model="isOpen" persistent max-width="290">
    <v-card>
      <h3 class="primary--text text-center pt-3">Save art code.</h3>

      <v-textarea
        name="artcode"
        label="Save this code somewhere safe."
        :value="code"
        readonly
        class="my-3 mx-5 code-box"
      ></v-textarea>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="$emit('on-close')">
          Done
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
    }
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    pixels: {
      type: Array,
      default() {
        return []
      },
    },
    width: {
      type: Number,
      default: 15,
    },
    height: {
      type: Number,
      default: 15,
    },
  },
  methods: {
    setCode() {
      this.code = JSON.stringify({
        pixels: this.pixels,
        width: this.width,
        height: this.height,
      })
    },
  },
  watch: {
    pixels: {
      deep: true,
      immediate: true,
      handler() {
        this.setCode()
      },
    },
    width: {
      handler() {
        this.setCode()
      },
    },
    height: {
      handler() {
        this.setCode()
      },
    },
  },
}
</script>

<style scoped>
.code-box {
  font-size: 0.8em;
}
</style>
