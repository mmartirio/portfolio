import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// Em dev, serve /api/projects com o mesmo código da Vercel Function.
function projectsApiDev() {
  return {
    name: 'projects-api-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/projects', async (_req, res) => {
        try {
          const { GET } = await server.ssrLoadModule('/api/projects.js')
          const response = await GET()
          res.statusCode = response.status
          res.setHeader('content-type', 'application/json')
          res.end(await response.text())
        } catch (error) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: String(error) }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Disponibiliza VERCEL_API_TOKEN / VERCEL_TEAM_ID do .env.local em dev.
  Object.assign(process.env, loadEnv(mode, process.cwd(), 'VERCEL_'))

  return {
    plugins: [
      react(),
      projectsApiDev(),
      ViteImageOptimizer({
        jpg: { quality: 75 },
        jpeg: { quality: 75 },
        png: { quality: 75 },
        svg: {
          multipass: true,
        },
      }),
    ],
    test: {
      environment: 'jsdom',
      setupFiles: './src/setupTests.js',
      globals: true,
    },
  }
})
