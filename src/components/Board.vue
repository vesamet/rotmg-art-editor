<template>
  <v-container class="board-container">
    <v-row align="stretch" justify="center">
      <v-col cols="12">
        <h1 class="board-title">ROTMG sprite maker 2.0</h1>
      </v-col>
      <v-col cols="12" md="6" order="1" order-md="1" class="mb-2">
        <v-card class="editor-card fill-height" color="primary lighten-2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                small
                absolute
                bottom
                left
                fab
                v-bind="attrs"
                v-on="on"
                @click.stop="loaderDialog = true"
              >
                <v-icon>mdi-file-send</v-icon>
              </v-btn>
            </template>
            <span>
              <strong>Load sprite code</strong>
            </span>
          </v-tooltip>

          <Editor
            :pixels="pixels"
            :width="width"
            :height="height"
            @on-click="editPixel"
          />
        </v-card>
      </v-col>
      <v-col cols="12" md="6" order="3" order-md="2" class="mb-2">
        <v-card class="render-card fill-height" color="secondary lighten-2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="secondary"
                dark
                small
                absolute
                bottom
                right
                fab
                v-bind="attrs"
                v-on="on"
                style="margin-right: 50px;"
                @click.stop="saverDialog = true"
              >
                <v-icon>mdi-content-save</v-icon>
              </v-btn>
            </template>
            <span> <strong>Save sprite code</strong></span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="secondary"
                dark
                small
                absolute
                bottom
                right
                fab
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-file-image-outline</v-icon>
              </v-btn>
            </template>
            <span>
              <strong>Download your art</strong> <br />
              Right click on your sprite and click "save image as..."
            </span>
          </v-tooltip>
          <div class="render-box">
            <Sprite :pixels="pixels" :width="width" :height="height" />
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" order="2" order-md="3">
        <v-card class="actions-card" color="primary lighten-2">
          <v-row>
            <v-col cols="12" md="6">
              <v-card class="ma-2 mr-0 pb-6">
                <v-subheader>Tools</v-subheader>
                <v-btn
                  class="mx-2 mt-0"
                  :color="tool === 'pencil' ? 'primary' : ''"
                  @click="tool = 'pencil'"
                >
                  <v-icon left>mdi-pencil</v-icon>Pencil
                </v-btn>
                <v-btn
                  class="mx-2 mt-0"
                  :color="tool === 'eraser' ? 'primary' : ''"
                  @click="tool = 'eraser'"
                >
                  <v-icon left>mdi-eraser</v-icon>Eraser
                </v-btn>
                <v-btn
                  class="mx-2 mt-0"
                  :color="tool === 'picker' ? 'primary' : ''"
                  @click="tool = 'picker'"
                >
                  <v-icon left>mdi-eyedropper</v-icon>Picker
                </v-btn>
              </v-card>
              <v-card class="ma-2 mr-0 pb-6">
                <v-subheader>Time travel</v-subheader>
                <v-btn
                  class="mx-2 mt-0"
                  color="warning lighten-2"
                  @click="restart"
                >
                  <v-icon left>mdi-cached</v-icon>Restart
                </v-btn>
                <v-btn
                  class="mx-2 mt-0"
                  :disabled="!history[historyIndex - 1]"
                  @click="undo"
                >
                  <v-icon left>mdi-undo</v-icon>Undo
                </v-btn>
                <v-btn
                  class="mx-2 mt-0"
                  :disabled="!history[historyIndex + 1]"
                  @click="redo"
                >
                  <v-icon left>mdi-redo</v-icon>Redo
                </v-btn>
              </v-card>
              <v-card class="ma-2 mr-0 pb-6">
                <v-subheader>Canvas</v-subheader>
                <v-slider
                  v-model="width"
                  label="Width"
                  :thumb-size="24"
                  class="mr-3"
                  style="margin-left: 18px; margin-top: 10px;"
                  thumb-label="always"
                  :min="1"
                  @change="cleanCanvas"
                ></v-slider>
                <v-slider
                  v-model="height"
                  label="Height"
                  :thumb-size="24"
                  class="mx-3"
                  thumb-label="always"
                  :min="1"
                  @change="cleanCanvas"
                ></v-slider>
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
                <p>{{ color }} {{ historyIndex }}</p>
              </v-card>
            </v-col>
          </v-row>
          <LoaderDialog
            :isOpen="loaderDialog"
            @on-load="loadCode"
            @on-close="loaderDialog = false"
          />
          <SaverDialog
            :isOpen="saverDialog"
            @on-close="saverDialog = false"
            :pixels="pixels"
            :width="width"
            :height="height"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div>
          <p class="float-left board-caption text-left">
            v 1.2 <br />
            Made by
            <a class="author-link" href="https://github.com/vesamet"
              >Gwenael Guyot</a
            >
          </p>
          <p class="float-right board-caption text-right">
            This tool is meant to facilitate ROTMG-like sprite creation.<br />
            <span class="small-caption"
              >ROTMG is a trademark of DECA LIVE OPERATIONS GMBH. <br />
              The author is not affiliated with Deca/ROTMG at all.</span
            >
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { reject, find, filter, cloneDeep } from "lodash"
import Editor from "@/components/Board/Editor"
import Sprite from "@/components/Board/Sprite"
import LoaderDialog from "@/components/Board/LoaderDialog"
import SaverDialog from "@/components/Board/SaverDialog"
export default {
  components: {
    Editor,
    Sprite,
    LoaderDialog,
    SaverDialog,
  },
  data() {
    return {
      color: "",
      tool: "pencil",
      width: 10,
      height: 10,
      pixels: [
        { x: 2, y: 9, color: "#FAFAFAFF" },
        { x: 3, y: 9, color: "#FAFAFAFF" },
        { x: 4, y: 9, color: "#FAFAFAFF" },
        { x: 5, y: 9, color: "#FAFAFAFF" },
        { x: 6, y: 9, color: "#FAFAFAFF" },
        { x: 8, y: 9, color: "#FAFAFAFF" },
        { x: 7, y: 9, color: "#FAFAFAFF" },
        { x: 6, y: 8, color: "#FAFAFAFF" },
        { x: 7, y: 8, color: "#FAFAFAFF" },
        { x: 5, y: 8, color: "#FAFAFAFF" },
        { x: 3, y: 8, color: "#FAFAFAFF" },
        { x: 4, y: 8, color: "#FAFAFAFF" },
        { x: 3, y: 7, color: "#FF7043FF" },
        { x: 4, y: 7, color: "#FF7043FF" },
        { x: 5, y: 7, color: "#FF7043FF" },
        { x: 6, y: 7, color: "#FF7043FF" },
        { x: 7, y: 7, color: "#FF7043FF" },
        { x: 3, y: 6, color: "#FAFAFAFF" },
        { x: 4, y: 6, color: "#FAFAFAFF" },
        { x: 5, y: 6, color: "#FAFAFAFF" },
        { x: 6, y: 6, color: "#FAFAFAFF" },
        { x: 7, y: 6, color: "#FAFAFAFF" },
        { x: 2, y: 6, color: "#FAFAFAFF" },
        { x: 8, y: 6, color: "#FAFAFAFF" },
        { x: 2, y: 7, color: "#FFE082FF" },
        { x: 9, y: 6, color: "#FFE082FF" },
        { x: 7, y: 5, color: "#FFE082FF" },
        { x: 6, y: 5, color: "#FFE082FF" },
        { x: 5, y: 5, color: "#FFE082FF" },
        { x: 4, y: 5, color: "#FFE082FF" },
        { x: 3, y: 5, color: "#FFE082FF" },
        { x: 3, y: 4, color: "#FFE082FF" },
        { x: 6, y: 4, color: "#FFE082FF" },
        { x: 5, y: 2, color: "#FFE082FF" },
        { x: 6, y: 2, color: "#FFE082FF" },
        { x: 4, y: 2, color: "#FFE082FF" },
        { x: 3, y: 3, color: "#BDBDBDFF" },
        { x: 5, y: 3, color: "#BDBDBDFF" },
        { x: 4, y: 3, color: "#BDBDBDFF" },
        { x: 6, y: 3, color: "#BDBDBDFF" },
        { x: 7, y: 3, color: "#BDBDBDFF" },
        { x: 4, y: 4, color: "#FFE082FF" },
        { x: 5, y: 4, color: "#212121FF" },
        { x: 7, y: 4, color: "#212121FF" },
        { x: 9, y: 7, color: "#6D4C41FF" },
        { x: 9, y: 5, color: "#6D4C41FF" },
        { x: 9, y: 4, color: "#6D4C41FF" },
        { x: 9, y: 3, color: "#6D4C41FF" },
      ],
      history: [{ pixels: [] }],
      historyIndex: 0,
      loaderDialog: false,
      saverDialog: false,
    }
  },
  methods: {
    editPixel(params) {
      let pickedPixel
      switch (this.tool) {
        case "pencil":
          this.pixels = reject(this.pixels, (pixel) => {
            return pixel.x === params.x && pixel.y === params.y
          })
          this.pixels.push({ x: params.x, y: params.y, color: this.color })
          this.addHistory()
          this.historyIndex = this.history.length - 1
          break
        case "eraser":
          this.pixels = reject(this.pixels, (pixel) => {
            return pixel.x === params.x && pixel.y === params.y
          })
          this.addHistory()
          break
        case "picker":
          pickedPixel = find(this.pixels, (pixel) => {
            return pixel.x === params.x && pixel.y === params.y
          })
          if (pickedPixel && pickedPixel.color) {
            this.color = pickedPixel.color
          }
          this.addHistory()
          break
        default:
          break
      }
    },
    cleanCanvas() {
      // Remove pixels that are off canvas
      this.pixels = filter(this.pixels, (pixel) => {
        return pixel.x <= this.width && pixel.y <= this.height
      })
      // Reset history
      this.resetHistory()
      this.history = [{ pixels: cloneDeep(this.pixels) }]
    },
    addHistory() {
      this.history.push({
        pixels: cloneDeep(this.pixels),
      })
      if (this.history.length > 10) {
        this.history.shift()
      } else {
        this.historyIndex += 1
      }
    },
    undo() {
      if (this.history[this.historyIndex - 1]) {
        this.pixels = cloneDeep(this.history[this.historyIndex - 1].pixels)
        this.historyIndex -= 1
      }
    },
    redo() {
      if (this.history[this.historyIndex + 1]) {
        this.pixels = cloneDeep(this.history[this.historyIndex + 1].pixels)
        this.historyIndex += 1
      }
    },
    resetHistory() {
      this.history = [{ pixels: [] }]
      this.historyIndex = 0
    },
    restart() {
      this.resetHistory()
      this.pixels = []
    },
    loadCode(code) {
      this.loaderDialog = false
      this.restart()
      this.pixels = code.pixels
      this.width = code.width
      this.height = code.height
    },
  },
  mounted() {},
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

.render-box {
  overflow: auto;
  max-height: 500px;
}

.board-title {
  color: white;
}
.board-caption {
  color: white;
}
.small-caption {
  font-size: 0.8em;
}
.author-link {
  color: var(--v-primary-lighten3);
}
.author-link:hover {
  color: var(--v-secondary-lighten3);
}
</style>
