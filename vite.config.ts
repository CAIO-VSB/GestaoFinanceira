import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls} from "@quasar/vite-plugin"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls } //Recomendação do quasar para lidar melhor com caminhos de imagens e arquivos em templates.
    }),
  quasar() //Caso queira adicionar sass e modificar o tema do quasar
  ]
  
})
