import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import { homedir } from 'os'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: detectServerConfig('dashboard.test')
})

function detectServerConfig(host) {
  let keyPath = resolve(homedir(), `.config/valet/Certificates/${host}.key`)
  let certificatePath = resolve(homedir(), `.config/valet/Certificates/${host}.crt`)

  console.log({ keyPath, certificatePath })
  if (!fs.existsSync(keyPath)) {
    return {}
  }

  if (!fs.existsSync(certificatePath)) {
    return {}
  }

  return {
    hmr: { host },
    host,
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certificatePath)
    }
  }
}
