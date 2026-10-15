import { defineConfig } from 'vite'

export default defineConfig({
  base: '/KavithaLab/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        research: 'research.html',
        members: 'members.html',
        publications: 'publications.html',
        news: 'news.html',
        contact: 'contact.html'
      }
    }
  }
})