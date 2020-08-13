<template>
  <canvas class="canvas" ref="canvas"></canvas>
</template>

<script>
export default {
  props: {
    pixels: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    render() {
      let canvas = this.$refs.canvas;
      if (!canvas.getContext("2d")) {
        return;
      }
      let ctx = canvas.getContext("2d");
      // this.pixels.forEach(pixel => {
      //   ctx.fillStyle = pixel.color;
      //   ctx.fillRect((pixel.x) * 20, (pixel.y) * 20, 20, 20);
      // });
      ctx.fillRect(20, 20, 150, 100);
    }
  },
  watch: {
    pixels: {
      deep: true,
      handler() {
        this.render();
      }
    }
  },
  mounted() {
    this.render();
  }
};
</script>

<style scoped>
.canvas {
width: 400px;
height: 400px;
}
</style>
