<template>
  <canvas
    class="canvas"
    :width="`${width * 20}`"
    :height="`${height * 20}`"
    ref="canvas"
  ></canvas>
</template>

<script>
export default {
  props: {
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
    render() {
      let canvas = this.$refs.canvas
      // if (!canvas.getContext("2d")) {
      //   return
      // }
      let ctx = canvas.getContext("2d")
      ctx.clearRect(0, 0, this.width * 20, this.height * 20)
      this.pixels.forEach((pixel) => {
        ctx.shadowColor = "black"
        ctx.shadowBlur = 5
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
        ctx.strokeRect((pixel.x - 1) * 20, (pixel.y - 1) * 20, 20, 20)

        ctx.shadowBlur = 15
        ctx.strokeRect((pixel.x - 1) * 20, (pixel.y - 1) * 20, 20, 20)

        ctx.shadowBlur = 20
        ctx.strokeRect((pixel.x - 1) * 20, (pixel.y - 1) * 20, 20, 20)
      })
      this.pixels.forEach((pixel) => {
        ctx.shadowColor = "black"
        ctx.shadowBlur = 0
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
        ctx.fillStyle = pixel.color
        ctx.fillRect((pixel.x - 1) * 20, (pixel.y - 1) * 20, 20, 20)
      })
    },
  },
  watch: {
    pixels: {
      deep: true,
      handler() {
        this.render()
      },
    },
    width: {
      handler() {
        this.render()
      },
    },
    height: {
      handler() {
        this.render()
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.render()
    })
  },
}
</script>

<style scoped>
.canvas {
  padding: 10px;
  margin: 0;
}
</style>
