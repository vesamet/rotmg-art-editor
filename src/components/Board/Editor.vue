<template>
  <div class="grid-container">
    <div
      class="grid"
      :style="`height:${height * 20}px; width:${width * 20}px;`"
    >
      <div class="map">
        <template v-for="y in height">
          <div :key="`${y}y`" class="pixel-row">
            <div
              v-for="x in width"
              :key="`${x}x`"
              class="map-pixel no-select"
              @click="$emit('on-click', { x, y })"
            >
              x
            </div>
          </div>
        </template>
      </div>
      <div class="pixels">
        <div
          v-for="pixel in pixels"
          :key="`${pixel.x}-${pixel.y}`"
          class="pixel no-select"
          :style="renderPixel(pixel)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pixels: {
      type: Array,
      default() {
        return [];
      }
    },
    width: {
      type: Number,
      default: 15
    },
    height: {
      type: Number,
      default: 15
    }
  },
  data() {
    return {
      localPixels: []
    };
  },
  methods: {
    render() {
      this.localPixels = this.pixels;
    },
    renderPixel(pixel) {
      let styleString = `
      background-color: ${pixel.color || "transparent"};
      top: ${(pixel.y - 1) * 20}px;
      left: ${(pixel.x - 1) * 20}px;
      `;
      return styleString;
    }
  },
  watch: {
    pixels: {
      deep: true,
      immediate: true,
      handler() {
        this.render();
      }
    },
    width: {
      handler() {
        this.render();
      }
    },
    height: {
      handler() {
        this.render();
      }
    }
  }
};
</script>

<style scoped>
.grid-container {
  overflow: auto;
  max-height: 500px;
  padding: 10px;
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
  pointer-events: none;
}
.map-pixel,
.pixel {
  width: 20px;
  height: 20px;
}
.map-pixel {
  background-color: white;
  opacity: 0.5;
  color: var(--v-secondary-base);
  border: 1px solid var(--v-secondary-base);
  display: inline-block;
  transition: all 0.3s ease;
}
.map-pixel:hover {
  transform: scale(1.1);
  cursor: crosshair;
  opacity: 1;
}
.pixel {
  background-color: lightcoral;
  display: block;
  position: absolute;
}

.pixel,
.pixel-row {
  margin: 0;
  padding: 0;
}

.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
  supported by Chrome, Edge, Opera and Firefox */
}
</style>
