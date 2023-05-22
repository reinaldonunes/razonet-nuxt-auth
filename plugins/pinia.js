import { createPinia } from 'pinia'
import { pinia } from '@/store'

export default ({ app }) => {
  app.use(createPinia())
  pinia._p = pinia
}