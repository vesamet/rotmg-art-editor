<template>
  <div class="grid-container">
    <div
      class="grid"
      :style="`height:${height * 20}px; width:${width * 20}px;`"
    >
      <div class="map">
        <template v-for="y in height">
          <div :key="`${y}y`" class="pixel-row">
            <div v-for="x in width" :key="`${x}x`" class="pixel">v</div>
          </div>
        </template>
      </div>
      <div class="pixels"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pixels: {
      type: Array,
      default() {
        return [
          {
            x: 1,
            y: 1,
            color: "red",
          },
        ]
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
  data() {
    return {
      localPixels: [],
    }
  },
  methods: {
    render() {
      this.localPixels = this.pixels
    },
  },
  watch: {
    pixels: {
      deep: true,
      immediate: true,
      // We have to move our method to a handler field
      handler() {
        this.render()
      },
    },
  },
}
</script>

<style scoped>
.grid-container {
  overflow: auto;
  max-height: 700px;
  padding: 5px;
}
.grid {
  margin: auto;
  text-align: center;
  position: relative;
}
.map,
.pixels {
  position: absolute;
  top: 0;
  left: 0;
}
.map {
  z-index: 1;
}
.pixels {
  z-index: 2;
}
.pixel {
  background-color: rgba(255, 255, 255, 0.7);
  border: 2px solid var(--v-primary);
  width: 20px;
  height: 20px;
  display: inline-block;
}

.pixel,
.pixel-row {
  margin: 0;
  padding: 0;
}
</style>
