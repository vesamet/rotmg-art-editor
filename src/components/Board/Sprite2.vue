<template>
  <svg
    class="sprite"
    version="1.1"
    baseProfile="full"
    xmlns="http://www.w3.org/2000/svg"
    xlink="w3.org/1999/xlink"
    :width="width"
    :height="height"
    :viewBox="`0 0 ${pixelWidth * pixelSize} ${pixelHeight * pixelSize}`"
  >
    <g class="shadows">
      <filter id="shadow" x="-5" y="-5" width="50" height="50">
        <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" />
        <feColorMatrix
          result="matrixOut"
          in="offOut"
          type="matrix"
          values=" 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0"
        />
        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2" />
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
      </filter>
      <rect
        v-for="(pixel, index) in pixels"
        :key="index"
        :x="pixel.x * pixelSize"
        :y="pixel.y * pixelSize"
        :width="pixelSize"
        :height="pixelSize"
        stroke="black"
        stroke-width="0.9"
        fill="none"
        style="filter:url(#shadow)"
      />
    </g>
    <g class="pixels">
      <rect
        v-for="(pixel, index) in pixels"
        :key="index"
        :x="pixel.x * pixelSize"
        :y="pixel.y * pixelSize"
        :width="pixelSize"
        :height="pixelSize"
        :fill="pixel.color"
        :stroke="pixel.color"
        stroke-width="0.2"
      />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "100px",
    },
    height: {
      type: String,
      default: "",
    },
    pixelWidth: {
      type: Number,
      default: 20,
    },
    pixelHeight: {
      type: Number,
      default: 20,
    },
    pixelSize: {
      type: Number,
      default: 5,
    },
    pixels: {
      type: Array,
      default: () => [
        { x: 5, y: 5, color: "red" },
        { x: 6, y: 6, color: "red" },
      ],
    },
  },
}
</script>

<style scoped>
.sprite {
  margin: 5px;
}
</style>
